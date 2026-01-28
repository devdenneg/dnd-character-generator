import { useState } from "react";
import { Dices, Minus, Plus, Info } from "lucide-react";
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
import type { AbilityName, AbilityScores } from "@/types/character";
import { t, getAbilityNameRu, getAbilityAbbr } from "@/data/translations/ru";

const ABILITIES: AbilityName[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

// PHB 2024 официальный стандартный набор
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Описания влияния характеристик (PHB 2024)
const ABILITY_HINTS: Record<AbilityName, string> = {
  strength: "Рукопашные атаки, урон, Атлетика, переноска груза",
  dexterity: "КД, инициатива, дальнобойные атаки, Акробатика, Скрытность",
  constitution: "Хиты, концентрация на заклинаниях, стойкость",
  intelligence: "Магия Волшебника, История, Расследование, Магия",
  wisdom: "Магия Жреца/Друида, Восприятие, Проницательность, Медицина",
  charisma: "Магия Барда/Чародея/Колдуна, Убеждение, Обман, Запугивание",
};

// Point buy costs
const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const POINT_BUY_TOTAL = 27;

function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function AbilitiesStep() {
  const {
    character,
    setAbilityScores,
    setAbilityScore,
    setAbilityScoreMethod,
  } = useCharacterStore();
  const [availableStandard, setAvailableStandard] = useState<number[]>([
    ...STANDARD_ARRAY,
  ]);

  const method = character.abilityScoreMethod;

  // Calculate remaining points for point buy
  const usedPoints = ABILITIES.reduce((sum, ability) => {
    return sum + (POINT_BUY_COSTS[character.abilityScores[ability]] || 0);
  }, 0);
  const remainingPoints = POINT_BUY_TOTAL - usedPoints;

  const handleMethodChange = (newMethod: "standard" | "pointbuy" | "roll") => {
    setAbilityScoreMethod(newMethod);

    // Reset scores when changing method
    if (newMethod === "pointbuy") {
      setAbilityScores({
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8,
      });
    } else if (newMethod === "standard") {
      setAbilityScores({
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      });
      setAvailableStandard([...STANDARD_ARRAY]);
    } else if (newMethod === "roll") {
      // Roll 4d6 drop lowest for each ability
      const rolled: AbilityScores = {} as AbilityScores;
      ABILITIES.forEach((ability) => {
        const rolls = Array.from(
          { length: 4 },
          () => Math.floor(Math.random() * 6) + 1,
        );
        rolls.sort((a, b) => b - a);
        rolled[ability] = rolls[0] + rolls[1] + rolls[2];
      });
      setAbilityScores(rolled);
    }
  };

  const handleStandardAssign = (ability: AbilityName, value: number) => {
    const currentValue = character.abilityScores[ability];

    // Return current value to available pool
    if (currentValue !== 10 && STANDARD_ARRAY.includes(currentValue)) {
      setAvailableStandard((prev) =>
        [...prev, currentValue].sort((a, b) => b - a),
      );
    }

    // Remove new value from available pool
    setAvailableStandard((prev) => {
      const index = prev.indexOf(value);
      if (index > -1) {
        const newAvailable = [...prev];
        newAvailable.splice(index, 1);
        return newAvailable;
      }
      return prev;
    });

    setAbilityScore(ability, value);
  };

  const handlePointBuyChange = (ability: AbilityName, delta: number) => {
    const currentScore = character.abilityScores[ability];
    const newScore = currentScore + delta;

    if (newScore < 8 || newScore > 15) return;

    const currentCost = POINT_BUY_COSTS[currentScore];
    const newCost = POINT_BUY_COSTS[newScore];
    const costDelta = newCost - currentCost;

    if (remainingPoints - costDelta < 0) return;

    setAbilityScore(ability, newScore);
  };

  const rollAbilities = () => {
    const rolled: AbilityScores = {} as AbilityScores;
    ABILITIES.forEach((ability) => {
      const rolls = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 6) + 1,
      );
      rolls.sort((a, b) => b - a);
      rolled[ability] = rolls[0] + rolls[1] + rolls[2];
    });
    setAbilityScores(rolled);
  };

  return (
    <div className="space-y-6">
      {/* Инфо-блок PHB 2024 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Характеристики в PHB 2024</p>
              <p className="text-sm text-muted-foreground">
                Характеристики определяют базовые способности персонажа.
                Выберите один из трёх официальных методов генерации. После
                выбора предыстории вы распределите <strong>+2 и +1</strong> к
                любым характеристикам.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["standard", "pointbuy", "roll"] as const).map((m) => (
          <Card
            key={m}
            className={`cursor-pointer transition-all hover:border-primary/50 ${
              method === m ? "border-primary ring-2 ring-primary/20" : ""
            }`}
            onClick={() => handleMethodChange(m)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                {t(`abilityMethods.${m}.name`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {t(`abilityMethods.${m}.description`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Point buy remaining points */}
      {method === "pointbuy" && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {t("abilities.pointsRemaining")}:
              </span>
              <Badge
                variant={remainingPoints > 0 ? "secondary" : "default"}
                className="text-lg px-4"
              >
                {remainingPoints}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roll button */}
      {method === "roll" && (
        <Button onClick={rollAbilities} className="w-full gap-2">
          <Dices className="w-4 h-4" />
          Бросить характеристики (4d6, отбросить наименьший)
        </Button>
      )}

      {/* Standard array available values */}
      {method === "standard" && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-medium text-sm">Доступные значения:</span>
              <div className="flex gap-2">
                {availableStandard.map((value, index) => (
                  <Badge
                    key={`${value}-${index}`}
                    variant="secondary"
                    className="text-lg px-3"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ability scores */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITIES.map((ability) => {
          const score = character.abilityScores[ability];
          const modifier = calculateModifier(score);

          return (
            <Card key={ability} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {getAbilityNameRu(ability)}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {getAbilityAbbr(ability)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{score}</div>
                    <Badge variant={modifier >= 0 ? "default" : "secondary"}>
                      {formatModifier(modifier)}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {ABILITY_HINTS[ability]}
                </p>
              </CardHeader>
              <CardContent>
                {method === "pointbuy" && (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePointBuyChange(ability, -1)}
                      disabled={score <= 8}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-mono text-lg">
                      {score}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePointBuyChange(ability, 1)}
                      disabled={
                        score >= 15 ||
                        remainingPoints <
                          POINT_BUY_COSTS[score + 1] - POINT_BUY_COSTS[score]
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {method === "standard" && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {[...STANDARD_ARRAY]
                      .sort((a, b) => b - a)
                      .map((value) => {
                        const isAssigned =
                          character.abilityScores[ability] === value;
                        const isAvailable =
                          availableStandard.includes(value) || isAssigned;

                        return (
                          <Button
                            key={value}
                            variant={isAssigned ? "default" : "outline"}
                            size="sm"
                            className="w-10 h-8"
                            disabled={!isAvailable}
                            onClick={() => handleStandardAssign(ability, value)}
                          >
                            {value}
                          </Button>
                        );
                      })}
                  </div>
                )}

                {method === "roll" && (
                  <div className="text-center text-sm text-muted-foreground">
                    Нажмите кнопку выше для переброса
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Сумма характеристик</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Общая сумма:</span>
            <span className="text-2xl font-bold">
              {ABILITIES.reduce(
                (sum, ability) => sum + character.abilityScores[ability],
                0,
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
