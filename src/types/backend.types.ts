
import { ContentType } from "./class.types";

export interface BackendClassFeature {
  id: string;
  classId: string;
  name: string;
  nameRu: string;
  description: ContentType[];
  level: number;
  createdAt: string;
}

export interface BackendSubclassFeature {
  id: string;
  subclassId: string;
  name: string;
  nameRu: string;
  description: ContentType[];
  level: number;
  createdAt: string;
}

export interface BackendSubclass {
  id: string;
  classId: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: ContentType[];
  source: string;
  classTable?: any;
  createdAt: string;
  features: BackendSubclassFeature[];
}

export interface BackendCharacterClass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: ContentType[];
  image?: string;
  gallery: string[];
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  source: string;
  spellcasting?: any;
  classTable?: any;
  multiclassing?: any;
  startingGold: number;
  startingEquipment?: any;
  createdAt: string;
  updatedAt: string;
  features: BackendClassFeature[];
  subclasses: BackendSubclass[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  details?: any;
}
