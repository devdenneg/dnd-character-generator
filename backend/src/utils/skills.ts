export interface SkillMeta {
  id: string;
  nameRu: string;
}

const SKILL_RU_BY_ID: Record<string, string> = {
  acrobatics: "Акробатика",
  animal_handling: "Уход за животными",
  arcana: "Магия",
  athletics: "Атлетика",
  deception: "Обман",
  history: "История",
  insight: "Проницательность",
  intimidation: "Запугивание",
  investigation: "Расследование",
  medicine: "Медицина",
  nature: "Природа",
  perception: "Внимательность",
  performance: "Выступление",
  persuasion: "Убеждение",
  religion: "Религия",
  sleight_of_hand: "Ловкость рук",
  stealth: "Скрытность",
  survival: "Выживание",
};

function normalizeSkillId(skillId: string): string {
  return skillId.trim().toLowerCase().replace(/[-\s]+/g, "_");
}

export function toSkillMeta(skillId: string): SkillMeta {
  const normalized = normalizeSkillId(skillId);
  return {
    id: normalized,
    nameRu: SKILL_RU_BY_ID[normalized] ?? skillId,
  };
}

export function toSkillMetaList(skillIds: string[]): SkillMeta[] {
  return skillIds.map((skillId) => toSkillMeta(skillId));
}

export const ALL_SKILLS_META: SkillMeta[] = Object.keys(SKILL_RU_BY_ID).map((id) => ({
  id,
  nameRu: SKILL_RU_BY_ID[id],
}));
