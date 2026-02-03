import { useBackendSpells } from "@/api/hooks";
import { spellsApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Sparkles,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, error, refetch } = useBackendSpells();
  const { user } = useAuth();
  const [selectedSpell, setSelectedSpell] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
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

  // Selected spell data query
  const selectedSpellData = useQuery({
    queryKey: ["spell", selectedSpell],
    queryFn: () => spellsApi.get(selectedSpell!),
    enabled: !!selectedSpell,
    staleTime: Infinity,
  });

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
    setClassInput("");
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
    if (!editingSpell.externalId || !editingSpell.name || !editingSpell.nameRu || !editingSpell.description) {
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
              Ошибка загрузки заклинаний
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о заклинаниях с сервера. Пожалуйста, попробуйте
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

  const spells = data?.data?.spells || [];

  // Группируем заклинания по уровням
  const spellsByLevel: Record<number, Spell[]> = {};
  for (let i = 0; i <= 9; i++) {
    spellsByLevel[i] = spells.filter((spell: Spell) => spell.level === i);
  }

  // Получаем заклинания выбранного уровня
  const currentLevelSpells = spellsByLevel[selectedLevel] || [];

  const renderSpellCard = (spell: Spell, index: number) => {
    const isSelected = selectedSpell === spell.id;

    return (
      <div key={spell.id} className="space-y-4">
        <button
          onClick={() => setSelectedSpell(isSelected ? null : spell.id)}
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
              {spell.level === 0 ? (
                <Sparkles className="w-7 h-7 text-white" />
              ) : (
                <Wand2 className="w-7 h-7 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-lg text-foreground">
                  {spell.nameRu}
                </h3>
                {canEdit && isSelected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSpell(spell);
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
                {spell.name}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {spell.level === 0 ? "Заговор" : `${spell.level} уровень`}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                  {spell.school}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                  {spell.classes.length} {spell.classes.length === 1 ? "класс" : "классов"}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Expanded Details */}
        {isSelected && (
          <div className="bg-card/80 border border-primary/20 rounded-2xl p-6 mt-2 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-semibold text-foreground">Детали заклинания</h4>
              {canEdit && selectedSpellData.data?.data?.spell && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive p-1"
                  onClick={() => {
                    if (confirm(`Вы уверены, что хотите удалить заклинание "${selectedSpellData.data.data.spell.nameRu}"?`)) {
                      deleteSpellMutation.mutate(selectedSpell);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-muted-foreground">Время накладывания:</span>
                  <p className="text-sm text-foreground">{spell.castingTime}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Дистанция:</span>
                  <p className="text-sm text-foreground">{spell.range}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Компоненты:</span>
                  <p className="text-sm text-foreground">{spell.components}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Длительность:</span>
                  <p className="text-sm text-foreground">{spell.duration}</p>
                </div>
              </div>
            </div>

            <h5 className="font-semibold text-foreground mb-2">Описание</h5>
            <p className="text-sm text-muted-foreground mb-4">
              {spell.description}
            </p>

            <h5 className="font-semibold text-foreground mb-2">Доступно классам</h5>
            <div className="flex flex-wrap gap-2">
              {spell.classes.map((classId) => {
                const classInfo = AVAILABLE_CLASSES.find(c => c.id === classId);
                return (
                  <span
                    key={classId}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {classInfo?.name || classId}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

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
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Заклинания PHB 2024</h1>
                <p className="text-sm text-muted-foreground">
                  официальные заклинания из Книги игрока 2024
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateSpell} className="gap-2">
                <Plus className="w-4 h-4" />
                Создать заклинание
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Всего заклинаний: <span className="font-semibold text-foreground">{spells.length}</span>
          </p>
        </div>

        {/* Tabs for spell levels */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLevel === 0 ? "default" : "outline"}
              onClick={() => setSelectedLevel(0)}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Заговоры ({spellsByLevel[0]?.length || 0})
            </Button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
              >
                {level} уровень ({spellsByLevel[level]?.length || 0})
              </Button>
            ))}
          </div>
        </div>

        {/* Spells Grid */}
        {currentLevelSpells.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              {selectedLevel === 0 ? (
                <>
                  <Sparkles className="w-5 h-5 text-primary" />
                  Заговоры
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-accent" />
                  Заклинания {selectedLevel} уровня
                </>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLevelSpells.map((spell: Spell, index: number) => renderSpellCard(spell, index))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Wand2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нет заклинаний
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedLevel === 0
                ? "Заговоры пока не загружены"
                : `Заклинания ${selectedLevel} уровня пока не загружены`
              }
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen ? "Создать заклинание" : "Редактировать заклинание"}
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
                  value={editingSpell.externalId}
                  onChange={(e) => setEditingSpell({ ...editingSpell, externalId: e.target.value })}
                  placeholder="Например: fire-bolt"
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
                  value={editingSpell.nameRu}
                  onChange={(e) => setEditingSpell({ ...editingSpell, nameRu: e.target.value })}
                  placeholder="Например: Огненный снаряд"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingSpell.name}
                  onChange={(e) => setEditingSpell({ ...editingSpell, name: e.target.value })}
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
                  onChange={(e) => setEditingSpell({ ...editingSpell, level: parseInt(e.target.value) })}
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
                  onChange={(e) => setEditingSpell({ ...editingSpell, school: e.target.value })}
                />
              </div>

              {/* Casting Time */}
              <div className="space-y-2">
                <Label htmlFor="castingTime">Время накладывания *</Label>
                <Input
                  id="castingTime"
                  value={editingSpell.castingTime}
                  onChange={(e) => setEditingSpell({ ...editingSpell, castingTime: e.target.value })}
                  placeholder="Например: 1 действие"
                />
              </div>

              {/* Range */}
              <div className="space-y-2">
                <Label htmlFor="range">Дистанция *</Label>
                <Input
                  id="range"
                  value={editingSpell.range}
                  onChange={(e) => setEditingSpell({ ...editingSpell, range: e.target.value })}
                  placeholder="Например: 120 футов"
                />
              </div>

              {/* Components */}
              <div className="space-y-2">
                <Label htmlFor="components">Компоненты *</Label>
                <Input
                  id="components"
                  value={editingSpell.components}
                  onChange={(e) => setEditingSpell({ ...editingSpell, components: e.target.value })}
                  placeholder="Например: В, С"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Длительность *</Label>
                <Input
                  id="duration"
                  value={editingSpell.duration}
                  onChange={(e) => setEditingSpell({ ...editingSpell, duration: e.target.value })}
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
                  onChange={(e) => setEditingSpell({ ...editingSpell, source: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={editingSpell.description}
                  onChange={(e) => setEditingSpell({ ...editingSpell, description: e.target.value })}
                  placeholder="Описание заклинания..."
                  rows={4}
                />
              </div>

              {/* Classes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Доступно классам *</Label>
                  <span className="text-sm text-muted-foreground">
                    {editingSpell.classes.length} {editingSpell.classes.length === 1 ? "класс" : "классов"}
                  </span>
                </div>

                {/* Classes Grid with Checkboxes */}
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_CLASSES.map((classOption) => {
                    const isSelected = editingSpell.classes.includes(classOption.id);
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
                  disabled={createSpellMutation.isPending || updateSpellMutation.isPending}
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
