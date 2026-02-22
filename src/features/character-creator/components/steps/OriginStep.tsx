import { Label } from "@/components/ui/label";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, RaceOption } from "../../types";

interface OriginStepProps {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
}

export function OriginStep({ races, backgrounds }: OriginStepProps) {
  const raceId = useCreatorStore((state) => state.raceId);
  const backgroundId = useCreatorStore((state) => state.backgroundId);
  const setRace = useCreatorStore((state) => state.setRace);
  const setBackground = useCreatorStore((state) => state.setBackground);

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
                  {background.name} • Origin feat: {background.originFeat}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
