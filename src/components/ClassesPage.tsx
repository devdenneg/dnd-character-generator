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

const SOURCES = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

const ABILITIES = [
  { value: "strength", label: "Сила" },
  { value: "dexterity", label: "Ловкость" },
  { value: "constitution", label: "Телосложение" },
  { value: "intelligence", label: "Интеллект" },
  { value: "wisdom", label: "Мудрость" },
  { value: "charisma", label: "Харизма" },
];

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
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newFeature, setNewFeature] = useState<Pick<ClassFeature, "name" | "nameRu" | "description" | "level">>({
    name: "",
    nameRu: "",
    description: "",
    level: 1,
  });
  const [selectedSubclass, setSelectedSubclass] = useState<number | null>(null);

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
                    <p className="text-sm text-muted-foreground mb-4">
                      {cls.description}
                    </p>

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
                    <div className="space-y-3">
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
