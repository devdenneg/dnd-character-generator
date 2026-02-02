import { useState } from "react";
import {
  Shield,
  Heart,
  Zap,
  Footprints,
  Swords,
  Target,
  Scroll,
  Star,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Package,
  User,
  BookOpen,
  HelpCircle,
  Calculator,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipHeader,
  TooltipDescription,
  TooltipCalc,
  TooltipCalcRow,
  TooltipHighlight,
} from "@/components/ui/tooltip";
import { useCharacterStore } from "@/store/characterStore";
import {
  getSkillNameRu,
  getAbilityNameRu,
  getAbilityAbbr,
} from "@/data/translations/ru";
import type { AbilityName } from "@/types/character";

// Пояснения для характеристик
const ABILITY_EXPLANATIONS: Record<string, string> = {
  strength:
    "Влияет на: рукопашные атаки, урон оружием ближнего боя, атлетику, переноску груза",
  dexterity:
    "Влияет на: КД, инициативу, дальнобойные атаки, фехтовальное оружие, акробатику, скрытность",
  constitution: "Влияет на: хиты, концентрацию на заклинаниях, выносливость",
  intelligence:
    "Влияет на: магию Волшебника, расследование, историю, магические знания",
  wisdom:
    "Влияет на: магию Жреца/Друида, восприятие, проницательность, спасброски от очарования",
  charisma:
    "Влияет на: магию Барда/Чародея/Колдуна, убеждение, обман, запугивание",
};

// Типы урона на русском
const DAMAGE_TYPE_RU: Record<string, string> = {
  slashing: "рубящий",
  piercing: "колющий",
  bludgeoning: "дробящий",
  fire: "огнём",
  cold: "холодом",
  lightning: "молнией",
  thunder: "звуком",
  poison: "ядом",
  acid: "кислотой",
  necrotic: "некротический",
  radiant: "излучением",
  force: "силовым полем",
  psychic: "психический",
};

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Компонент раскрывающейся секции
function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors py-2 sm:py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-base sm:text-lg flex items-center justify-between">
          <span className="flex items-center gap-1.5 sm:gap-2">
            {icon}
            <span className="truncate">{title}</span>
            {badge && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {badge}
              </Badge>
            )}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </CardTitle>
      </CardHeader>
      {isOpen && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
}

// Информационный блок с пояснением
function ExplanationBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
      <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
        <HelpCircle className="w-4 h-4" />
        {title}
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

// Блок расчёта
function CalculationBlock({
  label,
  formula,
  result,
}: {
  label: string;
  formula: string;
  result: string | number;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-xs bg-muted px-2 py-0.5 rounded">{formula}</code>
        <span className="font-bold text-primary">{result}</span>
      </div>
    </div>
  );
}

// Компонент характеристики с тултипом
function AbilityBlock({
  ability,
  score,
  baseScore,
  raceBonus,
  backgroundBonus,
  modifier,
  savingThrow,
  hasSaveProficiency,
  proficiencyBonus,
}: {
  ability: AbilityName;
  score: number;
  baseScore: number;
  raceBonus: number;
  backgroundBonus: number;
  modifier: number;
  savingThrow: number;
  hasSaveProficiency: boolean;
  proficiencyBonus: number;
}) {
  const tooltipContent = (
    <>
      <TooltipHeader>{getAbilityNameRu(ability)}</TooltipHeader>
      <TooltipDescription>{ABILITY_EXPLANATIONS[ability]}</TooltipDescription>

      <TooltipCalc>
        <TooltipCalcRow label="Базовое значение:" value={baseScore} />
        {raceBonus > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Бонус вида:</span>
            <span>+{raceBonus}</span>
          </div>
        )}
        {backgroundBonus > 0 && (
          <div className="flex justify-between text-amber-400">
            <span>Бонус предыстории:</span>
            <span>+{backgroundBonus}</span>
          </div>
        )}
        <TooltipCalcRow label="Итого:" value={score} highlight border />
      </TooltipCalc>

      <p className="text-muted-foreground text-xs">
        <strong>Модификатор</strong> = (Значение - 10) ÷ 2 = ({score} - 10) ÷ 2
        = <strong>{modifier}</strong>
      </p>

      {hasSaveProficiency && (
        <TooltipHighlight>
          ✓ Владение спасброском: {formatModifier(modifier)} +{" "}
          {proficiencyBonus} = <strong>{formatModifier(savingThrow)}</strong>
        </TooltipHighlight>
      )}
    </>
  );

  return (
    <Tooltip content={tooltipContent} maxWidth="max-w-xs">
      <div className="text-center bg-gradient-to-b from-muted/50 to-muted/30 p-3 sm:p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all cursor-help">
        <div className="text-xs font-bold text-primary mb-1 truncate">
          {getAbilityAbbr(ability)}
        </div>
        <div className="text-2xl sm:text-3xl font-bold">
          {formatModifier(modifier)}
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mt-1.5 sm:mt-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-base">
          {score}
        </div>
        <div className="mt-1.5 sm:mt-2 text-xs text-muted-foreground flex items-center justify-center gap-1 leading-tight">
          <span className="hidden sm:inline">Спасбросок:</span>
          <span className="sm:hidden">Спас:</span>
          <span className={hasSaveProficiency ? "text-primary font-bold" : ""}>
            {formatModifier(savingThrow)}
          </span>
          {hasSaveProficiency && <span>●</span>}
        </div>
      </div>
    </Tooltip>
  );
}

// Компонент навыка с подсказкой
function SkillRow({
  skillName,
  bonus,
  isProficient,
  hasExpertise,
  abilityMod,
  proficiencyBonus,
  ability,
  source,
}: {
  skillName: string;
  bonus: number;
  isProficient: boolean;
  hasExpertise: boolean;
  abilityMod: number;
  proficiencyBonus: number;
  ability: string;
  source?: "class" | "background";
}) {
  const tooltipContent = (
    <>
      <TooltipHeader>{skillName}</TooltipHeader>
      <TooltipDescription>
        Базовая характеристика: <strong>{getAbilityNameRu(ability)}</strong>
      </TooltipDescription>

      <TooltipCalc>
        <TooltipCalcRow
          label={`Модификатор ${getAbilityAbbr(ability)}:`}
          value={formatModifier(abilityMod)}
        />
        {isProficient && !hasExpertise && (
          <div className="flex justify-between text-primary">
            <span>Бонус мастерства:</span>
            <span>+{proficiencyBonus}</span>
          </div>
        )}
        {hasExpertise && (
          <div className="flex justify-between text-amber-400">
            <span>Мастерство (×2):</span>
            <span>+{proficiencyBonus * 2}</span>
          </div>
        )}
        <TooltipCalcRow
          label="Итого:"
          value={formatModifier(bonus)}
          highlight
          border
        />
      </TooltipCalc>

      {hasExpertise && (
        <TooltipHighlight>
          ⚡ <strong>Мастерство (Expertise):</strong> бонус мастерства удвоен!
        </TooltipHighlight>
      )}
      {isProficient && !hasExpertise && source && (
        <TooltipHighlight>
          ✓ Владение навыком от{" "}
          {source === "background" ? "предыстории" : "класса"}
        </TooltipHighlight>
      )}
    </>
  );

  return (
    <Tooltip content={tooltipContent} maxWidth="max-w-xs">
      <div
        className={`flex items-center justify-between gap-2 p-2 rounded-lg cursor-help transition-colors ${
          hasExpertise
            ? "bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
            : isProficient
              ? "bg-primary/10 hover:bg-primary/20"
              : "bg-muted/20 hover:bg-muted/40"
        }`}
      >
        <span className="text-xs sm:text-sm flex items-center gap-1.5 min-w-0 flex-1">
          {hasExpertise ? (
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          ) : isProficient ? (
            <Star className="w-3 h-3 text-primary fill-primary flex-shrink-0" />
          ) : null}
          <span className="truncate">{skillName}</span>
          {source === "background" && isProficient && !hasExpertise && (
            <Badge
              variant="outline"
              className="text-[10px] px-1 py-0 h-4 flex-shrink-0"
            >
              предыстория
            </Badge>
          )}
          {hasExpertise && (
            <Badge
              variant="outline"
              className="text-[10px] px-1 py-0 h-4 flex-shrink-0 bg-amber-500/10 border-amber-500/50 text-amber-400"
            >
              мастерство
            </Badge>
          )}
        </span>
        <Badge
          variant={isProficient ? "default" : "secondary"}
          className={`flex-shrink-0 text-xs ${hasExpertise ? "bg-amber-500 text-amber-950" : ""}`}
        >
          {formatModifier(bonus)}
        </Badge>
      </div>
    </Tooltip>
  );
}

// Компонент оружия
function WeaponCard({
  name,
  damage,
  damageType,
  attackBonus,
  properties,
  damageBonus,
  abilityUsed,
  profBonus,
  source,
}: {
  name: string;
  damage: string;
  damageType: string;
  attackBonus: number;
  properties?: string[];
  damageBonus: number;
  abilityUsed: string;
  profBonus: number;
  source?: string;
}) {
  const tooltipContent = (
    <>
      <TooltipHeader>{name}</TooltipHeader>

      <div className="space-y-2 mb-3">
        <div className="bg-muted/30 p-2.5 rounded-lg">
          <p className="font-medium mb-1 text-xs">Бросок атаки:</p>
          <p className="font-mono text-xs">
            1d20 + {abilityUsed} ({formatModifier(damageBonus)}) + мастерство (
            {profBonus}) = 1d20 {formatModifier(attackBonus)}
          </p>
        </div>

        <div className="bg-muted/30 p-2.5 rounded-lg">
          <p className="font-medium mb-1 text-xs">Урон:</p>
          <p className="font-mono text-xs">
            {damage} + {abilityUsed} ({formatModifier(damageBonus)}) = {damage}
            {damageBonus !== 0 && formatModifier(damageBonus)}{" "}
            {DAMAGE_TYPE_RU[damageType] || damageType}
          </p>
        </div>
      </div>

      {source && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg">
          <p className="font-medium mb-1 text-xs text-blue-600 dark:text-blue-400">Источник:</p>
          <p className="font-mono text-xs text-blue-700 dark:text-blue-300">{source}</p>
        </div>
      )}

      <TooltipDescription>
        Используется <strong>{abilityUsed}</strong> для атаки и урона
      </TooltipDescription>
    </>
  );

  return (
    <Tooltip content={tooltipContent} maxWidth="max-w-xs">
      <div className="p-3 bg-muted/30 rounded-lg border hover:border-primary/50 transition-colors cursor-help">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{name}</span>
          <Badge variant="outline">{formatModifier(attackBonus)} атака</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {damage}
          {damageBonus !== 0 && formatModifier(damageBonus)}{" "}
          {DAMAGE_TYPE_RU[damageType] || damageType}
        </div>
        {properties && properties.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {properties.map((prop, i) => (
              <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {prop}
              </span>
            ))}
          </div>
        )}
      </div>
    </Tooltip>
  );
}

// Компонент заклинания с полным описанием
function SpellCard({
  spell,
  isCantrip,
  spellSaveDC,
  spellAttackBonus,
}: {
  spell: {
    id: string;
    name: string;
    nameRu: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
  };
  isCantrip: boolean;
  spellSaveDC: number;
  spellAttackBonus: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const schoolRu: Record<string, string> = {
    evocation: "Воплощение",
    abjuration: "Ограждение",
    conjuration: "Вызов",
    divination: "Прорицание",
    enchantment: "Очарование",
    illusion: "Иллюзия",
    necromancy: "Некромантия",
    transmutation: "Преобразование",
  };

  return (
    <div className="bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                isCantrip
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {isCantrip ? "∞" : spell.level}
            </div>
            <div>
              <p className="font-medium">{spell.nameRu}</p>
              <p className="text-xs text-muted-foreground">{spell.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {schoolRu[spell.school] || spell.school}
            </Badge>
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-border/50 pt-3">
          {/* Параметры заклинания */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-muted/30 p-2 rounded">
              <span className="text-muted-foreground">Время накладывания:</span>
              <p className="font-medium">{spell.castingTime}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded">
              <span className="text-muted-foreground">Дистанция:</span>
              <p className="font-medium">{spell.range}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded">
              <span className="text-muted-foreground">Компоненты:</span>
              <p className="font-medium">{spell.components}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded">
              <span className="text-muted-foreground">Длительность:</span>
              <p className="font-medium">{spell.duration}</p>
            </div>
          </div>

          {/* Описание */}
          <div className="text-sm text-muted-foreground leading-relaxed mb-4">
            {spell.description}
          </div>

          {/* Подсказка по использованию */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-xs">
            <p className="font-medium text-purple-400 mb-2">
              Как использовать:
            </p>
            <ul className="space-y-1 text-muted-foreground">
              {spell.description.toLowerCase().includes("спасбросок") && (
                <li>
                  • Цель совершает спасбросок против СЛ{" "}
                  <strong className="text-purple-400">{spellSaveDC}</strong>
                </li>
              )}
              {spell.description.toLowerCase().includes("атак") && (
                <li>
                  • Бросок атаки заклинанием: 1d20{" "}
                  <strong className="text-purple-400">
                    {formatModifier(spellAttackBonus)}
                  </strong>
                </li>
              )}
              {isCantrip && (
                <li>• Заговор — можно использовать неограниченно, без ячеек</li>
              )}
              {!isCantrip && (
                <li>• Требует ячейку {spell.level} круга или выше</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function CharacterSheet() {
  const { character, getStats } = useCharacterStore();
  const stats = getStats();

  const ABILITIES: AbilityName[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  // Маппинг навыков к характеристикам
  const skillAbilityMap: Record<string, AbilityName> = {
    acrobatics: "dexterity",
    animal_handling: "wisdom",
    arcana: "intelligence",
    athletics: "strength",
    deception: "charisma",
    history: "intelligence",
    insight: "wisdom",
    intimidation: "charisma",
    investigation: "intelligence",
    medicine: "wisdom",
    nature: "intelligence",
    perception: "wisdom",
    performance: "charisma",
    persuasion: "charisma",
    religion: "intelligence",
    sleight_of_hand: "dexterity",
    stealth: "dexterity",
    survival: "wisdom",
  };

  // Считаем атаку для оружия
  const getWeaponAttackBonus = (isMelee: boolean, isFinesse: boolean) => {
    const strMod = stats.abilityModifiers.strength;
    const dexMod = stats.abilityModifiers.dexterity;

    if (isFinesse) {
      return Math.max(strMod, dexMod) + stats.proficiencyBonus;
    }
    return (isMelee ? strMod : dexMod) + stats.proficiencyBonus;
  };

  const getWeaponDamageBonus = (isMelee: boolean, isFinesse: boolean) => {
    const strMod = stats.abilityModifiers.strength;
    const dexMod = stats.abilityModifiers.dexterity;

    if (isFinesse) {
      return Math.max(strMod, dexMod);
    }
    return isMelee ? strMod : dexMod;
  };

  const getWeaponAbilityUsed = (isMelee: boolean, isFinesse: boolean) => {
    const strMod = stats.abilityModifiers.strength;
    const dexMod = stats.abilityModifiers.dexterity;

    if (isFinesse) {
      return strMod >= dexMod ? "Сила" : "Ловкость";
    }
    return isMelee ? "Сила" : "Ловкость";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Заголовок персонажа */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {character.name || "Безымянный герой"}
              </h1>
              <p className="text-xl text-muted-foreground mt-1">
                {character.race?.nameRu} {character.class?.nameRu}{" "}
                {character.level} уровня
                {character.subclass && ` • ${character.subclass.nameRu}`}
              </p>
              {character.background && (
                <p className="text-sm text-muted-foreground mt-1">
                  Предыстория: {character.background.nameRu}
                </p>
              )}
            </div>

            {/* Основные показатели */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              <div className="text-center bg-card p-2.5 sm:p-3 rounded-xl border-2 border-red-500/30">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-red-500 mb-1" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.hitPointMaximum}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  Хиты
                </div>
              </div>
              <div className="text-center bg-card p-2.5 sm:p-3 rounded-xl border-2 border-blue-500/30">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-blue-500 mb-1" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.armorClass}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  КД
                </div>
              </div>
              <div className="text-center bg-card p-2.5 sm:p-3 rounded-xl border-2 border-green-500/30">
                <Footprints className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-green-500 mb-1" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.speed}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  Скорость
                </div>
              </div>
              <div className="text-center bg-card p-2.5 sm:p-3 rounded-xl border-2 border-amber-500/30">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-amber-500 mb-1" />
                <div className="text-xl sm:text-2xl font-bold">
                  +{stats.proficiencyBonus}
                </div>
                <div className="text-xs text-muted-foreground leading-tight px-0.5">
                  Бонус
                </div>
              </div>
            </div>
          </div>

          {/* Кости хитов и инициатива */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>
                Инициатива: <strong>{formatModifier(stats.initiative)}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              <span>
                Кости хитов: <strong>{stats.hitDice}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span>
                Пассивное восприятие: <strong>{stats.passivePerception}</strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Пояснение основных показателей */}
      <CollapsibleSection
        title="Расчёт показателей"
        icon={<Calculator className="w-4 h-4 sm:w-5 sm:h-5" />}
        defaultOpen={false}
        badge="Для новичков"
      >
        <div className="space-y-4">
          <ExplanationBox title="Максимум хитов">
            <CalculationBlock
              label="На 1 уровне"
              formula={`${character.class?.hitDie || 0} (макс. кость хитов) + ${stats.abilityModifiers.constitution} (мод. Телосложения)`}
              result={stats.hitPointMaximum}
            />
            <p className="mt-2">
              Хиты определяют, сколько урона вы можете получить. Когда хиты
              падают до 0, персонаж теряет сознание.
            </p>
          </ExplanationBox>

          <ExplanationBox title="Класс доспеха (КД)">
            <CalculationBlock
              label="Без доспеха"
              formula={`10 + ${stats.abilityModifiers.dexterity} (мод. Ловкости)`}
              result={10 + stats.abilityModifiers.dexterity}
            />
            <div className="mt-3 p-3 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2 text-sm">С учётом снаряжения:</p>
              {(() => {
                const dexMod = stats.abilityModifiers.dexterity;
                const equippedArmor = character.equipment?.find((e) => e.category === "armor" && e.armorType !== "shield");
                const hasShield = character.equipment?.some((e) => e.armorType === "shield");

                if (equippedArmor && equippedArmor.armorClass) {
                  const armorBase = equippedArmor.armorClass;
                  let dexBonus = 0;

                  // D&D 2024 правила расчёта КД с доспехом:
                  // Лёгкий доспех: КД = Значение доспеха + Модификатор Ловкости (без ограничений)
                  // Средний доспех: КД = Значение доспеха + Модификатор Ловкости (макс. +2)
                  // Тяжёлый доспех: КД = Значение доспеха (модификатор Ловкости не добавляется)
                  if (equippedArmor.armorType === "light") {
                    // Лёгкий доспех - полный бонус Ловкости
                    dexBonus = dexMod;
                  } else if (equippedArmor.armorType === "medium") {
                    // Средний доспех - максимум +2 к Ловкости
                    const maxDexBonus = 2;
                    dexBonus = Math.min(dexMod, maxDexBonus);
                  } else if (equippedArmor.armorType === "heavy") {
                    // Тяжёлый доспех - без бонуса Ловкости
                    dexBonus = 0;
                  }

                  let ac = armorBase + dexBonus;
                  let formula = "";
                  
                  if (equippedArmor.armorType === "light") {
                    formula = `${armorBase} (база доспеха) + ${dexBonus} (ЛОВ)`;
                  } else if (equippedArmor.armorType === "medium") {
                    formula = `${armorBase} (база доспеха) + ${dexBonus} (ЛОВ, макс +2)`;
                  } else if (equippedArmor.armorType === "heavy") {
                    formula = `${armorBase} (база доспеха, без ЛОВ)`;
                  }

                  if (hasShield) {
                    ac += 2;
                    return (
                      <>
                        <CalculationBlock
                          label="С доспехом"
                          formula={`${formula} + 2 (щит)`}
                          result={ac}
                        />
                      </>
                    );
                  }
                  return (
                    <CalculationBlock
                      label="С доспехом"
                      formula={formula}
                      result={ac}
                    />
                  );
                }

                const baseAC = 10 + dexMod;
                if (hasShield) {
                  return (
                    <CalculationBlock
                      label="Без доспеха, со щитом"
                      formula={`10 + ${dexMod} (ЛОВ) + 2 (щит)`}
                      result={baseAC + 2}
                    />
                  );
                }

                return (
                  <CalculationBlock
                    label="Без доспеха"
                    formula={`10 + ${dexMod} (ЛОВ)`}
                    result={baseAC}
                  />
                );
              })()}
            </div>
            <p className="mt-2">
              КД определяет, насколько сложно вас поразить. Враг должен
              выбросить на атаке число, равное или превышающее ваш КД.
            </p>
          </ExplanationBox>

          <ExplanationBox title="Инициатива">
            <CalculationBlock
              label="Формула"
              formula={`${stats.abilityModifiers.dexterity} (мод. Ловкости)`}
              result={formatModifier(stats.initiative)}
            />
            <p className="mt-2">
              В начале боя все участники бросают d20 + инициатива. Кто выбросил
              больше — ходит первым.
            </p>
          </ExplanationBox>

          <ExplanationBox title="Бонус мастерства">
            <p>
              На 1-4 уровнях бонус мастерства равен <strong>+2</strong>. Он
              добавляется к:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Броскам атаки оружием, которым вы владеете</li>
              <li>Спасброскам, которыми вы владеете (от класса)</li>
              <li>Проверкам навыков, которыми вы владеете</li>
              <li>Броскам атаки заклинаниями</li>
              <li>Сложности спасброска ваших заклинаний</li>
            </ul>
          </ExplanationBox>
        </div>
      </CollapsibleSection>

      {/* Характеристики */}
      <CollapsibleSection
        title="Характеристики"
        icon={<User className="w-5 h-5" />}
      >
        <ExplanationBox title="Откуда берутся значения?">
          <p>
            Базовые значения были распределены при создании персонажа. К ним
            могут добавляться бонусы от вида (расы) и предыстории.{" "}
            <strong>Модификатор</strong> = (Значение - 10) ÷ 2 (округление
            вниз).
          </p>
        </ExplanationBox>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {ABILITIES.map((ability) => {
            const baseScore = character.abilityScores[ability];
            const raceBonus = character.abilityScoreIncreases?.[ability] || 0;
            const score = baseScore + raceBonus;
            return (
              <AbilityBlock
                key={ability}
                ability={ability}
                score={score}
                baseScore={baseScore}
                raceBonus={raceBonus}
                backgroundBonus={0}
                modifier={stats.abilityModifiers[ability]}
                savingThrow={stats.savingThrows[ability]}
                hasSaveProficiency={
                  character.class?.savingThrows.includes(ability) || false
                }
                proficiencyBonus={stats.proficiencyBonus}
              />
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Навыки */}
      <CollapsibleSection
        title="Навыки"
        icon={<BookOpen className="w-5 h-5" />}
        badge={`${character.skillProficiencies?.length || 0} владений`}
      >
        <ExplanationBox title="Как работают навыки?">
          <p>
            При проверке навыка вы бросаете{" "}
            <strong>d20 + модификатор характеристики</strong>. Если у вас есть{" "}
            <strong>владение</strong> навыком (★), добавляется ещё{" "}
            <strong>+{stats.proficiencyBonus}</strong> (бонус мастерства).
          </p>
          {character.expertiseSkills && character.expertiseSkills.length > 0 && (
            <p className="mt-2 text-amber-400 text-xs">
              ⚡ <strong>Мастерство (Expertise):</strong> для некоторых навыков
              бонус мастерства удваивается (+{stats.proficiencyBonus * 2})!
            </p>
          )}
          <p className="mt-2 text-xs">
            <strong>Источники навыков:</strong>
          </p>
          <ul className="mt-1 text-xs space-y-1">
            <li>
              • От класса: {character.class?.nameRu} даёт{" "}
              {(character.skillProficiencies || []).filter(
                (s) =>
                  !character.background?.skillProficiencies.includes(s),
              ).length}{" "}
              навыков
            </li>
            {character.background && (
              <li>
                • От предыстории: {character.background.nameRu} даёт{" "}
                {character.background.skillProficiencies.length} навыков
              </li>
            )}
            {character.expertiseSkills && character.expertiseSkills.length > 0 && (
              <li className="text-amber-400">
                • Мастерство: {character.expertiseSkills.length} навыков с
                удвоенным бонусом
              </li>
            )}
          </ul>
        </ExplanationBox>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(stats.skills).map(([skillId, bonus]) => {
            const ability = skillAbilityMap[skillId] || "strength";
            const isFromBackground =
              character.background?.skillProficiencies.includes(skillId) ||
              false;
            const isProficient = character.skillProficiencies?.includes(skillId) || false;
            const hasExpertise = character.expertiseSkills?.includes(skillId) || false;
            const source = isProficient && !hasExpertise
              ? isFromBackground
                ? "background"
                : "class"
              : undefined;

            return (
              <SkillRow
                key={skillId}
                skillName={getSkillNameRu(skillId)}
                bonus={bonus}
                isProficient={isProficient}
                hasExpertise={hasExpertise}
                abilityMod={stats.abilityModifiers[ability]}
                proficiencyBonus={stats.proficiencyBonus}
                ability={ability}
                source={source}
              />
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Оружие и атаки */}
      {character.equipment?.filter((e) => e.category === "weapon").length >
        0 && (
        <CollapsibleSection
          title="Оружие и атаки"
          icon={<Swords className="w-5 h-5" />}
        >
          <ExplanationBox title="Как атаковать?">
            <p className="mb-2">
              <strong>Бросок атаки:</strong> d20 + модификатор характеристики +
              бонус мастерства. Если результат ≥ КД врага — попадание!
            </p>
            <p>
              <strong>Урон:</strong> кость урона + модификатор характеристики.
              Оружие ближнего боя использует <strong>Силу</strong>, дальнего —{" "}
              <strong>Ловкость</strong>. Фехтовальное оружие может использовать
              любую из них (выгоднее).
            </p>
          </ExplanationBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {character.equipment
              .filter((e) => e.category === "weapon" && e.damage)
              .map((weapon) => {
                const isFinesse =
                  weapon.properties?.some((p) =>
                    p.toLowerCase().includes("фехтовальное"),
                  ) || false;
                const isRanged =
                  weapon.properties?.some((p) =>
                    p.toLowerCase().includes("дистанция"),
                  ) || false;
                const sourceLabel = weapon.source === "class" ? "Класс" : "Предыстория";

                return (
                  <WeaponCard
                    key={weapon.id}
                    name={weapon.nameRu}
                    damage={weapon.damage!.dice}
                    damageType={weapon.damage!.type}
                    attackBonus={getWeaponAttackBonus(!isRanged, isFinesse)}
                    damageBonus={getWeaponDamageBonus(!isRanged, isFinesse)}
                    properties={weapon.properties}
                    abilityUsed={getWeaponAbilityUsed(!isRanged, isFinesse)}
                    profBonus={stats.proficiencyBonus}
                    source={sourceLabel}
                  />
                );
              })}
          </div>
        </CollapsibleSection>
      )}

      {/* Заклинания */}
      {stats.spellcasting && (
        <CollapsibleSection
          title="Заклинания"
          icon={<Sparkles className="w-5 h-5" />}
          badge={`${(character.cantripsKnown?.length || 0) + (character.spellsKnown?.length || 0)} известно`}
        >
          {/* Магические характеристики */}
          <ExplanationBox title="Магия вашего класса">
            <p>
              Ваш класс <strong>{character.class?.nameRu}</strong> использует{" "}
              <strong>
                {stats.spellcasting.ability
                  ? getAbilityNameRu(stats.spellcasting.ability)
                  : "—"}
              </strong>{" "}
              для заклинаний. Это влияет на силу ваших заклинаний и сложность их
              избежать.
            </p>
          </ExplanationBox>

          <div className="mb-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground">
                  Характеристика
                </div>
                <div className="font-bold text-lg">
                  {stats.spellcasting.ability
                    ? getAbilityNameRu(stats.spellcasting.ability)
                    : "—"}
                </div>
                <div className="text-xs text-purple-400">
                  Мод: {formatModifier(stats.spellcasting.abilityModifier)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Сложность спасброска
                </div>
                <div className="font-bold text-2xl text-purple-400">
                  {stats.spellcasting.spellSaveDC}
                </div>
                <div className="text-xs text-muted-foreground">
                  8 + {stats.proficiencyBonus} +{" "}
                  {stats.spellcasting.abilityModifier}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Бонус атаки</div>
                <div className="font-bold text-2xl text-purple-400">
                  {formatModifier(stats.spellcasting.spellAttackBonus)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stats.proficiencyBonus} +{" "}
                  {stats.spellcasting.abilityModifier}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Известно</div>
                <div className="font-bold text-lg">
                  {stats.spellcasting.cantripsKnown} /{" "}
                  {stats.spellcasting.spellsKnown}
                </div>
                <div className="text-xs text-muted-foreground">
                  заговоров / заклинаний
                </div>
              </div>
            </div>
          </div>

          {/* Ячейки заклинаний */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              Ячейки заклинаний
              <Badge variant="outline" className="text-xs">
                Восстанавливаются после длинного отдыха
              </Badge>
            </h4>
            <div className="grid grid-cols-9 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
                const key =
                  `level${level}` as keyof typeof stats.spellcasting.spellSlots;
                const slots = stats.spellcasting?.spellSlots[key] || 0;
                return (
                  <div
                    key={level}
                    className={`text-center p-2 rounded-lg border ${
                      slots > 0
                        ? "bg-purple-500/20 border-purple-500/50"
                        : "bg-muted/30 border-muted"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">
                      {level} кр
                    </div>
                    <div
                      className={`font-bold text-lg ${slots > 0 ? "text-purple-400" : "text-muted-foreground"}`}
                    >
                      {slots}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Заговоры с описаниями */}
          {character.cantripsKnown && character.cantripsKnown.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                  ∞
                </span>
                Заговоры (неограниченно)
              </h4>
              <div className="space-y-2">
                {character.cantripsKnown.map((spell) => (
                  <SpellCard
                    key={spell.id}
                    spell={spell}
                    isCantrip={true}
                    spellSaveDC={stats.spellcasting?.spellSaveDC || 10}
                    spellAttackBonus={stats.spellcasting?.spellAttackBonus || 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Заклинания 1 круга с описаниями */}
          {character.spellsKnown && character.spellsKnown.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Заклинания 1 круга
              </h4>
              <div className="space-y-2">
                {character.spellsKnown.map((spell) => (
                  <SpellCard
                    key={spell.id}
                    spell={spell}
                    isCantrip={false}
                    spellSaveDC={stats.spellcasting?.spellSaveDC || 10}
                    spellAttackBonus={stats.spellcasting?.spellAttackBonus || 0}
                  />
                ))}
              </div>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* Снаряжение */}
      <CollapsibleSection
        title="Снаряжение"
        icon={<Package className="w-5 h-5" />}
      >
        {/* Кошелёк */}
        <div className="mb-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            💰 Кошелёк
          </h4>
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center p-2 bg-amber-500/20 rounded-lg">
              <div className="text-xs text-amber-400">Платина</div>
              <div className="font-bold text-lg text-amber-400">
                {stats.wallet.platinum}
              </div>
              <div className="text-xs text-muted-foreground">pp</div>
            </div>
            <div className="text-center p-2 bg-yellow-500/20 rounded-lg">
              <div className="text-xs text-yellow-400">Золото</div>
              <div className="font-bold text-lg text-yellow-400">
                {stats.wallet.gold}
              </div>
              <div className="text-xs text-muted-foreground">gp</div>
            </div>
            <div className="text-center p-2 bg-blue-500/20 rounded-lg">
              <div className="text-xs text-blue-400">Электрум</div>
              <div className="font-bold text-lg text-blue-400">
                {stats.wallet.electrum}
              </div>
              <div className="text-xs text-muted-foreground">ep</div>
            </div>
            <div className="text-center p-2 bg-slate-500/20 rounded-lg">
              <div className="text-xs text-slate-400">Серебро</div>
              <div className="font-bold text-lg text-slate-400">
                {stats.wallet.silver}
              </div>
              <div className="text-xs text-muted-foreground">sp</div>
            </div>
            <div className="text-center p-2 bg-orange-500/20 rounded-lg">
              <div className="text-xs text-orange-400">Медь</div>
              <div className="font-bold text-lg text-orange-400">
                {stats.wallet.copper}
              </div>
              <div className="text-xs text-muted-foreground">cp</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            1 gp = 10 sp = 100 cp • 1 pp = 10 gp • 1 ep = 5 sp
          </p>
        </div>

        {/* Снаряжение от предыстории */}
        {character.background && (
          <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
            <h4 className="font-medium text-sm mb-2">
              От предыстории ({character.background.nameRu}):
            </h4>
            <div className="flex flex-wrap gap-1">
              {character.background.equipment.map((item, i) => (
                <Badge key={i} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Выбранное снаряжение */}
        <div className="space-y-3">
          {character.equipment?.filter((e) => e.category === "armor").length >
            0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Доспехи:</h4>
              <div className="flex flex-wrap gap-2">
                {character.equipment
                  .filter((e) => e.category === "armor")
                  .map((armor) => {
                    const sourceLabel = armor.source === "class" ? "Класс" : "Предыстория";
                    const armorTypeLabel = armor.armorType === "shield"
                      ? "щит"
                      : armor.armorType === "light"
                      ? "лёгкий"
                      : armor.armorType === "medium"
                      ? "средний"
                      : armor.armorType === "heavy"
                      ? "тяжёлый"
                      : "";
                    return (
                      <Badge
                        key={armor.id}
                        variant="secondary"
                        className="py-1 px-2"
                      >
                        {armor.nameRu} (КД {armor.armorClass})
                        {armorTypeLabel && (
                          <span className="ml-1 text-xs opacity-70">
                            {armorTypeLabel}
                          </span>
                        )}
                        <span className="text-xs opacity-70 ml-1">[{sourceLabel}]</span>
                      </Badge>
                    );
                  })}
              </div>
            </div>
          )}

          {character.equipment?.filter((e) => e.category === "gear").length >
            0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Снаряжение:</h4>
              <div className="flex flex-wrap gap-1">
                {character.equipment
                  .filter((e) => e.category === "gear")
                  .map((item) => (
                    <Badge key={item.id} variant="outline">
                      {item.nameRu}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Расовые особенности */}
      {character.race && (
        <CollapsibleSection
          title={`Особенности вида: ${character.race.nameRu}`}
          icon={<Scroll className="w-5 h-5" />}
          defaultOpen={false}
        >
          <ExplanationBox title="Что это даёт?">
            <p>
              Особенности вида — уникальные способности, которые вы получаете от
              выбранного вида (расы). Они работают всегда и не требуют ресурсов.
            </p>
          </ExplanationBox>

          <div className="space-y-3">
            {character.race.traits.map((trait) => (
              <div
                key={trait.name}
                className="p-4 bg-muted/30 rounded-xl border border-border/50"
              >
                <h4 className="font-medium text-primary">{trait.nameRu}</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {trait.description}
                </p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Классовые умения */}
      {character.class && (
        <CollapsibleSection
          title={`Умения класса: ${character.class.nameRu}`}
          icon={<Star className="w-5 h-5" />}
          defaultOpen={false}
        >
          <ExplanationBox title="Как работают умения класса?">
            <p>
              Классовые умения — особые способности вашего класса. Некоторые
              работают постоянно, другие требуют действия или использования
              ресурсов. На 1 уровне вы получаете начальные умения класса.
            </p>
          </ExplanationBox>

          <div className="space-y-3">
            {character.class.features
              .filter((f) => f.level <= character.level)
              .map((feature) => (
                <div
                  key={feature.name}
                  className="p-4 bg-muted/30 rounded-xl border border-border/50"
                >
                  <h4 className="font-medium text-primary">
                    {feature.nameRu}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {feature.level} уровень
                    </Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Владения */}
      <CollapsibleSection
        title="Владения"
        icon={<Shield className="w-5 h-5" />}
        defaultOpen={false}
      >
        <ExplanationBox title="Что такое владение?">
          <p>
            Владение означает, что вы обучены использовать что-либо. При атаке
            оружием, которым вы владеете, вы добавляете бонус мастерства (+
            {stats.proficiencyBonus}) к броску атаки. При проверке навыка,
            которым владеете — к броску проверки.
          </p>
        </ExplanationBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {character.class?.armorProficiencies &&
            character.class.armorProficiencies.length > 0 && (
              <div className="p-3 bg-muted/30 rounded-xl">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Доспехи
                </h4>
                <div className="flex flex-wrap gap-1">
                  {character.class.armorProficiencies.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  От класса {character.class.nameRu}
                </p>
              </div>
            )}

          {character.class?.weaponProficiencies &&
            character.class.weaponProficiencies.length > 0 && (
              <div className="p-3 bg-muted/30 rounded-xl">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Swords className="w-4 h-4 text-red-400" />
                  Оружие
                </h4>
                <div className="flex flex-wrap gap-1">
                  {character.class.weaponProficiencies.map((p) => (
                    <Badge key={p} variant="outline">
                      {p}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  От класса {character.class.nameRu}
                </p>
              </div>
            )}

          <div className="p-3 bg-muted/30 rounded-xl">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              Спасброски
            </h4>
            <div className="flex flex-wrap gap-1">
              {character.class?.savingThrows.map((s) => (
                <Badge key={s} variant="secondary">
                  {getAbilityNameRu(s)}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              От класса {character.class?.nameRu}
            </p>
          </div>

          <div className="p-3 bg-muted/30 rounded-xl">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Навыки ({character.skillProficiencies?.length || 0})
            </h4>
            
            {/* Навыки от класса */}
            {(character.skillProficiencies || []).filter(
              (s) => !character.background?.skillProficiencies.includes(s)
            ).length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1.5">
                  От класса {character.class?.nameRu}:
                </p>
                <div className="flex flex-wrap gap-1">
                  {(character.skillProficiencies || [])
                    .filter((s) => !character.background?.skillProficiencies.includes(s))
                    .map((s) => (
                      <Badge key={s} variant="outline">
                        {getSkillNameRu(s)}
                      </Badge>
                    ))}
                </div>
              </div>
            )}

            {/* Навыки от предыстории */}
            {character.background && character.background.skillProficiencies.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  От предыстории {character.background.nameRu}:
                </p>
                <div className="flex flex-wrap gap-1">
                  {character.background.skillProficiencies.map((s) => (
                    <Badge key={s} variant="secondary">
                      {getSkillNameRu(s)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* Характер */}
      {(character.personalityTraits ||
        character.ideals ||
        character.bonds ||
        character.flaws) && (
        <CollapsibleSection
          title="Характер и личность"
          icon={<User className="w-5 h-5" />}
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {character.personalityTraits && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Черты характера</h4>
                <p className="text-sm italic text-muted-foreground">
                  "{character.personalityTraits}"
                </p>
              </div>
            )}
            {character.ideals && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Идеалы</h4>
                <p className="text-sm italic text-muted-foreground">
                  "{character.ideals}"
                </p>
              </div>
            )}
            {character.bonds && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Привязанности</h4>
                <p className="text-sm italic text-muted-foreground">
                  "{character.bonds}"
                </p>
              </div>
            )}
            {character.flaws && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Слабости</h4>
                <p className="text-sm italic text-muted-foreground">
                  "{character.flaws}"
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}
