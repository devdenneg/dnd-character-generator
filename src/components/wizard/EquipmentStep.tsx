import { useState } from "react";
import { Package, Check, Info, Swords } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import type { Equipment } from "@/types/character";
import { t } from "@/data/translations/ru";

// Starter equipment packs
const EQUIPMENT_PACKS: Record<string, Equipment[]> = {
  explorer: [
    {
      id: "backpack",
      name: "Backpack",
      nameRu: "Рюкзак",
      category: "gear",
      cost: { quantity: 2, unit: "gp" },
      weight: 5,
    },
    {
      id: "bedroll",
      name: "Bedroll",
      nameRu: "Спальник",
      category: "gear",
      cost: { quantity: 1, unit: "gp" },
      weight: 7,
    },
    {
      id: "mess-kit",
      name: "Mess Kit",
      nameRu: "Столовый набор",
      category: "gear",
      cost: { quantity: 2, unit: "sp" },
      weight: 1,
    },
    {
      id: "tinderbox",
      name: "Tinderbox",
      nameRu: "Трутница",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 1,
    },
    {
      id: "torch-10",
      name: "Torches (10)",
      nameRu: "Факелы (10)",
      category: "gear",
      cost: { quantity: 1, unit: "cp" },
      weight: 10,
    },
    {
      id: "rations-10",
      name: "Rations (10 days)",
      nameRu: "Рационы (10 дней)",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 20,
    },
    {
      id: "waterskin",
      name: "Waterskin",
      nameRu: "Бурдюк",
      category: "gear",
      cost: { quantity: 2, unit: "sp" },
      weight: 5,
    },
    {
      id: "rope-50",
      name: "Rope, Hempen (50 ft)",
      nameRu: "Верёвка пеньковая (50 фт)",
      category: "gear",
      cost: { quantity: 1, unit: "gp" },
      weight: 10,
    },
  ],
  dungeoneer: [
    {
      id: "backpack",
      name: "Backpack",
      nameRu: "Рюкзак",
      category: "gear",
      cost: { quantity: 2, unit: "gp" },
      weight: 5,
    },
    {
      id: "crowbar",
      name: "Crowbar",
      nameRu: "Лом",
      category: "gear",
      cost: { quantity: 2, unit: "gp" },
      weight: 5,
    },
    {
      id: "hammer",
      name: "Hammer",
      nameRu: "Молоток",
      category: "gear",
      cost: { quantity: 1, unit: "gp" },
      weight: 3,
    },
    {
      id: "piton-10",
      name: "Pitons (10)",
      nameRu: "Скальные крюки (10)",
      category: "gear",
      cost: { quantity: 5, unit: "cp" },
      weight: 2.5,
    },
    {
      id: "torch-10",
      name: "Torches (10)",
      nameRu: "Факелы (10)",
      category: "gear",
      cost: { quantity: 1, unit: "cp" },
      weight: 10,
    },
    {
      id: "tinderbox",
      name: "Tinderbox",
      nameRu: "Трутница",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 1,
    },
    {
      id: "rations-10",
      name: "Rations (10 days)",
      nameRu: "Рационы (10 дней)",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 20,
    },
    {
      id: "waterskin",
      name: "Waterskin",
      nameRu: "Бурдюк",
      category: "gear",
      cost: { quantity: 2, unit: "sp" },
      weight: 5,
    },
    {
      id: "rope-50",
      name: "Rope, Hempen (50 ft)",
      nameRu: "Верёвка пеньковая (50 фт)",
      category: "gear",
      cost: { quantity: 1, unit: "gp" },
      weight: 10,
    },
  ],
  priest: [
    {
      id: "backpack",
      name: "Backpack",
      nameRu: "Рюкзак",
      category: "gear",
      cost: { quantity: 2, unit: "gp" },
      weight: 5,
    },
    {
      id: "blanket",
      name: "Blanket",
      nameRu: "Одеяло",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 3,
    },
    {
      id: "candle-10",
      name: "Candles (10)",
      nameRu: "Свечи (10)",
      category: "gear",
      cost: { quantity: 1, unit: "cp" },
      weight: 0,
    },
    {
      id: "tinderbox",
      name: "Tinderbox",
      nameRu: "Трутница",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 1,
    },
    {
      id: "alms-box",
      name: "Alms Box",
      nameRu: "Ящик для подаяний",
      category: "gear",
      cost: { quantity: 0, unit: "gp" },
      weight: 0,
    },
    {
      id: "incense-2",
      name: "Incense (2 blocks)",
      nameRu: "Благовония (2 блока)",
      category: "gear",
      cost: { quantity: 0, unit: "gp" },
      weight: 0,
    },
    {
      id: "censer",
      name: "Censer",
      nameRu: "Кадило",
      category: "gear",
      cost: { quantity: 0, unit: "gp" },
      weight: 0,
    },
    {
      id: "vestments",
      name: "Vestments",
      nameRu: "Облачение",
      category: "gear",
      cost: { quantity: 0, unit: "gp" },
      weight: 0,
    },
    {
      id: "rations-2",
      name: "Rations (2 days)",
      nameRu: "Рационы (2 дня)",
      category: "gear",
      cost: { quantity: 5, unit: "sp" },
      weight: 4,
    },
    {
      id: "waterskin",
      name: "Waterskin",
      nameRu: "Бурдюк",
      category: "gear",
      cost: { quantity: 2, unit: "sp" },
      weight: 5,
    },
  ],
};

// Интерфейс оружия с дополнительными свойствами
interface WeaponWithProps extends Equipment {
  isLight?: boolean;
  isTwoHanded?: boolean;
  isRanged?: boolean;
  canDualWield?: boolean;
}

// Common weapons с расширенными свойствами
const COMMON_WEAPONS: WeaponWithProps[] = [
  {
    id: "longsword",
    name: "Longsword",
    nameRu: "Длинный меч",
    category: "weapon",
    cost: { quantity: 15, unit: "gp" },
    weight: 3,
    damage: { dice: "1d8", type: "рубящий" },
    properties: ["Универсальное (1d10)"],
  },
  {
    id: "shortsword",
    name: "Shortsword",
    nameRu: "Короткий меч",
    category: "weapon",
    cost: { quantity: 10, unit: "gp" },
    weight: 2,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Лёгкое", "Фехтовальное"],
    isLight: true,
    canDualWield: true,
  },
  {
    id: "rapier",
    name: "Rapier",
    nameRu: "Рапира",
    category: "weapon",
    cost: { quantity: 25, unit: "gp" },
    weight: 2,
    damage: { dice: "1d8", type: "колющий" },
    properties: ["Фехтовальное"],
  },
  {
    id: "scimitar",
    name: "Scimitar",
    nameRu: "Скимитар",
    category: "weapon",
    cost: { quantity: 25, unit: "gp" },
    weight: 3,
    damage: { dice: "1d6", type: "рубящий" },
    properties: ["Лёгкое", "Фехтовальное"],
    isLight: true,
    canDualWield: true,
  },
  {
    id: "greataxe",
    name: "Greataxe",
    nameRu: "Секира",
    category: "weapon",
    cost: { quantity: 30, unit: "gp" },
    weight: 7,
    damage: { dice: "1d12", type: "рубящий" },
    properties: ["Тяжёлое", "Двуручное"],
    isTwoHanded: true,
  },
  {
    id: "greatsword",
    name: "Greatsword",
    nameRu: "Двуручный меч",
    category: "weapon",
    cost: { quantity: 50, unit: "gp" },
    weight: 6,
    damage: { dice: "2d6", type: "рубящий" },
    properties: ["Тяжёлое", "Двуручное"],
    isTwoHanded: true,
  },
  {
    id: "handaxe",
    name: "Handaxe",
    nameRu: "Ручной топор",
    category: "weapon",
    cost: { quantity: 5, unit: "gp" },
    weight: 2,
    damage: { dice: "1d6", type: "рубящий" },
    properties: ["Лёгкое", "Метательное (20/60)"],
    isLight: true,
    canDualWield: true,
  },
  {
    id: "javelin",
    name: "Javelin",
    nameRu: "Метательное копьё",
    category: "weapon",
    cost: { quantity: 5, unit: "sp" },
    weight: 2,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Метательное (30/120)"],
  },
  {
    id: "light-crossbow",
    name: "Light Crossbow",
    nameRu: "Лёгкий арбалет",
    category: "weapon",
    cost: { quantity: 25, unit: "gp" },
    weight: 5,
    damage: { dice: "1d8", type: "колющий" },
    properties: ["Боеприпас", "Перезарядка", "Двуручное", "Дистанция (80/320)"],
    isRanged: true,
    isTwoHanded: true,
  },
  {
    id: "longbow",
    name: "Longbow",
    nameRu: "Длинный лук",
    category: "weapon",
    cost: { quantity: 50, unit: "gp" },
    weight: 2,
    damage: { dice: "1d8", type: "колющий" },
    properties: ["Боеприпас", "Тяжёлое", "Двуручное", "Дистанция (150/600)"],
    isRanged: true,
    isTwoHanded: true,
  },
  {
    id: "shortbow",
    name: "Shortbow",
    nameRu: "Короткий лук",
    category: "weapon",
    cost: { quantity: 25, unit: "gp" },
    weight: 2,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Боеприпас", "Двуручное", "Дистанция (80/320)"],
    isRanged: true,
    isTwoHanded: true,
  },
  {
    id: "dagger",
    name: "Dagger",
    nameRu: "Кинжал",
    category: "weapon",
    cost: { quantity: 2, unit: "gp" },
    weight: 1,
    damage: { dice: "1d4", type: "колющий" },
    properties: ["Лёгкое", "Фехтовальное", "Метательное (20/60)"],
    isLight: true,
    canDualWield: true,
  },
  {
    id: "quarterstaff",
    name: "Quarterstaff",
    nameRu: "Боевой посох",
    category: "weapon",
    cost: { quantity: 2, unit: "sp" },
    weight: 4,
    damage: { dice: "1d6", type: "дробящий" },
    properties: ["Универсальное (1d8)"],
  },
  {
    id: "mace",
    name: "Mace",
    nameRu: "Булава",
    category: "weapon",
    cost: { quantity: 5, unit: "gp" },
    weight: 4,
    damage: { dice: "1d6", type: "дробящий" },
  },
  {
    id: "club",
    name: "Club",
    nameRu: "Дубинка",
    category: "weapon",
    cost: { quantity: 1, unit: "sp" },
    weight: 2,
    damage: { dice: "1d4", type: "дробящий" },
    properties: ["Лёгкое"],
    isLight: true,
    canDualWield: true,
  },
  {
    id: "sickle",
    name: "Sickle",
    nameRu: "Серп",
    category: "weapon",
    cost: { quantity: 1, unit: "gp" },
    weight: 2,
    damage: { dice: "1d4", type: "рубящий" },
    properties: ["Лёгкое"],
    isLight: true,
    canDualWield: true,
  },
  // Дополнительное простое оружие для магов
  {
    id: "dart",
    name: "Dart",
    nameRu: "Дротик",
    category: "weapon",
    cost: { quantity: 5, unit: "cp" },
    weight: 0.25,
    damage: { dice: "1d4", type: "колющий" },
    properties: ["Метательное (20/60)", "Фехтовальное"],
    isRanged: true,
    isLight: true,
  },
  {
    id: "sling",
    name: "Sling",
    nameRu: "Праща",
    category: "weapon",
    cost: { quantity: 1, unit: "sp" },
    weight: 0,
    damage: { dice: "1d4", type: "дробящий" },
    properties: ["Боеприпас", "Дистанция (30/120)"],
    isRanged: true,
  },
  {
    id: "spear",
    name: "Spear",
    nameRu: "Копьё",
    category: "weapon",
    cost: { quantity: 1, unit: "gp" },
    weight: 3,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Метательное (20/60)", "Универсальное (1d8)"],
  },
  {
    id: "light-hammer",
    name: "Light Hammer",
    nameRu: "Лёгкий молот",
    category: "weapon",
    cost: { quantity: 2, unit: "gp" },
    weight: 2,
    damage: { dice: "1d4", type: "дробящий" },
    properties: ["Лёгкое", "Метательное (20/60)"],
    isLight: true,
    canDualWield: true,
  },
  // Воинское оружие (дополнительное)
  {
    id: "battleaxe",
    name: "Battleaxe",
    nameRu: "Боевой топор",
    category: "weapon",
    cost: { quantity: 10, unit: "gp" },
    weight: 4,
    damage: { dice: "1d8", type: "рубящий" },
    properties: ["Универсальное (1d10)"],
  },
  {
    id: "warhammer",
    name: "Warhammer",
    nameRu: "Боевой молот",
    category: "weapon",
    cost: { quantity: 15, unit: "gp" },
    weight: 2,
    damage: { dice: "1d8", type: "дробящий" },
    properties: ["Универсальное (1d10)"],
  },
  {
    id: "morningstar",
    name: "Morningstar",
    nameRu: "Моргенштерн",
    category: "weapon",
    cost: { quantity: 15, unit: "gp" },
    weight: 4,
    damage: { dice: "1d8", type: "колющий" },
  },
  {
    id: "flail",
    name: "Flail",
    nameRu: "Цеп",
    category: "weapon",
    cost: { quantity: 10, unit: "gp" },
    weight: 2,
    damage: { dice: "1d8", type: "дробящий" },
  },
  {
    id: "glaive",
    name: "Glaive",
    nameRu: "Глефа",
    category: "weapon",
    cost: { quantity: 20, unit: "gp" },
    weight: 6,
    damage: { dice: "1d10", type: "рубящий" },
    properties: ["Тяжёлое", "Двуручное", "Досягаемость"],
    isTwoHanded: true,
  },
  {
    id: "halberd",
    name: "Halberd",
    nameRu: "Алебарда",
    category: "weapon",
    cost: { quantity: 20, unit: "gp" },
    weight: 6,
    damage: { dice: "1d10", type: "рубящий" },
    properties: ["Тяжёлое", "Двуручное", "Досягаемость"],
    isTwoHanded: true,
  },
  {
    id: "hand-crossbow",
    name: "Hand Crossbow",
    nameRu: "Ручной арбалет",
    category: "weapon",
    cost: { quantity: 75, unit: "gp" },
    weight: 3,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Боеприпас", "Лёгкое", "Перезарядка", "Дистанция (30/120)"],
    isRanged: true,
    isLight: true,
  },
  // Дополнительное простое оружие PHB 2024
  {
    id: "greatclub",
    name: "Greatclub",
    nameRu: "Большая дубина",
    category: "weapon",
    cost: { quantity: 2, unit: "sp" },
    weight: 10,
    damage: { dice: "1d8", type: "дробящий" },
    properties: ["Двуручное"],
    isTwoHanded: true,
  },
  // Дополнительное воинское оружие PHB 2024
  {
    id: "maul",
    name: "Maul",
    nameRu: "Молот",
    category: "weapon",
    cost: { quantity: 10, unit: "gp" },
    weight: 10,
    damage: { dice: "2d6", type: "дробящий" },
    properties: ["Тяжёлое", "Двуручное"],
    isTwoHanded: true,
  },
  {
    id: "pike",
    name: "Pike",
    nameRu: "Пика",
    category: "weapon",
    cost: { quantity: 5, unit: "gp" },
    weight: 18,
    damage: { dice: "1d10", type: "колющий" },
    properties: ["Тяжёлое", "Досягаемость", "Двуручное"],
    isTwoHanded: true,
  },
  {
    id: "lance",
    name: "Lance",
    nameRu: "Рыцарское копьё",
    category: "weapon",
    cost: { quantity: 10, unit: "gp" },
    weight: 6,
    damage: { dice: "1d12", type: "колющий" },
    properties: ["Досягаемость", "Особое"],
  },
  {
    id: "trident",
    name: "Trident",
    nameRu: "Трезубец",
    category: "weapon",
    cost: { quantity: 5, unit: "gp" },
    weight: 4,
    damage: { dice: "1d6", type: "колющий" },
    properties: ["Метательное (20/60)", "Универсальное (1d8)"],
  },
  {
    id: "war-pick",
    name: "War Pick",
    nameRu: "Боевая кирка",
    category: "weapon",
    cost: { quantity: 5, unit: "gp" },
    weight: 2,
    damage: { dice: "1d8", type: "колющий" },
  },
  {
    id: "whip",
    name: "Whip",
    nameRu: "Кнут",
    category: "weapon",
    cost: { quantity: 2, unit: "gp" },
    weight: 3,
    damage: { dice: "1d4", type: "рубящий" },
    properties: ["Фехтовальное", "Досягаемость"],
  },
  {
    id: "heavy-crossbow",
    name: "Heavy Crossbow",
    nameRu: "Тяжёлый арбалет",
    category: "weapon",
    cost: { quantity: 50, unit: "gp" },
    weight: 18,
    damage: { dice: "1d10", type: "колющий" },
    properties: ["Боеприпас", "Тяжёлое", "Перезарядка", "Двуручное", "Дистанция (100/400)"],
    isRanged: true,
    isTwoHanded: true,
  },
  {
    id: "net",
    name: "Net",
    nameRu: "Сеть",
    category: "weapon",
    cost: { quantity: 1, unit: "gp" },
    weight: 3,
    damage: { dice: "—", type: "особый" },
    properties: ["Особое", "Метательное (5/15)"],
    isRanged: true,
  },
];

// Common armor
interface ArmorWithType extends Equipment {
  armorType: "light" | "medium" | "heavy" | "shield";
  isMetal?: boolean;
  stealthDisadvantage?: boolean;
  strRequired?: number;
}

const COMMON_ARMOR: ArmorWithType[] = [
  {
    id: "leather",
    name: "Leather Armor",
    nameRu: "Кожаный доспех",
    category: "armor",
    cost: { quantity: 10, unit: "gp" },
    weight: 10,
    armorClass: 11,
    armorType: "light",
    isMetal: false,
  },
  {
    id: "studded-leather",
    name: "Studded Leather",
    nameRu: "Проклёпанный кожаный",
    category: "armor",
    cost: { quantity: 45, unit: "gp" },
    weight: 13,
    armorClass: 12,
    armorType: "light",
    isMetal: true,
  },
  {
    id: "hide",
    name: "Hide Armor",
    nameRu: "Шкурный доспех",
    category: "armor",
    cost: { quantity: 10, unit: "gp" },
    weight: 12,
    armorClass: 12,
    armorType: "medium",
    isMetal: false,
  },
  {
    id: "chain-shirt",
    name: "Chain Shirt",
    nameRu: "Кольчужная рубаха",
    category: "armor",
    cost: { quantity: 50, unit: "gp" },
    weight: 20,
    armorClass: 13,
    armorType: "medium",
    isMetal: true,
  },
  {
    id: "scale-mail",
    name: "Scale Mail",
    nameRu: "Чешуйчатый доспех",
    category: "armor",
    cost: { quantity: 50, unit: "gp" },
    weight: 45,
    armorClass: 14,
    armorType: "medium",
    isMetal: true,
    stealthDisadvantage: true,
  },
  {
    id: "breastplate",
    name: "Breastplate",
    nameRu: "Кираса",
    category: "armor",
    cost: { quantity: 400, unit: "gp" },
    weight: 20,
    armorClass: 14,
    armorType: "medium",
    isMetal: true,
  },
  {
    id: "half-plate",
    name: "Half Plate",
    nameRu: "Полулаты",
    category: "armor",
    cost: { quantity: 750, unit: "gp" },
    weight: 40,
    armorClass: 15,
    armorType: "medium",
    isMetal: true,
    stealthDisadvantage: true,
  },
  {
    id: "chain-mail",
    name: "Chain Mail",
    nameRu: "Кольчуга",
    category: "armor",
    cost: { quantity: 75, unit: "gp" },
    weight: 55,
    armorClass: 16,
    armorType: "heavy",
    isMetal: true,
    stealthDisadvantage: true,
    strRequired: 13,
  },
  {
    id: "splint",
    name: "Splint Armor",
    nameRu: "Наборный доспех",
    category: "armor",
    cost: { quantity: 200, unit: "gp" },
    weight: 60,
    armorClass: 17,
    armorType: "heavy",
    isMetal: true,
    stealthDisadvantage: true,
    strRequired: 15,
  },
  {
    id: "plate",
    name: "Plate Armor",
    nameRu: "Латный доспех",
    category: "armor",
    cost: { quantity: 1500, unit: "gp" },
    weight: 65,
    armorClass: 18,
    armorType: "heavy",
    isMetal: true,
    stealthDisadvantage: true,
    strRequired: 15,
  },
  {
    id: "shield",
    name: "Shield",
    nameRu: "Щит",
    category: "armor",
    cost: { quantity: 10, unit: "gp" },
    weight: 6,
    armorClass: 2,
    armorType: "shield",
    isMetal: false,
  },
];

function getAvailableArmor(
  armorProficiencies: string[],
  isDruid: boolean,
): ArmorWithType[] {
  if (armorProficiencies.length === 0) return [];

  return COMMON_ARMOR.filter((armor) => {
    if (isDruid && armor.isMetal) return false;

    const hasLight = armorProficiencies.some(
      (p) =>
        p.toLowerCase().includes("лёгкие") ||
        p.toLowerCase().includes("легкие"),
    );
    const hasMedium = armorProficiencies.some((p) =>
      p.toLowerCase().includes("средние"),
    );
    const hasHeavy = armorProficiencies.some(
      (p) =>
        p.toLowerCase().includes("тяжёлые") ||
        p.toLowerCase().includes("тяжелые"),
    );
    const hasShield = armorProficiencies.some((p) =>
      p.toLowerCase().includes("щит"),
    );

    switch (armor.armorType) {
      case "light":
        return hasLight;
      case "medium":
        return hasMedium;
      case "heavy":
        return hasHeavy;
      case "shield":
        return hasShield;
      default:
        return false;
    }
  });
}

function getAvailableWeapons(weaponProficiencies: string[]): WeaponWithProps[] {
  // Проверяем категории
  const hasSimple = weaponProficiencies.some((p) =>
    p.toLowerCase().includes("простое"),
  );
  const hasMartial = weaponProficiencies.some((p) =>
    p.toLowerCase().includes("воинское"),
  );

  // Списки оружия по категориям (PHB 2024)
  const simpleWeapons = [
    "dagger",
    "quarterstaff",
    "mace",
    "javelin",
    "handaxe",
    "light-crossbow",
    "shortbow",
    "club",
    "sickle",
    "dart",
    "sling",
    "spear",
    "light-hammer",
    "greatclub",
  ];

  const martialWeapons = [
    "longsword",
    "shortsword",
    "rapier",
    "scimitar",
    "greataxe",
    "greatsword",
    "longbow",
    "battleaxe",
    "warhammer",
    "morningstar",
    "flail",
    "glaive",
    "halberd",
    "hand-crossbow",
    "maul",
    "pike",
    "lance",
    "trident",
    "war-pick",
    "whip",
    "heavy-crossbow",
    "net",
  ];

  // Маппинг конкретных названий оружия к ID
  const specificWeaponMap: Record<string, string[]> = {
    кинжалы: ["dagger"],
    кинжал: ["dagger"],
    дротики: ["dart"],
    дротик: ["dart"],
    пращи: ["sling"],
    праща: ["sling"],
    "боевые посохи": ["quarterstaff"],
    "боевой посох": ["quarterstaff"],
    посохи: ["quarterstaff"],
    посох: ["quarterstaff"],
    "лёгкие арбалеты": ["light-crossbow"],
    "лёгкий арбалет": ["light-crossbow"],
    "ручной арбалет": ["hand-crossbow"],
    "длинный меч": ["longsword"],
    рапира: ["rapier"],
    "короткий меч": ["shortsword"],
    "короткие мечи": ["shortsword"],
    "длинные мечи": ["longsword"],
    рапиры: ["rapier"],
    скимитар: ["scimitar"],
    скимитары: ["scimitar"],
    булава: ["mace"],
    булавы: ["mace"],
    "боевой топор": ["battleaxe"],
    "боевые топоры": ["battleaxe"],
    "боевой молот": ["warhammer"],
    "боевые молоты": ["warhammer"],
    копьё: ["spear"],
    копья: ["spear"],
    "метательное копьё": ["javelin"],
    "метательные копья": ["javelin"],
    "длинный лук": ["longbow"],
    "короткий лук": ["shortbow"],
    секира: ["greataxe"],
    "двуручный меч": ["greatsword"],
    алебарда: ["halberd"],
    глефа: ["glaive"],
    цеп: ["flail"],
    моргенштерн: ["morningstar"],
  };

  // Собираем конкретные оружия из владений
  const specificWeapons: string[] = [];
  weaponProficiencies.forEach((prof) => {
    const lowerProf = prof.toLowerCase();
    // Ищем в маппинге
    for (const [key, weaponIds] of Object.entries(specificWeaponMap)) {
      if (lowerProf.includes(key)) {
        specificWeapons.push(...weaponIds);
      }
    }
  });

  return COMMON_WEAPONS.filter((weapon) => {
    // Проверяем по категориям
    if (simpleWeapons.includes(weapon.id) && hasSimple) return true;
    if (martialWeapons.includes(weapon.id) && hasMartial) return true;
    // Проверяем конкретные оружия
    if (specificWeapons.includes(weapon.id)) return true;
    return false;
  });
}

export function EquipmentStep() {
  const { character, setEquipment, addEquipment, removeEquipment } =
    useCharacterStore();

  const [selectedPack, setSelectedPack] = useState<string | null>(() => {
    for (const [key, items] of Object.entries(EQUIPMENT_PACKS)) {
      const allItemsPresent = items.every((packItem) =>
        character.equipment.some((e) => e.id === packItem.id),
      );
      if (allItemsPresent && items.length > 0) return key;
    }
    return null;
  });

  // Состояние для количества каждого оружия
  const [weaponCounts, setWeaponCounts] = useState<Record<string, number>>(
    () => {
      const counts: Record<string, number> = {};
      character.equipment.forEach((e) => {
        if (e.category === "weapon") {
          counts[e.id] = (counts[e.id] || 0) + 1;
        }
      });
      return counts;
    },
  );

  const armorProficiencies = character.class?.armorProficiencies || [];
  const weaponProficiencies = character.class?.weaponProficiencies || [];
  const isDruid = character.class?.id === "druid";

  const availableArmor = getAvailableArmor(armorProficiencies, isDruid);
  const availableWeapons = getAvailableWeapons(weaponProficiencies);

  // Подсчёт выбранного оружия
  const selectedWeapons = character.equipment.filter(
    (e) => e.category === "weapon",
  );

  // Логика лимита оружия:
  // - Если выбрано 2 лёгких оружия одного типа (парное оружие), можно взять ещё одно основное
  // - Иначе максимум 2 единицы оружия
  const hasDualWieldPair = Object.entries(weaponCounts).some(([id, count]) => {
    const weapon = COMMON_WEAPONS.find((w) => w.id === id);
    return weapon?.canDualWield && count >= 2;
  });

  const maxWeapons = hasDualWieldPair ? 3 : 2;
  const canAddWeapon = selectedWeapons.length < maxWeapons;

  const selectedArmor = character.equipment.filter(
    (e) => e.category === "armor" && e.id !== "shield",
  );
  const selectedShield = character.equipment.filter((e) => e.id === "shield");

  const canAddArmor = selectedArmor.length < 1;
  const canAddShield = selectedShield.length < 1;

  const handleSelectPack = (packKey: string) => {
    const pack = EQUIPMENT_PACKS[packKey];
    if (pack) {
      if (selectedPack === packKey) {
        const nonPackItems = character.equipment.filter(
          (item) => item.category !== "gear",
        );
        setEquipment(nonPackItems);
        setSelectedPack(null);
      } else {
        const nonPackItems = character.equipment.filter(
          (item) => item.category !== "gear",
        );
        setEquipment([...nonPackItems, ...pack]);
        setSelectedPack(packKey);
      }
    }
  };

  const handleWeaponClick = (weapon: WeaponWithProps) => {
    const currentCount = weaponCounts[weapon.id] || 0;
    const totalWeapons = selectedWeapons.length;

    if (currentCount === 0) {
      // Добавляем первую копию
      if (canAddWeapon) {
        addEquipment(weapon);
        setWeaponCounts({ ...weaponCounts, [weapon.id]: 1 });
      }
    } else if (weapon.canDualWield && currentCount === 1 && totalWeapons < 3) {
      // Добавляем вторую копию лёгкого оружия
      addEquipment({ ...weapon, id: `${weapon.id}-2` });
      setWeaponCounts({ ...weaponCounts, [weapon.id]: 2 });
    } else {
      // Убираем все копии этого оружия
      setEquipment(
        character.equipment.filter((e) => !e.id.startsWith(weapon.id)),
      );
      setWeaponCounts({ ...weaponCounts, [weapon.id]: 0 });
    }
  };

  const toggleArmor = (item: ArmorWithType) => {
    const exists = character.equipment.some((e) => e.id === item.id);
    if (exists) {
      removeEquipment(item.id);
    } else {
      if (item.armorType === "shield") {
        if (canAddShield) addEquipment(item);
      } else {
        const newEquipment = character.equipment.filter(
          (e) => e.category !== "armor" || e.id === "shield",
        );
        setEquipment([...newEquipment, item]);
      }
    }
  };

  const isArmorSelected = (itemId: string) =>
    character.equipment.some((e) => e.id === itemId);

  const totalWeight = character.equipment.reduce(
    (sum, item) => sum + item.weight,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Правила */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Правила снаряжения (PHB 2024)</p>
              <p className="text-sm text-muted-foreground">
                • <strong>1 набор снаряжения</strong> (на выбор)
                <br />• <strong>2 оружия</strong> или{" "}
                <strong>пара лёгкого + основное</strong> (до 3)
                <br />• <strong>1 доспех</strong> + щит (при владении)
                <br />• Снаряжение от предыстории добавляется автоматически
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Снаряжение от предыстории */}
      {character.background && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Package className="w-4 h-4" />
              Снаряжение от предыстории: {character.background.nameRu}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {character.background.equipment.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ✓ Добавляется автоматически
            </p>
          </CardContent>
        </Card>
      )}

      {/* Наборы */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Наборы снаряжения</h3>
          <Badge variant={selectedPack ? "default" : "outline"}>
            {selectedPack ? "Выбрано: 1/1" : "Выберите 1"}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(EQUIPMENT_PACKS).map(([key, items]) => {
            const packNames: Record<string, { en: string; ru: string }> = {
              explorer: { en: "Explorer's Pack", ru: "Набор путешественника" },
              dungeoneer: {
                en: "Dungeoneer's Pack",
                ru: "Набор исследователя подземелий",
              },
              priest: { en: "Priest's Pack", ru: "Набор священника" },
            };

            const isSelected = selectedPack === key;

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all hover:border-primary/50 ${isSelected ? "border-primary ring-2 ring-primary/20" : ""}`}
                onClick={() => handleSelectPack(key)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {packNames[key].ru}
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {packNames[key].en}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {items
                      .slice(0, 4)
                      .map((i) => i.nameRu)
                      .join(", ")}
                    {items.length > 4 && ` и ещё ${items.length - 4}`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Оружие */}
      {availableWeapons.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <Swords className="w-4 h-4" />
              Оружие
            </h3>
            <Badge variant={canAddWeapon ? "outline" : "default"}>
              Выбрано: {selectedWeapons.length}/{maxWeapons}
            </Badge>
          </div>

          {hasDualWieldPair && (
            <p className="text-sm text-green-600 mb-2">
              ✓ Выбрана пара лёгкого оружия — можно взять ещё одно основное!
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableWeapons.map((weapon) => {
              const count = weaponCounts[weapon.id] || 0;
              const isSelected = count > 0;
              const canAdd =
                canAddWeapon ||
                (weapon.canDualWield &&
                  count === 1 &&
                  selectedWeapons.length < 3);
              const disabled = !isSelected && !canAdd;

              return (
                <Button
                  key={weapon.id}
                  variant={isSelected ? "default" : "outline"}
                  disabled={disabled}
                  className={`h-auto py-3 px-3 flex flex-col items-start gap-1 relative ${disabled ? "opacity-50" : ""}`}
                  onClick={() => handleWeaponClick(weapon)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">{weapon.nameRu}</span>
                    {count > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        ×{count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs opacity-70">
                    {weapon.damage?.dice} {weapon.damage?.type}
                  </span>
                  {weapon.properties && weapon.properties.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {weapon.isLight && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-1 rounded">
                          Лёгкое
                        </span>
                      )}
                      {weapon.isTwoHanded && (
                        <span className="text-xs bg-amber-500/20 text-amber-400 px-1 rounded">
                          Двуручное
                        </span>
                      )}
                    </div>
                  )}
                  {weapon.canDualWield && count === 1 && (
                    <span className="text-xs text-blue-400">
                      Нажмите ещё раз для пары
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Доспехи */}
      {availableArmor.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Доспехи</h3>
            <div className="flex gap-2">
              <Badge variant={canAddArmor ? "outline" : "default"}>
                Доспех: {selectedArmor.length}/1
              </Badge>
              <Badge variant={canAddShield ? "outline" : "default"}>
                Щит: {selectedShield.length}/1
              </Badge>
            </div>
          </div>
          {(character.class?.id === "barbarian" ||
            character.class?.id === "monk") && (
            <p className="text-sm text-blue-600 mb-2">
              💡{" "}
              {character.class.id === "barbarian"
                ? "Варвар: Защита без доспехов (КД = 10 + ЛОВ + ТЕЛ)"
                : "Монах: Защита без доспехов (КД = 10 + ЛОВ + МДР)"}
            </p>
          )}
          {isDruid && (
            <p className="text-sm text-amber-600 mb-2">
              ⚠️ Друиды не носят металлические доспехи
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableArmor.map((armor) => {
              const selected = isArmorSelected(armor.id);
              const isShield = armor.armorType === "shield";
              const disabled =
                !selected && (isShield ? !canAddShield : !canAddArmor);

              return (
                <Button
                  key={armor.id}
                  variant={selected ? "default" : "outline"}
                  disabled={disabled}
                  className={`h-auto py-3 px-3 flex flex-col items-start gap-1 ${disabled ? "opacity-50" : ""}`}
                  onClick={() => toggleArmor(armor)}
                >
                  <span className="text-sm font-medium">{armor.nameRu}</span>
                  <span className="text-xs opacity-70">
                    КД {armor.armorClass}{" "}
                    {isShield
                      ? "(бонус)"
                      : armor.armorType === "heavy"
                        ? ""
                        : "+ ЛОВ (макс 2)"}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {armor.stealthDisadvantage && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">
                        Помеха скрытности
                      </span>
                    )}
                    {armor.strRequired && (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-1 rounded">
                        Сила {armor.strRequired}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {availableArmor.length === 0 && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              {character.class?.nameRu} не владеет доспехами.
              {character.class?.id === "monk" &&
                " Защита без доспехов (КД = 10 + ЛОВ + МДР)."}
              {(character.class?.id === "sorcerer" ||
                character.class?.id === "wizard") &&
                " Полагается на магию."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Итог */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {t("character.equipment")}
            </CardTitle>
            <Badge variant="secondary">
              Вес: {totalWeight.toFixed(1)} фунтов
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {character.equipment.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Снаряжение не выбрано
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {character.equipment.map((item) => (
                <Badge
                  key={item.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-destructive/10"
                  onClick={() => {
                    if (item.category === "gear" && selectedPack) {
                      handleSelectPack(selectedPack);
                    } else if (item.category === "weapon") {
                      const baseId = item.id.replace(/-2$/, "");
                      const weapon = COMMON_WEAPONS.find(
                        (w) => w.id === baseId,
                      );
                      if (weapon) handleWeaponClick(weapon);
                    } else {
                      removeEquipment(item.id);
                    }
                  }}
                >
                  {item.nameRu} ×
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
