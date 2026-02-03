import { useState, useMemo } from "react";
import { Search, Check, Sparkles, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { useBackendSpellsByClass } from "@/api/hooks";
import type { Spell } from "@/types/character";

export function SpellsStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const { character, addSpell, removeSpell, getStats } = useCharacterStore();

  // Проверяем, является ли класс заклинателем
  const isSpellcaster = character.class?.spellcasting !== undefined;
  const classId = character.class?.externalId || "";

  // Загружаем заклинания для конкретного класса с сервера
  const { data: spellsData, isLoading, error } = useBackendSpellsByClass(classId);

  // Получаем статистику персонажа
  const stats = getStats();

  // Получаем заклинания для класса из данных сервера (уже отфильтрованы по классу)
  const availableSpells = useMemo(() => {
    if (!spellsData?.data?.spells) {
      return [];
    }

    const allSpells = spellsData.data.spells;

    // Преобразуем в формат Spell
    return allSpells.map((spell: any) => ({
      id: spell.id || spell.externalId,
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
    }));
  }, [spellsData]);

  const classCantrips = availableSpells.filter((s: Spell) => s.level === 0);
  const classLevel1Spells = availableSpells.filter((s: Spell) => s.level === 1);

  // Количество известных заговоров и заклинаний из stats
  const cantripsKnown = stats.spellcasting?.cantripsKnown || 0;
  const spellsKnown = stats.spellcasting?.spellsKnown || 0;
  const spellSlots = stats.spellcasting?.spellSlots || {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  };

  const selectedCantrips = character.cantripsKnown.length;
  const selectedSpells = character.spellsKnown.length;

  const filteredSpells = (
    selectedLevel === 0 ? classCantrips : classLevel1Spells
  ).filter(
    (spell: Spell) =>
      spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.nameRu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSpell = (spell: Spell) => {
    const type = spell.level === 0 ? "cantrip" : "known";
    const isSelected =
      spell.level === 0
        ? character.cantripsKnown.some((s) => s.id === spell.id)
        : character.spellsKnown.some((s) => s.id === spell.id);

    if (isSelected) {
      removeSpell(spell.id, type);
    } else {
      // Проверяем лимит
      if (spell.level === 0 && selectedCantrips >= cantripsKnown) return;
      if (spell.level > 0 && selectedSpells >= spellsKnown) return;
      addSpell(spell, type);
    }
  };

  const isSpellSelected = (spell: Spell): boolean => {
    return spell.level === 0
      ? character.cantripsKnown.some((s) => s.id === spell.id)
      : character.spellsKnown.some((s) => s.id === spell.id);
  };

  if (!isSpellcaster) {
    return (
      <div className="space-y-6">
        <Card className="bg-muted/30">
          <CardContent className="py-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Ваш класс не использует заклинания
            </h3>
            <p className="text-sm text-muted-foreground">
              {character.class?.nameRu || "Выбранный класс"} не является
              заклинателем. Вы можете пропустить этот шаг.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-muted/30">
          <CardContent className="py-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <h3 className="text-lg font-medium mb-2">Загрузка заклинаний...</h3>
            <p className="text-sm text-muted-foreground">
              Пожалуйста, подождите
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="py-8 text-center">
            <h3 className="text-lg font-medium mb-2 text-destructive">
              Ошибка загрузки заклинаний
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Не удалось загрузить заклинания с сервера. Убедитесь, что бэкенд запущен.
            </p>
            <p className="text-xs text-muted-foreground">
              {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!spellsData?.data?.spells || spellsData.data.spells.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="bg-muted/30">
          <CardContent className="py-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Заклинания не найдены
            </h3>
            <p className="text-sm text-muted-foreground">
              Для класса {character.class?.nameRu} ({classId}) не найдено заклинаний в базе данных.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Информация о заклинаниях класса */}
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Заклинания {character.class?.nameRu}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-card p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Заговоры</p>
              <p className="text-xl font-bold">
                {selectedCantrips} / {cantripsKnown}
              </p>
            </div>
            {spellsKnown > 0 && (
              <div className="bg-card p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Известные заклинания
                </p>
                <p className="text-xl font-bold">
                  {selectedSpells} / {spellsKnown}
                </p>
              </div>
            )}
            {spellSlots.level1 > 0 && (
              <div className="bg-card p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Ячейки 1 круга</p>
                <p className="text-xl font-bold">{spellSlots.level1}</p>
              </div>
            )}
            <div className="bg-card p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Базовая характеристика
              </p>
              <p className="text-lg font-bold capitalize">
                {character.class?.spellcasting?.ability === "intelligence" &&
                  "Интеллект"}
                {character.class?.spellcasting?.ability === "wisdom" &&
                  "Мудрость"}
                {character.class?.spellcasting?.ability === "charisma" &&
                  "Харизма"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Переключатель уровней */}
      <div className="flex gap-2">
        <Button
          variant={selectedLevel === 0 ? "default" : "outline"}
          onClick={() => setSelectedLevel(0)}
        >
          Заговоры ({selectedCantrips}/{cantripsKnown})
        </Button>
        {spellsKnown > 0 && (
          <Button
            variant={selectedLevel === 1 ? "default" : "outline"}
            onClick={() => setSelectedLevel(1)}
          >
            1 круг ({selectedSpells}/{spellsKnown})
          </Button>
        )}
      </div>

      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск заклинаний..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Список заклинаний */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSpells.map((spell: Spell) => {
          const isSelected = isSpellSelected(spell);
          const isDisabled =
            !isSelected &&
            ((spell.level === 0 && selectedCantrips >= cantripsKnown) ||
              (spell.level > 0 && selectedSpells >= spellsKnown));

          return (
            <Card
              key={spell.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-primary/50"
              }`}
              onClick={() => !isDisabled && handleToggleSpell(spell)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {spell.nameRu}
                      {isSelected && <Check className="w-4 h-4 text-primary" />}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {spell.name} • {spell.school}
                    </CardDescription>
                  </div>
                  <Badge variant={spell.level === 0 ? "secondary" : "default"}>
                    {spell.level === 0 ? "Заговор" : `${spell.level} круг`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs text-muted-foreground space-y-1 mb-2">
                  <p>
                    <span className="font-medium">Время:</span>{" "}
                    {spell.castingTime}
                  </p>
                  <p>
                    <span className="font-medium">Дистанция:</span>{" "}
                    {spell.range}
                  </p>
                  <p>
                    <span className="font-medium">Компоненты:</span>{" "}
                    {spell.components}
                  </p>
                  <p>
                    <span className="font-medium">Длительность:</span>{" "}
                    {spell.duration}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {spell.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSpells.length === 0 && (
        <Card className="bg-muted/30">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Заклинания не найдены</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
