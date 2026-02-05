
import { BackendCharacterClass } from "@/types/backend.types";
import { DnDClass, Feature, HitDice, Proficiency } from "@/types/class.types";

export function mapBackendClassToFrontend(backendClass: BackendCharacterClass): DnDClass {
  // Map HitDice
  const hitDieValue = backendClass.hitDie;
  const hitDice: HitDice = {
    label: `1к${hitDieValue}`,
    value: `к${hitDieValue}`,
    maxValue: hitDieValue,
    avg: Math.floor(hitDieValue / 2) + 1,
  };

  // Map Proficiency
  const proficiency: Proficiency = {
    armor: backendClass.armorProficiencies?.join(", ") || "",
    weapon: backendClass.weaponProficiencies?.join(", ") || "",
    tool: "",
    skill: backendClass.skillCount ? `Выберите ${backendClass.skillCount} из: ${backendClass.skillChoices?.join(", ") || ""}` : "",
  };

  // Map features
  const features: Feature[] = backendClass.features?.map(f => ({
    isSubclass: false,
    key: f.name.toLowerCase().replace(/\s+/g, '-'),
    level: f.level,
    name: f.nameRu || f.name,
    description: f.description,
    additional: "",
    scaling: [],
    hideInSubclasses: false,
  })) || [];

  // Map subclasses
  const subclasses = backendClass.subclasses?.map(s => ({
    isSubclass: true,
    key: s.externalId,
    level: backendClass.subclassLevel,
    name: s.nameRu || s.name,
    description: s.description,
    additional: "",
    scaling: [],
    hideInSubclasses: false,
    parentClass: backendClass.externalId,
    subclassName: {
        rus: s.nameRu,
        eng: s.name
    }
  })) || [];

  return {
    url: backendClass.externalId,
    name: {
      rus: backendClass.nameRu,
      eng: backendClass.name,
    },
    description: backendClass.description || [],
    image: backendClass.image || "",
    gallery: backendClass.gallery || [],
    hitDice,
    primaryCharacteristics: backendClass.primaryAbility?.join(", ") || "",
    proficiency,
    savingThrows: backendClass.savingThrows?.join(", ") || "",
    equipment: backendClass.startingEquipment || [],
    features,
    table: backendClass.classTable as any || [],
    casterType: backendClass.spellcasting?.casterType || "NONE",
    source: {
      name: {
        label: backendClass.source,
        rus: backendClass.source === "phb2024" ? "Книга игрока 2024" : backendClass.source,
        eng: backendClass.source,
      },
      group: {
        label: "Core",
        rus: "Основные правила",
      },
      page: 0,
    },
    subclasses: subclasses as any,
  };
}
