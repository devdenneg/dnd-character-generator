import { useBackendSpells } from "@/api/hooks";
import { spellsApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { PageLayout } from "@/components/PageLayout";
import {
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Wand2,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

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
  description: string;
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
  description: string;
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

export function SpellsPage({ onBack }: SpellsPageProps) {
  const { data, error, refetch } = useBackendSpells();
  const { user } = useAuth();
  const [selectedSpell, setSelectedSpell] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
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
    description: "",
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
      setSelectedSpell(null);
      resetCreateForm();
    },
  });

  // Delete spell mutation
  const deleteSpellMutation = useMutation({
    mutationFn: spellsApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedSpell(null);
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
      description: "",
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
      !editingSpell.description
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
      updateSpellMutation.mutate({
        id: selectedSpell!,
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

  const canEdit = user?.role === "master";

  const spells = useMemo(() => data?.data?.spells || [], [data?.data?.spells]);

  // Группируем заклинания по уровням
  const spellsByLevel: Record<number, Spell[]> = useMemo(() => {
    const byLevel: Record<number, Spell[]> = {};
    for (let i = 0; i <= 9; i++) {
      byLevel[i] = spells.filter((spell: Spell) => spell.level === i);
    }
    return byLevel;
  }, [spells]);

  // Получаем заклинания выбранного уровня с учетом поиска
  const currentLevelSpells = useMemo(() => {
    const levelSpells = spellsByLevel[selectedLevel] || [];
    if (!searchTerm.trim()) return levelSpells;

    const search = searchTerm.toLowerCase();
    return levelSpells.filter(
      (spell: Spell) =>
        spell.nameRu.toLowerCase().includes(search) ||
        spell.name.toLowerCase().includes(search) ||
        spell.description.toLowerCase().includes(search)
    );
  }, [spellsByLevel, selectedLevel, searchTerm]);

  const renderSpellCard = (spell: Spell) => {
    return (
      <div
        key={spell.id}
        onClick={() => setSelectedSpell(spell.id)}
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
      <PageLayout>
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
      </PageLayout>
    );
  }

  return (
    <PageLayout>
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
                  {spells.length} заклинаний
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск заклинаний..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            <Button
              variant={selectedLevel === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(0)}
              className="gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Заговоры
              <span className="ml-1 text-xs opacity-70">
                ({spellsByLevel[0]?.length || 0})
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
                  ({spellsByLevel[level]?.length || 0})
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
              {searchTerm
                ? "Попробуйте изменить поисковый запрос"
                : selectedLevel === 0
                ? "Заговоры пока не загружены"
                : `Заклинания ${selectedLevel} уровня пока не загружены`}
            </p>
          </div>
        )}

        {/* Slide-over Drawer for Spell Details */}
        {selectedSpell && data?.data?.spells && (
          <SlideOverDrawer
            isOpen={!!selectedSpell}
            onClose={() => setSelectedSpell(null)}
            title={
              <div className="flex items-center gap-3">
                <Wand2 className="w-5 h-5 text-primary" />
                <span>
                  {data.data.spells.find((s: Spell) => s.id === selectedSpell)
                    ?.nameRu || "Заклинание"}
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
                      const spell = data.data.spells.find(
                        (s: Spell) => s.id === selectedSpell
                      );
                      if (spell) handleEditSpell(spell);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      const spell = data.data.spells.find(
                        (s: Spell) => s.id === selectedSpell
                      );
                      if (
                        spell &&
                        confirm(`Удалить заклинание "${spell.nameRu}"?`)
                      ) {
                        deleteSpellMutation.mutate(spell.id);
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
              const spell = data.data.spells.find(
                (s: Spell) => s.id === selectedSpell
              );
              if (!spell) return null;

              const levelLabel =
                spell.level === 0 ? "Заговор" : `${spell.level} уровень`;

              return (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Уровень
                        </span>
                        <span className="font-medium text-foreground">
                          {levelLabel}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Школа магии
                        </span>
                        <span className="font-medium text-foreground">
                          {spell.school}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Время накладывания
                        </span>
                        <span className="font-medium text-foreground">
                          {spell.castingTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Дистанция
                        </span>
                        <span className="font-medium text-foreground">
                          {spell.range}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Компоненты
                        </span>
                        <span className="font-medium text-foreground">
                          {spell.components}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Длительность
                        </span>
                        <span className="font-medium text-foreground">
                          {spell.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Описание
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {spell.description}
                    </p>
                  </div>

                  {/* Classes */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      Доступно классам
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {spell.classes.map((classId: string) => {
                        const classInfo = AVAILABLE_CLASSES.find(
                          (c) => c.id === classId
                        );
                        return (
                          <span
                            key={classId}
                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {classInfo?.name || classId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </SlideOverDrawer>
        )}

        {/* Create/Edit Modal */}
        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
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
                    Уникальный идентификатор, используется в коде. Можно
                    изменить только при создании.
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
                  <Label htmlFor="description">Описание *</Label>
                  <Textarea
                    id="description"
                    value={editingSpell.description}
                    onChange={(e) =>
                      setEditingSpell({
                        ...editingSpell,
                        description: e.target.value,
                      })
                    }
                    placeholder="Описание заклинания..."
                    rows={4}
                  />
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
      </div>
    </PageLayout>
  );
}
