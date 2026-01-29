import { useState } from "react";
import { Info } from "lucide-react";
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
import { getAbilityNameRu, getAbilityAbbr } from "@/data/translations/ru";

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

function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function AbilitiesStep() {
  const { character, setAbilityScore } = useCharacterStore();
  const [availableStandard, setAvailableStandard] = useState<number[]>([
    ...STANDARD_ARRAY,
  ]);

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

  return (
    <div className="space-y-6">
      {/* Инфо-блок PHB 2024 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Стандартный набор характеристик</p>
              <p className="text-sm text-muted-foreground">
                Распределите стандартные значения (15, 14, 13, 12, 10, 8) между
                характеристиками персонажа. После выбора предыстории вы
                распределите <strong>+2 и +1</strong> к любым характеристикам.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standard array available values */}
      <Card className="bg-muted/30">
        <CardContent className="py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="font-medium text-xs sm:text-sm">Доступные:</span>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {availableStandard.map((value, index) => (
                <Badge
                  key={`${value}-${index}`}
                  variant="secondary"
                  className="text-sm sm:text-lg px-2 sm:px-3"
                >
                  {value}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ability scores */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {ABILITIES.map((ability) => {
          const score = character.abilityScores[ability];
          const modifier = calculateModifier(score);

          return (
            <Card key={ability} className="relative overflow-hidden">
              <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm sm:text-lg truncate">
                      {getAbilityNameRu(ability)}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {getAbilityAbbr(ability)}
                    </CardDescription>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xl sm:text-2xl font-bold">{score}</div>
                    <Badge
                      variant={modifier >= 0 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {formatModifier(modifier)}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  {ABILITY_HINTS[ability]}
                </p>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
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
                          className="w-8 h-7 sm:w-10 sm:h-8 text-xs sm:text-sm"
                          disabled={!isAvailable}
                          onClick={() => handleStandardAssign(ability, value)}
                        >
                          {value}
                        </Button>
                      );
                    })}
                </div>
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
