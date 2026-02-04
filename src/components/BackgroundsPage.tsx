import { useBackendBackgroundsMeta, useBackendEquipmentMeta, useBackendBackground } from "@/api/hooks";
import { backgroundsApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import {
  BookOpen,
  Briefcase,
  Scroll,
  Crown,
  Swords,
  Ship,
  TreePine,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { ElementType } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

// Types
interface Equipment {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  category: string;
  cost: { quantity: number; unit: string };
  weight?: number;
  source: string;
}

interface Background {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  equipment: Equipment[];
  startingGold: number;
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];
    amount: number[];
  };
  source: string;
}

interface EquipmentWithQuantity {
  equipmentId: string;
  quantity: number;
}

interface BackgroundFormData {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  equipment: EquipmentWithQuantity[];
  startingGold: number;
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];
    amount: number[];
  };
  source: string;
}

const BACKGROUND_ICONS: Record<string, ElementType> = {
  acolyte: Scroll,
  artisan: Briefcase,
  charlatan: BookOpen,
  criminal: Swords,
  entertainer: BookOpen,
  farmer: TreePine,
  guard: Swords,
  guide: TreePine,
  hermit: Scroll,
  merchant: Briefcase,
  noble: Crown,
  sage: BookOpen,
  sailor: Ship,
  scribe: Scroll,
  soldier: Swords,
  wayfarer: TreePine,
};

const SOURCES = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

const SKILLS = [
  { value: "acrobatics", label: "Акробатика" },
  { value: "animal_handling", label: "Уход за животными" },
  { value: "arcana", label: "Магия" },
  { value: "athletics", label: "Атлетика" },
  { value: "deception", label: "Обман" },
  { value: "history", label: "История" },
  { value: "insight", label: "Проницательность" },
  { value: "intimidation", label: "Запугивание" },
  { value: "investigation", label: "Расследование" },
  { value: "medicine", label: "Медицина" },
  { value: "nature", label: "Природа" },
  { value: "perception", label: "Внимательность" },
  { value: "performance", label: "Выступление" },
  { value: "persuasion", label: "Убеждение" },
  { value: "religion", label: "Религия" },
  { value: "sleight_of_hand", label: "Ловкость рук" },
  { value: "stealth", label: "Скрытность" },
  { value: "survival", label: "Выживание" },
];

const ABILITIES = [
  { value: "strength", label: "Сила" },
  { value: "dexterity", label: "Ловкость" },
  { value: "constitution", label: "Телосложение" },
  { value: "intelligence", label: "Интеллект" },
  { value: "wisdom", label: "Мудрость" },
  { value: "charisma", label: "Харизма" },
];

interface BackgroundsPageProps {
  onBack?: () => void;
}

export function BackgroundsPage({ onBack }: BackgroundsPageProps) {
  const { data, isLoading, error, refetch } = useBackendBackgroundsMeta();
  const { user } = useAuth();
  const location = useLocation();
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const bg = data?.data?.backgrounds?.find(
          (b: Background) => b.externalId === hash
        );
        if (bg) {
          setSelectedBackground(bg.id);
          const bgElement = document.getElementById(`background-${bg.id}`);
          if (bgElement) {
            bgElement.scrollIntoView({ behavior: "smooth", block: "center" });
            bgElement.classList.add("ring-2", "ring-primary");
            setTimeout(() => {
              bgElement.classList.remove("ring-2", "ring-primary");
            }, 2000);
          }
        }
      }, 100);
    }
  }, [location.hash, data]);

  // Load full background data when selected
  const { data: selectedBackgroundData, isLoading: isLoadingSelectedBackground } = useBackendBackground(selectedBackground || "");

  const [editingBackground, setEditingBackground] =
    useState<BackgroundFormData>({
      externalId: "",
      name: "",
      nameRu: "",
      description: "",
      skillProficiencies: [],
      toolProficiencies: [],
      languages: 0,
      equipment: [],
      startingGold: 0,
      originFeat: "",
      abilityScoreIncrease: {
        options: [],
        amount: [],
      },
      source: "phb2024",
    });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [newTool, setNewTool] = useState("");
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");
  const [equipmentCategoryFilter, setEquipmentCategoryFilter] = useState<string>("all");

  // Load equipment from backend only when needed (in edit/create mode)
  const { data: equipmentData } = useBackendEquipmentMeta(undefined, isCreateModalOpen || isEditModalOpen);
  const allEquipment = equipmentData?.data?.equipment || [];

  // Create background mutation
  const createBackgroundMutation = useMutation({
    mutationFn: (data: BackgroundFormData) => backgroundsApi.create(data),
    onSuccess: () => {
      refetch();
      setIsCreateModalOpen(false);
      resetCreateForm();
    },
  });

  // Update background mutation
  const updateBackgroundMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BackgroundFormData }) =>
      backgroundsApi.update(id, data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedBackground(null);
      resetCreateForm();
    },
  });

  // Delete background mutation
  const deleteBackgroundMutation = useMutation({
    mutationFn: backgroundsApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedBackground(null);
      resetCreateForm();
    },
  });

  const resetCreateForm = () => {
    setEditingBackground({
      externalId: "",
      name: "",
      nameRu: "",
      description: "",
      skillProficiencies: [],
      toolProficiencies: [],
      languages: 0,
      equipment: [],
      startingGold: 0,
      originFeat: "",
      abilityScoreIncrease: {
        options: [],
        amount: [],
      },
      source: "phb2024",
    });
  };

  const handleCreateBackground = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleEditBackground = (background: Background) => {
    setEditingBackground({
      externalId: background.externalId,
      name: background.name,
      nameRu: background.nameRu,
      description: background.description,
      skillProficiencies: background.skillProficiencies,
      toolProficiencies: background.toolProficiencies,
      languages: background.languages,
      equipment: background.equipment.map((e) => ({
        equipmentId: e.id,
        quantity: (e as any).quantity || 1,
      })),
      startingGold: background.startingGold,
      originFeat: background.originFeat,
      abilityScoreIncrease: background.abilityScoreIncrease,
      source: background.source,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveBackground = () => {
    if (
      !editingBackground.externalId ||
      !editingBackground.name ||
      !editingBackground.nameRu ||
      !editingBackground.description
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (isCreateModalOpen) {
      createBackgroundMutation.mutate(editingBackground);
    } else {
      updateBackgroundMutation.mutate({
        id: selectedBackground!,
        data: editingBackground,
      });
    }
  };

  const handleAddEquipment = (equipmentId?: string) => {
    const idToAdd = equipmentId || selectedEquipmentId;
    if (!idToAdd) return;
    if (editingBackground.equipment.some(e => e.equipmentId === idToAdd)) return;
    setEditingBackground({
      ...editingBackground,
      equipment: [...editingBackground.equipment, { equipmentId: idToAdd, quantity: 1 }],
    });
    setSelectedEquipmentId("");
    setEquipmentSearchQuery("");
  };

  const handleRemoveEquipment = (equipmentId: string) => {
    setEditingBackground({
      ...editingBackground,
      equipment: editingBackground.equipment.filter((e) => e.equipmentId !== equipmentId),
    });
  };

  const handleUpdateEquipmentQuantity = (equipmentId: string, delta: number) => {
    setEditingBackground({
      ...editingBackground,
      equipment: editingBackground.equipment.map((e) =>
        e.equipmentId === equipmentId
          ? { ...e, quantity: Math.max(1, e.quantity + delta) }
          : e
      ),
    });
  };

  const handleAddTool = () => {
    if (!newTool.trim()) return;
    setEditingBackground({
      ...editingBackground,
      toolProficiencies: [
        ...editingBackground.toolProficiencies,
        newTool.trim(),
      ],
    });
    setNewTool("");
  };

  const handleRemoveTool = (index: number) => {
    setEditingBackground({
      ...editingBackground,
      toolProficiencies: editingBackground.toolProficiencies.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleSkillToggle = (skill: string) => {
    const skills = editingBackground.skillProficiencies;
    if (skills.includes(skill)) {
      setEditingBackground({
        ...editingBackground,
        skillProficiencies: skills.filter((s) => s !== skill),
      });
    } else {
      setEditingBackground({
        ...editingBackground,
        skillProficiencies: [...skills, skill],
      });
    }
  };

  const handleAbilityToggle = (ability: string) => {
    const abilities = editingBackground.abilityScoreIncrease.options;
    if (abilities.includes(ability)) {
      setEditingBackground({
        ...editingBackground,
        abilityScoreIncrease: {
          ...editingBackground.abilityScoreIncrease,
          options: abilities.filter((a) => a !== ability),
        },
      });
    } else {
      setEditingBackground({
        ...editingBackground,
        abilityScoreIncrease: {
          ...editingBackground.abilityScoreIncrease,
          options: [...abilities, ability],
        },
      });
    }
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
              Ошибка загрузки предысторий
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о предысториях с сервера. Пожалуйста,
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

  const backgrounds = data?.data?.backgrounds || [];

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
                <h1 className="text-2xl font-bold text-foreground">
                  Предыстории
                </h1>
                <p className="text-sm text-muted-foreground">
                  {backgrounds.length} предысторий
                </p>
              </div>
            </div>

            {canEdit && (
              <Button
                onClick={handleCreateBackground}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Создать
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {backgrounds.map((background: Background, index: number) => {
            const Icon = BACKGROUND_ICONS[background.externalId] || BookOpen;

            return (
              <button
                key={background.id + index}
                id={`background-${background.id}`}
                onClick={() => setSelectedBackground(background.id)}
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
                      {background.nameRu}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {background.name}
                    </p>
                    <div className="flex items-center gap-1 flex-wrap mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {background.skillProficiencies.length} навыка
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {background.startingGold} зм
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                        {background.languages} языков
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Slide-over Drawer for Background Details */}
        {selectedBackground && (
          <SlideOverDrawer
            isOpen={!!selectedBackground}
            onClose={() => setSelectedBackground(null)}
            title={
              <div className="flex items-center gap-3">
                {(() => {
                  const bg = selectedBackgroundData?.data?.background ||
                    data?.data?.backgrounds?.find((b: Background) => b.id === selectedBackground);
                  const Icon = bg
                    ? BACKGROUND_ICONS[bg.externalId] || BookOpen
                    : BookOpen;
                  return <Icon className="w-5 h-5 text-primary" />;
                })()}
                <span>
                  {(selectedBackgroundData?.data?.background ||
                    data?.data?.backgrounds?.find((b: Background) => b.id === selectedBackground))?.nameRu || "Предыстория"}
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
                      const bg = selectedBackgroundData?.data?.background ||
                        data?.data?.backgrounds?.find((b: Background) => b.id === selectedBackground);
                      if (bg) handleEditBackground(bg);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      const bg = selectedBackgroundData?.data?.background ||
                        data?.data?.backgrounds?.find((b: Background) => b.id === selectedBackground);
                      if (
                        bg &&
                        confirm(
                          `Вы уверены, что хотите удалить предысторию "${bg.nameRu}"?`
                        )
                      ) {
                        deleteBackgroundMutation.mutate(selectedBackground);
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
              if (isLoadingSelectedBackground) {
                return (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                );
              }

              const background = selectedBackgroundData?.data?.background;
              if (!background) return null;

              return (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Описание
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {background.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Skill Proficiencies */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Владение навыками
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {background.skillProficiencies.map((skill: string) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                          >
                            {SKILLS.find((s) => s.value === skill)?.label ||
                              skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tool Proficiencies */}
                    {background.toolProficiencies.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          Владение инструментами
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {background.toolProficiencies.map(
                            (tool: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
                              >
                                {tool}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Equipment */}
                    {background.equipment.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          Снаряжение
                        </h4>
                        <div className="space-y-2">
                          {background.equipment.map(
                            (item: Equipment) => (
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
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Origin Feat */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Черта происхождения
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {background.originFeat}
                      </p>
                    </div>

                    {/* Ability Score Increase */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Увеличение характеристик
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {background.abilityScoreIncrease.options.map(
                          (ability: string, idx: number) => (
                            <span
                              key={ability}
                              className="text-xs px-2 py-1 rounded bg-muted/50"
                            >
                              {ABILITIES.find((a) => a.value === ability)
                                ?.label || ability}
                              {background.abilityScoreIncrease.amount[idx] >
                                0 &&
                                ` +${background.abilityScoreIncrease.amount[idx]}`}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </SlideOverDrawer>
        )}

        {backgrounds.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нет предысторий
            </h3>
            <p className="text-sm text-muted-foreground">
              Предыстории пока не загружены
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-content">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen
                  ? "Создать предысторию"
                  : "Редактировать предысторию"}
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

            <div className="p-6 space-y-4">
              {/* External ID */}
              <div className="space-y-2">
                <Label htmlFor="externalId">Внешний ID *</Label>
                <Input
                  id="externalId"
                  value={editingBackground.externalId}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      externalId: e.target.value,
                    })
                  }
                  placeholder="Например: acolyte"
                  disabled={!isCreateModalOpen}
                />
                <p className="text-xs text-muted-foreground">
                  Уникальный идентификатор, используется в коде. Можно изменить
                  только при создании.
                </p>
              </div>

              {/* Name (Russian) */}
              <div className="space-y-2">
                <Label htmlFor="nameRu">Название (русский) *</Label>
                <Input
                  id="nameRu"
                  value={editingBackground.nameRu}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      nameRu: e.target.value,
                    })
                  }
                  placeholder="Например: Прислужник"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingBackground.name}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      name: e.target.value,
                    })
                  }
                  placeholder="Например: Acolyte"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={editingBackground.description}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      description: e.target.value,
                    })
                  }
                  placeholder="Описание предыстории..."
                  rows={4}
                />
              </div>

              {/* Skill Proficiencies */}
              <div className="space-y-2">
                <Label>Владение навыками</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SKILLS.map((skill) => (
                    <label
                      key={skill.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editingBackground.skillProficiencies.includes(
                          skill.value
                        )}
                        onChange={() => handleSkillToggle(skill.value)}
                        className="rounded"
                      />
                      <span className="text-sm">{skill.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tool Proficiencies */}
              <div className="space-y-2">
                <Label>Владение инструментами</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="Набор каллиграфа"
                    onKeyPress={(e) => e.key === "Enter" && handleAddTool()}
                  />
                  <Button onClick={handleAddTool} type="button">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {editingBackground.toolProficiencies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingBackground.toolProficiencies.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded bg-muted flex items-center gap-1"
                      >
                        {tool}
                        <button
                          onClick={() => handleRemoveTool(idx)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label htmlFor="languages">Дополнительные языки</Label>
                <Input
                  id="languages"
                  type="number"
                  value={editingBackground.languages}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      languages: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  max="5"
                />
              </div>

              {/* Equipment */}
              <div className="space-y-3">
                <Label>Снаряжение</Label>

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
                    .filter((eq: Equipment) => {
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
                      return !editingBackground.equipment.some(e => e.equipmentId === eq.id);
                    })
                    .map((eq: Equipment) => (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => {
                          handleAddEquipment(eq.id);
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
                          </div>
                          <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  {allEquipment.filter((eq: Equipment) => {
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
                    return !editingBackground.equipment.some(e => e.equipmentId === eq.id);
                  }).length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Снаряжение не найдено
                    </div>
                  )}
                </div>

                {/* Selected Equipment */}
                {editingBackground.equipment.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm">Выбранное снаряжение ({editingBackground.equipment.length})</Label>
                    {editingBackground.equipment.map((item) => {
                      const equipment = allEquipment.find((e: Equipment) => e.id === item.equipmentId);
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
                              onClick={() => handleRemoveEquipment(item.equipmentId)}
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

              {/* Starting Gold */}
              <div className="space-y-2">
                <Label htmlFor="startingGold">Стартовое золото (зм)</Label>
                <Input
                  id="startingGold"
                  type="number"
                  value={editingBackground.startingGold}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      startingGold: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                />
              </div>

              {/* Origin Feat */}
              <div className="space-y-2">
                <Label htmlFor="originFeat">Черта происхождения</Label>
                <Input
                  id="originFeat"
                  value={editingBackground.originFeat}
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      originFeat: e.target.value,
                    })
                  }
                  placeholder="Посвящённый в магию (Жрец)"
                />
              </div>

              {/* Ability Score Increase */}
              <div className="space-y-2">
                <Label>Доступные характеристики для увеличения</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ABILITIES.map((ability) => (
                    <label
                      key={ability.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editingBackground.abilityScoreIncrease.options.includes(
                          ability.value
                        )}
                        onChange={() => handleAbilityToggle(ability.value)}
                        className="rounded"
                      />
                      <span className="text-sm">{ability.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ability Score Amount */}
              <div className="space-y-2">
                <Label htmlFor="abilityAmount">
                  Значения увеличения (через запятую)
                </Label>
                <Input
                  id="abilityAmount"
                  value={editingBackground.abilityScoreIncrease.amount.join(
                    ", "
                  )}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(",")
                      .map((v) => parseInt(v.trim()) || 0);
                    setEditingBackground({
                      ...editingBackground,
                      abilityScoreIncrease: {
                        ...editingBackground.abilityScoreIncrease,
                        amount: values,
                      },
                    });
                  }}
                  placeholder="2, 1, 0"
                />
                <p className="text-xs text-muted-foreground">
                  Например: 2, 1, 0 для +2/+1/+0
                </p>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Источник *</Label>
                <Select
                  id="source"
                  options={SOURCES}
                  value={editingBackground.source}
                  placeholder="Выберите источник"
                  onChange={(e) =>
                    setEditingBackground({
                      ...editingBackground,
                      source: e.target.value as string,
                    })
                  }
                />
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
                  onClick={handleSaveBackground}
                  disabled={
                    createBackgroundMutation.isPending ||
                    updateBackgroundMutation.isPending
                  }
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
    </>
  );
}
