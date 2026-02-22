import { useBackendFeatsMeta } from "@/api/hooks";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, RaceOption } from "../../types";

interface OriginStepProps {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
}

function normalizeLookupValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[()]/g, "");
}

export function OriginStep({ races, backgrounds }: OriginStepProps) {
  const navigate = useNavigate();
  const { data: featsMetaData } = useBackendFeatsMeta();
  const raceId = useCreatorStore((state) => state.raceId);
  const backgroundId = useCreatorStore((state) => state.backgroundId);
  const setRace = useCreatorStore((state) => state.setRace);
  const setBackground = useCreatorStore((state) => state.setBackground);
  const selectedBackground = useMemo(
    () => backgrounds.find((item) => item.id === backgroundId) ?? null,
    [backgrounds, backgroundId]
  );
  const featLookup = useMemo(() => {
    const byId = new Map<string, { id: string; name: string; nameRu: string }>();
    const byName = new Map<string, { id: string; name: string; nameRu: string }>();
    const feats = featsMetaData?.data ?? [];

    for (const feat of feats) {
      byId.set(feat.id.toLowerCase(), feat);
      byName.set(normalizeLookupValue(feat.name), feat);
      byName.set(normalizeLookupValue(feat.nameRu), feat);
    }

    return { byId, byName };
  }, [featsMetaData]);
  const resolveOriginFeat = (originFeat: string) => {
    const byId = featLookup.byId.get(originFeat.toLowerCase());
    if (byId) return byId;
    return featLookup.byName.get(normalizeLookupValue(originFeat)) ?? null;
  };
  const selectedBackgroundOriginFeat = selectedBackground
    ? resolveOriginFeat(selectedBackground.originFeat)
    : null;

  return (
    <div className="space-y-6">
      <StepHeader
        title="Происхождение"
        description="Выберите расу и предысторию персонажа"
      />

      <div className="grid gap-6 md:grid-cols-2">
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
                  {resolveOriginFeat(background.originFeat)?.nameRu ||
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
