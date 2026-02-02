import { useState } from "react";
import { Search, Check, Zap, Ruler, Info, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FitText } from "@/components/ui/fit-text";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { useCharacterStore } from "@/store/characterStore";
import { useBackendRaces } from "@/api/hooks";
import type { Race } from "@/types/character";
import { t } from "@/data/translations/ru";

// Визуальные данные рас - акцентные цвета для иконок
const RACE_DATA: Record<string, { accent: string; icon: string }> = {
  human: { accent: "text-amber-400", icon: "👤" },
  elf: { accent: "text-emerald-400", icon: "🧝" },
  dwarf: { accent: "text-orange-400", icon: "⛏️" },
  halfling: { accent: "text-lime-400", icon: "🏠" },
  dragonborn: { accent: "text-red-400", icon: "🐉" },
  gnome: { accent: "text-violet-400", icon: "🔧" },
  "half-elf": { accent: "text-blue-400", icon: "✨" },
  "half-orc": { accent: "text-green-400", icon: "💪" },
  tiefling: { accent: "text-rose-400", icon: "😈" },
  aasimar: { accent: "text-yellow-400", icon: "👼" },
  goliath: { accent: "text-slate-400", icon: "🏔️" },
  orc: { accent: "text-emerald-500", icon: "⚔️" },
};

const DEFAULT_DATA = { accent: "text-slate-400", icon: "🎭" };

export function RaceStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalRace, setModalRace] = useState<Race | null>(null);
  const [confirmRace, setConfirmRace] = useState<Race | null>(null);
  const { character, setRace, resetCharacter, completedSteps } = useCharacterStore();
  const { data: racesData, isLoading, error } = useBackendRaces("phb2024");
  const races = racesData?.data?.races || [];

  const filteredRaces = races.filter(
    (race: Race) =>
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.nameRu.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectRace = (race: Race) => {
    // Если уже выбрана раса и пользователь выбирает другую
    // Показываем предупреждение только если мы уже прошли шаг расы (есть заполненные данные)
    if (character.race && character.race.id !== race.id && completedSteps.includes("race")) {
      setConfirmRace(race);
      setModalRace(null);
    } else {
      setRace(race);
      setModalRace(null);
    }
  };

  const handleConfirmRaceChange = () => {
    if (confirmRace) {
      // Сбрасываем все данные и начинаем заново
      resetCharacter();
      setRace(confirmRace);
      setConfirmRace(null);
    }
  };

  const getData = (id: string) => RACE_DATA[id] || DEFAULT_DATA;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка рас...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">
            Ошибка загрузки рас
          </h3>
          <p className="text-sm text-muted-foreground">
            Не удалось загрузить данные о расах. Пожалуйста, попробуйте позже.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("app.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur border-border/50 focus:border-primary/50"
        />
      </div>

      {/* Race grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredRaces.map((race: Race, index: number) => {
          const isSelected = character.race?.id === race.id;
          const data = getData(race.externalId);

          return (
            <div
              key={race.id}
              onClick={() => handleSelectRace(race)}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`
                  relative group cursor-pointer rounded-2xl p-4 sm:p-6 transition-all duration-300
                  bg-card/60 backdrop-blur-sm border h-full min-h-[160px] sm:min-h-[200px]
                  flex flex-col overflow-hidden
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border/50 hover:border-primary/30 hover:bg-card/80"
                  }
                `}
              >
                {/* Icon */}
                <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 transition-transform group-hover:scale-110 flex-shrink-0">
                  {data.icon}
                </div>

                {/* Name */}
                <FitText
                  maxFontSize={18}
                  minFontSize={11}
                  className="font-semibold text-foreground mb-0.5 sm:mb-1"
                >
                  {race.nameRu}
                </FitText>
                <FitText
                  maxFontSize={14}
                  minFontSize={9}
                  className="text-muted-foreground mb-2 sm:mb-4"
                >
                  {race.name}
                </FitText>

                {/* Stats */}
                <div className="flex gap-1.5 sm:gap-2 flex-wrap mt-auto">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span>{race.speed}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                    <Ruler className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span>{race.size === "Small" ? "S" : "M"}</span>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary rounded-full p-1 sm:p-1.5 shadow-lg shadow-primary/30">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                  </div>
                )}

                {/* Info button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalRace(race);
                  }}
                  className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalRace}
        onClose={() => setModalRace(null)}
        title={modalRace?.nameRu}
        subtitle={modalRace?.name}
        icon={modalRace ? getData(modalRace.id).icon : undefined}
      >
        {modalRace && (
          <>
            {/* Stats in header area */}
            <div className="px-6 pb-4 border-b border-border/50">
              <div className="flex gap-3">
                <div className="bg-muted/30 rounded-xl px-4 py-2.5 flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Скорость
                  </p>
                  <p className="font-semibold text-foreground">
                    {modalRace.speed} фт
                  </p>
                </div>
                <div className="bg-muted/30 rounded-xl px-4 py-2.5 flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Размер</p>
                  <p className="font-semibold text-foreground">
                    {t(`sizes.${modalRace.size.toLowerCase()}`)}
                  </p>
                </div>
              </div>
            </div>

            <ModalContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {modalRace.description}
              </p>

              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t("character.traits")}
              </h3>
              <div className="space-y-3">
                {modalRace.traits.map((trait) => (
                  <div
                    key={trait.name}
                    className="bg-muted/20 p-4 rounded-xl border border-border/30"
                  >
                    <p className="font-medium text-primary mb-1">
                      {trait.nameRu}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </ModalContent>

            <ModalFooter>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalRace(null)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => handleSelectRace(modalRace)}
              >
                <Check className="w-4 h-4 mr-2" />
                Выбрать
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* Selected indicator bar */}
      {character.race && (
        <div className="bg-card/80 backdrop-blur border border-primary/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-lg animate-fade-in-up">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
              {getData(character.race.externalId).icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                {character.race.nameRu}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {character.race.speed} фт •{" "}
                {t(`sizes.${character.race.size.toLowerCase()}`)}
              </p>
            </div>
          </div>
          <Badge className="bg-primary/15 text-primary border-primary/30 px-2 sm:px-3 py-1 text-xs sm:text-sm flex-shrink-0">
            <Check className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Выбрано</span>
            <span className="sm:hidden">✓</span>
          </Badge>
        </div>
      )}

      {/* Confirmation modal for race change */}
      <Modal
        isOpen={!!confirmRace}
        onClose={() => setConfirmRace(null)}
        title="Смена расы"
        icon="⚠️"
        maxWidth="max-w-md"
      >
        <ModalContent>
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Вы уверены, что хотите сменить расу?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                При смене расы все данные вашего персонажа будут сброшены. Вам придётся начать заполнять персонажа заново:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                <li>Класс придётся выбрать заново</li>
                <li>Навыки сбросятся</li>
                <li>Характеристики вернутся к начальным значениям</li>
                <li>Предыстория будет сброшена</li>
                <li>Снаряжение и заклинания будут очищены</li>
                <li>Имя и детали персонажа удалятся</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              Новая раса: {confirmRace?.nameRu}
            </p>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setConfirmRace(null)}
          >
            Отмена
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
            onClick={handleConfirmRaceChange}
          >
            Сбросить и выбрать
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
