import type { AbilityScores, ClassOption, EquipmentOption } from "../types";
import { abilityModifier } from "./calculations";

interface EquippedItem {
  id: string;
  quantity: number;
}

export function resolveInventoryItems(
  selectedEquipment: EquippedItem[],
  equipmentCatalog: EquipmentOption[]
) {
  return selectedEquipment
    .map((entry) => {
      const found = equipmentCatalog.find(
        (item) => item.id === entry.id || item.externalId === entry.id
      );
      if (!found) return null;
      return { ...found, quantity: entry.quantity };
    })
    .filter((item): item is EquipmentOption & { quantity: number } => Boolean(item));
}

export function calculateArmorClass(
  scores: AbilityScores,
  inventory: Array<EquipmentOption & { quantity: number }>
): { total: number; formula: string } {
  const dexMod = abilityModifier(scores.dexterity);
  const armors = inventory.filter((item) => typeof item.armorClass === "number");
  const shields = armors.filter((item) => item.armorType === "shield");
  const bodyArmors = armors.filter((item) => item.armorType !== "shield");

  let base = 10 + dexMod;
  let formula = `10 + DEX (${dexMod >= 0 ? "+" : ""}${dexMod})`;

  if (bodyArmors.length > 0) {
    const best = [...bodyArmors].sort((a, b) => (b.armorClass ?? 0) - (a.armorClass ?? 0))[0];
    const armorType = (best.armorType || "").toLowerCase();
    const armorBase = best.armorClass ?? 10;

    if (armorType === "heavy") {
      base = armorBase;
      formula = `${best.nameRu}: ${armorBase}`;
    } else if (armorType === "medium") {
      const dex = Math.min(dexMod, best.maxDexBonus ?? 2);
      base = armorBase + dex;
      formula = `${best.nameRu}: ${armorBase} + DEX (max ${best.maxDexBonus ?? 2})`;
    } else {
      base = armorBase + dexMod;
      formula = `${best.nameRu}: ${armorBase} + DEX`;
    }
  }

  const shieldBonus = shields.reduce(
    (acc, shield) => acc + ((shield.armorClass ?? 2) > 0 ? shield.armorClass ?? 2 : 2),
    0
  );

  if (shieldBonus > 0) {
    base += shieldBonus;
    formula += ` + Shield (${shieldBonus})`;
  }

  return { total: base, formula };
}

function isFinesseWeapon(item: EquipmentOption): boolean {
  return (item.properties ?? []).some((prop) => prop.toLowerCase().includes("finesse"));
}

function isRangedWeapon(item: EquipmentOption): boolean {
  const name = item.name.toLowerCase();
  const nameRu = item.nameRu.toLowerCase();
  return (
    name.includes("bow") ||
    name.includes("crossbow") ||
    nameRu.includes("лук") ||
    nameRu.includes("арбалет") ||
    (item.properties ?? []).some((prop) => prop.toLowerCase().includes("thrown"))
  );
}

export function buildWeaponActions(input: {
  inventory: Array<EquipmentOption & { quantity: number }>;
  scores: AbilityScores;
  proficiencyBonus: number;
}) {
  return input.inventory
    .filter((item) => item.category.toLowerCase().includes("weapon") && item.damage)
    .map((item) => {
      const useDex = isRangedWeapon(item) || isFinesseWeapon(item);
      const ability = useDex ? "dexterity" : "strength";
      const mod = abilityModifier(input.scores[ability]);
      const attackBonus = input.proficiencyBonus + mod;
      const damage = `${item.damage?.dice ?? "1d4"} ${mod >= 0 ? "+" : ""}${mod}`;

      return {
        id: item.id,
        name: item.nameRu,
        quantity: item.quantity,
        attackBonus,
        damage,
        damageType: item.damage?.type ?? "",
        ability,
      };
    });
}

export function buildSavingThrows(
  scores: AbilityScores,
  characterClass: ClassOption | null,
  proficiencyBonus: number
) {
  const profSet = new Set((characterClass?.savingThrows ?? []).map((item) => item.toLowerCase()));

  return [
    ["strength", "Сила"],
    ["dexterity", "Ловкость"],
    ["constitution", "Телосложение"],
    ["intelligence", "Интеллект"],
    ["wisdom", "Мудрость"],
    ["charisma", "Харизма"],
  ].map(([ability, label]) => {
    const key = ability as keyof AbilityScores;
    const base = abilityModifier(scores[key]);
    const proficient = profSet.has(ability) || profSet.has(label.toLowerCase());
    return {
      id: ability,
      label,
      value: base + (proficient ? proficiencyBonus : 0),
      proficient,
    };
  });
}
