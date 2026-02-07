import { equipmentApi } from "@/api/client";
import {
    useBackendEquipmentByExternalId,
    useBackendEquipmentMeta,
} from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { useAuth } from "@/contexts/AuthContext";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { useMutation } from "@tanstack/react-query";
import {
    Backpack,
    Filter,
    Loader2,
    Package,
    Pencil,
    Plus,
    Save,
    Scroll,
    Search,
    Shield,
    Sword,
    Trash2,
    Wrench,
    X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const WEAPON_PROPERTIES = [
  { value: "лёгкое", label: "Лёгкое" },
  { value: "метательное", label: "Метательное" },
  { value: "фехтовальное", label: "Фехтовальное" },
  { value: "двуручное", label: "Двуручное" },
  { value: "универсальное", label: "Универсальное" },
  { value: "досягаемость", label: "Досягаемость" },
  { value: "перезарядка", label: "Перезарядка" },
  { value: "боеприпасы", label: "Боеприпасы" },
];

interface EquipmentPageProps {
  onBack?: () => void;
}

export function EquipmentPage({ onBack }: EquipmentPageProps) {
  // Загружаем только мета-данные для списка
  const { data: metaData, error, refetch } = useBackendEquipmentMeta();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Инициализируем состояние из URL параметров
  const searchParams = new URLSearchParams(location.search);
  const [selectedCategory, setSelectedCategory] = useState<string>(() =>
    searchParams.get('category') || 'all'
  );
  const [searchTerm, setSearchTerm] = useState(() =>
    searchParams.get('search') || ''
  );
  const [showFilters, setShowFilters] = useState(false);
  const [minCost, setMinCost] = useState<number | undefined>(() => {
    const cost = searchParams.get('minCost');
    return cost ? parseInt(cost) : undefined;
  });
  const [maxCost, setMaxCost] = useState<number | undefined>(() => {
    const cost = searchParams.get('maxCost');
    return cost ? parseInt(cost) : undefined;
  });
  const [selectedArmorTypes, setSelectedArmorTypes] = useState<string[]>(() => {
    const types = searchParams.get('armorTypes');
    return types ? types.split(',') : [];
  });
  const [selectedWeaponProperties, setSelectedWeaponProperties] = useState<string[]>(() => {
    const props = searchParams.get('weaponProps');
    return props ? props.split(',') : [];
  });


  // Текущий выбранный предмет определяется из URL
  const selectedEquipmentExternalId = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return hash || null;
  }, [location.hash]);

  // Загружаем полные данные только для выбранного предмета по externalId
  const { data: selectedItemData, isLoading: isLoadingItem } =
    useBackendEquipmentByExternalId(selectedEquipmentExternalId || "");

  const selectedEquipment = selectedItemData?.data?.equipment || null;

  // Отслеживаем изменения хеша для добавления в историю
  const prevHashRef = useRef<string>("");

  useEffect(() => {
    const currentHash = location.hash.replace("#", "");
    const prevHash = prevHashRef.current;

    // Если хеш изменился и оба не пустые, добавляем предыдущий в историю
    if (currentHash && prevHash && currentHash !== prevHash) {
      setNavigationHistory((prev) => {
        // Проверяем, не возвращаемся ли мы назад
        if (prev.length > 0 && prev[prev.length - 1] === currentHash) {
          // Это возврат назад, удаляем из истории
          return prev.slice(0, -1);
        }
        // Это переход вперед, добавляем в историю
        return [...prev, prevHash];
      });
    }

    prevHashRef.current = currentHash;
  }, [location.hash]);

  // Обработка изменения выбранного предмета
  useEffect(() => {
    if (selectedEquipment) {
      const element = document.getElementById(
        `equipment-${selectedEquipment.id}`
      );
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
  }, [selectedEquipment]);

  // Функция для открытия предмета
  const openEquipment = (externalId: string) => {
    // Обновляем URL
    navigate(`${location.pathname}#${externalId}`, { replace: false });
  };


  // Функция для закрытия drawer
  const closeDrawer = () => {
    setNavigationHistory([]);
    navigate(location.pathname, { replace: true });
  };

  // Синхронизация состояния с URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (searchTerm) {
      params.set('search', searchTerm);
    }

    if (minCost !== undefined) {
      params.set('minCost', minCost.toString());
    }

    if (maxCost !== undefined) {
      params.set('maxCost', maxCost.toString());
    }

    if (selectedArmorTypes.length > 0) {
      params.set('armorTypes', selectedArmorTypes.join(','));
    }

    if (selectedWeaponProperties.length > 0) {
      params.set('weaponProps', selectedWeaponProperties.join(','));
    }

    const newSearch = params.toString();
    const currentSearch = location.search.replace('?', '');

    if (newSearch !== currentSearch) {
      navigate({
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : '',
        hash: location.hash,
      }, { replace: true });
    }
  }, [selectedCategory, searchTerm, minCost, maxCost, selectedArmorTypes, selectedWeaponProperties, navigate, location.pathname, location.hash, location.search]);

  // Функции управления фильтрами
  const toggleArmorType = (type: string) => {
    setSelectedArmorTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleWeaponProperty = (prop: string) => {
    setSelectedWeaponProperties(prev =>
      prev.includes(prop) ? prev.filter(p => p !== prop) : [...prev, prop]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinCost(undefined);
    setMaxCost(undefined);
    setSelectedArmorTypes([]);
    setSelectedWeaponProperties([]);
  };

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    minCost !== undefined ||
    maxCost !== undefined ||
    selectedArmorTypes.length > 0 ||
    selectedWeaponProperties.length > 0;

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
      closeDrawer();
      resetCreateForm();
    },
  });

  // Delete equipment mutation
  const deleteEquipmentMutation = useMutation({
    mutationFn: equipmentApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      closeDrawer();
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
    () => metaData?.data?.equipment || [],
    [metaData?.data?.equipment]
  );

  // Convert cost to gold pieces for comparison
  const convertToGp = (cost: { quantity: number; unit: string }): number => {
    const rates: Record<string, number> = {
      cp: 0.01,
      sp: 0.1,
      ep: 0.5,
      gp: 1,
      pp: 10,
    };
    return cost.quantity * (rates[cost.unit] || 1);
  };

  // Filter by category, search, cost, armor types, and weapon properties
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
          (e.description &&
            Array.isArray(e.description) &&
            e.description.some(
              (d: string) =>
                typeof d === "string" && d.toLowerCase().includes(search)
            ))
      );
    }

    // Filter by cost range
    if (minCost !== undefined || maxCost !== undefined) {
      filtered = filtered.filter((e: Equipment) => {
        const costInGp = convertToGp(e.cost);
        if (minCost !== undefined && costInGp < minCost) return false;
        if (maxCost !== undefined && costInGp > maxCost) return false;
        return true;
      });
    }

    // Filter by armor types
    if (selectedArmorTypes.length > 0) {
      filtered = filtered.filter((e: Equipment) =>
        e.armorType && selectedArmorTypes.includes(e.armorType)
      );
    }

    // Filter by weapon properties
    if (selectedWeaponProperties.length > 0) {
      filtered = filtered.filter((e: Equipment) =>
        e.properties && e.properties.some(prop =>
          selectedWeaponProperties.some(selected =>
            prop.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    return filtered;
  }, [equipment, selectedCategory, searchTerm, minCost, maxCost, selectedArmorTypes, selectedWeaponProperties]);

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
        onClick={() => openEquipment(equip.externalId)}
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
                  {hasActiveFilters
                    ? `${filteredEquipment.length} из ${equipment.length} предметов`
                    : `${equipment.length} предметов`
                  }
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
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск снаряжения..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Фильтры
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                  {(minCost !== undefined ? 1 : 0) +
                   (maxCost !== undefined ? 1 : 0) +
                   selectedArmorTypes.length +
                   selectedWeaponProperties.length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Сбросить
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-lg border border-border bg-muted/30">
              <div className="space-y-4">
                {/* Cost Range Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Стоимость (в золотых)</h3>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="От"
                      value={minCost ?? ''}
                      onChange={(e) => setMinCost(e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-24"
                      min="0"
                    />
                    <span className="self-center">—</span>
                    <Input
                      type="number"
                      placeholder="До"
                      value={maxCost ?? ''}
                      onChange={(e) => setMaxCost(e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-24"
                      min="0"
                    />
                  </div>
                </div>

                {/* Armor Type Filter */}
                {selectedCategory === 'armor' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Тип доспеха</h3>
                    <div className="flex flex-wrap gap-2">
                      {ARMOR_TYPES.map((type) => (
                        <Button
                          key={type.value}
                          variant={selectedArmorTypes.includes(type.value) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleArmorType(type.value)}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weapon Properties Filter */}
                {selectedCategory === 'weapon' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Свойства оружия</h3>
                    <div className="flex flex-wrap gap-2">
                      {WEAPON_PROPERTIES.map((prop) => (
                        <Button
                          key={prop.value}
                          variant={selectedWeaponProperties.includes(prop.value) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleWeaponProperty(prop.value)}
                        >
                          {prop.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
        {selectedEquipmentExternalId && (
          <SlideOverDrawer
            isOpen={!!selectedEquipmentExternalId}
            onClose={closeDrawer}
            title={
              <div className="flex items-center gap-3">
                {isLoadingItem ? (
                  <>
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span>Загрузка...</span>
                  </>
                ) : selectedEquipment ? (
                  <>
                    {(() => {
                      const categoryInfo = getCategoryInfo(
                        selectedEquipment.category
                      );
                      const Icon = categoryInfo.icon;
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                    <span>{selectedEquipment.nameRu || "Снаряжение"}</span>
                  </>
                ) : (
                  <span>Снаряжение</span>
                )}
              </div>
            }
            actions={
              canEdit &&
              selectedEquipment &&
              !isLoadingItem && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEquipment(selectedEquipment)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (
                        selectedEquipment &&
                        confirm(`Удалить "${selectedEquipment.nameRu}"?`)
                      ) {
                        deleteEquipmentMutation.mutate(selectedEquipment.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          >
            {isLoadingItem ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : selectedEquipment ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block mb-1">
                        Категория
                      </span>
                      <span className="font-medium text-foreground">
                        {getCategoryInfo(selectedEquipment.category).label}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">
                        Стоимость
                      </span>
                      <span className="font-medium text-foreground">
                        {selectedEquipment.cost.quantity}{" "}
                        {selectedEquipment.cost.unit}
                      </span>
                    </div>
                    {selectedEquipment.weight !== undefined && (
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Вес
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedEquipment.weight} кг
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground block mb-1">
                        Источник
                      </span>
                      <span className="font-medium text-foreground">
                        {selectedEquipment.source === "srd"
                          ? "SRD"
                          : "PHB 2024"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weapon-specific info */}
                {selectedEquipment.category === "weapon" &&
                  selectedEquipment.damage && (
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
                            {selectedEquipment.damage.dice}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">
                            Тип урона
                          </span>
                          <span className="font-medium text-foreground">
                            {selectedEquipment.damage.type}
                          </span>
                        </div>
                      </div>
                      {selectedEquipment.properties &&
                        selectedEquipment.properties.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs text-muted-foreground block mb-2">
                              Свойства
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedEquipment.properties.map(
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
                {selectedEquipment.category === "armor" &&
                  selectedEquipment.armorClass !== undefined && (
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
                            {selectedEquipment.armorClass}
                          </span>
                        </div>
                        {selectedEquipment.armorType && (
                          <div>
                            <span className="text-muted-foreground block mb-1">
                              Тип доспеха
                            </span>
                            <span className="font-medium text-foreground">
                              {
                                ARMOR_TYPES.find(
                                  (t) => t.value === selectedEquipment.armorType
                                )?.label
                              }
                            </span>
                          </div>
                        )}
                        {selectedEquipment.maxDexBonus !== undefined && (
                          <div>
                            <span className="text-muted-foreground block mb-1">
                              Макс. бонус Ловкости
                            </span>
                            <span className="font-medium text-foreground">
                              {selectedEquipment.maxDexBonus}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* Description */}
                {selectedEquipment.description &&
                  selectedEquipment.description.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm">
                        Описание
                      </h3>
                      {parseEquipmentDescription(selectedEquipment.description)}
                    </div>
                  )}
              </div>
            ) : null}
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
