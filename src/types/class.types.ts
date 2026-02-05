/**
 * Типы для классов D&D 5e
 * Оптимизированная структура для хранения всех данных о классах
 */

// ============================================
// Базовые типы для содержимого описания
// ============================================

export type ContentItem = string | ContentBlock;
export type ContentType = ContentItem | ContentItem[];

export interface ContentBlock {
  type: 'heading' | 'list' | 'quote' | 'table' | 'text' | 'bold' | 'italic' | 'break' | 'image' | 'paragraph' | 'doc';
  attrs?: {
    level?: number | string;
    type?: 'ordered' | 'unordered';
    color?: string;
    variant?: string;
    [key: string]: any; // Allow other attributes
  };
  content?: ContentType;
  text?: string; // For text nodes
  caption?: string;
  colLabels?: string[];
  colStyles?: string[];
  rows?: (string | string[] | any)[]; // Allow complex rows
}

// ============================================
// Типы для таблиц прогрессии
// ============================================

export interface TableScaling {
  level: number;
  value: string;
}

export interface ProgressionTable {
  name: string;
  scaling: TableScaling[];
}

// ============================================
// Типы для особенностей (features)
// ============================================

export interface FeatureScaling {
  level: number;
  name: string;
  description: ContentType[];
  additional: string;
  hideInSubclasses: boolean;
}

export interface Feature {
  isSubclass: boolean;
  key: string;
  level: number;
  name: string;
  description: ContentType[];
  additional: string;
  scaling: FeatureScaling[];
  hideInSubclasses: boolean;
}

// ============================================
// Типы для владений
// ============================================

export interface Proficiency {
  armor: string;
  weapon: string;
  tool: string;
  skill: string;
}

// ============================================
// Типы для кости хитов
// ============================================

export interface HitDice {
  label: string;
  value: string;
  maxValue: number;
  avg: number;
}

// ============================================
// Типы для названия
// ============================================

export interface LocalizedName {
  rus: string;
  eng: string;
}

// ============================================
// Типы для источника
// ============================================

export interface Source {
  name: {
    label: string;
    rus: string;
    eng: string;
  };
  group: {
    label: string;
    rus: string;
  };
  page: number;
}

// ============================================
// Тип заклинателя
// ============================================

export type CasterType = 'FULL' | 'HALF' | 'THIRD' | 'PACT' | 'NONE';

// ============================================
// Основной тип для класса D&D
// ============================================

export interface DnDClass {
  // Идентификаторы
  url: string;

  // Изображения
  gallery: string[];
  image: string; // The data uses explicit 'image' key

  // Описание
  description: ContentType[];

  // Метаданные
  updatedAt?: string;
  userId?: string;

  // Характеристики класса
  hitDice: HitDice; // Data uses hitDice
  primaryCharacteristics: string; // Data uses primaryCharacteristics

  // Владения
  proficiency: Proficiency; // Data uses object
  savingThrows: string; // Data uses string

  equipment: ContentType[]; // Data uses equipment (mixed strings/objects)

  // Особенности
  features: Feature[]; // Data uses features

  // Таблицы прогрессии
  table?: ProgressionTable[];

  // Тип заклинателя
  casterType?: CasterType; // Optional
  spellcastingAbility?: string; // May be present?

  hasSubclasses?: boolean;
  // subclasses data is explicitly missing from the root of optimized classes,
  // it seems implied or loaded separately, but we'll keep it optional just in case.
  subclasses?: Subclass[];

  // Название
  name: LocalizedName; // Data uses object

  // Источник
  source: Source; // Data uses object

  isReprinted?: boolean;
}

// ============================================
// Тип для подкласса
// ============================================

export interface Subclass extends Feature {
  parentClass: string; // URL родительского класса (например, "bard-phb")
  subclassName: LocalizedName;
}

// ============================================
// Тип для списка заклинаний
// ============================================

export interface SpellTable {
  caption: string;
  colLabels: string[];
  colStyles: string[];
  rows: (string | string[])[];
}

// ============================================
// Вспомогательные типы
// ============================================

export interface ProgressionTable {
  name: string;
  scaling: ScalingValue[];
}

export interface ScalingValue {
  level: number;
  value: string;
}

export interface ClassWithSubclasses extends DnDClass {
  subclasses?: Subclass[];
}

export type ClassList = DnDClass[];

// ============================================
// Типы для поиска и фильтрации
// ============================================

export interface ClassFilter {
  casterType?: CasterType;
  primaryCharacteristics?: string[];
  hasSubclasses?: boolean;
}

export interface ClassSearchParams {
  name?: string;
  primaryCharacteristic?: string;
  minLevel?: number;
}
