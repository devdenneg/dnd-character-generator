import type {
  AbilityKey,
  AbilityScores,
  ClassOption,
  DerivedSkill,
  EquipmentOption,
} from "../../types";
import {
  abilityModifier,
  estimatedHitPoints,
  initiativeModifier,
  passivePerception,
  proficiencyBonus,
  spellcastingAbilityModifier,
} from "../../utils/calculations";
import {
  buildSavingThrows,
  buildWeaponActions,
  calculateArmorClass,
  resolveInventoryItems,
} from "../../utils/sheetDerivations";
import { ABILITY_LABELS, ABILITY_ORDER, SKILL_TO_ABILITY } from "../../utils/constants";

interface CharacterSheetPreviewProps {
  level: number;
  classData: ClassOption | null;
  abilityScores: AbilityScores;
  skills: DerivedSkill[];
  equipment: Array<{ id: string; quantity: number }>;
  equipmentCatalog: EquipmentOption[];
}

function formatSigned(value: number): string {
  return `${value >= 0 ? "+" : ""}${value}`;
}

function skillBonus(
  skillId: string,
  abilityScores: AbilityScores,
  proficiency: number,
  proficient: boolean
): number {
  const ability = (SKILL_TO_ABILITY[skillId] ?? "wisdom") as AbilityKey;
  const base = abilityModifier(abilityScores[ability]);
  return base + (proficient ? proficiency : 0);
}

export function CharacterSheetPreview({
  level,
  classData,
  abilityScores,
  skills,
  equipment,
  equipmentCatalog,
}: CharacterSheetPreviewProps) {
  const proficiency = proficiencyBonus(level);
  const inventory = resolveInventoryItems(equipment, equipmentCatalog);
  const armor = calculateArmorClass(abilityScores, inventory);
  const hp = estimatedHitPoints(level, classData?.hitDie ?? 8, abilityScores.constitution);
  const initiative = initiativeModifier(abilityScores);
  const saves = buildSavingThrows(abilityScores, classData, proficiency);
  const actions = buildWeaponActions({
    inventory,
    scores: abilityScores,
    proficiencyBonus: proficiency,
  });
  const perceptionProficient = skills.some((skill) => skill.id === "perception");
  const passive = passivePerception(abilityScores, perceptionProficient, proficiency);
  const casting = spellcastingAbilityModifier(classData, abilityScores);

  return (
    <div className="space-y-6 rounded-lg border border-border/60 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">Proficiency</p>
          <p className="text-xl font-semibold">{formatSigned(proficiency)}</p>
        </div>
        <div className="rounded border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">Armor Class</p>
          <p className="text-xl font-semibold">{armor.total}</p>
          <p className="text-[11px] text-muted-foreground">{armor.formula}</p>
        </div>
        <div className="rounded border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">Hit Points</p>
          <p className="text-xl font-semibold">{hp}</p>
          <p className="text-[11px] text-muted-foreground">d{classData?.hitDie ?? 8} + CON</p>
        </div>
        <div className="rounded border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">Initiative</p>
          <p className="text-xl font-semibold">{formatSigned(initiative)}</p>
          <p className="text-[11px] text-muted-foreground">Passive Perception {passive}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Ability Scores</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {ABILITY_ORDER.map((ability) => (
            <div key={ability} className="rounded border border-border/40 p-2 text-sm">
              <p className="font-medium">{ABILITY_LABELS[ability]}</p>
              <p>{abilityScores[ability]} ({formatSigned(abilityModifier(abilityScores[ability]))})</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Saving Throws</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {saves.map((save) => (
            <div key={save.id} className="rounded border border-border/40 p-2 text-sm">
              <p className="font-medium">{save.label}</p>
              <p>
                {formatSigned(save.value)} {save.proficient ? "(prof)" : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Skills</p>
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет выбранных навыков.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">{skill.id}</p>
                <p>{formatSigned(skillBonus(skill.id, abilityScores, proficiency, true))}</p>
                <p className="text-[11px] text-muted-foreground">{skill.sources.join(" + ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 font-medium">Actions / Attacks</p>
        {actions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Оружие не найдено в инвентаре.</p>
        ) : (
          <div className="grid gap-2">
            {actions.map((action) => (
              <div key={action.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">{action.name}</p>
                <p>Атака: {formatSigned(action.attackBonus)} | Урон: {action.damage} {action.damageType}</p>
                <p className="text-[11px] text-muted-foreground">Характеристика: {action.ability}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {casting.ability ? (
        <div className="rounded border border-border/40 p-3 text-sm">
          <p className="font-medium">Spellcasting</p>
          <p>
            Ability: {ABILITY_LABELS[casting.ability]} ({formatSigned(casting.modifier)})
          </p>
          <p>Spell Save DC: {8 + proficiency + casting.modifier}</p>
          <p>Spell Attack Bonus: {formatSigned(proficiency + casting.modifier)}</p>
        </div>
      ) : null}
    </div>
  );
}
