// D&D 5e API Client
// API Documentation: https://www.dnd5eapi.co/docs

const API_BASE_URL = "https://www.dnd5eapi.co/api";

// Types for API responses
export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

export interface ApiListResponse {
  count: number;
  results: ApiReference[];
}

export interface ApiRace {
  index: string;
  name: string;
  speed: number;
  size: string;
  size_description: string;
  alignment: string;
  age: string;
  language_desc: string;
  languages: ApiReference[];
  traits: ApiReference[];
  subraces: ApiReference[];
}

export interface ApiTrait {
  index: string;
  name: string;
  desc: string[];
  races: ApiReference[];
  proficiencies: ApiReference[];
}

export interface ApiClass {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: {
    desc: string;
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: { item: ApiReference }[];
    };
  }[];
  proficiencies: ApiReference[];
  saving_throws: ApiReference[];
  starting_equipment: {
    equipment: ApiReference;
    quantity: number;
  }[];
  starting_equipment_options: {
    desc: string;
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: unknown[];
    };
  }[];
  class_levels: string;
  multi_classing: {
    prerequisites: { ability_score: ApiReference; minimum_score: number }[];
    proficiencies: ApiReference[];
  };
  subclasses: ApiReference[];
  spellcasting?: {
    level: number;
    spellcasting_ability: ApiReference;
    info: { name: string; desc: string[] }[];
  };
}

export interface ApiBackground {
  index: string;
  name: string;
  starting_proficiencies: ApiReference[];
  starting_equipment: {
    equipment: ApiReference;
    quantity: number;
  }[];
  starting_equipment_options: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: unknown[];
    };
  }[];
  feature: {
    name: string;
    desc: string[];
  };
  personality_traits: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: { string: string }[];
    };
  };
  ideals: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: { desc: string; alignments: ApiReference[] }[];
    };
  };
  bonds: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: { string: string }[];
    };
  };
  flaws: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: { string: string }[];
    };
  };
}

export interface ApiEquipment {
  index: string;
  name: string;
  equipment_category: ApiReference;
  cost: { quantity: number; unit: string };
  weight: number;
  desc?: string[];
  damage?: {
    damage_dice: string;
    damage_type: ApiReference;
  };
  armor_class?: {
    base: number;
    dex_bonus: boolean;
    max_bonus?: number;
  };
  properties?: ApiReference[];
  weapon_category?: string;
  weapon_range?: string;
  range?: { normal: number; long?: number };
}

export interface ApiSpell {
  index: string;
  name: string;
  level: number;
  school: ApiReference;
  casting_time: string;
  range: string;
  components: string[];
  material?: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  desc: string[];
  higher_level?: string[];
  classes: ApiReference[];
  subclasses: ApiReference[];
}

export interface ApiAbilityScore {
  index: string;
  name: string;
  full_name: string;
  desc: string[];
  skills: ApiReference[];
}

export interface ApiSkill {
  index: string;
  name: string;
  desc: string[];
  ability_score: ApiReference;
}

export interface ApiClassLevel {
  level: number;
  ability_score_bonuses: number;
  prof_bonus: number;
  features: ApiReference[];
  spellcasting?: {
    cantrips_known?: number;
    spells_known?: number;
    spell_slots_level_1?: number;
    spell_slots_level_2?: number;
    spell_slots_level_3?: number;
    spell_slots_level_4?: number;
    spell_slots_level_5?: number;
    spell_slots_level_6?: number;
    spell_slots_level_7?: number;
    spell_slots_level_8?: number;
    spell_slots_level_9?: number;
  };
  class_specific?: Record<string, number | string>;
}

export interface ApiFeature {
  index: string;
  name: string;
  level: number;
  class: ApiReference;
  subclass?: ApiReference;
  desc: string[];
  prerequisites: { type: string; level?: number }[];
}

// Generic fetch function
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// API Methods
export const dnd5eApi = {
  // Lists
  getRaces: () => fetchFromApi<ApiListResponse>("/races"),
  getClasses: () => fetchFromApi<ApiListResponse>("/classes"),
  getBackgrounds: () => fetchFromApi<ApiListResponse>("/backgrounds"),
  getEquipment: () => fetchFromApi<ApiListResponse>("/equipment"),
  getSpells: () => fetchFromApi<ApiListResponse>("/spells"),
  getAbilityScores: () => fetchFromApi<ApiListResponse>("/ability-scores"),
  getSkills: () => fetchFromApi<ApiListResponse>("/skills"),
  getFeatures: () => fetchFromApi<ApiListResponse>("/features"),
  getTraits: () => fetchFromApi<ApiListResponse>("/traits"),

  // Individual resources
  getRace: (index: string) => fetchFromApi<ApiRace>(`/races/${index}`),
  getTrait: (index: string) => fetchFromApi<ApiTrait>(`/traits/${index}`),
  getClass: (index: string) => fetchFromApi<ApiClass>(`/classes/${index}`),
  getClassLevels: (index: string) =>
    fetchFromApi<ApiClassLevel[]>(`/classes/${index}/levels`),
  getClassLevel: (classIndex: string, level: number) =>
    fetchFromApi<ApiClassLevel>(`/classes/${classIndex}/levels/${level}`),
  getClassFeatures: (index: string) =>
    fetchFromApi<ApiListResponse>(`/classes/${index}/features`),
  getClassSpells: (index: string) =>
    fetchFromApi<ApiListResponse>(`/classes/${index}/spells`),
  getBackground: (index: string) =>
    fetchFromApi<ApiBackground>(`/backgrounds/${index}`),
  getEquipmentItem: (index: string) =>
    fetchFromApi<ApiEquipment>(`/equipment/${index}`),
  getSpell: (index: string) => fetchFromApi<ApiSpell>(`/spells/${index}`),
  getAbilityScore: (index: string) =>
    fetchFromApi<ApiAbilityScore>(`/ability-scores/${index}`),
  getSkill: (index: string) => fetchFromApi<ApiSkill>(`/skills/${index}`),
  getFeature: (index: string) => fetchFromApi<ApiFeature>(`/features/${index}`),

  // Spells by class
  getSpellsByClass: (classIndex: string) =>
    fetchFromApi<ApiListResponse>(`/classes/${classIndex}/spells`),

  // Spells by level
  getSpellsByLevel: (level: number) =>
    fetchFromApi<ApiListResponse>(`/spells?level=${level}`),
};
