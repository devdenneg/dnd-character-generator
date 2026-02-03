import { useBackendClasses } from "@/api/hooks";
import { classesApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Zap,
  Crown,
  Flame,
  Mountain,
  Scroll,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";
import type { ElementType } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

// Types
interface ClassFeature {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  level: number;
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
  subclasses: any[];
  startingEquipment?: any;
  spellcasting?: any;
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

const ABILITY_NAMES: Record<string, string> = {
  strength: "Сила",
  dexterity: "Ловкость",
  constitution: "Телосложение",
  intelligence: "Интеллект",
  wisdom: "Мудрость",
  charisma: "Харизма",
};

interface ClassesPageProps {
  onBack?: () => void;
}

export function ClassesPage({ onBack }: ClassesPageProps) {
  const { data, isLoading, error, refetch } = useBackendClasses();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Delete class mutation
  const deleteClassMutation = useMutation({
    mutationFn: classesApi.delete,
    onSuccess: () => {
      refetch();
      setSelectedClass(null);
    },
  });

  const canEdit = user?.role === "master";

  const classes = data?.data?.classes || [];

  // Фильтрация по поиску
  const filteredClasses = useMemo(() => {
    if (!searchTerm.trim()) return classes;

    const search = searchTerm.toLowerCase();
    return classes.filter((cls: CharacterClass) =>
      cls.nameRu.toLowerCase().includes(search) ||
      cls.name.toLowerCase().includes(search) ||
      cls.description.toLowerCase().includes(search)
    );
  }, [classes, searchTerm]);

  const renderClassCard = (cls: CharacterClass) => {
    const Icon = CLASS_ICONS[cls.externalId] || Shield;
    const isSelected = selectedClass === cls.id;

    return (
      <div
        key={cls.id}
        onClick={() => setSelectedClass(isSelected ? null : cls.id)}
        className={`p-4 rounded-lg border cursor-pointer transition-all ${
          isSelected
            ? "bg-primary/10 border-primary"
            : "bg-card border-border hover:border-primary/50"
        }`}
      >
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {cls.nameRu}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {cls.name}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              d{cls.hitDie}
            </span>
            {canEdit && isSelected && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement edit
                  alert("Редактирование классов будет добавлено позже");
                }}
              >
                <Pencil className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {isSelected && (
          <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {cls.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Основные:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {cls.primaryAbility.map((ability) => (
                    <span key={ability} className="px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {ABILITY_NAMES[ability] || ability}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Спасброски:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {cls.savingThrows.map((save) => (
                    <span key={save} className="px-2 py-0.5 rounded bg-accent/10 text-accent">
                      {ABILITY_NAMES[save] || save}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs">
              <span className="text-muted-foreground">Владения доспехами:</span>
              <p className="mt-1 text-foreground">
                {cls.armorProficiencies.join(", ") || "Нет"}
              </p>
            </div>

            <div className="text-xs">
              <span className="text-muted-foreground">Владения оружием:</span>
              <p className="mt-1 text-foreground">
                {cls.weaponProficiencies.join(", ") || "Нет"}
              </p>
            </div>

            <div className="text-xs">
              <span className="text-muted-foreground">Навыки:</span>
              <p className="mt-1 text-foreground">
                Выбор {cls.skillCount} из {cls.skillChoices.length} доступных
              </p>
            </div>

            {cls.spellcasting && (
              <div className="text-xs">
                <span className="text-muted-foreground">Заклинания:</span>
                <p className="mt-1 text-foreground">
                  Базовая характеристика: {ABILITY_NAMES[cls.spellcasting.ability]}
                </p>
              </div>
            )}

            <div className="text-xs">
              <span className="text-muted-foreground">Особенности:</span>
              <p className="mt-1 text-foreground">
                {cls.features.length} классовых особенностей
              </p>
            </div>

            {canEdit && (
              <Button
                variant="destructive"
                size="sm"
                className="w-full mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Удалить класс "${cls.nameRu}"?`)) {
                    deleteClassMutation.mutate(cls.id);
                  }
                }}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Удалить
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg border bg-card animate-pulse"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Ошибка загрузки классов
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о классах с сервера.
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

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
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
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск классов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredClasses.map((cls: CharacterClass) => renderClassCard(cls))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Ничего не найдено
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "Попробуйте изменить поисковый запрос"
                : "Классы пока не загружены"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
