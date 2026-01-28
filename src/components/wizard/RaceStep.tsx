import { useState } from "react";
import { Search, Check, X, Zap, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { getAllRaces } from "@/data/phb2024";
import type { Race } from "@/types/character";
import { t } from "@/data/translations/ru";

// Визуальные данные рас - обновлённые цвета
const RACE_DATA: Record<string, { gradient: string; icon: string }> = {
  human: { gradient: "from-amber-500/90 to-orange-600/90", icon: "👤" },
  elf: { gradient: "from-emerald-500/90 to-teal-600/90", icon: "🧝" },
  dwarf: { gradient: "from-amber-600/90 to-stone-600/90", icon: "⛏️" },
  halfling: { gradient: "from-lime-500/90 to-green-600/90", icon: "🏠" },
  dragonborn: { gradient: "from-red-500/90 to-orange-600/90", icon: "🐉" },
  gnome: { gradient: "from-violet-500/90 to-purple-600/90", icon: "🔧" },
  "half-elf": { gradient: "from-blue-500/90 to-indigo-600/90", icon: "✨" },
  "half-orc": { gradient: "from-slate-500/90 to-green-600/90", icon: "💪" },
  tiefling: { gradient: "from-rose-600/90 to-purple-700/90", icon: "😈" },
  aasimar: { gradient: "from-amber-400/90 to-yellow-500/90", icon: "👼" },
  goliath: { gradient: "from-slate-500/90 to-zinc-600/90", icon: "🏔️" },
  orc: { gradient: "from-emerald-600/90 to-green-700/90", icon: "⚔️" },
};

const DEFAULT_DATA = { gradient: "from-slate-500/90 to-zinc-600/90", icon: "🎭" };

export function RaceStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalRace, setModalRace] = useState<Race | null>(null);
  const { character, setRace } = useCharacterStore();
  const races = getAllRaces();

  const filteredRaces = races.filter(
    (race) =>
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.nameRu.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectRace = (race: Race) => {
    setRace(race);
    setModalRace(null);
  };

  const getData = (id: string) => RACE_DATA[id] || DEFAULT_DATA;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("app.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Race grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredRaces.map((race) => {
          const isSelected = character.race?.id === race.id;
          const data = getData(race.id);

          return (
            <div
              key={race.id}
              onClick={() => handleSelectRace(race)}
              className={`
                relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200
                ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                    : "hover:scale-[1.02] hover:shadow-lg"
                }
              `}
            >
              {/* Card */}
              <div
                className={`bg-gradient-to-br ${data.gradient} p-4 aspect-[4/5]`}
              >
                {/* Icon */}
                <div className="text-5xl mb-3 drop-shadow-lg">{data.icon}</div>

                {/* Name */}
                <h3 className="text-white font-bold text-lg leading-tight drop-shadow">
                  {race.nameRu}
                </h3>
                <p className="text-white/70 text-xs mb-2">{race.name}</p>

                {/* Stats */}
                <div className="flex gap-1.5 flex-wrap">
                  <Badge className="bg-black/30 text-white border-0 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    {race.speed}
                  </Badge>
                  <Badge className="bg-black/30 text-white border-0 text-xs">
                    <Ruler className="w-3 h-3 mr-1" />
                    {race.size === "Small" ? "S" : "M"}
                  </Badge>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}

                {/* Info button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalRace(race);
                  }}
                  className="absolute bottom-2 right-2 bg-white/20 hover:bg-white/30 rounded-full px-2 py-1 text-white text-xs transition-colors"
                >
                  Инфо
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalRace && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div
            className="bg-card rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className={`bg-gradient-to-br ${getData(modalRace.id).gradient} p-6 rounded-t-2xl flex-shrink-0`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-5xl mb-2 block">
                    {getData(modalRace.id).icon}
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    {modalRace.nameRu}
                  </h2>
                  <p className="text-white/70">{modalRace.name}</p>
                </div>
                <button
                  onClick={() => setModalRace(null)}
                  className="bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-3 mt-4">
                <div className="bg-black/30 rounded-lg px-4 py-2">
                  <p className="text-white/70 text-xs">Скорость</p>
                  <p className="text-white font-bold text-lg">
                    {modalRace.speed} фт
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg px-4 py-2">
                  <p className="text-white/70 text-xs">Размер</p>
                  <p className="text-white font-bold text-lg">
                    {t(`sizes.${modalRace.size.toLowerCase()}`)}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal content - scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-muted-foreground mb-6">
                {modalRace.description}
              </p>

              <h3 className="font-bold mb-3">{t("character.traits")}</h3>
              <div className="space-y-3">
                {modalRace.traits.map((trait) => (
                  <div key={trait.name} className="bg-muted/30 p-4 rounded-lg">
                    <p className="font-medium text-primary">{trait.nameRu}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-4 border-t border-border flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalRace(null)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1"
                onClick={() => handleSelectRace(modalRace)}
              >
                <Check className="w-4 h-4 mr-2" />
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Selected indicator bar */}
      {character.race && (
        <div className="bg-card border border-primary/30 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-primary/5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getData(character.race.id).icon}</span>
            <div>
              <p className="font-semibold text-foreground">{character.race.nameRu}</p>
              <p className="text-sm text-muted-foreground">
                {character.race.speed} фт •{" "}
                {t(`sizes.${character.race.size.toLowerCase()}`)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/15 text-primary border-primary/30">Выбрано</Badge>
          </div>
        </div>
      )}
    </div>
  );
}
