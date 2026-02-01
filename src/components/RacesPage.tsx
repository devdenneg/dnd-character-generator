import { useBackendRaces } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Zap, Shield, Eye, Skull, Flame, Mountain, Feather, Circle, Crown, Ghost } from "lucide-react";
import { useState } from "react";

const RACE_ICONS: Record<string, any> = {
  aasimar: Zap,
  dragonborn: Flame,
  dwarf: Mountain,
  elf: Users,
  gnome: Feather,
  goliath: Mountain,
  halfling: Circle,
  human: Users,
  orc: Skull,
  tiefling: Ghost,
};

interface RacesPageProps {
  onBack?: () => void;
}

export function RacesPage({ onBack }: RacesPageProps) {
  const { data, isLoading, error } = useBackendRaces("phb2024");
  const [selectedRace, setSelectedRace] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Ошибка загрузки рас
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о расах с сервера. Пожалуйста, попробуйте
              позже.
            </p>
            {onBack && (
              <Button variant="outline" className="mt-4" onClick={onBack}>
                Назад
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const races = data?.data?.races || [];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {onBack && (
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack}>
              ← Назад
            </Button>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Расы PHB 2024</h1>
              <p className="text-sm text-muted-foreground">
                Официальные расы из Книги игрока 2024
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Загружено рас: <span className="font-semibold text-foreground">{races.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {races.map((race: any, index: number) => {
            const Icon = RACE_ICONS[race.externalId] || Users;
            const isSelected = selectedRace === race.id;

            return (
              <div key={race.id} className="space-y-4">
                <button
                  onClick={() => setSelectedRace(isSelected ? null : race.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                    isSelected
                      ? "bg-card/80 border-primary/50 ring-2 ring-primary/20"
                      : "bg-card/60 border-border/50 hover:border-primary/30 hover:bg-card/80"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent ${
                        !isSelected && "hover:scale-110"
                      } transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {race.nameRu}
                        </h3>
                        <ChevronRight
                          className={`w-5 h-5 text-muted-foreground transition-all ${
                            isSelected ? "rotate-90 text-primary" : ""
                          }`}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {race.name}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          Скорость: {race.speed} футов
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                          Размер: {race.size === "Medium" ? "Средний" : race.size === "Small" ? "Малый" : "Большой"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                          {race.traits?.length || 0} черт
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="bg-card/80 border border-primary/20 rounded-2xl p-6 mt-2 animate-fade-in">
                    <h4 className="font-semibold text-foreground mb-2">Описание</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {race.description}
                    </p>

                    <h4 className="font-semibold text-foreground mb-2">Черты</h4>
                    <div className="space-y-3">
                      {race.traits?.map((trait: any, traitIndex: number) => (
                        <div
                          key={trait.id}
                          className="p-4 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="font-medium text-foreground text-sm">
                              {trait.nameRu}
                            </h5>
                            <span className="text-xs text-muted-foreground/70">
                              {trait.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trait.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {races.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нет рас
            </h3>
            <p className="text-sm text-muted-foreground">
              Расы пока не загружены
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
