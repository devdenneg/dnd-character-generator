import { useState, useMemo } from "react";
import {
  Search,
  Check,
  Heart,
  Sparkles,
  Shield,
  Info,
  Swords,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FitText } from "@/components/ui/fit-text";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { useCharacterStore } from "@/store/characterStore";
import { useBackendClasses } from "@/api/hooks";
import type { CharacterClass, Subclass } from "@/types/character";
import type { EquipmentItem } from "@/types/equipment";
import { t, getAbilityNameRu } from "@/data/translations/ru";

// Визуальные данные классов - акцентные цвета
const CLASS_DATA: Record<string, { accent: string; icon: string }> = {
  barbarian: { accent: "text-red-400", icon: "🪓" },
  bard: { accent: "text-fuchsia-400", icon: "🎵" },
  cleric: { accent: "text-amber-400", icon: "✝️" },
  druid: { accent: "text-emerald-400", icon: "🌿" },
  fighter: { accent: "text-slate-400", icon: "🛡️" },
  monk: { accent: "text-orange-400", icon: "👊" },
  paladin: { accent: "text-sky-400", icon: "⚜️" },
  ranger: { accent: "text-teal-400", icon: "🏹" },
  rogue: { accent: "text-zinc-400", icon: "🗡️" },
  sorcerer: { accent: "text-rose-400", icon: "🔥" },
  warlock: { accent: "text-violet-400", icon: "👁️" },
  wizard: { accent: "text-indigo-400", icon: "📚" },
};

const DEFAULT_DATA = { accent: "text-slate-400", icon: "⚔️" };

export function ClassStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalClass, setModalClass] = useState<CharacterClass | null>(null);
  const [confirmClass, setConfirmClass] = useState<CharacterClass | null>(null);
  const { character, setClass, setSubclass, resetCharacter, completedSteps } =
    useCharacterStore();
  const { data: classesData } = useBackendClasses();

  // Transform backend data to add id to equipment
  const classes = useMemo(() => {
    if (!classesData?.data?.classes) return [];
    return classesData.data.classes.map((cls: CharacterClass) => {
      // Transform startingEquipment equipment to have id
      const transformedClass: CharacterClass = { ...cls };

      if (cls.startingEquipment?.equipment) {
        transformedClass.startingEquipment = {
          ...cls.startingEquipment,
          equipment: cls.startingEquipment.equipment.map((item) => ({
            ...item,
            id:
              (item as EquipmentItem).externalId ||
              (item as EquipmentItem).name ||
              `class-${(item as EquipmentItem).name
                ?.toLowerCase()
                .replace(/\s+/g, "-")}`,
          })),
        };
      }

      // Transform spellcasting null to undefined
      if (cls.spellcasting === null) {
        transformedClass.spellcasting = undefined;
      }

      return transformedClass;
    });
  }, [classesData]);

  const filteredClasses = classes.filter(
    (cls: CharacterClass) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.nameRu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClass = (cls: CharacterClass) => {
    // Если уже выбран класс и пользователь выбирает другой
    // Показываем предупреждение только если есть заполненные шаги после класса
    if (
      character.class &&
      character.class.id !== cls.id &&
      completedSteps.includes("class")
    ) {
      setConfirmClass(cls);
      setModalClass(null);
    } else {
      setClass(cls);
      setModalClass(null);
    }
  };

  const handleConfirmClassChange = () => {
    if (confirmClass) {
      // Сбрасываем все данные и начинаем заново
      resetCharacter();
      setClass(confirmClass);
      setConfirmClass(null);
    }
  };

  const handleSelectSubclass = (subclass: Subclass) => {
    setSubclass(subclass);
  };

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

      {/* Class grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredClasses.map((cls: CharacterClass, index: number) => {
          const isSelected = character.class?.id === cls.id;
          const data = CLASS_DATA[cls.externalId] || DEFAULT_DATA;

          return (
            <div
              key={cls.id}
              onClick={() => handleSelectClass(cls)}
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
                  {cls.nameRu}
                </FitText>
                <FitText
                  maxFontSize={14}
                  minFontSize={9}
                  className="text-muted-foreground mb-2 sm:mb-4"
                >
                  {cls.name}
                </FitText>

                {/* Stats */}
                <div className="flex gap-1.5 sm:gap-2 flex-wrap mt-auto">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400" />
                    <span>d{cls.hitDie}</span>
                  </div>
                  {cls.spellcasting && (
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground bg-accent/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                      <span>Маг</span>
                    </div>
                  )}
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
                    setModalClass(cls);
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
        isOpen={!!modalClass}
        onClose={() => setModalClass(null)}
        title={modalClass?.nameRu}
        subtitle={modalClass?.name}
        icon={modalClass ? CLASS_DATA[modalClass.externalId]?.icon : undefined}
        maxWidth="max-w-2xl"
      >
        {modalClass && (
          <>
            {/* Quick stats in header area */}
            <div className="px-6 pb-4 border-b border-border/50">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20">
                  <Heart className="w-3 h-3 mr-1" />d{modalClass.hitDie}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {modalClass.primaryAbility
                    .map((a) => getAbilityNameRu(a))
                    .join("/")}
                </Badge>
                {modalClass.spellcasting && (
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Заклинатель
                  </Badge>
                )}
              </div>
            </div>

            <ModalContent>
              <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                {modalClass.description}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-muted/20 p-3 rounded-xl text-center border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">
                    Кость хитов
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    d{modalClass.hitDie}
                  </p>
                </div>
                <div className="bg-muted/20 p-3 rounded-xl text-center border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">Основная</p>
                  <p className="text-sm font-semibold text-foreground">
                    {modalClass.primaryAbility
                      .map((a) => getAbilityNameRu(a))
                      .join("/")}
                  </p>
                </div>
                <div className="bg-muted/20 p-3 rounded-xl text-center border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">
                    Спасброски
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {modalClass.savingThrows
                      .map((s) => getAbilityNameRu(s))
                      .join(", ")}
                  </p>
                </div>
                <div className="bg-muted/20 p-3 rounded-xl text-center border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">Навыков</p>
                  <p className="text-lg font-bold text-foreground">
                    {modalClass.skillCount}
                  </p>
                </div>
              </div>

              {/* Proficiencies */}
              <div className="mb-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {t("character.proficiencies")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalClass.armorProficiencies.map((p) => (
                    <Badge
                      key={p}
                      className="bg-muted/30 text-foreground/80 border-border/50"
                    >
                      <Shield className="w-3 h-3 mr-1 text-primary" />
                      {p}
                    </Badge>
                  ))}
                  {modalClass.weaponProficiencies.map((p) => (
                    <Badge
                      key={p}
                      variant="outline"
                      className="border-border/50"
                    >
                      <Swords className="w-3 h-3 mr-1 text-muted-foreground" />
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {t("character.features")} (1 уровень)
                </h4>
                <div className="space-y-2">
                  {modalClass.features
                    .filter((f) => f.level === 1)
                    .map((feature) => (
                      <div
                        key={feature.name}
                        className="bg-muted/20 p-4 rounded-xl border border-border/30"
                      >
                        <p className="font-medium text-primary text-sm mb-1">
                          {feature.nameRu}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Spellcasting info */}
              {modalClass.spellcasting && (
                <div className="mb-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Владение заклинаниями
                  </h4>
                  <div className="bg-muted/20 p-4 rounded-xl border border-border/30 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Базовая характеристика
                        </p>
                        <p className="font-medium">
                          {getAbilityNameRu(modalClass.spellcasting.ability)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Заговоры (1-20 уровень)
                        </p>
                        <p className="font-medium text-xs">
                          {modalClass.spellcasting.cantripsKnown.join(", ")}
                        </p>
                      </div>
                      {modalClass.spellcasting.spellsKnown && (
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Известные заклинания (1-20 уровень)
                          </p>
                          <p className="font-medium text-xs">
                            {modalClass.spellcasting.spellsKnown.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Subclasses */}
              {modalClass.subclassLevel === 1 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {t("character.subclass")}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {modalClass.subclasses.map((sub) => (
                      <div
                        key={sub.id}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          character.subclass?.id === sub.id
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/30 bg-muted/10"
                        }`}
                        onClick={() => handleSelectSubclass(sub)}
                      >
                        <p className="font-medium text-sm flex items-center gap-2 text-foreground">
                          {sub.nameRu}
                          {character.subclass?.id === sub.id && (
                            <Check className="w-3 h-3 text-primary" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalClass.subclassLevel > 1 && (
                <div className="bg-muted/20 p-4 rounded-xl border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    Подкласс выбирается на{" "}
                    <span className="text-foreground font-medium">
                      {modalClass.subclassLevel} уровне
                    </span>
                  </p>
                </div>
              )}
            </ModalContent>

            <ModalFooter>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalClass(null)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => handleSelectClass(modalClass)}
              >
                <Check className="w-4 h-4 mr-2" />
                Выбрать
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* Selected indicator bar */}
      {character.class && (
        <div className="bg-card/80 backdrop-blur border border-primary/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-lg animate-fade-in-up">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
              {CLASS_DATA[character.class.externalId]?.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                {character.class.nameRu}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                d{character.class.hitDie} •{" "}
                {character.subclass
                  ? character.subclass.nameRu
                  : character.class.name}
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

      {/* Confirmation modal for class change */}
      <Modal
        isOpen={!!confirmClass}
        onClose={() => setConfirmClass(null)}
        title="Смена класса"
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
                Вы уверены, что хотите сменить класс?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                При смене класса все данные вашего персонажа будут сброшены. Вам
                придётся начать заполнять персонажа заново:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                <li>Расу придётся выбрать заново</li>
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
              Новый класс: {confirmClass?.nameRu}
            </p>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setConfirmClass(null)}
          >
            Отмена
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
            onClick={handleConfirmClassChange}
          >
            Сбросить и выбрать
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
