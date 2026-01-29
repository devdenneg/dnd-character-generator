import { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCharacterStore } from "@/store/characterStore";
import type { AbilityName } from "@/types/character";
import { t, getAbilityNameRu } from "@/data/translations/ru";

const ABILITIES: AbilityName[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function AbilityIncreaseStep() {
  const { character, setAbilityScoreIncreases } = useCharacterStore();

  // Стратегия распределения: +2/+1 или +1/+1/+1
  const [strategy, setStrategy] = useState<"2-1" | "1-1-1">("2-1");

  // Локальное состояние для выбора бонусов
  const [plus2Ability, setPlus2Ability] = useState<AbilityName | null>(
    character.abilityScoreIncreases
      ? (Object.entries(character.abilityScoreIncreases).find(
          ([_, v]) => v === 2,
        )?.[0] as AbilityName | undefined) || null
      : null,
  );
  const [plus1Abilities, setPlus1Abilities] = useState<AbilityName[]>(
    character.abilityScoreIncreases
      ? Object.entries(character.abilityScoreIncreases)
          .filter(([_, v]) => v === 1)
          .map(([k]) => k as AbilityName)
      : [],
  );

  // Рекомендуемые характеристики от предыстории
  const recommendedAbilities =
    character.background?.abilityScoreIncrease.options || [];

  // Синхронизация с загруженными данными
  useEffect(() => {
    if (character.abilityScoreIncreases) {
      const plus2 = Object.entries(character.abilityScoreIncreases).find(
        ([_, v]) => v === 2,
      );
      const plus1s = Object.entries(character.abilityScoreIncreases)
        .filter(([_, v]) => v === 1)
        .map(([k]) => k as AbilityName);

      if (plus2) {
        setPlus2Ability(plus2[0] as AbilityName);
        setStrategy("2-1");
      } else if (plus1s.length === 3) {
        setStrategy("1-1-1");
      }

      if (plus1s.length > 0) {
        setPlus1Abilities(plus1s);
      }
    }
  }, [character.abilityScoreIncreases]);

  // Обновляем store при изменении выбора
  useEffect(() => {
    const increases: Partial<Record<AbilityName, number>> = {};
    if (strategy === "2-1") {
      if (plus2Ability) increases[plus2Ability] = 2;
      if (plus1Abilities[0]) increases[plus1Abilities[0]] = 1;
    } else {
      plus1Abilities.forEach((ability) => {
        increases[ability] = 1;
      });
    }
    setAbilityScoreIncreases(increases);
  }, [plus2Ability, plus1Abilities, strategy, setAbilityScoreIncreases]);

  // Сброс выбора при смене стратегии
  useEffect(() => {
    setPlus2Ability(null);
    setPlus1Abilities([]);
  }, [strategy]);

  const handleSelectPlus2 = (ability: AbilityName) => {
    if (plus2Ability === ability) {
      setPlus2Ability(null);
    } else {
      // Убираем из +1 если там есть
      setPlus1Abilities((prev) => prev.filter((a) => a !== ability));
      setPlus2Ability(ability);
    }
  };

  const handleSelectPlus1 = (ability: AbilityName) => {
    const maxPlus1 = strategy === "2-1" ? 1 : 3;

    if (plus1Abilities.includes(ability)) {
      setPlus1Abilities((prev) => prev.filter((a) => a !== ability));
    } else {
      if (plus1Abilities.length < maxPlus1) {
        // Убираем из +2 если там есть (только для стратегии 2-1)
        if (strategy === "2-1" && plus2Ability === ability) {
          setPlus2Ability(null);
        }
        setPlus1Abilities((prev) => [...prev, ability]);
      }
    }
  };

  // Рассчитываем итоговые значения
  const getFinalScore = (ability: AbilityName): number => {
    let score = character.abilityScores[ability];
    if (strategy === "2-1" && plus2Ability === ability) score += 2;
    if (plus1Abilities.includes(ability)) score += 1;
    return score;
  };

  return (
    <div className="space-y-6">
      {/* Информация о правилах PHB 2024 */}
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="w-5 h-5" />
            Увеличение характеристик (PHB 2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Выберите стратегию распределения бонусов к характеристикам.
          </p>
          {character.background && recommendedAbilities.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm">
                Рекомендуемые для {character.background.nameRu}:
              </span>
              {recommendedAbilities.map((ability) => (
                <Badge key={ability} variant="secondary">
                  {getAbilityNameRu(ability)}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Выбор стратегии */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${
            strategy === "2-1" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
          onClick={() => setStrategy("2-1")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              +2 и +1
              {strategy === "2-1" && <Check className="w-5 h-5 text-primary" />}
            </CardTitle>
            <CardDescription className="text-xs">
              Стандартный вариант
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Распределите +2 к одной характеристике и +1 к другой
            </p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${
            strategy === "1-1-1" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
          onClick={() => setStrategy("1-1-1")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              +1, +1 и +1
              {strategy === "1-1-1" && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              Более сбалансированный вариант
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Распределите +1 к трём разным характеристикам
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Статус выбора */}
      <div className="flex gap-4 flex-wrap">
        {strategy === "2-1" && (
          <Card
            className={`flex-1 min-w-[200px] ${plus2Ability ? "border-primary" : "border-dashed"}`}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Бонус +2</p>
                  <p className="text-lg font-bold">
                    {plus2Ability
                      ? getAbilityNameRu(plus2Ability)
                      : "Не выбрано"}
                  </p>
                </div>
                {plus2Ability && <Check className="w-5 h-5 text-primary" />}
              </div>
            </CardContent>
          </Card>
        )}

        {strategy === "2-1" ? (
          <Card
            className={`flex-1 min-w-[200px] ${plus1Abilities.length > 0 ? "border-primary" : "border-dashed"}`}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Бонус +1</p>
                  <p className="text-lg font-bold">
                    {plus1Abilities[0]
                      ? getAbilityNameRu(plus1Abilities[0])
                      : "Не выбрано"}
                  </p>
                </div>
                {plus1Abilities[0] && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {[0, 1, 2].map((index) => (
              <Card
                key={index}
                className={`flex-1 min-w-[150px] ${plus1Abilities[index] ? "border-primary" : "border-dashed"}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Бонус +1</p>
                      <p className="text-lg font-bold">
                        {plus1Abilities[index]
                          ? getAbilityNameRu(plus1Abilities[index])
                          : "Не выбрано"}
                      </p>
                    </div>
                    {plus1Abilities[index] && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Выбор характеристик */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {ABILITIES.map((ability) => {
          const baseScore = character.abilityScores[ability];
          const finalScore = getFinalScore(ability);
          const modifier = calculateModifier(finalScore);
          const isPlus2 = strategy === "2-1" && plus2Ability === ability;
          const isPlus1 = plus1Abilities.includes(ability);
          const isRecommended = recommendedAbilities.includes(ability);

          return (
            <Card
              key={ability}
              className={`relative overflow-hidden ${
                isPlus2 || isPlus1
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              } ${isRecommended && !isPlus2 && !isPlus1 ? "border-accent" : ""}`}
            >
              {isRecommended && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-bl">
                  Рек.
                </div>
              )}
              <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-base sm:text-lg truncate">
                  {getAbilityNameRu(ability)}
                </CardTitle>
                <CardDescription className="text-xs uppercase">
                  {t(`abilities.${ability.substring(0, 3)}`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                    <span className="text-base sm:text-lg text-muted-foreground">
                      {baseScore}
                    </span>
                    {(isPlus2 || isPlus1) && (
                      <>
                        <span className="text-primary text-sm sm:text-base">
                          →
                        </span>
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          {finalScore}
                        </span>
                      </>
                    )}
                    {!isPlus2 && !isPlus1 && (
                      <span className="text-xl sm:text-2xl font-bold">
                        {finalScore}
                      </span>
                    )}
                  </div>
                  <Badge
                    variant={modifier >= 0 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {formatModifier(modifier)}
                  </Badge>
                </div>

                <div className="text-xs sm:text-sm text-muted-foreground text-center mb-2">
                  Спасбросок: {formatModifier(modifier)}
                  {character.class?.savingThrows.includes(ability) &&
                    ` +${character.level >= 1 ? Math.ceil(character.level / 4) + 1 : 2}`}
                </div>

                <div className="flex gap-1.5 sm:gap-2">
                  {strategy === "2-1" && (
                    <Button
                      variant={isPlus2 ? "default" : "outline"}
                      size="sm"
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                      onClick={() => handleSelectPlus2(ability)}
                      disabled={isPlus1}
                    >
                      +2
                    </Button>
                  )}
                  <Button
                    variant={isPlus1 ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                    onClick={() => handleSelectPlus1(ability)}
                    disabled={strategy === "2-1" && isPlus2}
                  >
                    +1
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Итоговая таблица характеристик */}
      {(plus2Ability || plus1Abilities.length > 0) && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Итоговые характеристики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {ABILITIES.map((ability) => {
                const finalScore = getFinalScore(ability);
                const modifier = calculateModifier(finalScore);
                const hasBonus =
                  plus2Ability === ability || plus1Abilities.includes(ability);

                return (
                  <div
                    key={ability}
                    className={`text-center p-2 rounded-lg ${
                      hasBonus ? "bg-primary/10" : "bg-card"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {t(`abilities.${ability.substring(0, 3)}`)}
                    </p>
                    <p
                      className={`text-xl font-bold ${hasBonus ? "text-primary" : ""}`}
                    >
                      {finalScore}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatModifier(modifier)}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
