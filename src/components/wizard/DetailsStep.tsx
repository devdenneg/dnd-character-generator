import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCharacterStore } from "@/store/characterStore";
import { t } from "@/data/translations/ru";
import {
  Footprints,
  Ruler,
  Heart,
  Star,
  Shield,
  Zap,
  Lock,
} from "lucide-react";

const ALIGNMENTS = [
  { value: "lawful-good", label: "Законно-добрый" },
  { value: "neutral-good", label: "Нейтрально-добрый" },
  { value: "chaotic-good", label: "Хаотично-добрый" },
  { value: "lawful-neutral", label: "Законно-нейтральный" },
  { value: "true-neutral", label: "Истинно нейтральный" },
  { value: "chaotic-neutral", label: "Хаотично-нейтральный" },
  { value: "lawful-evil", label: "Законно-злой" },
  { value: "neutral-evil", label: "Нейтрально-злой" },
  { value: "chaotic-evil", label: "Хаотично-злой" },
];

// Рекомендуемые диапазоны роста и веса по видам
const RACE_PHYSICAL_STATS: Record<
  string,
  { heightRange: string; weightRange: string; ageRange: string }
> = {
  human: {
    heightRange: "155–185 см",
    weightRange: "55–90 кг",
    ageRange: "18–80 лет",
  },
  elf: {
    heightRange: "155–180 см",
    weightRange: "45–70 кг",
    ageRange: "100–750 лет",
  },
  dwarf: {
    heightRange: "120–150 см",
    weightRange: "60–90 кг",
    ageRange: "50–350 лет",
  },
  halfling: {
    heightRange: "90–110 см",
    weightRange: "20–35 кг",
    ageRange: "20–150 лет",
  },
  dragonborn: {
    heightRange: "180–210 см",
    weightRange: "100–140 кг",
    ageRange: "15–80 лет",
  },
  gnome: {
    heightRange: "90–120 см",
    weightRange: "18–30 кг",
    ageRange: "40–500 лет",
  },
  "half-elf": {
    heightRange: "155–180 см",
    weightRange: "55–85 кг",
    ageRange: "20–180 лет",
  },
  "half-orc": {
    heightRange: "170–200 см",
    weightRange: "80–120 кг",
    ageRange: "14–75 лет",
  },
  tiefling: {
    heightRange: "160–185 см",
    weightRange: "60–90 кг",
    ageRange: "18–100 лет",
  },
  aasimar: {
    heightRange: "160–190 см",
    weightRange: "60–95 кг",
    ageRange: "18–160 лет",
  },
  goliath: {
    heightRange: "210–240 см",
    weightRange: "130–170 кг",
    ageRange: "18–80 лет",
  },
  orc: {
    heightRange: "180–210 см",
    weightRange: "100–140 кг",
    ageRange: "12–50 лет",
  },
};

export function DetailsStep() {
  const { character, setCharacterDetails, setName, getStats } =
    useCharacterStore();
  const stats = getStats();

  const raceStats = character.race?.id
    ? RACE_PHYSICAL_STATS[character.race.id]
    : null;

  return (
    <div className="space-y-6">
      {/* Игровые характеристики (из выбора расы/класса) */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lock className="w-5 h-5 text-primary" />
            Игровые характеристики
            <Badge variant="outline" className="ml-2 text-xs">
              Определены выбором
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Эти значения определяются вашим выбором вида и класса и не могут
            быть изменены.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {/* Скорость */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {stats.speed}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                Скорость
              </div>
              {character.race && (
                <div className="text-[10px] text-emerald-600 mt-0.5 sm:mt-1">
                  от {character.race.nameRu}
                </div>
              )}
            </div>

            {/* Размер */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {character.race?.size === "Small" ? "М" : "С"}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                Размер
              </div>
              {character.race && (
                <div className="text-[10px] text-blue-600 mt-0.5 sm:mt-1 truncate">
                  от {character.race.nameRu}
                </div>
              )}
            </div>

            {/* Хиты */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {stats.hitPointMaximum}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                Хиты
              </div>
              {character.class && (
                <div className="text-[10px] text-red-600 mt-0.5 sm:mt-1">
                  d{character.class.hitDie} + ТЕЛ
                </div>
              )}
            </div>

            {/* КД */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {stats.armorClass}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                КД
              </div>
              <div className="text-[10px] text-sky-600 mt-0.5 sm:mt-1">
                10 + ЛОВ
              </div>
            </div>

            {/* Мастерство */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                +{stats.proficiencyBonus}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                Бонус
              </div>
              <div className="text-[10px] text-amber-600 mt-0.5 sm:mt-1">
                {character.level} ур
              </div>
            </div>

            {/* Инициатива */}
            <div className="bg-card rounded-xl p-2.5 sm:p-3 border border-border text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {stats.initiative >= 0
                  ? `+${stats.initiative}`
                  : stats.initiative}
              </div>
              <div className="text-xs text-muted-foreground leading-tight px-0.5">
                Иниц.
              </div>
              <div className="text-[10px] text-violet-600 mt-0.5 sm:mt-1">
                ЛОВ
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("character.name")} *</Label>
              <Input
                id="name"
                placeholder="Введите имя персонажа"
                value={character.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alignment">{t("character.alignment")}</Label>
              <Select
                id="alignment"
                options={ALIGNMENTS}
                placeholder="Выберите мировоззрение"
                value={character.alignment}
                onChange={(e) =>
                  setCharacterDetails({ alignment: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>{t("details.appearance")}</CardTitle>
          {raceStats && (
            <p className="text-sm text-muted-foreground mt-1">
              Рекомендуемые диапазоны для {character.race?.nameRu}: рост{" "}
              {raceStats.heightRange}, вес {raceStats.weightRange}, возраст{" "}
              {raceStats.ageRange}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="age">{t("details.age")}</Label>
              <Input
                id="age"
                placeholder={raceStats?.ageRange || "25 лет"}
                value={character.age}
                onChange={(e) => setCharacterDetails({ age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t("details.height")}</Label>
              <Input
                id="height"
                placeholder={raceStats?.heightRange.split("–")[0] || "180 см"}
                value={character.height}
                onChange={(e) =>
                  setCharacterDetails({ height: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{t("details.weight")}</Label>
              <Input
                id="weight"
                placeholder={raceStats?.weightRange.split("–")[0] || "75 кг"}
                value={character.weight}
                onChange={(e) =>
                  setCharacterDetails({ weight: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eyes">{t("details.eyes")}</Label>
              <Input
                id="eyes"
                placeholder="Карие"
                value={character.eyes}
                onChange={(e) => setCharacterDetails({ eyes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skin">{t("details.skin")}</Label>
              <Input
                id="skin"
                placeholder="Смуглая"
                value={character.skin}
                onChange={(e) => setCharacterDetails({ skin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hair">{t("details.hair")}</Label>
              <Input
                id="hair"
                placeholder="Чёрные, короткие"
                value={character.hair}
                onChange={(e) => setCharacterDetails({ hair: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appearance">Описание внешности</Label>
            <Textarea
              id="appearance"
              placeholder="Опишите внешность вашего персонажа..."
              value={character.appearance}
              onChange={(e) =>
                setCharacterDetails({ appearance: e.target.value })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Personality */}
      <Card>
        <CardHeader>
          <CardTitle>Характер</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personalityTraits">
                {t("details.personalityTraits")}
              </Label>
              <Textarea
                id="personalityTraits"
                placeholder="Я всегда помогаю тем, кто в беде..."
                value={character.personalityTraits}
                onChange={(e) =>
                  setCharacterDetails({ personalityTraits: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideals">{t("details.ideals")}</Label>
              <Textarea
                id="ideals"
                placeholder="Справедливость. Закон един для всех..."
                value={character.ideals}
                onChange={(e) =>
                  setCharacterDetails({ ideals: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonds">{t("details.bonds")}</Label>
              <Textarea
                id="bonds"
                placeholder="Я защищаю тех, кто не может защитить себя..."
                value={character.bonds}
                onChange={(e) => setCharacterDetails({ bonds: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flaws">{t("details.flaws")}</Label>
              <Textarea
                id="flaws"
                placeholder="Я слишком доверчив..."
                value={character.flaws}
                onChange={(e) => setCharacterDetails({ flaws: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backstory */}
      <Card>
        <CardHeader>
          <CardTitle>{t("details.backstory")}</CardTitle>
          {character.background && (
            <p className="text-sm text-muted-foreground mt-1">
              На основе предыстории:{" "}
              <span className="font-medium text-foreground">
                {character.background.nameRu}
              </span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Textarea
            id="backstory"
            placeholder="Расскажите историю вашего персонажа..."
            value={
              character.backstory || character.background?.description || ""
            }
            onChange={(e) => setCharacterDetails({ backstory: e.target.value })}
            rows={6}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Вы можете отредактировать или полностью удалить этот текст
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
