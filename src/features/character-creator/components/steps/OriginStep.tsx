import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, RaceOption } from "../../types";

interface OriginStepProps {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
}

export function OriginStep({ races, backgrounds }: OriginStepProps) {
  const navigate = useNavigate();
  const raceId = useCreatorStore((state) => state.raceId);
  const backgroundId = useCreatorStore((state) => state.backgroundId);
  const level = useCreatorStore((state) => state.level);
  const setRace = useCreatorStore((state) => state.setRace);
  const setBackground = useCreatorStore((state) => state.setBackground);
  const setLevel = useCreatorStore((state) => state.setLevel);
  const selectedBackground = useMemo(
    () => backgrounds.find((item) => item.id === backgroundId) ?? null,
    [backgrounds, backgroundId]
  );
  const selectedBackgroundOriginFeat = selectedBackground?.originFeatMeta ?? null;
  const selectedFeatDescriptionPreview = useMemo(() => {
    const raw = selectedBackgroundOriginFeat?.description;
    if (!raw) return "";

    const extractText = (value: unknown): string => {
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value.map((item) => extractText(item)).join(" ");
      if (typeof value === "object" && value !== null) {
        const entry = value as Record<string, unknown>;
        if (typeof entry.text === "string") return entry.text;
        if (Array.isArray(entry.entries)) {
          return (entry.entries as unknown[]).map((item) => extractText(item)).join(" ");
        }
      }
      return "";
    };

    const plain = extractText(raw)
      .replace(/\{@[^ ]+\s([^}|]+)(?:\|[^}]*)?\}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    if (!plain) return "";
    return plain.length > 220 ? `${plain.slice(0, 220)}...` : plain;
  }, [selectedBackgroundOriginFeat?.description]);

  return (
    <div className="space-y-6">
      <StepHeader
        title="Происхождение"
        description="Выберите расу и предысторию персонажа"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Стартовый уровень</Label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              max={20}
              value={String(level)}
              onChange={(event) => setLevel(Number(event.target.value) || 1)}
              className="max-w-40"
            />
            <p className="text-xs text-muted-foreground">
              Влияет на лимиты заклинаний, итоговые хиты, бонус мастерства и расчеты листа.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Раса</Label>
          <div className="max-h-80 overflow-auto rounded-lg border border-border/60 bg-card/40">
            {races.map((race) => (
              <button
                key={race.id}
                onClick={() => setRace(race.id)}
                className={`w-full border-b border-border/40 px-4 py-3 text-left last:border-0 ${
                  raceId === race.id ? "bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                <p className="font-medium">{race.nameRu}</p>
                <p className="text-xs text-muted-foreground">
                  {race.name} • Скорость {race.speed}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Предыстория</Label>
          <div className="max-h-80 overflow-auto rounded-lg border border-border/60 bg-card/40">
            {backgrounds.map((background) => (
              <button
                key={background.id}
                onClick={() => setBackground(background.id)}
                className={`w-full border-b border-border/40 px-4 py-3 text-left last:border-0 ${
                  backgroundId === background.id ? "bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                <p className="font-medium">{background.nameRu}</p>
                <p className="text-xs text-muted-foreground">
                  {background.name} • Черта происхождения:{" "}
                  {background.originFeatMeta?.nameRu ||
                    background.originFeatMeta?.name ||
                    background.originFeat}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedBackground ? (
        <div className="space-y-2 rounded-lg border border-border/60 p-4">
          <p className="font-medium">Данные выбранной предыстории</p>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Черта происхождения: </span>
              {selectedBackgroundOriginFeat ? (
                <button
                  type="button"
                  onClick={() => navigate(`/feats#${selectedBackgroundOriginFeat.id}`)}
                  className="text-primary hover:underline"
                >
                  {selectedBackgroundOriginFeat.nameRu ||
                    selectedBackgroundOriginFeat.name}
                </button>
              ) : (
                <span>{selectedBackground.originFeat}</span>
              )}
            </div>
            {selectedFeatDescriptionPreview ? (
              <p className="text-xs text-muted-foreground">{selectedFeatDescriptionPreview}</p>
            ) : null}
            {selectedBackground.equipment && selectedBackground.equipment.length > 0 ? (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Снаряжение из предыстории
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedBackground.equipment.map((item) => (
                    <button
                      key={item.id || item.externalId}
                      type="button"
                      onClick={() => navigate(`/equipment#${item.externalId}`)}
                      className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/15"
                    >
                      {item.nameRu || item.name}
                      {item.quantity ? ` x${item.quantity}` : ""}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
