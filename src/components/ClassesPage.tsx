import { useBackendClasses } from "@/api/hooks";
import { classesApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Shield,
  ChevronRight,
  Zap,
  Crown,
  Flame,
  Mountain,
  Scroll,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ElementType } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

// Types
interface ClassFeature {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

interface SubclassFeature {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

interface Subclass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  source: string;
  features: SubclassFeature[];
}

interface EquipmentItemBase {
  externalId: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: { quantity: number; unit: string };
  weight?: number;
  source: string;
}

interface WeaponItem extends EquipmentItemBase {
  category: "weapon";
  damage: { dice: string; type: string };
  properties?: string[];
}

interface ArmorItem extends EquipmentItemBase {
  category: "armor";
  armorClass: number;
  armorType: "light" | "medium" | "heavy" | "shield";
  maxDexBonus?: number;
}

interface GearItem extends EquipmentItemBase {
  category: "gear" | "tool" | "pack";
}

type EquipmentItem = WeaponItem | ArmorItem | GearItem;

interface StartingEquipment {
  equipment: EquipmentItem[];
  gold: number;
}

interface CharacterClass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: string;
  savingThrows: string;
  armorProficiencies: string;
  weaponProficiencies: string;
  skillChoices: string;
  skillCount: number;
  subclassLevel: number;
  source: string;
  features: ClassFeature[];
  subclasses: Subclass[];
  startingEquipment?: StartingEquipment;
}

interface ClassFormData {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  source: string;
  features: ClassFeature[];
  subclasses: Subclass[];
  startingEquipment?: StartingEquipment;
}

const CLASS_ICONS: Record<string, ElementType> = {
  barbarian: Flame,
  bard: Crown,
  cleric: Shield,
  druid: Mountain,
  fighter: Shield,
  monk: Zap,
  paladin: Crown,
  ranger: Mountain,
  rogue: Zap,
  sorcerer: Flame,
  warlock: Flame,
  wizard: Scroll,
};

const HIT_DIE_OPTIONS = [
  { value: "6", label: "d6" },
  { value: "8", label: "d8" },
  { value: "10", label: "d10" },
  { value: "12", label: "d12" },
];

const ABILITY_OPTIONS = [
  { value: "strength", label: "Strength (Сила)" },
  { value: "dexterity", label: "Dexterity (Ловкость)" },
  { value: "constitution", label: "Constitution (Телосложение)" },
  { value: "intelligence", label: "Intelligence (Интеллект)" },
  { value: "wisdom", label: "Wisdom (Мудрость)" },
  { value: "charisma", label: "Charisma (Харизма)" },
];

const ARMOR_PROFICIENCY_OPTIONS = [
  { value: "Лёгкие доспехи", label: "Лёгкие доспехи" },
  { value: "Средние доспехи", label: "Средние доспехи" },
  { value: "Тяжёлые доспехи", label: "Тяжёлые доспехи" },
  { value: "Щиты", label: "Щиты" },
];

const WEAPON_PROFICIENCY_OPTIONS = [
  { value: "Простое оружие", label: "Простое оружие" },
  { value: "Воинское оружие", label: "Воинское оружие" },
];

const SKILL_OPTIONS = [
  { value: "acrobatics", label: "Акробатика (Acrobatics)" },
  { value: "animal_handling", label: "Уход за животными (Animal Handling)" },
  { value: "arcana", label: "Магия (Arcana)" },
  { value: "athletics", label: "Атлетика (Athletics)" },
  { value: "deception", label: "Обман (Deception)" },
  { value: "history", label: "История (History)" },
  { value: "insight", label: "Проницательность (Insight)" },
  { value: "intimidation", label: "Запугивание (Intimidation)" },
  { value: "investigation", label: "Расследование (Investigation)" },
  { value: "medicine", label: "Медицина (Medicine)" },
  { value: "nature", label: "Природа (Nature)" },
  { value: "perception", label: "Восприятие (Perception)" },
  { value: "performance", label: "Исполнение (Performance)" },
  { value: "persuasion", label: "Убеждение (Persuasion)" },
  { value: "religion", label: "Религия (Religion)" },
  { value: "sleight_of_hand", label: "Ловкость рук (Sleight of Hand)" },
  { value: "stealth", label: "Скрытность (Stealth)" },
  { value: "survival", label: "Выживание (Survival)" },
];

const SOURCE_OPTIONS = [
  { value: "srd", label: "SRD (System Reference Document)" },
  { value: "phb2024", label: "PHB 2024 (Player's Handbook)" },
];

// Multi-select checkbox component
interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              className="mt-0.5"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Выбрано: {selected.length} {selected.length === 1 ? "пункт" : selected.length > 1 && selected.length < 5 ? "пункта" : "пунктов"}
      </p>
    </div>
  );
}

// Equipment Display Component for showing item details
interface EquipmentDisplayProps {
  item: EquipmentItem;
}

function EquipmentDisplay({ item }: EquipmentDisplayProps) {
  return (
    <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h5 className="font-medium text-foreground text-sm">
            {item.nameRu || item.name}
          </h5>
          {item.nameRu && item.name && (
            <span className="text-xs text-muted-foreground/70">
              {item.name}
            </span>
          )}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {item.category === "weapon" && (
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                Оружие
              </span>
            )}
            {item.category === "armor" && (
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                Доспех
              </span>
            )}
            {(item.category === "gear" || item.category === "tool" || item.category === "pack") && (
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                {item.category === "gear" ? "Снаряжение" : item.category === "tool" ? "Инструмент" : "Набор"}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
              {item.cost.quantity} {item.cost.unit}
            </span>
            {item.weight !== undefined && (
              <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                {item.weight} кг
              </span>
            )}
          </div>
          
          {/* Weapon details */}
          {item.category === "weapon" && item.damage && (
            <div className="text-xs text-muted-foreground mt-1">
              Урон: {item.damage.dice} ({item.damage.type})
              {item.properties && item.properties.length > 0 && (
                <span> • Свойства: {item.properties.join(", ")}</span>
              )}
            </div>
          )}
          
          {/* Armor details */}
          {item.category === "armor" && (
            <div className="text-xs text-muted-foreground mt-1">
              AC: {item.armorClass} • Тип: {item.armorType}
              {item.maxDexBonus !== undefined && ` • Макс. бонус Ловкости: ${item.maxDexBonus}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Equipment Editor Component for different item types
interface EquipmentEditorProps {
  item: EquipmentItem;
  index: number;
  onUpdate: (index: number, updates: Partial<EquipmentItem>) => void;
  onRemove: (index: number) => void;
}

function EquipmentEditor({ item, index, onUpdate, onRemove }: EquipmentEditorProps) {
  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3">
      <div className="flex items-start justify-between">
        <h6 className="font-medium text-foreground text-sm">
          {item.category === "weapon" && "Оружие"}
          {item.category === "armor" && "Доспех"}
          {item.category === "gear" && "Снаряжение"}
          {item.category === "tool" && "Инструмент"}
          {item.category === "pack" && "Набор"}
          {" #" + (index + 1)}
        </h6>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive p-1"
          onClick={() => onRemove(index)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Common Fields */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          value={item.name}
          onChange={(e) => onUpdate(index, { name: e.target.value })}
          placeholder="Название (англ)"
        />
        <Input
          value={item.nameRu}
          onChange={(e) => onUpdate(index, { nameRu: e.target.value })}
          placeholder="Название (рус)"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Вес</Label>
          <Input
            type="number"
            value={item.weight || ""}
            onChange={(e) => onUpdate(index, { weight: parseFloat(e.target.value) || undefined })}
            placeholder="Вес"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Категория</Label>
          <div className="px-3 py-2 rounded-md bg-muted text-sm text-muted-foreground">
            {item.category === "weapon" && "Оружие"}
            {item.category === "armor" && "Доспех"}
            {item.category === "gear" && "Снаряжение"}
            {item.category === "tool" && "Инструмент"}
            {item.category === "pack" && "Набор"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Количество</Label>
          <Input
            type="number"
            value={item.cost.quantity}
            onChange={(e) => onUpdate(index, { 
              cost: { ...item.cost, quantity: parseInt(e.target.value) || 0 } 
            })}
            placeholder="Количество"
          />
        </div>
        <div>
          <Label className="text-xs">Валюта</Label>
          <Select
            value={item.cost.unit}
            placeholder="Валюта"
            onChange={(e) => onUpdate(index, { 
              cost: { ...item.cost, unit: e.target.value } 
            })}
            options={[
              { value: "cp", label: "cp (медь)" },
              { value: "sp", label: "sp (серебро)" },
              { value: "ep", label: "ep (электрум)" },
              { value: "gp", label: "gp (золото)" },
              { value: "pp", label: "pp (платина)" },
            ]}
          />
        </div>
      </div>

      {/* Weapon-specific fields */}
      {item.category === "weapon" && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Урон (кубик)</Label>
              <Input
                value={item.damage.dice}
                onChange={(e) => onUpdate(index, { 
                  damage: { ...item.damage, dice: e.target.value } 
                })}
                placeholder="1d8"
              />
            </div>
            <div>
              <Label className="text-xs">Тип урона</Label>
              <Input
                value={item.damage.type}
                onChange={(e) => onUpdate(index, { 
                  damage: { ...item.damage, type: e.target.value } 
                })}
                placeholder="рубящий"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Свойства (через запятую)</Label>
            <Input
              value={item.properties?.join(", ") || ""}
              onChange={(e) => onUpdate(index, { 
                properties: e.target.value.split(",").map(p => p.trim()).filter(Boolean) 
              })}
              placeholder="Лёгкое, Метательное (20/60)"
            />
          </div>
        </>
      )}

      {/* Armor-specific fields */}
      {item.category === "armor" && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Класс защиты (AC)</Label>
              <Input
                type="number"
                value={item.armorClass}
                onChange={(e) => onUpdate(index, { 
                  armorClass: parseInt(e.target.value) || 10 
                })}
                placeholder="10"
              />
            </div>
            <div>
              <Label className="text-xs">Тип доспеха</Label>
              <Select
                value={item.armorType}
                placeholder="Тип доспеха"
                onChange={(e) => onUpdate(index, { 
                  armorType: e.target.value as "light" | "medium" | "heavy" | "shield"
                })}
                options={[
                  { value: "light", label: "Лёгкий" },
                  { value: "medium", label: "Средний" },
                  { value: "heavy", label: "Тяжёлый" },
                  { value: "shield", label: "Щит" },
                ]}
              />
            </div>
          </div>

          {item.armorType !== "shield" && (
            <div>
              <Label className="text-xs">Макс. бонус Ловкости</Label>
              <Input
                type="number"
                value={item.maxDexBonus || ""}
                onChange={(e) => onUpdate(index, { 
                  maxDexBonus: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="Оставьте пустым для без ограничений"
              />
            </div>
          )}
        </>
      )}

      {/* Gear-specific fields */}
      {(item.category === "gear" || item.category === "tool" || item.category === "pack") && (
        <div className="text-xs text-muted-foreground">
          Для этого типа снаряжения достаточно указать название, вес и стоимость.
        </div>
      )}
    </div>
  );
}

interface ClassesPageProps {
  onBack?: () => void;
}

export function ClassesPage({ onBack }: ClassesPageProps) {
  const { data, isLoading, error, refetch } = useBackendClasses();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [editingClass, setEditingClass] = useState<ClassFormData>({
    externalId: "",
    name: "",
    nameRu: "",
    description: "",
    hitDie: 8,
    primaryAbility: [],
    savingThrows: [],
    armorProficiencies: [],
    weaponProficiencies: [],
    skillChoices: [],
    skillCount: 2,
    subclassLevel: 3,
    source: "phb2024",
    features: [],
    subclasses: [],
    startingEquipment: {
      equipment: [],
      gold: 0,
    },
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newFeature, setNewFeature] = useState<Pick<ClassFeature, "name" | "nameRu" | "description" | "level">>({
    name: "",
    nameRu: "",
    description: "",
    level: 1,
  });
  const [newEquipmentCategory, setNewEquipmentCategory] = useState<"weapon" | "armor" | "gear">("weapon");

  // Selected class data query
  const selectedClassData = useQuery({
    queryKey: ["class", selectedClass],
    queryFn: () => classesApi.get(selectedClass!),
    enabled: !!selectedClass,
    staleTime: Infinity,
  });

  // Create class mutation
  const createClassMutation = useMutation({
    mutationFn: (data: ClassFormData) => classesApi.create(data),
    onSuccess: () => {
      refetch();
      setIsCreateModalOpen(false);
      resetCreateForm();
    },
  });

  // Update class mutation
  const updateClassMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClassFormData }) =>
      classesApi.update(id, data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedClass(null);
      resetCreateForm();
    },
  });

  // Delete class mutation
  const deleteClassMutation = useMutation({
    mutationFn: classesApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedClass(null);
      resetCreateForm();
    },
  });

  const resetCreateForm = () => {
    setEditingClass({
      externalId: "",
      name: "",
      nameRu: "",
      description: "",
      hitDie: 8,
      primaryAbility: [],
      savingThrows: [],
      armorProficiencies: [],
      weaponProficiencies: [],
      skillChoices: [],
      skillCount: 2,
      subclassLevel: 3,
      source: "phb2024",
      features: [],
      subclasses: [],
      startingEquipment: {
        equipment: [],
        gold: 0,
      },
    });
  };

  const handleCreateClass = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleEditClass = (cls: CharacterClass) => {
    setEditingClass({
      externalId: cls.externalId,
      name: cls.name,
      nameRu: cls.nameRu,
      description: cls.description,
      hitDie: cls.hitDie,
      primaryAbility: JSON.parse(cls.primaryAbility),
      savingThrows: JSON.parse(cls.savingThrows),
      armorProficiencies: JSON.parse(cls.armorProficiencies),
      weaponProficiencies: JSON.parse(cls.weaponProficiencies),
      skillChoices: JSON.parse(cls.skillChoices),
      skillCount: cls.skillCount,
      subclassLevel: cls.subclassLevel,
      source: cls.source,
      features: cls.features,
      subclasses: cls.subclasses,
      startingEquipment: cls.startingEquipment || {
        equipment: [],
        gold: 0,
      },
    });
    setIsEditModalOpen(true);
  };

  const handleSaveClass = () => {
    if (!editingClass.externalId || !editingClass.name || !editingClass.nameRu || !editingClass.description) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (isCreateModalOpen) {
      // Create new class
      createClassMutation.mutate(editingClass);
    } else {
      // Update existing class
      updateClassMutation.mutate({
        id: selectedClass!,
        data: editingClass,
      });
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.name || !newFeature.nameRu || !newFeature.description) {
      alert("Пожалуйста, заполните все поля черты");
      return;
    }

    const featuresArray = editingClass.features || [];
    const newFeatureWithId = { ...newFeature, id: Date.now().toString() };

    setEditingClass({
      ...editingClass,
      features: [...featuresArray, newFeatureWithId],
    });

    setNewFeature({ name: "", nameRu: "", description: "", level: 1 });
  };

  const handleRemoveFeature = (featureId: string) => {
    const featuresArray = editingClass.features || [];
    setEditingClass({
      ...editingClass,
      features: featuresArray.filter((f: ClassFeature) => f.id !== featureId),
    });
  };

  const handleAddEquipmentItem = () => {
    if (!editingClass.startingEquipment) {
      setEditingClass({
        ...editingClass,
        startingEquipment: {
          equipment: [],
          gold: 0,
        },
      });
      return;
    }

    let newItem: EquipmentItem;

    switch (newEquipmentCategory) {
      case "weapon":
        newItem = {
          externalId: `weapon-${Date.now()}`,
          name: "",
          nameRu: "",
          category: "weapon",
          cost: { quantity: 0, unit: "gp" },
          damage: { dice: "1d8", type: "рубящий" },
          properties: [],
          source: "class",
        };
        break;
      case "armor":
        newItem = {
          externalId: `armor-${Date.now()}`,
          name: "",
          nameRu: "",
          category: "armor",
          cost: { quantity: 0, unit: "gp" },
          armorClass: 10,
          armorType: "light",
          source: "class",
        };
        break;
      case "gear":
        newItem = {
          externalId: `gear-${Date.now()}`,
          name: "",
          nameRu: "",
          category: "gear",
          cost: { quantity: 0, unit: "gp" },
          source: "class",
        };
        break;
    }

    setEditingClass({
      ...editingClass,
      startingEquipment: {
        ...editingClass.startingEquipment,
        equipment: [...editingClass.startingEquipment.equipment, newItem],
      },
    });
  };

  const handleRemoveEquipmentItem = (index: number) => {
    if (!editingClass.startingEquipment) return;

    setEditingClass({
      ...editingClass,
      startingEquipment: {
        ...editingClass.startingEquipment,
        equipment: editingClass.startingEquipment.equipment.filter((_, i) => i !== index),
      },
    });
  };

  const handleUpdateEquipmentItem = (index: number, updates: Partial<EquipmentItem>) => {
    if (!editingClass.startingEquipment) return;

    const updatedEquipment = [...editingClass.startingEquipment.equipment];
    const currentItem = updatedEquipment[index];
    
    // Merge updates with current item while preserving type
    updatedEquipment[index] = { ...currentItem, ...updates } as EquipmentItem;

    setEditingClass({
      ...editingClass,
      startingEquipment: {
        ...editingClass.startingEquipment,
        equipment: updatedEquipment,
      },
    });
  };

  const canEdit = user?.role === "master";

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Ошибка загрузки классов
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о классах с сервера. Пожалуйста, попробуйте
              позже.
            </p>
            {onBack && (
              <Button variant="outline" className="mt-4" onClick={onBack}>
                Назад
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const classes = data?.data?.classes || [];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {onBack && (
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack}>
              ← Назад
            </Button>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Классы PHB 2024</h1>
                <p className="text-sm text-muted-foreground">
                  официальные классы из Книги игрока 2024
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateClass} className="gap-2">
                <Plus className="w-4 h-4" />
                Создать класс
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Загружено классов: <span className="font-semibold text-foreground">{classes.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls: CharacterClass, index: number) => {
            const Icon = CLASS_ICONS[cls.externalId] || Shield;
            const isSelected = selectedClass === cls.id;

            return (
              <div key={cls.id} className="space-y-4">
                <button
                  onClick={() => setSelectedClass(isSelected ? null : cls.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                    isSelected
                      ? "bg-card/80 border-primary/50 ring-2 ring-primary/20"
                      : "bg-card/60 border-border/50 hover:border-primary/30 hover:bg-card/80"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent ${
                        !isSelected && "hover:scale-110"
                      } transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {cls.nameRu}
                        </h3>
                        {canEdit && isSelected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClass(cls);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        )}
                        {!canEdit && (
                          <ChevronRight
                            className={`w-5 h-5 text-muted-foreground transition-all ${
                              isSelected ? "rotate-90 text-primary" : ""
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {cls.name}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          d{cls.hitDie}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                          {JSON.parse(cls.primaryAbility).join(", ")}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                          {cls.features.length} черт
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                          {cls.subclasses.length} подклассов
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="bg-card/80 border border-primary/20 rounded-2xl p-6 mt-2 animate-fade-in">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Описание</h4>
                      {canEdit && selectedClassData.data?.data?.class && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-1"
                          onClick={() => {
                            if (confirm(`Вы уверены, что хотите удалить класс "${selectedClassData.data.data.class.nameRu}"?`)) {
                              deleteClassMutation.mutate(selectedClass);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      {cls.description}
                    </p>

                    {/* Class Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                        <h5 className="font-medium text-foreground text-sm mb-2">Характеристики</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Кость хитов:</span>
                            <span className="font-medium">d{cls.hitDie}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Основная:</span>
                            <span className="font-medium">
                              {JSON.parse(cls.primaryAbility).join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Спасброски:</span>
                            <span className="font-medium">
                              {JSON.parse(cls.savingThrows).join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Подкласс с уровня:</span>
                            <span className="font-medium">{cls.subclassLevel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Навыки:</span>
                            <span className="font-medium">
                              {cls.skillCount} из {JSON.parse(cls.skillChoices).length}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                        <h5 className="font-medium text-foreground text-sm mb-2">Владения</h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Доспехи:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {JSON.parse(cls.armorProficiencies).map((prof: string, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                                  {prof}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Оружие:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {JSON.parse(cls.weaponProficiencies).map((prof: string, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                                  {prof}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-foreground mb-2">Черты класса</h4>
                    <div className="space-y-3 mb-6">
                      {cls.features.map((feature: ClassFeature) => (
                        <div
                          key={feature.id}
                          className="p-4 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div>
                              <h5 className="font-medium text-foreground text-sm">
                                {feature.nameRu} (уровень {feature.level})
                              </h5>
                              <span className="text-xs text-muted-foreground/70">
                                {feature.name}
                              </span>
                            </div>
                            {canEdit && isSelected && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive p-1 h-6 w-6"
                                onClick={() => handleRemoveFeature(feature.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-foreground mb-2">Подклассы</h4>
                    <div className="space-y-3 mb-6">
                      {cls.subclasses.map((subclass: Subclass) => (
                        <div
                          key={subclass.id}
                          className="p-4 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <h5 className="font-medium text-foreground text-sm">
                            {subclass.nameRu}
                          </h5>
                          <span className="text-xs text-muted-foreground/70">
                            {subclass.name}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {subclass.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-foreground mb-2">Начальное снаряжение</h4>
                    {cls.startingEquipment ? (
                      <div className="space-y-3">
                        {cls.startingEquipment.gold > 0 && (
                          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                            <span className="font-medium text-foreground text-sm">
                              Золото: {cls.startingEquipment.gold} gp
                            </span>
                          </div>
                        )}
                        <div className="space-y-2">
                          {cls.startingEquipment.equipment.map((item: EquipmentItem, index: number) => (
                            <EquipmentDisplay key={index} item={item} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Начальное снаряжение не указано
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {classes.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нет классов
            </h3>
            <p className="text-sm text-muted-foreground">
              Классы пока не загружены
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen ? "Создать класс" : "Редактировать класс"}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditModalOpen(false);
                resetCreateForm();
              }}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* External ID */}
              <div className="space-y-2">
                <Label htmlFor="externalId">Внешний ID *</Label>
                <Input
                  id="externalId"
                  value={editingClass.externalId}
                  onChange={(e) => setEditingClass({ ...editingClass, externalId: e.target.value })}
                  placeholder="Например: barbarian"
                  disabled={!isCreateModalOpen}
                />
                <p className="text-xs text-muted-foreground">
                  Уникальный идентификатор, используется в коде. Можно изменить только при создании.
                </p>
              </div>

              {/* Name (Russian) */}
              <div className="space-y-2">
                <Label htmlFor="nameRu">Название (русский) *</Label>
                <Input
                  id="nameRu"
                  value={editingClass.nameRu}
                  onChange={(e) => setEditingClass({ ...editingClass, nameRu: e.target.value })}
                  placeholder="Например: Варвар"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  placeholder="Например: Barbarian"
                />
              </div>

              {/* Hit Die */}
              <div className="space-y-2">
                <Label htmlFor="hitDie">Кость хитов (Hit Die) *</Label>
                <Select
                  id="hitDie"
                  options={HIT_DIE_OPTIONS}
                  value={editingClass.hitDie.toString()}
                  placeholder="Выберите кость хитов"
                  onChange={(e) => setEditingClass({ ...editingClass, hitDie: parseInt(e.target.value) })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={editingClass.description}
                  onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                  placeholder="Описание класса..."
                  rows={4}
                />
              </div>

              {/* Primary Ability */}
              <MultiSelect
                label="Основная характеристика (Primary Ability)"
                options={ABILITY_OPTIONS}
                selected={editingClass.primaryAbility}
                onChange={(selected) => setEditingClass({ ...editingClass, primaryAbility: selected })}
              />

              {/* Saving Throws */}
              <MultiSelect
                label="Спасброски (Saving Throws)"
                options={ABILITY_OPTIONS}
                selected={editingClass.savingThrows}
                onChange={(selected) => setEditingClass({ ...editingClass, savingThrows: selected })}
              />

              {/* Armor Proficiencies */}
              <MultiSelect
                label="Владение доспехами (Armor Proficiencies)"
                options={ARMOR_PROFICIENCY_OPTIONS}
                selected={editingClass.armorProficiencies}
                onChange={(selected) => setEditingClass({ ...editingClass, armorProficiencies: selected })}
              />

              {/* Weapon Proficiencies */}
              <MultiSelect
                label="Владение оружием (Weapon Proficiencies)"
                options={WEAPON_PROFICIENCY_OPTIONS}
                selected={editingClass.weaponProficiencies}
                onChange={(selected) => setEditingClass({ ...editingClass, weaponProficiencies: selected })}
              />

              {/* Skill Choices */}
              <MultiSelect
                label="Навыки на выбор (Skill Choices)"
                options={SKILL_OPTIONS}
                selected={editingClass.skillChoices}
                onChange={(selected) => setEditingClass({ ...editingClass, skillChoices: selected })}
              />

              {/* Skill Count */}
              <div className="space-y-2">
                <Label htmlFor="skillCount">Количество навыков на выбор (Skill Count)</Label>
                <Input
                  id="skillCount"
                  type="number"
                  value={editingClass.skillCount}
                  onChange={(e) => setEditingClass({ ...editingClass, skillCount: parseInt(e.target.value) || 0 })}
                  placeholder="Количество навыков"
                  min="0"
                />
              </div>

              {/* Subclass Level */}
              <div className="space-y-2">
                <Label htmlFor="subclassLevel">Уровень получения подкласса (Subclass Level)</Label>
                <Input
                  id="subclassLevel"
                  type="number"
                  value={editingClass.subclassLevel}
                  onChange={(e) => setEditingClass({ ...editingClass, subclassLevel: parseInt(e.target.value) || 1 })}
                  placeholder="Уровень получения подкласса"
                  min="1"
                  max="20"
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Источник (Source) *</Label>
                <Select
                  id="source"
                  options={SOURCE_OPTIONS}
                  value={editingClass.source}
                  placeholder="Выберите источник"
                  onChange={(e) => setEditingClass({ ...editingClass, source: e.target.value })}
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label>Черты класса</Label>
                
                {/* Add New Feature Form */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3">
                  <h5 className="font-medium text-foreground text-sm">Добавить новую черту</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={newFeature.name}
                      onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                      placeholder="Название черты (англ)"
                    />
                    <Input
                      value={newFeature.nameRu}
                      onChange={(e) => setNewFeature({ ...newFeature, nameRu: e.target.value })}
                      placeholder="Название черты (рус)"
                    />
                  </div>
                  <Input
                    type="number"
                    value={newFeature.level}
                    onChange={(e) => setNewFeature({ ...newFeature, level: parseInt(e.target.value) || 1 })}
                    placeholder="Уровень"
                    min="1"
                    max="20"
                  />
                  <Textarea
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    placeholder="Описание черты"
                    rows={2}
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddFeature}
                    className="w-full gap-2"
                    disabled={!newFeature.name || !newFeature.nameRu || !newFeature.description}
                  >
                    <Plus className="w-4 h-4" />
                    Добавить черту в список
                  </Button>
                </div>

                {/* Existing Features List */}
                <div className="space-y-3">
                  {editingClass.features.map((feature: ClassFeature, index: number) => (
                    <div key={feature.id || index} className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={feature.name}
                              onChange={(e) => {
                                const featuresArray = editingClass.features || [];
                                const updatedFeatures = [...featuresArray];
                                updatedFeatures[index] = { ...updatedFeatures[index], name: e.target.value };
                                setEditingClass({ ...editingClass, features: updatedFeatures });
                              }}
                              placeholder="Название (англ)"
                            />
                            <Input
                              value={feature.nameRu}
                              onChange={(e) => {
                                const featuresArray = editingClass.features || [];
                                const updatedFeatures = [...featuresArray];
                                updatedFeatures[index] = { ...updatedFeatures[index], nameRu: e.target.value };
                                setEditingClass({ ...editingClass, features: updatedFeatures });
                              }}
                              placeholder="Название (рус)"
                            />
                          </div>
                          <Input
                            type="number"
                            value={feature.level}
                            onChange={(e) => {
                              const featuresArray = editingClass.features || [];
                              const updatedFeatures = [...featuresArray];
                              updatedFeatures[index] = { ...updatedFeatures[index], level: parseInt(e.target.value) || 1 };
                              setEditingClass({ ...editingClass, features: updatedFeatures });
                            }}
                            placeholder="Уровень"
                            min="1"
                            max="20"
                          />
                          <Textarea
                            value={feature.description}
                            onChange={(e) => {
                              const featuresArray = editingClass.features || [];
                              const updatedFeatures = [...featuresArray];
                              updatedFeatures[index] = { ...updatedFeatures[index], description: e.target.value };
                              setEditingClass({ ...editingClass, features: updatedFeatures });
                            }}
                            placeholder="Описание черты"
                            rows={2}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-1"
                          onClick={() => handleRemoveFeature(feature.id || index.toString())}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starting Equipment */}
              <div className="space-y-2">
                <Label>Начальное снаряжение</Label>
                
                {/* Gold */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3">
                  <div>
                    <Label htmlFor="gold">Начальное золото (gp)</Label>
                    <Input
                      id="gold"
                      type="number"
                      value={editingClass.startingEquipment?.gold || 0}
                      onChange={(e) => setEditingClass({
                        ...editingClass,
                        startingEquipment: {
                          ...editingClass.startingEquipment,
                          equipment: editingClass.startingEquipment?.equipment || [],
                          gold: parseInt(e.target.value) || 0,
                        }
                      })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Add New Equipment Item */}
                <div className="space-y-3">
                  <div>
                    <Label>Выберите тип снаряжения для добавления</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button
                        variant={newEquipmentCategory === "weapon" ? "default" : "outline"}
                        onClick={() => setNewEquipmentCategory("weapon")}
                        className="gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Оружие
                      </Button>
                      <Button
                        variant={newEquipmentCategory === "armor" ? "default" : "outline"}
                        onClick={() => setNewEquipmentCategory("armor")}
                        className="gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Доспех
                      </Button>
                      <Button
                        variant={newEquipmentCategory === "gear" ? "default" : "outline"}
                        onClick={() => setNewEquipmentCategory("gear")}
                        className="gap-2"
                      >
                        <Scroll className="w-4 h-4" />
                        Снаряжение
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleAddEquipmentItem}
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить {newEquipmentCategory === "weapon" ? "оружие" : newEquipmentCategory === "armor" ? "доспех" : "снаряжение"}
                  </Button>
                </div>

                {/* Equipment Items List */}
                <div className="space-y-3">
                  {editingClass.startingEquipment?.equipment.map((item: EquipmentItem, index: number) => (
                    <EquipmentEditor
                      key={index}
                      item={item}
                      index={index}
                      onUpdate={handleUpdateEquipmentItem}
                      onRemove={handleRemoveEquipmentItem}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    resetCreateForm();
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSaveClass}
                  disabled={createClassMutation.isPending || updateClassMutation.isPending}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isCreateModalOpen ? "Создать" : "Сохранить"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
