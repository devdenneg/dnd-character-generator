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

  // Локальное состояние для выбора бонусов
  const [plus2Ability, setPlus2Ability] = useState<AbilityName | null>(
    character.abilityScoreIncreases
      ? (Object.entries(character.abilityScoreIncreases).find(
          ([_, v]) => v === 2,
        )?.[0] as AbilityName | undefined) || null
      : null,
  );
  const [plus1Ability, setPlus1Ability] = useState<AbilityName | null>(
    character.abilityScoreIncreases
      ? (Object.entries(character.abilityScoreIncreases).find(
          ([_, v]) => v === 1,
        )?.[0] as AbilityName | undefined) || null
      : null,
  );

  // Рекомендуемые характеристики от предыстории
  const recommendedAbilities =
    character.background?.abilityScoreIncrease.options || [];

  // Обновляем store при изменении выбора
  useEffect(() => {
    const increases: Partial<Record<AbilityName, number>> = {};
    if (plus2Ability) increases[plus2Ability] = 2;
    if (plus1Ability) increases[plus1Ability] = 1;
    setAbilityScoreIncreases(increases);
  }, [plus2Ability, plus1Ability, setAbilityScoreIncreases]);

  const handleSelectPlus2 = (ability: AbilityName) => {
    if (plus2Ability === ability) {
      setPlus2Ability(null);
    } else {
      // Если эта характеристика уже выбрана для +1, снимаем выбор
      if (plus1Ability === ability) {
        setPlus1Ability(null);
      }
      setPlus2Ability(ability);
    }
  };

  const handleSelectPlus1 = (ability: AbilityName) => {
    if (plus1Ability === ability) {
      setPlus1Ability(null);
    } else {
      // Если эта характеристика уже выбрана для +2, снимаем выбор
      if (plus2Ability === ability) {
        setPlus2Ability(null);
      }
      setPlus1Ability(ability);
    }
  };

  // Рассчитываем итоговые значения
  const getFinalScore = (ability: AbilityName): number => {
    let score = character.abilityScores[ability];
    if (plus2Ability === ability) score += 2;
    if (plus1Ability === ability) score += 1;
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
            В Книге игрока 2024 года вы можете распределить <strong>+2</strong>{" "}
            и <strong>+1</strong> между любыми двумя разными характеристиками
            вместо фиксированных расовых бонусов.
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

      {/* Статус выбора */}
      <div className="flex gap-4 flex-wrap">
        <Card
          className={`flex-1 min-w-[200px] ${plus2Ability ? "border-primary" : "border-dashed"}`}
        >
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Бонус +2</p>
                <p className="text-lg font-bold">
                  {plus2Ability ? getAbilityNameRu(plus2Ability) : "Не выбрано"}
                </p>
              </div>
              {plus2Ability && <Check className="w-5 h-5 text-primary" />}
            </div>
          </CardContent>
        </Card>
        <Card
          className={`flex-1 min-w-[200px] ${plus1Ability ? "border-primary" : "border-dashed"}`}
        >
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Бонус +1</p>
                <p className="text-lg font-bold">
                  {plus1Ability ? getAbilityNameRu(plus1Ability) : "Не выбрано"}
                </p>
              </div>
              {plus1Ability && <Check className="w-5 h-5 text-primary" />}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Выбор характеристик */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITIES.map((ability) => {
          const baseScore = character.abilityScores[ability];
          const finalScore = getFinalScore(ability);
          const modifier = calculateModifier(finalScore);
          const isPlus2 = plus2Ability === ability;
          const isPlus1 = plus1Ability === ability;
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
                  Рекоменд.
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {getAbilityNameRu(ability)}
                </CardTitle>
                <CardDescription className="text-xs uppercase">
                  {t(`abilities.${ability.substring(0, 3)}`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-muted-foreground">
                      {baseScore}
                    </span>
                    {(isPlus2 || isPlus1) && (
                      <>
                        <span className="text-primary">→</span>
                        <span className="text-2xl font-bold text-primary">
                          {finalScore}
                        </span>
                      </>
                    )}
                    {!isPlus2 && !isPlus1 && (
                      <span className="text-2xl font-bold">{finalScore}</span>
                    )}
                  </div>
                  <Badge
                    variant={modifier >= 0 ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {formatModifier(modifier)}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isPlus2 ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSelectPlus2(ability)}
                    disabled={isPlus1}
                  >
                    +2
                  </Button>
                  <Button
                    variant={isPlus1 ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSelectPlus1(ability)}
                    disabled={isPlus2}
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
      {(plus2Ability || plus1Ability) && (
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
                  plus2Ability === ability || plus1Ability === ability;

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
