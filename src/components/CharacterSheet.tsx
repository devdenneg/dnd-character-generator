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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {title}
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

// Компонент характеристики с тултипом
function AbilityBlock({
  ability,
  score,
  modifier,
  savingThrow,
  hasSaveProficiency,
  proficiencyBonus,
}: {
  ability: AbilityName;
  score: number;
  modifier: number;
  savingThrow: number;
  hasSaveProficiency: boolean;
  proficiencyBonus: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative text-center bg-gradient-to-b from-muted/50 to-muted/30 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="text-xs font-bold text-primary mb-1">
        {getAbilityAbbr(ability)}
      </div>
      <div className="text-3xl font-bold">{formatModifier(modifier)}</div>
      <div className="w-10 h-10 mx-auto mt-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {score}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Спасбросок:{" "}
        <span className={hasSaveProficiency ? "text-primary font-bold" : ""}>
          {formatModifier(savingThrow)}
        </span>
        {hasSaveProficiency && <span className="ml-1">●</span>}
      </div>

      {/* Тултип с пояснением */}
      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 border rounded-lg shadow-2xl text-left text-xs"
          style={{
            zIndex: 99999,
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
          }}
        >
          <p className="font-bold mb-1">{getAbilityNameRu(ability)}</p>
          <p className="text-muted-foreground">
            {ABILITY_EXPLANATIONS[ability]}
          </p>
          {hasSaveProficiency && (
            <p className="mt-2 text-primary">
              ✓ Владение спасброском (+{proficiencyBonus} от мастерства)
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Компонент навыка с подсказкой
function SkillRow({
  skillName,
  bonus,
  isProficient,
  abilityMod,
  proficiencyBonus,
  ability,
}: {
  skillName: string;
  bonus: number;
  isProficient: boolean;
  abilityMod: number;
  proficiencyBonus: number;
  ability: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-between p-2 rounded-lg cursor-help transition-colors ${
        isProficient
          ? "bg-primary/10 hover:bg-primary/20"
          : "bg-muted/20 hover:bg-muted/40"
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-sm flex items-center gap-2">
        {isProficient && <Star className="w-3 h-3 text-primary fill-primary" />}
        {skillName}
      </span>
      <Badge variant={isProficient ? "default" : "secondary"}>
        {formatModifier(bonus)}
      </Badge>

      {showTooltip && (
        <div
          className="absolute bottom-full left-0 mb-2 w-56 p-3 border rounded-lg shadow-2xl text-xs"
          style={{
            zIndex: 99999,
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
          }}
        >
          <p className="font-bold mb-1">{skillName}</p>
          <p className="text-muted-foreground mb-2">
            Базовая характеристика: {getAbilityNameRu(ability)}
          </p>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span>Модификатор {getAbilityAbbr(ability)}:</span>
              <span>{formatModifier(abilityMod)}</span>
            </div>
            {isProficient && (
              <div className="flex justify-between text-primary">
                <span>Бонус мастерства:</span>
                <span>+{proficiencyBonus}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t pt-1 mt-1">
              <span>Итого:</span>
              <span>{formatModifier(bonus)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
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
}: {
  name: string;
  damage: string;
  damageType: string;
  attackBonus: number;
  properties?: string[];
  damageBonus: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative p-3 bg-muted/30 rounded-lg border hover:border-primary/50 transition-colors cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
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

      {showTooltip && (
        <div
          className="absolute bottom-full left-0 mb-2 w-64 p-3 border rounded-lg shadow-2xl text-xs"
          style={{
            zIndex: 99999,
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
          }}
        >
          <p className="font-bold mb-2">{name}</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Бросок атаки:</span>
              <span>1d20 {formatModifier(attackBonus)}</span>
            </div>
            <div className="flex justify-between">
              <span>Урон:</span>
              <span>
                {damage}
                {damageBonus !== 0 && formatModifier(damageBonus)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Тип урона:</span>
              <span>{DAMAGE_TYPE_RU[damageType] || damageType}</span>
            </div>
          </div>
          <p className="mt-2 text-muted-foreground">
            Бонус атаки = модификатор характеристики + бонус мастерства
          </p>
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
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center bg-card p-3 rounded-xl border-2 border-red-500/30">
                <Heart className="w-5 h-5 mx-auto text-red-500 mb-1" />
                <div className="text-2xl font-bold">
                  {stats.hitPointMaximum}
                </div>
                <div className="text-xs text-muted-foreground">Хиты</div>
              </div>
              <div className="text-center bg-card p-3 rounded-xl border-2 border-blue-500/30">
                <Shield className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                <div className="text-2xl font-bold">{stats.armorClass}</div>
                <div className="text-xs text-muted-foreground">КД</div>
              </div>
              <div className="text-center bg-card p-3 rounded-xl border-2 border-green-500/30">
                <Footprints className="w-5 h-5 mx-auto text-green-500 mb-1" />
                <div className="text-2xl font-bold">{stats.speed}</div>
                <div className="text-xs text-muted-foreground">Скорость</div>
              </div>
              <div className="text-center bg-card p-3 rounded-xl border-2 border-amber-500/30">
                <Star className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                <div className="text-2xl font-bold">
                  +{stats.proficiencyBonus}
                </div>
                <div className="text-xs text-muted-foreground">Мастерство</div>
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

      {/* Характеристики */}
      <CollapsibleSection
        title="Характеристики"
        icon={<User className="w-5 h-5" />}
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ABILITIES.map((ability) => {
            const score =
              character.abilityScores[ability] +
              (character.abilityScoreIncreases?.[ability] || 0);
            return (
              <AbilityBlock
                key={ability}
                ability={ability}
                score={score}
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
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(stats.skills).map(([skillId, bonus]) => {
            const ability = skillAbilityMap[skillId] || "strength";
            return (
              <SkillRow
                key={skillId}
                skillName={getSkillNameRu(skillId)}
                bonus={bonus}
                isProficient={character.skillProficiencies.includes(skillId)}
                abilityMod={stats.abilityModifiers[ability]}
                proficiencyBonus={stats.proficiencyBonus}
                ability={ability}
              />
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Оружие и атаки */}
      {character.equipment.filter((e) => e.category === "weapon").length >
        0 && (
        <CollapsibleSection
          title="Оружие и атаки"
          icon={<Swords className="w-5 h-5" />}
        >
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

                return (
                  <WeaponCard
                    key={weapon.id}
                    name={weapon.nameRu}
                    damage={weapon.damage!.dice}
                    damageType={weapon.damage!.type}
                    attackBonus={getWeaponAttackBonus(!isRanged, isFinesse)}
                    damageBonus={getWeaponDamageBonus(!isRanged, isFinesse)}
                    properties={weapon.properties}
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
        >
          {/* Магические характеристики */}
          <div className="mb-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground">
                  Характеристика
                </div>
                <div className="font-bold text-lg">
                  {stats.spellcasting.ability
                    ? getAbilityAbbr(stats.spellcasting.ability)
                    : "—"}
                </div>
                <div className="text-xs text-purple-600">
                  Мод: {formatModifier(stats.spellcasting.abilityModifier)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Сложность спасброска
                </div>
                <div className="font-bold text-2xl text-purple-600">
                  {stats.spellcasting.spellSaveDC}
                </div>
                <div className="text-xs text-muted-foreground">
                  8 + {stats.proficiencyBonus} +{" "}
                  {stats.spellcasting.abilityModifier}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Бонус атаки</div>
                <div className="font-bold text-2xl text-purple-600">
                  {formatModifier(stats.spellcasting.spellAttackBonus)}
                </div>
                <div className="text-xs text-muted-foreground">
                  мастерство + мод
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Заговоров / Заклинаний
                </div>
                <div className="font-bold text-lg">
                  {stats.spellcasting.cantripsKnown} /{" "}
                  {stats.spellcasting.spellsKnown}
                </div>
                <div className="text-xs text-muted-foreground">известно</div>
              </div>
            </div>
          </div>

          {/* Ячейки заклинаний */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Ячейки заклинаний</h4>
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
                        ? "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700"
                        : "bg-muted/30 border-muted"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">
                      {level} кр
                    </div>
                    <div
                      className={`font-bold text-lg ${slots > 0 ? "text-purple-600" : "text-muted-foreground"}`}
                    >
                      {slots}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ячейки восстанавливаются после длительного отдыха
              {character.class?.id === "warlock" &&
                " (Колдун: после короткого отдыха)"}
            </p>
          </div>

          {character.cantripsKnown.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Заговоры (неограниченно)</h4>
              <div className="flex flex-wrap gap-2">
                {character.cantripsKnown.map((spell) => (
                  <Badge
                    key={spell.id}
                    variant="secondary"
                    className="py-1 px-2"
                  >
                    {spell.nameRu}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {character.spellsKnown.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Заклинания 1 круга</h4>
              <div className="flex flex-wrap gap-2">
                {character.spellsKnown.map((spell) => (
                  <Badge key={spell.id} variant="default" className="py-1 px-2">
                    {spell.nameRu}
                  </Badge>
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
            <div className="text-center p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <div className="text-xs text-amber-700 dark:text-amber-400">
                Платина
              </div>
              <div className="font-bold text-lg text-amber-600">
                {stats.wallet.platinum}
              </div>
              <div className="text-xs text-muted-foreground">pp</div>
            </div>
            <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <div className="text-xs text-yellow-700 dark:text-yellow-400">
                Золото
              </div>
              <div className="font-bold text-lg text-yellow-600">
                {stats.wallet.gold}
              </div>
              <div className="text-xs text-muted-foreground">gp</div>
            </div>
            <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <div className="text-xs text-blue-700 dark:text-blue-400">
                Электрум
              </div>
              <div className="font-bold text-lg text-blue-600">
                {stats.wallet.electrum}
              </div>
              <div className="text-xs text-muted-foreground">ep</div>
            </div>
            <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Серебро
              </div>
              <div className="font-bold text-lg text-gray-600">
                {stats.wallet.silver}
              </div>
              <div className="text-xs text-muted-foreground">sp</div>
            </div>
            <div className="text-center p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <div className="text-xs text-orange-700 dark:text-orange-400">
                Медь
              </div>
              <div className="font-bold text-lg text-orange-600">
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
          {/* Доспехи */}
          {character.equipment.filter((e) => e.category === "armor").length >
            0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Доспехи:</h4>
              <div className="flex flex-wrap gap-2">
                {character.equipment
                  .filter((e) => e.category === "armor")
                  .map((armor) => (
                    <Badge
                      key={armor.id}
                      variant="secondary"
                      className="py-1 px-2"
                    >
                      {armor.nameRu} (КД {armor.armorClass})
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Прочее снаряжение */}
          {character.equipment.filter((e) => e.category === "gear").length >
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
          <div className="space-y-3">
            {character.race.traits.map((trait) => (
              <div key={trait.name} className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium">{trait.nameRu}</h4>
                <p className="text-sm text-muted-foreground mt-1">
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
          <div className="space-y-3">
            {character.class.features
              .filter((f) => f.level <= character.level)
              .map((feature) => (
                <div key={feature.name} className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium">
                    {feature.nameRu}
                    <span className="text-xs text-muted-foreground ml-2">
                      ({feature.level} уровень)
                    </span>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              ))}
          </div>
        </CollapsibleSection>
      )}

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
