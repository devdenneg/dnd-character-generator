import { useBackendClasses, useBackendEquipment } from "@/api/hooks";
import { classesApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import {
  Shield,
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
  Info,
  Sparkles,
  Swords,
  Backpack,
  Wand2,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { ElementType } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import type { AbilityName } from "@/types/character";
import { useLocation } from "react-router-dom";

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
  id: string;
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

interface Spellcasting {
  ability: AbilityName;
  cantripsKnown: number[];
  spellsKnown?: number[];
  spellSlots: number[][];
}

interface CharacterClass {
  id: string;
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
  equipment?: EquipmentItem[];
  startingGold?: number;
  startingEquipment?: StartingEquipment; // Keep for backward compatibility
  spellcasting?: Spellcasting;
}

interface EquipmentWithQuantity {
  equipmentId: string;
  quantity: number;
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
  equipment?: EquipmentWithQuantity[];
  startingGold?: number;
  startingEquipment?: StartingEquipment; // Keep for backward compatibility
  spellcasting?: Spellcasting;
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
        Выбрано: {selected.length}{" "}
        {selected.length === 1
          ? "пункт"
          : selected.length > 1 && selected.length < 5
          ? "пункта"
          : "пунктов"}
      </p>
    </div>
  );
}

interface ClassesPageProps {
  onBack?: () => void;
}

export function ClassesPage({ onBack }: ClassesPageProps) {
  const { data, isLoading, error, refetch } = useBackendClasses();
  const { user } = useAuth();
  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState("overview");
  const [activeTab, setActiveTab] = useState("basic");

  // Load equipment from backend
  const { data: equipmentData } = useBackendEquipment();
  const allEquipment = equipmentData?.data?.equipment || [];

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const cls = data?.data?.classes?.find(
          (c: CharacterClass) => c.externalId === hash
        );
        if (cls) {
          setSelectedClass(cls.id);
          const classElement = document.getElementById(`class-${cls.id}`);
          if (classElement) {
            classElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            classElement.classList.add("ring-2", "ring-primary");
            setTimeout(() => {
              classElement.classList.remove("ring-2", "ring-primary");
            }, 2000);
          }
        }
      }, 100);
    }
  }, [location.hash, data]);
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
    equipment: [],
    startingGold: 0,
    startingEquipment: {
      equipment: [],
      gold: 0,
    },
    spellcasting: undefined,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newFeature, setNewFeature] = useState<
    Pick<ClassFeature, "name" | "nameRu" | "description" | "level">
  >({
    name: "",
    nameRu: "",
    description: "",
    level: 1,
  });
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");
  const [equipmentCategoryFilter, setEquipmentCategoryFilter] = useState<string>("all");

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
      spellcasting: undefined,
    });
    setActiveTab("basic");
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
      primaryAbility: cls.primaryAbility,
      savingThrows: cls.savingThrows,
      armorProficiencies: cls.armorProficiencies,
      weaponProficiencies: cls.weaponProficiencies,
      skillChoices: cls.skillChoices,
      skillCount: cls.skillCount,
      subclassLevel: cls.subclassLevel,
      source: cls.source,
      features: cls.features,
      subclasses: cls.subclasses,
      equipment: cls.equipment?.map((e) => ({
        equipmentId: e.id,
        quantity: (e as any).quantity || 1,
      })) || [],
      startingGold: cls.startingGold || 0,
      startingEquipment: cls.startingEquipment || {
        equipment: [],
        gold: 0,
      },
      spellcasting: cls.spellcasting || undefined,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveClass = () => {
    if (
      !editingClass.externalId ||
      !editingClass.name ||
      !editingClass.nameRu ||
      !editingClass.description
    ) {
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

  // Functions for managing equipment from database
  const handleAddEquipmentFromDB = (equipmentId?: string) => {
    const idToAdd = equipmentId || selectedEquipmentId;
    if (!idToAdd) return;
    if (editingClass.equipment?.some(e => e.equipmentId === idToAdd)) return;
    setEditingClass({
      ...editingClass,
      equipment: [...(editingClass.equipment || []), { equipmentId: idToAdd, quantity: 1 }],
    });
    setSelectedEquipmentId("");
  };

  const handleRemoveEquipmentFromDB = (equipmentId: string) => {
    setEditingClass({
      ...editingClass,
      equipment: (editingClass.equipment || []).filter((e) => e.equipmentId !== equipmentId),
    });
  };

  const handleUpdateEquipmentQuantity = (equipmentId: string, delta: number) => {
    setEditingClass({
      ...editingClass,
      equipment: (editingClass.equipment || []).map((e) =>
        e.equipmentId === equipmentId
          ? { ...e, quantity: Math.max(1, e.quantity + delta) }
          : e
      ),
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
              Не удалось загрузить данные о классах с сервера. Пожалуйста,
              попробуйте позже.
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
    <>
      <div className="max-w-7xl mx-auto p-4 pt-8 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  ← Назад
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-foreground">Классы</h1>
                <p className="text-sm text-muted-foreground">
                  {classes.length} классов
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateClass} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Создать
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {classes.map((cls: CharacterClass, index: number) => {
            const Icon = CLASS_ICONS[cls.externalId] || Shield;

            return (
              <button
                key={cls.id + index}
                id={`class-${cls.id}`}
                onClick={() => setSelectedClass(cls.id)}
                className="w-full text-left p-4 rounded-lg border transition-all bg-card border-border hover:border-primary/50"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {cls.nameRu}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {cls.name}
                    </p>
                    <div className="flex items-center gap-1 flex-wrap mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        d{cls.hitDie}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {cls.primaryAbility.join(", ")}
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
            );
          })}
        </div>

        {/* Slide-over Drawer for Class Details */}
        {selectedClass && data?.data?.classes && (
          <SlideOverDrawer
            isOpen={!!selectedClass}
            onClose={() => setSelectedClass(null)}
            title={
              <div className="flex items-center gap-3">
                {(() => {
                  const cls = data.data.classes.find(
                    (c: CharacterClass) => c.id === selectedClass
                  );
                  const Icon = cls
                    ? CLASS_ICONS[cls.externalId] || Shield
                    : Shield;
                  return <Icon className="w-5 h-5 text-primary" />;
                })()}
                <span>
                  {data.data.classes.find(
                    (c: CharacterClass) => c.id === selectedClass
                  )?.nameRu || "Класс"}
                </span>
              </div>
            }
            actions={
              canEdit && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const cls = data.data.classes.find(
                        (c: CharacterClass) => c.id === selectedClass
                      );
                      if (cls) handleEditClass(cls);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      const cls = data.data.classes.find(
                        (c: CharacterClass) => c.id === selectedClass
                      );
                      if (
                        cls &&
                        confirm(
                          `Вы уверены, что хотите удалить класс "${cls.nameRu}"?`
                        )
                      ) {
                        deleteClassMutation.mutate(selectedClass);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          >
            {(() => {
              const cls = data.data.classes.find(
                (c: CharacterClass) => c.id === selectedClass
              );
              if (!cls) return null;

              const hasSpellcasting = !!cls.spellcasting;
              const hasSubclasses = cls.subclasses.length > 0;

              return (
                <div className="space-y-4">
                  {/* Tabs */}
                  <Tabs
                    value={viewTab}
                    onValueChange={setViewTab}
                    className="w-full"
                  >
                    <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                      <TabsTrigger
                        value="overview"
                        className="gap-2 whitespace-nowrap"
                      >
                        <Info className="w-4 h-4" />
                        Обзор
                      </TabsTrigger>
                      <TabsTrigger
                        value="stats"
                        className="gap-2 whitespace-nowrap"
                      >
                        <Sparkles className="w-4 h-4" />
                        Характеристики
                      </TabsTrigger>
                      <TabsTrigger
                        value="features"
                        className="gap-2 whitespace-nowrap"
                      >
                        <Swords className="w-4 h-4" />
                        Черты ({cls.features.length})
                      </TabsTrigger>
                      {hasSubclasses && (
                        <TabsTrigger
                          value="subclasses"
                          className="gap-2 whitespace-nowrap"
                        >
                          <Shield className="w-4 h-4" />
                          Подклассы ({cls.subclasses.length})
                        </TabsTrigger>
                      )}
                      <TabsTrigger
                        value="equipment"
                        className="gap-2 whitespace-nowrap"
                      >
                        <Backpack className="w-4 h-4" />
                        Снаряжение
                      </TabsTrigger>
                      {hasSpellcasting && (
                        <TabsTrigger
                          value="spellcasting"
                          className="gap-2 whitespace-nowrap"
                        >
                          <Wand2 className="w-4 h-4" />
                          Магия
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-4 space-y-4">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-xs text-muted-foreground block mb-1">
                            Кость хитов
                          </span>
                          <span className="text-lg font-bold text-primary">
                            d{cls.hitDie}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-xs text-muted-foreground block mb-1">
                            Основная характеристика
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {cls.primaryAbility.join(", ")}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-xs text-muted-foreground block mb-1">
                            Спасброски
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {cls.savingThrows.join(", ")}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-xs text-muted-foreground block mb-1">
                            Подкласс
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            с {cls.subclassLevel} уровня
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-sm">
                          Описание
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cls.description}
                        </p>
                      </div>
                    </TabsContent>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="mt-4 space-y-4">
                      {/* Skills */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                        <h4 className="font-medium text-foreground text-sm mb-2">
                          Навыки
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {cls.skillCount} из {cls.skillChoices.length} на
                          выбор:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cls.skillChoices.map(
                            (skill: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Proficiencies */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                          <h4 className="font-medium text-foreground text-sm mb-2">
                            Доспехи
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {cls.armorProficiencies.map(
                              (prof: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                >
                                  {prof}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                          <h4 className="font-medium text-foreground text-sm mb-2">
                            Оружие
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {cls.weaponProficiencies.map(
                              (prof: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                >
                                  {prof}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Features Tab */}
                    <TabsContent value="features" className="mt-4 space-y-3">
                      {cls.features.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Нет черт
                        </p>
                      ) : (
                        cls.features.map((feature: ClassFeature) => (
                          <div
                            key={feature.id}
                            className="p-3 rounded-xl bg-muted/30 border border-border/30"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h5 className="font-medium text-foreground text-sm">
                                {feature.nameRu}
                              </h5>
                              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0 ml-2">
                                Ур. {feature.level}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground/70 block mb-1">
                              {feature.name}
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        ))
                      )}
                    </TabsContent>

                    {/* Subclasses Tab */}
                    <TabsContent value="subclasses" className="mt-4 space-y-3">
                      {cls.subclasses.map((subclass: Subclass) => (
                        <div
                          key={subclass.id}
                          className="p-3 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <h5 className="font-medium text-foreground text-sm mb-1">
                            {subclass.nameRu}
                          </h5>
                          <span className="text-xs text-muted-foreground/70 block mb-1">
                            {subclass.name}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {subclass.description}
                          </p>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Equipment Tab */}
                    <TabsContent value="equipment" className="mt-4 space-y-3">
                      {/* Starting Gold */}
                      {cls.startingGold && cls.startingGold > 0 && (
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                          <span className="font-medium text-foreground text-sm">
                            🪙 {cls.startingGold} gp
                          </span>
                        </div>
                      )}

                      {/* Equipment from database */}
                      {cls.equipment && cls.equipment.length > 0 ? (
                        <div className="space-y-2">
                          {cls.equipment.map((item: EquipmentItem) => (
                            <div
                              key={item.id}
                              className="p-2 rounded bg-muted/30 border border-border/30"
                            >
                              <div className="text-sm font-medium">
                                {item.nameRu || item.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.cost.quantity} {item.cost.unit}
                                {item.weight && ` • ${item.weight} кг`}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Нет снаряжения
                        </p>
                      )}
                    </TabsContent>

                    {/* Spellcasting Tab */}
                    <TabsContent
                      value="spellcasting"
                      className="mt-4 space-y-4"
                    >
                      {cls.spellcasting ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                              <span className="text-xs text-muted-foreground block mb-1">
                                Базовая характеристика
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {cls.spellcasting.ability === "strength" &&
                                  "Сила"}
                                {cls.spellcasting.ability === "dexterity" &&
                                  "Ловкость"}
                                {cls.spellcasting.ability === "constitution" &&
                                  "Телосложение"}
                                {cls.spellcasting.ability === "intelligence" &&
                                  "Интеллект"}
                                {cls.spellcasting.ability === "wisdom" &&
                                  "Мудрость"}
                                {cls.spellcasting.ability === "charisma" &&
                                  "Харизма"}
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                              <span className="text-xs text-muted-foreground block mb-1">
                                Заговоры (максимум)
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {Math.max(...cls.spellcasting.cantripsKnown)}
                              </span>
                            </div>
                            {cls.spellcasting.spellsKnown && (
                              <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                                <span className="text-xs text-muted-foreground block mb-1">
                                  Известные заклинания (максимум)
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                  {Math.max(...cls.spellcasting.spellsKnown)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Spell Slots Table */}
                          {(() => {
                            const maxSpellLevel =
                              cls.spellcasting.spellSlots.reduce(
                                (max: number, level: number[]) =>
                                  Math.max(max, level.length),
                                0
                              );

                            return maxSpellLevel > 0 ? (
                              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                                <h4 className="font-medium text-foreground text-sm mb-3">
                                  Ячейки заклинаний
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="bg-muted/50">
                                        <th className="p-2 text-left font-medium min-w-[80px] text-xs">
                                          Ур. перс.
                                        </th>
                                        {Array.from(
                                          { length: maxSpellLevel },
                                          (_, i) => (
                                            <th
                                              key={i}
                                              className="p-1 text-center font-medium min-w-[30px] text-xs"
                                            >
                                              {i + 1}
                                            </th>
                                          )
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Array.from(
                                        { length: 20 },
                                        (_, charLevel) => {
                                          const rowHasData =
                                            cls?.spellcasting?.spellSlots[
                                              charLevel
                                            ] &&
                                            cls?.spellcasting?.spellSlots[
                                              charLevel
                                            ].some((slot: number) => slot > 0);

                                          return rowHasData ? (
                                            <tr
                                              key={charLevel}
                                              className="border-b border-border/30"
                                            >
                                              <td className="p-1 font-medium bg-muted/20 text-xs">
                                                {charLevel + 1}
                                              </td>
                                              {Array.from(
                                                { length: maxSpellLevel },
                                                (_, spellLevel) => (
                                                  <td
                                                    key={`${charLevel}-${spellLevel}`}
                                                    className="p-1 text-center text-xs"
                                                  >
                                                    {cls?.spellcasting
                                                      ?.spellSlots[charLevel]?.[
                                                      spellLevel
                                                    ] || 0}
                                                  </td>
                                                )
                                              )}
                                            </tr>
                                          ) : null;
                                        }
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null;
                          })()}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Класс не владеет магией
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              );
            })()}
          </SlideOverDrawer>
        )}

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-modal-content">
            <div className="bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen ? "Создать класс" : "Редактировать класс"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                  resetCreateForm();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="px-6 pt-4 border-b border-border/50">
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                  <TabsTrigger
                    value="basic"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Info className="w-4 h-4" />
                    Основное
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4" />
                    Характеристики
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Swords className="w-4 h-4" />
                    Черты ({editingClass.features.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="equipment"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Backpack className="w-4 h-4" />
                    Снаряжение (
                    {editingClass.startingEquipment?.equipment.length || 0})
                  </TabsTrigger>
                  <TabsTrigger
                    value="spellcasting"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Wand2 className="w-4 h-4" />
                    Магия
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* TAB: Основное */}
                <TabsContent value="basic" className="space-y-4 mt-0">
                  {/* External ID */}
                  <div className="space-y-2">
                    <Label htmlFor="externalId">Внешний ID *</Label>
                    <Input
                      id="externalId"
                      value={editingClass.externalId}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          externalId: e.target.value,
                        })
                      }
                      placeholder="Например: barbarian"
                      disabled={!isCreateModalOpen}
                    />
                    <p className="text-xs text-muted-foreground">
                      Уникальный идентификатор, используется в коде. Можно
                      изменить только при создании.
                    </p>
                  </div>

                  {/* Name (Russian) */}
                  <div className="space-y-2">
                    <Label htmlFor="nameRu">Название (русский) *</Label>
                    <Input
                      id="nameRu"
                      value={editingClass.nameRu}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          nameRu: e.target.value,
                        })
                      }
                      placeholder="Например: Варвар"
                    />
                  </div>

                  {/* Name (English) */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Название (английский) *</Label>
                    <Input
                      id="name"
                      value={editingClass.name}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          name: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          hitDie: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                      id="description"
                      value={editingClass.description}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          description: e.target.value,
                        })
                      }
                      placeholder="Описание класса..."
                      rows={4}
                    />
                  </div>

                  {/* Subclass Level */}
                  <div className="space-y-2">
                    <Label htmlFor="subclassLevel">
                      Уровень получения подкласса (Subclass Level)
                    </Label>
                    <Input
                      id="subclassLevel"
                      type="number"
                      value={editingClass.subclassLevel}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          subclassLevel: parseInt(e.target.value) || 1,
                        })
                      }
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
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          source: e.target.value,
                        })
                      }
                    />
                  </div>
                </TabsContent>

                {/* TAB: Характеристики */}
                <TabsContent value="stats" className="space-y-4 mt-0">
                  {/* Primary Ability */}
                  <MultiSelect
                    label="Основная характеристика (Primary Ability)"
                    options={ABILITY_OPTIONS}
                    selected={editingClass.primaryAbility}
                    onChange={(selected) =>
                      setEditingClass({
                        ...editingClass,
                        primaryAbility: selected,
                      })
                    }
                  />

                  {/* Saving Throws */}
                  <MultiSelect
                    label="Спасброски (Saving Throws)"
                    options={ABILITY_OPTIONS}
                    selected={editingClass.savingThrows}
                    onChange={(selected) =>
                      setEditingClass({
                        ...editingClass,
                        savingThrows: selected,
                      })
                    }
                  />

                  {/* Armor Proficiencies */}
                  <MultiSelect
                    label="Владение доспехами (Armor Proficiencies)"
                    options={ARMOR_PROFICIENCY_OPTIONS}
                    selected={editingClass.armorProficiencies}
                    onChange={(selected) =>
                      setEditingClass({
                        ...editingClass,
                        armorProficiencies: selected,
                      })
                    }
                  />

                  {/* Weapon Proficiencies */}
                  <MultiSelect
                    label="Владение оружием (Weapon Proficiencies)"
                    options={WEAPON_PROFICIENCY_OPTIONS}
                    selected={editingClass.weaponProficiencies}
                    onChange={(selected) =>
                      setEditingClass({
                        ...editingClass,
                        weaponProficiencies: selected,
                      })
                    }
                  />

                  {/* Skill Choices */}
                  <MultiSelect
                    label="Навыки на выбор (Skill Choices)"
                    options={SKILL_OPTIONS}
                    selected={editingClass.skillChoices}
                    onChange={(selected) =>
                      setEditingClass({
                        ...editingClass,
                        skillChoices: selected,
                      })
                    }
                  />

                  {/* Skill Count */}
                  <div className="space-y-2">
                    <Label htmlFor="skillCount">
                      Количество навыков на выбор (Skill Count)
                    </Label>
                    <Input
                      id="skillCount"
                      type="number"
                      value={editingClass.skillCount}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          skillCount: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="Количество навыков"
                      min="0"
                    />
                  </div>
                </TabsContent>

                {/* TAB: Черты класса */}
                <TabsContent value="features" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Черты класса
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {editingClass.features.length}{" "}
                      {editingClass.features.length === 1
                        ? "черта"
                        : editingClass.features.length > 1 &&
                          editingClass.features.length < 5
                        ? "черты"
                        : "черт"}
                    </span>
                  </div>

                  {/* Add New Feature Form */}
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/30 space-y-4">
                    <h5 className="font-semibold text-foreground text-base flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Добавить новую черту
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newFeatureName" className="text-sm">
                          Название черты (английский) *
                        </Label>
                        <Input
                          id="newFeatureName"
                          value={newFeature.name}
                          onChange={(e) =>
                            setNewFeature({
                              ...newFeature,
                              name: e.target.value,
                            })
                          }
                          placeholder="Например: Rage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newFeatureNameRu" className="text-sm">
                          Название черты (русский) *
                        </Label>
                        <Input
                          id="newFeatureNameRu"
                          value={newFeature.nameRu}
                          onChange={(e) =>
                            setNewFeature({
                              ...newFeature,
                              nameRu: e.target.value,
                            })
                          }
                          placeholder="Например: Ярость"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newFeatureLevel" className="text-sm">
                          Уровень получения черты *
                        </Label>
                        <Input
                          id="newFeatureLevel"
                          type="number"
                          value={newFeature.level}
                          onChange={(e) =>
                            setNewFeature({
                              ...newFeature,
                              level: parseInt(e.target.value) || 1,
                            })
                          }
                          placeholder="Уровень"
                          min="1"
                          max="20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newFeatureDesc" className="text-sm">
                        Описание черты *
                      </Label>
                      <Textarea
                        id="newFeatureDesc"
                        value={newFeature.description}
                        onChange={(e) =>
                          setNewFeature({
                            ...newFeature,
                            description: e.target.value,
                          })
                        }
                        placeholder="Опишите эффект этой черты..."
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleAddFeature}
                      className="w-full gap-2"
                      disabled={
                        !newFeature.name ||
                        !newFeature.nameRu ||
                        !newFeature.description
                      }
                    >
                      <Plus className="w-4 h-4" />
                      Добавить черту
                    </Button>
                  </div>

                  {/* Existing Features List */}
                  {editingClass.features.length > 0 && (
                    <div className="space-y-3">
                      <h6 className="text-sm font-medium text-muted-foreground">
                        Список черт:
                      </h6>
                      {editingClass.features.map(
                        (feature: ClassFeature, index: number) => (
                          <div
                            key={feature.id || index}
                            className="p-4 rounded-xl bg-card border border-border/50 space-y-3"
                          >
                            <div className="flex items-start justify-between pb-3 border-b border-border/30">
                              <h5 className="font-medium text-foreground text-base">
                                Черта #{index + 1}
                              </h5>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2"
                                onClick={() =>
                                  handleRemoveFeature(
                                    feature.id || index.toString()
                                  )
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`feature-name-${index}`}
                                  className="text-xs"
                                >
                                  Название (английский)
                                </Label>
                                <Input
                                  id={`feature-name-${index}`}
                                  value={feature.name}
                                  onChange={(e) => {
                                    const featuresArray =
                                      editingClass.features || [];
                                    const updatedFeatures = [...featuresArray];
                                    updatedFeatures[index] = {
                                      ...updatedFeatures[index],
                                      name: e.target.value,
                                    };
                                    setEditingClass({
                                      ...editingClass,
                                      features: updatedFeatures,
                                    });
                                  }}
                                  placeholder="Название (англ)"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`feature-nameRu-${index}`}
                                  className="text-xs"
                                >
                                  Название (русский)
                                </Label>
                                <Input
                                  id={`feature-nameRu-${index}`}
                                  value={feature.nameRu}
                                  onChange={(e) => {
                                    const featuresArray =
                                      editingClass.features || [];
                                    const updatedFeatures = [...featuresArray];
                                    updatedFeatures[index] = {
                                      ...updatedFeatures[index],
                                      nameRu: e.target.value,
                                    };
                                    setEditingClass({
                                      ...editingClass,
                                      features: updatedFeatures,
                                    });
                                  }}
                                  placeholder="Название (рус)"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`feature-level-${index}`}
                                  className="text-xs"
                                >
                                  Уровень получения
                                </Label>
                                <Input
                                  id={`feature-level-${index}`}
                                  type="number"
                                  value={feature.level}
                                  onChange={(e) => {
                                    const featuresArray =
                                      editingClass.features || [];
                                    const updatedFeatures = [...featuresArray];
                                    updatedFeatures[index] = {
                                      ...updatedFeatures[index],
                                      level: parseInt(e.target.value) || 1,
                                    };
                                    setEditingClass({
                                      ...editingClass,
                                      features: updatedFeatures,
                                    });
                                  }}
                                  placeholder="Уровень"
                                  min="1"
                                  max="20"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`feature-desc-${index}`}
                                className="text-xs"
                              >
                                Описание
                              </Label>
                              <Textarea
                                id={`feature-desc-${index}`}
                                value={feature.description}
                                onChange={(e) => {
                                  const featuresArray =
                                    editingClass.features || [];
                                  const updatedFeatures = [...featuresArray];
                                  updatedFeatures[index] = {
                                    ...updatedFeatures[index],
                                    description: e.target.value,
                                  };
                                  setEditingClass({
                                    ...editingClass,
                                    features: updatedFeatures,
                                  });
                                }}
                                placeholder="Описание черты"
                                rows={2}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* TAB: Начальное снаряжение */}
                <TabsContent value="equipment" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Начальное снаряжение
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {editingClass.equipment?.length || 0}{" "}
                      {(editingClass.equipment?.length || 0) === 1
                        ? "предмет"
                        : (editingClass.equipment?.length || 0) > 1 &&
                          (editingClass.equipment?.length || 0) < 5
                        ? "предмета"
                        : "предметов"}
                    </span>
                  </div>

                  {/* Starting Gold */}
                  <div className="space-y-2">
                    <Label htmlFor="startingGold">Начальное золото (gp)</Label>
                    <Input
                      id="startingGold"
                      type="number"
                      value={editingClass.startingGold || 0}
                      onChange={(e) =>
                        setEditingClass({
                          ...editingClass,
                          startingGold: parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                    />
                  </div>

                  {/* Equipment from Database */}
                  <div className="space-y-3">
                    <Label>Снаряжение из базы данных</Label>

                    {/* Search and Filter */}
                    <div className="space-y-2">
                      <Input
                        placeholder="Поиск снаряжения..."
                        value={equipmentSearchQuery}
                        onChange={(e) => setEquipmentSearchQuery(e.target.value)}
                      />

                      <div className="flex gap-2 flex-wrap">
                        <Button
                          type="button"
                          size="sm"
                          variant={equipmentCategoryFilter === "all" ? "default" : "outline"}
                          onClick={() => setEquipmentCategoryFilter("all")}
                        >
                          Все
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={equipmentCategoryFilter === "weapon" ? "default" : "outline"}
                          onClick={() => setEquipmentCategoryFilter("weapon")}
                        >
                          Оружие
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={equipmentCategoryFilter === "armor" ? "default" : "outline"}
                          onClick={() => setEquipmentCategoryFilter("armor")}
                        >
                          Доспехи
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={equipmentCategoryFilter === "gear" ? "default" : "outline"}
                          onClick={() => setEquipmentCategoryFilter("gear")}
                        >
                          Снаряжение
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={equipmentCategoryFilter === "tool" ? "default" : "outline"}
                          onClick={() => setEquipmentCategoryFilter("tool")}
                        >
                          Инструменты
                        </Button>
                      </div>
                    </div>

                    {/* Equipment List */}
                    <div className="max-h-64 overflow-y-auto border rounded-lg">
                      {allEquipment
                        .filter((eq: EquipmentItem) => {
                          // Filter by category
                          if (equipmentCategoryFilter !== "all" && eq.category !== equipmentCategoryFilter) {
                            return false;
                          }
                          // Filter by search query
                          if (equipmentSearchQuery) {
                            const query = equipmentSearchQuery.toLowerCase();
                            return (
                              eq.name.toLowerCase().includes(query) ||
                              eq.nameRu.toLowerCase().includes(query)
                            );
                          }
                          // Don't show already selected items
                          return !editingClass.equipment?.some(e => e.equipmentId === eq.id);
                        })
                        .map((eq: EquipmentItem) => (
                          <button
                            key={eq.id}
                            type="button"
                            onClick={() => {
                              handleAddEquipmentFromDB(eq.id);
                              setEquipmentSearchQuery("");
                            }}
                            className="w-full text-left p-3 hover:bg-muted/50 border-b last:border-b-0 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">
                                  {eq.nameRu || eq.name}
                                </div>
                                {eq.nameRu && eq.name && (
                                  <div className="text-xs text-muted-foreground">
                                    {eq.name}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                                    {eq.category === "weapon" && "Оружие"}
                                    {eq.category === "armor" && "Доспех"}
                                    {eq.category === "gear" && "Снаряжение"}
                                    {eq.category === "tool" && "Инструмент"}
                                    {eq.category === "pack" && "Набор"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {eq.cost.quantity} {eq.cost.unit}
                                  </span>
                                  {eq.weight && (
                                    <span className="text-xs text-muted-foreground">
                                      {eq.weight} кг
                                    </span>
                                  )}
                                </div>
                                {/* Additional info for weapons */}
                                {eq.category === "weapon" && eq.damage && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Урон: {eq.damage.dice} ({eq.damage.type})
                                  </div>
                                )}
                                {/* Additional info for armor */}
                                {eq.category === "armor" && eq.armorClass && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    AC: {eq.armorClass} • {eq.armorType}
                                  </div>
                                )}
                              </div>
                              <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </div>
                          </button>
                        ))}
                      {allEquipment.filter((eq: EquipmentItem) => {
                        if (equipmentCategoryFilter !== "all" && eq.category !== equipmentCategoryFilter) {
                          return false;
                        }
                        if (equipmentSearchQuery) {
                          const query = equipmentSearchQuery.toLowerCase();
                          return (
                            eq.name.toLowerCase().includes(query) ||
                            eq.nameRu.toLowerCase().includes(query)
                          );
                        }
                        return !editingClass.equipmentIds?.includes(eq.id);
                      }).length === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          Снаряжение не найдено
                        </div>
                      )}
                    </div>

                    {/* Selected Equipment */}
                    {editingClass.equipment && editingClass.equipment.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm">Выбранное снаряжение ({editingClass.equipment.length})</Label>
                        {editingClass.equipment.map((item) => {
                          const equipment = allEquipment.find((e: EquipmentItem) => e.id === item.equipmentId);
                          if (!equipment) return null;
                          return (
                            <div
                              key={item.equipmentId}
                              className="flex items-center justify-between p-2 rounded bg-muted gap-2"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {equipment.nameRu || equipment.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {equipment.cost.quantity} {equipment.cost.unit}
                                  {equipment.weight && ` • ${equipment.weight} кг × ${item.quantity} = ${(equipment.weight * item.quantity).toFixed(1)} кг`}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={() => handleUpdateEquipmentQuantity(item.equipmentId, -1)}
                                    disabled={item.quantity <= 1}
                                    type="button"
                                  >
                                    -
                                  </Button>
                                  <span className="text-sm font-medium min-w-[2ch] text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={() => handleUpdateEquipmentQuantity(item.equipmentId, 1)}
                                    type="button"
                                  >
                                    +
                                  </Button>
                                </div>
                                <button
                                  onClick={() => handleRemoveEquipmentFromDB(item.equipmentId)}
                                  className="hover:text-destructive"
                                  type="button"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* TAB: Магия/Spellcasting */}
                <TabsContent value="spellcasting" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Владение заклинаниями (Spellcasting)
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {editingClass.spellcasting ? "Включено" : "Отключено"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-4">
                    {/* Toggle Spellcasting */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasSpellcasting"
                        checked={!!editingClass.spellcasting}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditingClass({
                              ...editingClass,
                              spellcasting: {
                                ability: "charisma",
                                cantripsKnown: Array(20).fill(0),
                                spellsKnown: Array(20).fill(0),
                                spellSlots: Array(20)
                                  .fill(null)
                                  .map(() => []), // 20 character levels, each with array of spell slots
                              },
                            });
                          } else {
                            setEditingClass({
                              ...editingClass,
                              spellcasting: undefined,
                            });
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="hasSpellcasting" className="text-sm">
                        Этот класс может колдовать заклинания
                      </Label>
                    </div>

                    {/* Spellcasting Fields */}
                    {editingClass.spellcasting && (
                      <>
                        {/* Ability */}
                        <div className="space-y-2">
                          <Label htmlFor="spellcastingAbility">
                            Базовая характеристика *
                          </Label>
                          <Select
                            id="spellcastingAbility"
                            options={ABILITY_OPTIONS}
                            value={editingClass.spellcasting.ability}
                            placeholder="Выберите характеристику"
                            onChange={(e) =>
                              setEditingClass({
                                ...editingClass,
                                spellcasting: {
                                  ...editingClass.spellcasting!,
                                  ability: e.target.value as AbilityName,
                                },
                              })
                            }
                          />
                        </div>

                        {/* Cantrips Known - 20 levels */}
                        <div className="space-y-2">
                          <Label>
                            Заговоры на каждый уровень (Cantrips Known)
                          </Label>
                          <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                            {editingClass.spellcasting.cantripsKnown.map(
                              (count: number, levelIndex: number) => (
                                <div
                                  key={`cantrip-level-${levelIndex}`}
                                  className="space-y-1"
                                >
                                  <Label
                                    htmlFor={`cantrip-${levelIndex}`}
                                    className="text-xs"
                                  >
                                    Ур. {levelIndex + 1}
                                  </Label>
                                  <Input
                                    id={`cantrip-${levelIndex}`}
                                    type="number"
                                    value={count}
                                    onChange={(e) => {
                                      const newCantrips = [
                                        ...editingClass.spellcasting!
                                          .cantripsKnown,
                                      ];
                                      newCantrips[levelIndex] =
                                        parseInt(e.target.value) || 0;
                                      setEditingClass({
                                        ...editingClass,
                                        spellcasting: {
                                          ...editingClass.spellcasting!,
                                          cantripsKnown: newCantrips,
                                        },
                                      });
                                    }}
                                    placeholder="0"
                                    min="0"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Spells Known - 20 levels (optional) */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="hasSpellsKnown"
                              checked={
                                editingClass.spellcasting.spellsKnown !==
                                undefined
                              }
                              onChange={(e) => {
                                setEditingClass({
                                  ...editingClass,
                                  spellcasting: {
                                    ...editingClass.spellcasting!,
                                    spellsKnown: e.target.checked
                                      ? Array(20).fill(0)
                                      : undefined,
                                  },
                                });
                              }}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="hasSpellsKnown" className="text-sm">
                              Известные заклинания на каждый уровень (Spells
                              Known)
                            </Label>
                          </div>

                          {editingClass.spellcasting.spellsKnown !==
                            undefined && (
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                              {editingClass.spellcasting.spellsKnown.map(
                                (count: number, levelIndex: number) => (
                                  <div
                                    key={`spell-level-${levelIndex}`}
                                    className="space-y-1"
                                  >
                                    <Label
                                      htmlFor={`spell-${levelIndex}`}
                                      className="text-xs"
                                    >
                                      Ур. {levelIndex + 1}
                                    </Label>
                                    <Input
                                      id={`spell-${levelIndex}`}
                                      type="number"
                                      value={count}
                                      onChange={(e) => {
                                        const newSpells = [
                                          ...editingClass.spellcasting!
                                            .spellsKnown!,
                                        ];
                                        newSpells[levelIndex] =
                                          parseInt(e.target.value) || 0;
                                        setEditingClass({
                                          ...editingClass,
                                          spellcasting: {
                                            ...editingClass.spellcasting!,
                                            spellsKnown: newSpells,
                                          },
                                        });
                                      }}
                                      placeholder="0"
                                      min="0"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {/* Spell Slots - dynamic spell levels x 20 character levels */}
                        <div className="space-y-2">
                          <Label>Ячейки заклинаний (Spell Slots)</Label>
                          {(() => {
                            // Calculate maximum spell level from data
                            const maxSpellLevel =
                              editingClass.spellcasting!.spellSlots.reduce(
                                (max, level) => Math.max(max, level.length),
                                0
                              );

                            return (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="bg-muted/50">
                                      <th className="p-2 text-left font-medium min-w-[100px]">
                                        Уровень персонажа \u2192 Уровень
                                        заклинания
                                      </th>
                                      {Array.from(
                                        { length: maxSpellLevel },
                                        (_, i) => (
                                          <th
                                            key={i}
                                            className="p-2 text-center font-medium min-w-[40px]"
                                          >
                                            {i + 1}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.from(
                                      { length: 20 },
                                      (_, charLevel) => (
                                        <tr
                                          key={charLevel}
                                          className="border-b border-border/30"
                                        >
                                          <td className="p-2 font-medium bg-muted/20">
                                            {charLevel + 1}
                                          </td>
                                          {Array.from(
                                            { length: maxSpellLevel },
                                            (_, spellLevel) => (
                                              <td
                                                key={`${charLevel}-${spellLevel}`}
                                                className="p-1"
                                              >
                                                <Input
                                                  type="number"
                                                  value={
                                                    editingClass.spellcasting!
                                                      .spellSlots[charLevel]?.[
                                                      spellLevel
                                                    ] || 0
                                                  }
                                                  onChange={(e) => {
                                                    const newSpellSlots = [
                                                      ...editingClass.spellcasting!
                                                        .spellSlots,
                                                    ];
                                                    // Ensure array exists for this character level
                                                    if (
                                                      !newSpellSlots[charLevel]
                                                    ) {
                                                      newSpellSlots[charLevel] =
                                                        [];
                                                    }
                                                    newSpellSlots[charLevel][
                                                      spellLevel
                                                    ] =
                                                      parseInt(
                                                        e.target.value
                                                      ) || 0;
                                                    setEditingClass({
                                                      ...editingClass,
                                                      spellcasting: {
                                                        ...editingClass.spellcasting!,
                                                        spellSlots:
                                                          newSpellSlots,
                                                      },
                                                    });
                                                  }}
                                                  placeholder="0"
                                                  min="0"
                                                  className="w-full text-center"
                                                />
                                              </td>
                                            )
                                          )}
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })()}
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/50 px-6 pb-6 bg-card">
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
                  disabled={
                    createClassMutation.isPending ||
                    updateClassMutation.isPending
                  }
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isCreateModalOpen ? "Создать" : "Сохранить"}
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}
