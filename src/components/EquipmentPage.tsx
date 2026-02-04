import { useBackendEquipment } from "@/api/hooks";
import { equipmentApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import {
  Shield,
  Sword,
  Backpack,
  Wrench,
  Scroll,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Search,
  Package,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

// Types
interface Equipment {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: { quantity: number; unit: string };
  weight?: number;
  source: string;
  description: string[];
  damage?: { dice: string; type: string };
  armorClass?: number;
  armorType?: "light" | "medium" | "heavy" | "shield";
  maxDexBonus?: number;
  properties?: string[];
}

interface EquipmentFormData {
  externalId: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: { quantity: number; unit: string };
  weight?: number;
  source: string;
  description: string[];
  damage?: { dice: string; type: string };
  armorClass?: number;
  armorType?: "light" | "medium" | "heavy" | "shield";
  maxDexBonus?: number;
  properties?: string[];
}

const SOURCES = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

const CATEGORIES = [
  { value: "all", label: "Все", icon: Package },
  { value: "weapon", label: "Оружие", icon: Sword },
  { value: "armor", label: "Доспехи", icon: Shield },
  { value: "gear", label: "Снаряжение", icon: Backpack },
  { value: "tool", label: "Инструменты", icon: Wrench },
  { value: "pack", label: "Наборы", icon: Scroll },
];

const CURRENCY_OPTIONS = [
  { value: "cp", label: "cp (медь)" },
  { value: "sp", label: "sp (серебро)" },
  { value: "ep", label: "ep (электрум)" },
  { value: "gp", label: "gp (золото)" },
  { value: "pp", label: "pp (платина)" },
];

const DAMAGE_TYPES = [
  { value: "рубящий", label: "Рубящий" },
  { value: "колющий", label: "Колющий" },
  { value: "дробящий", label: "Дробящий" },
  { value: "огонь", label: "Огонь" },
  { value: "холод", label: "Холод" },
  { value: "кислота", label: "Кислота" },
  { value: "электричество", label: "Электричество" },
  { value: "некротическая энергия", label: "Некротическая энергия" },
  { value: "силовое поле", label: "Силовое поле" },
  { value: "лучистая энергия", label: "Лучистая энергия" },
  { value: "психическая энергия", label: "Психическая энергия" },
  { value: "яд", label: "Яд" },
  { value: "гром", label: "Гром" },
  { value: "сила", label: "Сила" },
];

const ARMOR_TYPES = [
  { value: "light", label: "Лёгкий" },
  { value: "medium", label: "Средний" },
  { value: "heavy", label: "Тяжёлый" },
  { value: "shield", label: "Щит" },
];

interface EquipmentPageProps {
  onBack?: () => void;
}

export function EquipmentPage({ onBack }: EquipmentPageProps) {
  const { data, error, refetch } = useBackendEquipment();
  const { user } = useAuth();
  const location = useLocation();
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const equipment = data?.data?.equipment?.find(
          (e: Equipment) => e.externalId === hash
        );
        if (equipment) {
          setSelectedEquipment(equipment.id);
          setSelectedCategory("all");
          const element = document.getElementById(`equipment-${equipment.id}`);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            element.classList.add("ring-2", "ring-primary");
            setTimeout(() => {
              element.classList.remove("ring-2", "ring-primary");
            }, 2000);
          }
        }
      }, 100);
    }
  }, [location.hash, data]);

  const [editingEquipment, setEditingEquipment] = useState<EquipmentFormData>({
    externalId: "",
    name: "",
    nameRu: "",
    category: "gear",
    cost: { quantity: 0, unit: "gp" },
    source: "phb2024",
    description: [],
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Create equipment mutation
  const createEquipmentMutation = useMutation({
    mutationFn: (data: EquipmentFormData) => equipmentApi.create(data),
    onSuccess: () => {
      refetch();
      setIsCreateModalOpen(false);
      resetCreateForm();
    },
  });

  // Update equipment mutation
  const updateEquipmentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EquipmentFormData }) =>
      equipmentApi.update(id, data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedEquipment(null);
      resetCreateForm();
    },
  });

  // Delete equipment mutation
  const deleteEquipmentMutation = useMutation({
    mutationFn: equipmentApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedEquipment(null);
      resetCreateForm();
    },
  });

  const resetCreateForm = () => {
    setEditingEquipment({
      externalId: "",
      name: "",
      nameRu: "",
      category: "gear",
      cost: { quantity: 0, unit: "gp" },
      source: "phb2024",
      description: [],
    });
  };

  const handleCreateEquipment = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleEditEquipment = (equipment: Equipment) => {
    setEditingEquipment({
      externalId: equipment.externalId,
      name: equipment.name,
      nameRu: equipment.nameRu,
      category: equipment.category,
      cost: equipment.cost,
      weight: equipment.weight,
      source: equipment.source,
      description: equipment.description,
      damage: equipment.damage,
      armorClass: equipment.armorClass,
      armorType: equipment.armorType,
      maxDexBonus: equipment.maxDexBonus,
      properties: equipment.properties,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEquipment = () => {
    if (
      !editingEquipment.externalId ||
      !editingEquipment.name ||
      !editingEquipment.nameRu
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (isCreateModalOpen) {
      createEquipmentMutation.mutate(editingEquipment);
    } else {
      updateEquipmentMutation.mutate({
        id: selectedEquipment!,
        data: editingEquipment,
      });
    }
  };

  const canEdit = user?.role === "master";

  const equipment = useMemo(
    () => data?.data?.equipment || [],
    [data?.data?.equipment]
  );

  // Filter by category and search
  const filteredEquipment = useMemo(() => {
    let filtered = equipment;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (e: Equipment) => e.category === selectedCategory
      );
    }

    // Filter by search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e: Equipment) =>
          e.nameRu.toLowerCase().includes(search) ||
          e.name.toLowerCase().includes(search) ||
          e.description.some((d: string) => d.toLowerCase().includes(search))
      );
    }

    return filtered;
  }, [equipment, selectedCategory, searchTerm]);

  // Get category info
  const getCategoryInfo = (category: string) => {
    return CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
  };

  const renderEquipmentCard = (equip: Equipment) => {
    const categoryInfo = getCategoryInfo(equip.category);
    const Icon = categoryInfo.icon;

    return (
      <div
        key={equip.id}
        id={`equipment-${equip.id}`}
        onClick={() => setSelectedEquipment(equip.id)}
        className="p-4 rounded-lg border cursor-pointer transition-all bg-card border-border hover:border-primary/50"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {equip.nameRu}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {equip.name}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                {categoryInfo.label}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                {equip.cost.quantity} {equip.cost.unit}
              </span>
              {equip.weight !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                  {equip.weight} кг
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Ошибка загрузки снаряжения
          </h2>
          <p className="text-sm text-destructive/80">
            Не удалось загрузить данные о снаряжении с сервера. Пожалуйста,
            попробуйте позже.
          </p>
          {onBack && (
            <Button variant="outline" className="mt-4" onClick={onBack}>
              Назад
            </Button>
          )}
        </div>
      </div>
    );
  }

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
                  Снаряжение
                </h1>
                <p className="text-sm text-muted-foreground">
                  {equipment.length} предметов
                </p>
              </div>
            </div>

            {canEdit && (
              <Button
                onClick={handleCreateEquipment}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Создать
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск снаряжения..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.value}
                  variant={
                    selectedCategory === cat.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="gap-2"
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                  {cat.value !== "all" && (
                    <span className="ml-1 text-xs opacity-70">
                      (
                      {
                        equipment.filter(
                          (e: Equipment) => e.category === cat.value
                        ).length
                      }
                      )
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Equipment Grid */}
        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredEquipment.map((equip: Equipment) =>
              renderEquipmentCard(equip)
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Ничего не найдено
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "Попробуйте изменить поисковый запрос"
                : selectedCategory === "all"
                ? "Снаряжение пока не загружено"
                : `${getCategoryInfo(selectedCategory).label} пока нет`}
            </p>
          </div>
        )}

        {/* Slide-over Drawer for Equipment Details */}
        {selectedEquipment && data?.data?.equipment && (
          <SlideOverDrawer
            isOpen={!!selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
            title={
              <div className="flex items-center gap-3">
                {(() => {
                  const equip = data.data.equipment.find(
                    (e: Equipment) => e.id === selectedEquipment
                  );
                  if (!equip) return null;
                  const categoryInfo = getCategoryInfo(equip.category);
                  const Icon = categoryInfo.icon;
                  return <Icon className="w-5 h-5 text-primary" />;
                })()}
                <span>
                  {data.data.equipment.find(
                    (e: Equipment) => e.id === selectedEquipment
                  )?.nameRu || "Снаряжение"}
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
                      const equip = data.data.equipment.find(
                        (e: Equipment) => e.id === selectedEquipment
                      );
                      if (equip) handleEditEquipment(equip);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      const equip = data.data.equipment.find(
                        (e: Equipment) => e.id === selectedEquipment
                      );
                      if (equip && confirm(`Удалить "${equip.nameRu}"?`)) {
                        deleteEquipmentMutation.mutate(equip.id);
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
              const equip = data.data.equipment.find(
                (e: Equipment) => e.id === selectedEquipment
              );
              if (!equip) return null;

              const categoryInfo = getCategoryInfo(equip.category);

              return (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Категория
                        </span>
                        <span className="font-medium text-foreground">
                          {categoryInfo.label}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Стоимость
                        </span>
                        <span className="font-medium text-foreground">
                          {equip.cost.quantity} {equip.cost.unit}
                        </span>
                      </div>
                      {equip.weight !== undefined && (
                        <div>
                          <span className="text-muted-foreground block mb-1">
                            Вес
                          </span>
                          <span className="font-medium text-foreground">
                            {equip.weight} кг
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Источник
                        </span>
                        <span className="font-medium text-foreground">
                          {equip.source === "srd" ? "SRD" : "PHB 2024"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Weapon-specific info */}
                  {equip.category === "weapon" && equip.damage && (
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <h3 className="font-semibold text-foreground mb-3 text-sm">
                        Характеристики оружия
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block mb-1">
                            Урон
                          </span>
                          <span className="font-medium text-foreground">
                            {equip.damage.dice}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">
                            Тип урона
                          </span>
                          <span className="font-medium text-foreground">
                            {equip.damage.type}
                          </span>
                        </div>
                      </div>
                      {equip.properties && equip.properties.length > 0 && (
                        <div className="mt-3">
                          <span className="text-xs text-muted-foreground block mb-2">
                            Свойства
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {equip.properties.map(
                              (prop: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                >
                                  {prop}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Armor-specific info */}
                  {equip.category === "armor" &&
                    equip.armorClass !== undefined && (
                      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                        <h3 className="font-semibold text-foreground mb-3 text-sm">
                          Характеристики доспеха
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground block mb-1">
                              Класс защиты (AC)
                            </span>
                            <span className="font-medium text-foreground">
                              {equip.armorClass}
                            </span>
                          </div>
                          {equip.armorType && (
                            <div>
                              <span className="text-muted-foreground block mb-1">
                                Тип доспеха
                              </span>
                              <span className="font-medium text-foreground">
                                {
                                  ARMOR_TYPES.find(
                                    (t) => t.value === equip.armorType
                                  )?.label
                                }
                              </span>
                            </div>
                          )}
                          {equip.maxDexBonus !== undefined && (
                            <div>
                              <span className="text-muted-foreground block mb-1">
                                Макс. бонус Ловкости
                              </span>
                              <span className="font-medium text-foreground">
                                {equip.maxDexBonus}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  {/* Description */}
                  {equip.description && equip.description.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm">
                        Описание
                      </h3>
                      <div className="space-y-2">
                        {equip.description.map((desc: string, idx: number) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </SlideOverDrawer>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-content">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen
                  ? "Создать снаряжение"
                  : "Редактировать снаряжение"}
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
                  value={editingEquipment.externalId}
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      externalId: e.target.value,
                    })
                  }
                  placeholder="Например: longsword"
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
                  value={editingEquipment.nameRu}
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      nameRu: e.target.value,
                    })
                  }
                  placeholder="Например: Длинный меч"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingEquipment.name}
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      name: e.target.value,
                    })
                  }
                  placeholder="Например: Longsword"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select
                  id="category"
                  options={CATEGORIES.filter((c) => c.value !== "all").map(
                    (c) => ({
                      value: c.value,
                      label: c.label,
                    })
                  )}
                  value={editingEquipment.category}
                  placeholder="Выберите категорию"
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      category: e.target.value as EquipmentFormData["category"],
                    })
                  }
                />
              </div>

              {/* Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costQuantity">Количество *</Label>
                  <Input
                    id="costQuantity"
                    type="number"
                    value={editingEquipment.cost.quantity}
                    onChange={(e) =>
                      setEditingEquipment({
                        ...editingEquipment,
                        cost: {
                          ...editingEquipment.cost,
                          quantity: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    placeholder="10"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costUnit">Валюта *</Label>
                  <Select
                    id="costUnit"
                    options={CURRENCY_OPTIONS}
                    value={editingEquipment.cost.unit}
                    placeholder="Валюта"
                    onChange={(e) =>
                      setEditingEquipment({
                        ...editingEquipment,
                        cost: {
                          ...editingEquipment.cost,
                          unit: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight">Вес (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={editingEquipment.weight || ""}
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      weight: parseFloat(e.target.value) || undefined,
                    })
                  }
                  placeholder="3"
                  min="0"
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Источник *</Label>
                <Select
                  id="source"
                  options={SOURCES}
                  value={editingEquipment.source}
                  placeholder="Выберите источник"
                  onChange={(e) =>
                    setEditingEquipment({
                      ...editingEquipment,
                      source: e.target.value,
                    })
                  }
                />
              </div>

              {/* Weapon-specific fields */}
              {editingEquipment.category === "weapon" && (
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 space-y-4">
                  <h4 className="font-semibold text-foreground text-sm">
                    Параметры оружия
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="damageDice">Урон (кубик) *</Label>
                      <Input
                        id="damageDice"
                        value={editingEquipment.damage?.dice || ""}
                        onChange={(e) =>
                          setEditingEquipment({
                            ...editingEquipment,
                            damage: {
                              ...editingEquipment.damage,
                              dice: e.target.value,
                              type: editingEquipment.damage?.type || "",
                            },
                          })
                        }
                        placeholder="1d8"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="damageType">Тип урона *</Label>
                      <Select
                        id="damageType"
                        options={DAMAGE_TYPES}
                        value={editingEquipment.damage?.type || ""}
                        placeholder="Тип урона"
                        onChange={(e) =>
                          setEditingEquipment({
                            ...editingEquipment,
                            damage: {
                              ...editingEquipment.damage,
                              dice: editingEquipment.damage?.dice || "",
                              type: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="properties">Свойства (через запятую)</Label>
                    <Input
                      id="properties"
                      value={editingEquipment.properties?.join(", ") || ""}
                      onChange={(e) =>
                        setEditingEquipment({
                          ...editingEquipment,
                          properties: e.target.value
                            .split(",")
                            .map((p) => p.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Лёгкое, Метательное (20/60)"
                    />
                  </div>
                </div>
              )}

              {/* Armor-specific fields */}
              {editingEquipment.category === "armor" && (
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 space-y-4">
                  <h4 className="font-semibold text-foreground text-sm">
                    Параметры доспеха
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="armorClass">Класс защиты (AC) *</Label>
                      <Input
                        id="armorClass"
                        type="number"
                        value={editingEquipment.armorClass || ""}
                        onChange={(e) =>
                          setEditingEquipment({
                            ...editingEquipment,
                            armorClass: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="10"
                        min="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="armorType">Тип доспеха *</Label>
                      <Select
                        id="armorType"
                        options={ARMOR_TYPES}
                        value={editingEquipment.armorType || ""}
                        placeholder="Тип доспеха"
                        onChange={(e) =>
                          setEditingEquipment({
                            ...editingEquipment,
                            armorType: e.target
                              .value as EquipmentFormData["armorType"],
                          })
                        }
                      />
                    </div>
                  </div>
                  {editingEquipment.armorType !== "shield" && (
                    <div className="space-y-2">
                      <Label htmlFor="maxDexBonus">
                        Максимальный бонус Ловкости
                      </Label>
                      <Input
                        id="maxDexBonus"
                        type="number"
                        value={editingEquipment.maxDexBonus || ""}
                        onChange={(e) =>
                          setEditingEquipment({
                            ...editingEquipment,
                            maxDexBonus: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        placeholder="Оставьте пустым для без ограничений"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Описание</Label>
                  <span className="text-sm text-muted-foreground">
                    {editingEquipment.description.length} строк
                  </span>
                </div>
                <div className="space-y-2">
                  {editingEquipment.description.map(
                    (desc: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={desc}
                          onChange={(e) => {
                            const newDescription = [
                              ...editingEquipment.description,
                            ];
                            newDescription[idx] = e.target.value;
                            setEditingEquipment({
                              ...editingEquipment,
                              description: newDescription,
                            });
                          }}
                          placeholder="Строка описания..."
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            const newDescription =
                              editingEquipment.description.filter(
                                (_, i) => i !== idx
                              );
                            setEditingEquipment({
                              ...editingEquipment,
                              description: newDescription,
                            });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() =>
                      setEditingEquipment({
                        ...editingEquipment,
                        description: [...editingEquipment.description, ""],
                      })
                    }
                  >
                    <Plus className="w-4 h-4" />
                    Добавить строку описания
                  </Button>
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
                  onClick={handleSaveEquipment}
                  disabled={
                    createEquipmentMutation.isPending ||
                    updateEquipmentMutation.isPending
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
