import { Check, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCharacterStore } from "@/store/characterStore";
import { getSkillNameRu, getAbilityNameRu } from "@/data/translations/ru";

// Все навыки D&D 5e с их базовыми характеристиками
const ALL_SKILLS: { id: string; nameRu: string; ability: string }[] = [
  { id: "acrobatics", nameRu: "Акробатика", ability: "dexterity" },
  { id: "animal_handling", nameRu: "Уход за животными", ability: "wisdom" },
  { id: "arcana", nameRu: "Магия", ability: "intelligence" },
  { id: "athletics", nameRu: "Атлетика", ability: "strength" },
  { id: "deception", nameRu: "Обман", ability: "charisma" },
  { id: "history", nameRu: "История", ability: "intelligence" },
  { id: "insight", nameRu: "Проницательность", ability: "wisdom" },
  { id: "intimidation", nameRu: "Запугивание", ability: "charisma" },
  { id: "investigation", nameRu: "Расследование", ability: "intelligence" },
  { id: "medicine", nameRu: "Медицина", ability: "wisdom" },
  { id: "nature", nameRu: "Природа", ability: "intelligence" },
  { id: "perception", nameRu: "Восприятие", ability: "wisdom" },
  { id: "performance", nameRu: "Выступление", ability: "charisma" },
  { id: "persuasion", nameRu: "Убеждение", ability: "charisma" },
  { id: "religion", nameRu: "Религия", ability: "intelligence" },
  { id: "sleight_of_hand", nameRu: "Ловкость рук", ability: "dexterity" },
  { id: "stealth", nameRu: "Скрытность", ability: "dexterity" },
  { id: "survival", nameRu: "Выживание", ability: "wisdom" },
];

// Группировка навыков по характеристике
const SKILLS_BY_ABILITY = {
  strength: ["athletics"],
  dexterity: ["acrobatics", "sleight_of_hand", "stealth"],
  intelligence: ["arcana", "history", "investigation", "nature", "religion"],
  wisdom: ["animal_handling", "insight", "medicine", "perception", "survival"],
  charisma: ["deception", "intimidation", "performance", "persuasion"],
};

export function SkillsStep() {
  const {
    character,
    addSkillProficiency,
    removeSkillProficiency,
    getStats,
    getAbilityModifier,
  } = useCharacterStore();

  const stats = getStats();
  const proficiencyBonus = stats.proficiencyBonus;

  // Навыки доступные для выбора от класса
  const classSkillChoices = character.class?.skillChoices || [];
  const maxSkillCount = character.class?.skillCount || 2;

  // Навыки от предыстории (фиксированные)
  const backgroundSkills = character.background?.skillProficiencies || [];

  // Текущие выбранные навыки от класса (исключая навыки от предыстории)
  const selectedClassSkills = character.skillProficiencies.filter(
    (skill) => !backgroundSkills.includes(skill),
  );

  const canSelectMore = selectedClassSkills.length < maxSkillCount;

  const handleToggleSkill = (skillId: string) => {
    // Нельзя менять навыки от предыстории
    if (backgroundSkills.includes(skillId)) return;

    if (character.skillProficiencies.includes(skillId)) {
      removeSkillProficiency(skillId);
    } else if (canSelectMore) {
      addSkillProficiency(skillId);
    }
  };

  const getSkillBonus = (skillId: string): number => {
    const skill = ALL_SKILLS.find((s) => s.id === skillId);
    if (!skill) return 0;

    const abilityMod = getAbilityModifier(
      skill.ability as keyof typeof stats.abilityModifiers,
    );
    const isProficient = character.skillProficiencies.includes(skillId);

    return abilityMod + (isProficient ? proficiencyBonus : 0);
  };

  const formatBonus = (bonus: number) =>
    bonus >= 0 ? `+${bonus}` : `${bonus}`;

  if (!character.class) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Сначала выберите класс персонажа
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Информация о выборе */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Выбор навыков
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Класс <strong>{character.class.nameRu}</strong> позволяет выбрать{" "}
            <strong>{maxSkillCount}</strong> навыка из списка.
            {backgroundSkills.length > 0 && (
              <>
                {" "}
                Предыстория <strong>{character.background?.nameRu}</strong> даёт
                владение навыками:{" "}
                <strong>
                  {backgroundSkills.map((s) => getSkillNameRu(s)).join(", ")}
                </strong>
                .
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="bg-muted/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Выбрано:{" "}
              </span>
              <span className="font-bold text-base sm:text-lg">
                {selectedClassSkills.length} / {maxSkillCount}
              </span>
            </div>
            <div className="bg-muted/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Бонус:{" "}
              </span>
              <span className="font-bold text-base sm:text-lg text-primary">
                +{proficiencyBonus}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Навыки от класса */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Навыки класса (выберите {maxSkillCount})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {classSkillChoices.map((skillId) => {
            const skill = ALL_SKILLS.find((s) => s.id === skillId);
            if (!skill) return null;

            const isSelected = character.skillProficiencies.includes(skillId);
            const isFromBackground = backgroundSkills.includes(skillId);
            const bonus = getSkillBonus(skillId);
            const canSelect = canSelectMore || isSelected;

            return (
              <Card
                key={skillId}
                className={`cursor-pointer transition-all ${
                  isFromBackground
                    ? "border-accent bg-accent/10 cursor-not-allowed"
                    : isSelected
                      ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                      : canSelect
                        ? "hover:border-primary/50"
                        : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  !isFromBackground && canSelect && handleToggleSkill(skillId)
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSelected || isFromBackground
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {isSelected || isFromBackground ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            ○
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{skill.nameRu}</p>
                        <p className="text-xs text-muted-foreground">
                          {getAbilityNameRu(
                            skill.ability as keyof typeof stats.abilityModifiers,
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${
                          isSelected || isFromBackground
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatBonus(bonus)}
                      </p>
                      {isFromBackground && (
                        <Badge variant="secondary" className="text-xs">
                          Предыстория
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Все навыки (справочник) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Все навыки персонажа</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SKILLS_BY_ABILITY).map(([ability, skills]) => (
            <Card key={ability} className="bg-muted/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {getAbilityNameRu(
                    ability as keyof typeof stats.abilityModifiers,
                  )}{" "}
                  (
                  {formatBonus(
                    getAbilityModifier(
                      ability as keyof typeof stats.abilityModifiers,
                    ),
                  )}
                  )
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {skills.map((skillId) => {
                    const skill = ALL_SKILLS.find((s) => s.id === skillId);
                    if (!skill) return null;

                    const isProficient =
                      character.skillProficiencies.includes(skillId);
                    const bonus = getSkillBonus(skillId);

                    return (
                      <div
                        key={skillId}
                        className="flex items-center justify-between py-1 px-2 rounded hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isProficient
                                ? "bg-primary"
                                : "bg-muted-foreground/30"
                            }`}
                          />
                          <span
                            className={
                              isProficient
                                ? "font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {skill.nameRu}
                          </span>
                        </div>
                        <span
                          className={`font-mono ${
                            isProficient
                              ? "font-bold text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatBonus(bonus)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
