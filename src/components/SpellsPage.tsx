import { spellsApi } from "@/api/client";
import {
    useBackendSpellByExternalId,
    useBackendSpellsMeta,
} from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import type { DescriptionItem } from "@/types/character";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { useMutation } from "@tanstack/react-query";
import {
    Filter,
    Loader2,
    Pencil,
    Plus,
    Save,
    Search,
    Sparkles,
    Trash2,
    Wand2,
    X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Types
interface Spell {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: DescriptionItem[];
  classes: string[];
  source: string;
}

interface SpellFormData {
  externalId: string;
  name: string;
  nameRu: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: DescriptionItem[];
  classes: string[];
  source: string;
}

const SOURCES = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

const SPELL_LEVELS = [
  { value: "0", label: "Заговор" },
  { value: "1", label: "1 уровень" },
  { value: "2", label: "2 уровень" },
  { value: "3", label: "3 уровень" },
  { value: "4", label: "4 уровень" },
  { value: "5", label: "5 уровень" },
  { value: "6", label: "6 уровень" },
  { value: "7", label: "7 уровень" },
  { value: "8", label: "8 уровень" },
  { value: "9", label: "9 уровень" },
];

const SCHOOLS = [
  { value: "Воплощение", label: "Воплощение" },
  { value: "Вызов", label: "Вызов" },
  { value: "Ограждение", label: "Ограждение" },
  { value: "Очарование", label: "Очарование" },
  { value: "Иллюзия", label: "Иллюзия" },
  { value: "Прорицание", label: "Прорицание" },
  { value: "Некромантия", label: "Некромантия" },
  { value: "Преобразование", label: "Преобразование" },
];

const AVAILABLE_CLASSES = [
  { id: "wizard", name: "Волшебник", nameEn: "Wizard" },
  { id: "sorcerer", name: "Чародей", nameEn: "Sorcerer" },
  { id: "warlock", name: "Колдун", nameEn: "Warlock" },
  { id: "bard", name: "Бард", nameEn: "Bard" },
  { id: "cleric", name: "Жрец", nameEn: "Cleric" },
  { id: "druid", name: "Друид", nameEn: "Druid" },
  { id: "paladin", name: "Паладин", nameEn: "Paladin" },
  { id: "ranger", name: "Следопыт", nameEn: "Ranger" },
];

interface SpellsPageProps {
  onBack?: () => void;
}

// Component to render description items
function DescriptionRenderer({ items }: { items: DescriptionItem[] }) {
const content = Array.isArray(items) ? items : (items ? [items] : []);

  return (
    <div className="space-y-3">
      {content.map((item, index) => {
        if (typeof item === "string") {
          // Парсим строку с тегами
          return (
            <div key={index}>
              {parseEquipmentDescription(item)}
            </div>
          );
        }

        if (item.type === "list") {
          const ListTag = item.attrs.type === "ordered" ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`text-sm text-muted-foreground leading-relaxed space-y-1 ${
                item.attrs.type === "ordered" ? "list-decimal" : "list-disc"
              } list-inside pl-4`}
            >
              {item.content.map((listItem, i) => (
                <li key={i}>{parseEquipmentDescription(listItem)}</li>
              ))}
            </ListTag>
          );
        }

        if (item.type === "table") {
          return (
            <div key={index} className="overflow-x-auto">
              {item.caption && (
                <p className="text-sm font-semibold text-foreground mb-2">
                  {item.caption}
                </p>
              )}
              <table className="w-full text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    {item.colLabels.map((label, i) => (
                      <th
                        key={i}
                        className={`border border-border px-3 py-2 font-semibold text-foreground ${item.colStyles[i] || ""}`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`border border-border px-3 py-2 text-muted-foreground ${item.colStyles[j] || ""}`}
                        >
                          {parseEquipmentDescription(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export function SpellsPage({ onBack }: SpellsPageProps) {
  // Загружаем только мета-данные для списка
  const { data: metaData, error, refetch } = useBackendSpellsMeta();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Инициализируем состояние из URL параметров
  const searchParams = new URLSearchParams(location.search);
  const [selectedLevel, setSelectedLevel] = useState<number>(() => {
    const level = searchParams.get('level');
    return level ? parseInt(level) : 0;
  });
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
  const [selectedClasses, setSelectedClasses] = useState<string[]>(() => {
    const classes = searchParams.get('classes');
    return classes ? classes.split(',') : [];
  });
  const [selectedSchools, setSelectedSchools] = useState<string[]>(() => {
    const schools = searchParams.get('schools');
    return schools ? schools.split(',') : [];
  });
  const [showFilters, setShowFilters] = useState(false);

  // История навигации - храним externalId заклинаний
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  // Синхронизация состояния с URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedLevel !== 0) {
      params.set('level', selectedLevel.toString());
    }

    if (searchTerm) {
      params.set('search', searchTerm);
    }

    if (selectedClasses.length > 0) {
      params.set('classes', selectedClasses.join(','));
    }

    if (selectedSchools.length > 0) {
      params.set('schools', selectedSchools.join(','));
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
  }, [selectedLevel, searchTerm, selectedClasses, selectedSchools, navigate, location.pathname, location.hash, location.search]);

  // Текущее выбранное заклинание определяется из URL
  const selectedSpellExternalId = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return hash || null;
  }, [location.hash]);

  // Загружаем полные данные только для выбранного заклинания по externalId
  const { data: selectedSpellData, isLoading: isLoadingSpell } =
    useBackendSpellByExternalId(selectedSpellExternalId || "");

  const selectedSpell = selectedSpellData?.data?.spell || null;

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

  // Обработка изменения выбранного заклинания
  useEffect(() => {
    if (selectedSpell) {
      const element = document.getElementById(`spell-${selectedSpell.id}`);
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
  }, [selectedSpell]);

  // Функция для открытия заклинания
  const openSpell = (externalId: string) => {
    // Если уже открыто другое заклинание, добавляем его в историю
    const currentHash = location.hash.replace("#", "");
    if (currentHash && currentHash !== externalId) {
      setNavigationHistory((prev) => [...prev, currentHash]);
    }

    // Обновляем URL
    navigate(`${location.pathname}#${externalId}`, { replace: false });
  };

  // Функция для возврата назад
  const goBack = () => {
    if (navigationHistory.length === 0) return;

    const previousExternalId = navigationHistory[navigationHistory.length - 1];
    setNavigationHistory((prev) => prev.slice(0, -1));

    // Переходим к предыдущему заклинанию
    navigate(`${location.pathname}#${previousExternalId}`, { replace: true });
  };

  // Функция для закрытия drawer
  const closeDrawer = () => {
    setNavigationHistory([]);
    navigate(location.pathname, { replace: true });
  };
  const [editingSpell, setEditingSpell] = useState<SpellFormData>({
    externalId: "",
    name: "",
    nameRu: "",
    level: 0,
    school: "Воплощение",
    castingTime: "1 действие",
    range: "60 футов",
    components: "В, С",
    duration: "Мгновенная",
    description: [],
    classes: [],
    source: "phb2024",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Create spell mutation
  const createSpellMutation = useMutation({
    mutationFn: (data: SpellFormData) => spellsApi.create(data),
    onSuccess: () => {
      refetch();
      setIsCreateModalOpen(false);
      resetCreateForm();
    },
  });

  // Update spell mutation
  const updateSpellMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SpellFormData }) =>
      spellsApi.update(id, data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      closeDrawer();
      resetCreateForm();
    },
  });

  // Delete spell mutation
  const deleteSpellMutation = useMutation({
    mutationFn: spellsApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      closeDrawer();
      resetCreateForm();
    },
  });

  const resetCreateForm = () => {
    setEditingSpell({
      externalId: "",
      name: "",
      nameRu: "",
      level: 0,
      school: "Воплощение",
      castingTime: "1 действие",
      range: "60 футов",
      components: "В, С",
      duration: "Мгновенная",
      description: [],
      classes: [],
      source: "phb2024",
    });
  };

  const handleCreateSpell = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleEditSpell = (spell: Spell) => {
    setEditingSpell({
      externalId: spell.externalId,
      name: spell.name,
      nameRu: spell.nameRu,
      level: spell.level,
      school: spell.school,
      castingTime: spell.castingTime,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      description: spell.description,
      classes: spell.classes,
      source: spell.source,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveSpell = () => {
    if (
      !editingSpell.externalId ||
      !editingSpell.name ||
      !editingSpell.nameRu ||
      !editingSpell.description.length
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (editingSpell.classes.length === 0) {
      alert("Пожалуйста, выберите хотя бы один класс");
      return;
    }

    if (isCreateModalOpen) {
      createSpellMutation.mutate(editingSpell);
    } else {
      if (!selectedSpell) {
        alert("Заклинание не выбрано");
        return;
      }
      updateSpellMutation.mutate({
        id: selectedSpell.id,
        data: editingSpell,
      });
    }
  };

  const handleToggleClass = (classId: string) => {
    const classes = editingSpell.classes || [];
    if (classes.includes(classId)) {
      setEditingSpell({
        ...editingSpell,
        classes: classes.filter((c) => c !== classId),
      });
    } else {
      setEditingSpell({
        ...editingSpell,
        classes: [...classes, classId],
      });
    }
  };

  const toggleClassFilter = (classId: string) => {
    setSelectedClasses(prev =>
      prev.includes(classId)
        ? prev.filter(c => c !== classId)
        : [...prev, classId]
    );
  };

  const toggleSchoolFilter = (school: string) => {
    setSelectedSchools(prev =>
      prev.includes(school)
        ? prev.filter(s => s !== school)
        : [...prev, school]
    );
  };

  const clearFilters = () => {
    setSelectedClasses([]);
    setSelectedSchools([]);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedClasses.length > 0 || selectedSchools.length > 0 || searchTerm.trim().length > 0;

  const canEdit = user?.role === "master";

  const spells = useMemo(
    () => metaData?.data?.spells || [],
    [metaData?.data?.spells]
  );

  // Filter by search, classes, and schools
  const filteredSpells = useMemo(() => {
    let filtered = spells;

    // Фильтр по поиску
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((spell: Spell) => {
        return (
          spell.nameRu.toLowerCase().includes(search) ||
          spell.name.toLowerCase().includes(search) ||
          spell.school.toLowerCase().includes(search)
        );
      });
    }

    // Фильтр по классам
    if (selectedClasses.length > 0) {
      filtered = filtered.filter((spell: Spell) => {
        return selectedClasses.some(classId => spell.classes.includes(classId));
      });
    }

    // Фильтр по школам магии
    if (selectedSchools.length > 0) {
      filtered = filtered.filter((spell: Spell) => {
        return selectedSchools.includes(spell.school);
      });
    }

    return filtered;
  }, [spells, searchTerm, selectedClasses, selectedSchools]);

  // Группируем отфильтрованные заклинания по уровням
  const filteredSpellsByLevel: Record<number, Spell[]> = useMemo(() => {
    const byLevel: Record<number, Spell[]> = {};
    for (let i = 0; i <= 9; i++) {
      byLevel[i] = filteredSpells.filter((spell: Spell) => spell.level === i);
    }
    return byLevel;
  }, [filteredSpells]);

  // Автоматически переключаем на вкладку "Поиск" при вводе текста или применении фильтров
  useEffect(() => {
    if (searchTerm.trim() || hasActiveFilters) {
      setSelectedLevel(-1); // -1 для вкладки поиска
    }
  }, [searchTerm, hasActiveFilters]);

  // Получаем заклинания выбранного уровня или результаты поиска
  const currentLevelSpells = useMemo(() => {
    if (selectedLevel === -1) {
      // Показываем все результаты поиска
      return filteredSpells;
    }
    return filteredSpellsByLevel[selectedLevel] || [];
  }, [filteredSpellsByLevel, selectedLevel, filteredSpells]);

  const renderSpellCard = (spell: Spell) => {
    return (
      <div
        key={spell.id}
        id={`spell-${spell.id}`}
        onClick={() => openSpell(spell.externalId)}
        className="p-4 rounded-lg border cursor-pointer transition-all bg-card border-border hover:border-primary/50"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {spell.nameRu}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {spell.name}
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap flex-shrink-0">
            {spell.school}
          </span>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Ошибка загрузки заклинаний
          </h2>
          <p className="text-sm text-destructive/80">
            Не удалось загрузить данные о заклинаниях с сервера. Пожалуйста,
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
                  Заклинания
                </h1>
                <p className="text-sm text-muted-foreground">
                  {searchTerm.trim() || hasActiveFilters
                    ? `${filteredSpells.length} из ${spells.length} заклинаний`
                    : `${spells.length} заклинаний`
                  }
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateSpell} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Создать
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск заклинаний..."
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
                  {selectedClasses.length + selectedSchools.length}
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
                {/* Class Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Классы</h3>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_CLASSES.map((classOption) => (
                      <Button
                        key={classOption.id}
                        variant={selectedClasses.includes(classOption.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleClassFilter(classOption.id)}
                      >
                        {classOption.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* School Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Школы магии</h3>
                  <div className="flex flex-wrap gap-2">
                    {SCHOOLS.map((school) => (
                      <Button
                        key={school.value}
                        variant={selectedSchools.includes(school.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSchoolFilter(school.value)}
                      >
                        {school.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {(searchTerm.trim() || hasActiveFilters) && (
              <Button
                variant={selectedLevel === -1 ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(-1)}
                className="gap-1"
              >
                <Search className="w-3 h-3" />
                Результаты поиска
                <span className="ml-1 text-xs opacity-70">
                  ({filteredSpells.length})
                </span>
              </Button>
            )}
            <Button
              variant={selectedLevel === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(0)}
              className="gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Заговоры
              <span className="ml-1 text-xs opacity-70">
                ({filteredSpellsByLevel[0]?.length || 0})
              </span>
            </Button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {level} ур.
                <span className="ml-1 text-xs opacity-70">
                  ({filteredSpellsByLevel[level]?.length || 0})
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Spells Grid */}
        {currentLevelSpells.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentLevelSpells.map((spell: Spell) => renderSpellCard(spell))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Ничего не найдено
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedLevel === -1
                ? "Попробуйте изменить поисковый запрос"
                : searchTerm
                ? "Попробуйте изменить поисковый запрос"
                : selectedLevel === 0
                ? "Заговоры пока не загружены"
                : `Заклинания ${selectedLevel} уровня пока не загружены`}
            </p>
          </div>
        )}

        {/* Slide-over Drawer for Spell Details */}
        {selectedSpellExternalId && (
          <SlideOverDrawer
            isOpen={!!selectedSpellExternalId}
            onClose={closeDrawer}
            title={
              <div className="flex items-center gap-3">
                {(navigationHistory.length > 0) ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      goBack();
                    }}
                    className="mr-2"
                  >
                    ← Назад
                  </Button>
                ) : (
                  (location.state as any)?.backUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                         e.stopPropagation();
                         navigate((location.state as any).backUrl, {
                           state: { scrollY: (location.state as any).scrollY }
                         });
                      }}
                      className="mr-2 text-primary hover:text-primary/80"
                    >
                      ← {(location.state as any).backLabel || "Назад"}
                    </Button>
                  )
                )}
                {isLoadingSpell ? (
                  <>
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span>Загрузка...</span>
                  </>
                ) : selectedSpell ? (
                  <>
                    <Wand2 className="w-5 h-5 text-primary" />
                    <span>{selectedSpell.nameRu || "Заклинание"}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 text-primary" />
                    <span>Заклинание</span>
                  </>
                )}
              </div>
            }
            actions={
              canEdit &&
              selectedSpell &&
              !isLoadingSpell && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditSpell(selectedSpell)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (
                        selectedSpell &&
                        confirm(`Удалить заклинание "${selectedSpell.nameRu}"?`)
                      ) {
                        deleteSpellMutation.mutate(selectedSpell.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          >
            {isLoadingSpell ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : selectedSpell ? (
              <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Уровень
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.level === 0 ? "Заговор" : `${selectedSpell.level} уровень`}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Школа магии
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.school}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Время накладывания
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.castingTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Дистанция
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.range}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Компоненты
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.components}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Длительность
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedSpell.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Описание
                    </h3>
                    <DescriptionRenderer items={selectedSpell.description} />
                  </div>

                  {/* Classes */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      Доступно классам
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpell.classes
                        .map((classId: string) => {
                          const classInfo = AVAILABLE_CLASSES.find(
                            (c) => c.id === classId
                          );
                          return classInfo ? { classId, classInfo } : null;
                        })
                        .filter(Boolean)
                        .map((item: any) => (
                          <span
                            key={item.classId}
                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {item.classInfo.name}
                          </span>
                        ))}
                    </div>
                  </div>
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
                  ? "Создать заклинание"
                  : "Редактировать заклинание"}
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
                  value={editingSpell.externalId}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      externalId: e.target.value,
                    })
                  }
                  placeholder="Например: fire-bolt"
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
                  value={editingSpell.nameRu}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      nameRu: e.target.value,
                    })
                  }
                  placeholder="Например: Огненный снаряд"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingSpell.name}
                  onChange={(e) =>
                    setEditingSpell({ ...editingSpell, name: e.target.value })
                  }
                  placeholder="Например: Fire Bolt"
                />
              </div>

              {/* Level */}
              <div className="space-y-2">
                <Label htmlFor="level">Уровень заклинания *</Label>
                <Select
                  id="level"
                  options={SPELL_LEVELS}
                  value={editingSpell.level.toString()}
                  placeholder="Выберите уровень"
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      level: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* School */}
              <div className="space-y-2">
                <Label htmlFor="school">Школа магии *</Label>
                <Select
                  id="school"
                  options={SCHOOLS}
                  value={editingSpell.school}
                  placeholder="Выберите школу"
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      school: e.target.value,
                    })
                  }
                />
              </div>

              {/* Casting Time */}
              <div className="space-y-2">
                <Label htmlFor="castingTime">Время накладывания *</Label>
                <Input
                  id="castingTime"
                  value={editingSpell.castingTime}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      castingTime: e.target.value,
                    })
                  }
                  placeholder="Например: 1 действие"
                />
              </div>

              {/* Range */}
              <div className="space-y-2">
                <Label htmlFor="range">Дистанция *</Label>
                <Input
                  id="range"
                  value={editingSpell.range}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      range: e.target.value,
                    })
                  }
                  placeholder="Например: 120 футов"
                />
              </div>

              {/* Components */}
              <div className="space-y-2">
                <Label htmlFor="components">Компоненты *</Label>
                <Input
                  id="components"
                  value={editingSpell.components}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      components: e.target.value,
                    })
                  }
                  placeholder="Например: В, С"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Длительность *</Label>
                <Input
                  id="duration"
                  value={editingSpell.duration}
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      duration: e.target.value,
                    })
                  }
                  placeholder="Например: Мгновенная"
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Источник *</Label>
                <Select
                  id="source"
                  options={SOURCES}
                  value={editingSpell.source}
                  placeholder="Выберите источник"
                  onChange={(e) =>
                    setEditingSpell({
                      ...editingSpell,
                      source: e.target.value,
                    })
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Описание (JSON) *</Label>
                <Textarea
                  id="description"
                  value={JSON.stringify(editingSpell.description, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingSpell({
                        ...editingSpell,
                        description: parsed,
                      });
                    } catch (err) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='["Описание заклинания..."]'
                  rows={8}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Формат: массив строк, списков или таблиц в JSON
                </p>
              </div>

              {/* Classes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Доступно классам *
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {editingSpell.classes.length}{" "}
                    {editingSpell.classes.length === 1 ? "класс" : "классов"}
                  </span>
                </div>

                {/* Classes Grid with Checkboxes */}
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_CLASSES.map((classOption) => {
                    const isSelected = editingSpell.classes.includes(
                      classOption.id
                    );
                    return (
                      <label
                        key={classOption.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleClass(classOption.id)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">
                            {classOption.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {classOption.nameEn}
                          </div>
                        </div>
                      </label>
                    );
                  })}
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
                  onClick={handleSaveSpell}
                  disabled={
                    createSpellMutation.isPending ||
                    updateSpellMutation.isPending
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
