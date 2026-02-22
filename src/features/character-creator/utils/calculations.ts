import type { AbilityKey, AbilityScores, ClassOption } from "../types";

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function applyIncreases(
  base: AbilityScores,
  increases: Partial<AbilityScores>
): AbilityScores {
  return {
    strength: base.strength + (increases.strength ?? 0),
    dexterity: base.dexterity + (increases.dexterity ?? 0),
    constitution: base.constitution + (increases.constitution ?? 0),
    intelligence: base.intelligence + (increases.intelligence ?? 0),
    wisdom: base.wisdom + (increases.wisdom ?? 0),
    charisma: base.charisma + (increases.charisma ?? 0),
  };
}

export function proficiencyBonus(level: number): number {
  return 2 + Math.floor((Math.max(1, level) - 1) / 4);
}

export function initiativeModifier(scores: AbilityScores): number {
  return abilityModifier(scores.dexterity);
}

export function passivePerception(
  scores: AbilityScores,
  isPerceptionProficient: boolean,
  proficiency: number
): number {
  return (
    10 +
    abilityModifier(scores.wisdom) +
    (isPerceptionProficient ? proficiency : 0)
  );
}

export function estimatedHitPoints(
  level: number,
  hitDie: number,
  constitutionScore: number
): number {
  const safeLevel = Math.max(1, level);
  const conMod = abilityModifier(constitutionScore);
  const levelOne = Math.max(1, hitDie + conMod);
  if (safeLevel === 1) return levelOne;

  const averagePerLevel = Math.floor(hitDie / 2) + 1 + conMod;
  return levelOne + (safeLevel - 1) * Math.max(1, averagePerLevel);
}

export function spellcastingAbilityModifier(
  characterClass: ClassOption | null,
  scores: AbilityScores
): { ability: AbilityKey | null; modifier: number } {
  const raw = characterClass?.spellcasting?.ability?.toLowerCase();
  const map: Record<string, AbilityKey> = {
    strength: "strength",
    dexterity: "dexterity",
    constitution: "constitution",
    intelligence: "intelligence",
    wisdom: "wisdom",
    charisma: "charisma",
  };

  const ability = raw ? map[raw] ?? null : null;
  if (!ability) return { ability: null, modifier: 0 };
  return { ability, modifier: abilityModifier(scores[ability]) };
}
