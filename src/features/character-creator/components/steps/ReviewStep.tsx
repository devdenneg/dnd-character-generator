import type {
  BackgroundOption,
  ClassOption,
  EquipmentOption,
  RaceOption,
  SpellOption,
} from "../../types";
import { useBackendClassSubclasses } from "@/api/hooks";
import { Tooltip, TooltipCalc, TooltipCalcRow, TooltipDescription, TooltipHeader } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Link } from "react-router-dom";
import { useCreatorStore } from "../../store/creatorStore";
import {
  applyIncreases,
  abilityModifier,
  estimatedHitPoints,
  proficiencyBonus,
  spellcastingAbilityModifier,
} from "../../utils/calculations";
import { ABILITY_LABELS, ABILITY_ORDER } from "../../utils/constants";
import {
  buildDerivedEquipment,
  buildDerivedSkills,
  getAvailableSpellsForClass,
  getSpellLimits,
  mapEquipmentNames,
  parseClassStartingEquipment,
} from "../../utils/characterDerivations";
import { calculateArmorClass, resolveInventoryItems } from "../../utils/sheetDerivations";
import { CharacterSheetPreview } from "../shared/CharacterSheetPreview";
import { StepHeader } from "../shared/StepHeader";
import { describeFeatureInfluence, firstDescriptionLine } from "@/utils/subclassInsights";

interface ReviewStepProps {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
  classes: ClassOption[];
  equipment: EquipmentOption[];
  spells: SpellOption[];
}

export function ReviewStep({
  races,
  backgrounds,
  classes,
  equipment,
  spells,
}: ReviewStepProps) {
  const state = useCreatorStore();

  const race = races.find((item) => item.id === state.raceId) ?? null;
  const background = backgrounds.find((item) => item.id === state.backgroundId) ?? null;
  const characterClass = classes.find((item) => item.id === state.classId) ?? null;

  const finalScores = applyIncreases(state.abilityScores, state.abilityIncreases);

  const derivedSkills = buildDerivedSkills({
    classSkills: state.skills,
    backgroundSkills: background?.skillProficiencies ?? [],
    featSkills: state.featSkills,
    expertiseSkills: state.expertiseSkills,
    replacementSkills: state.replacementSkills,
  });

  const backgroundEquipment =
    background?.equipment?.map((item) => ({
      id: item.id || item.externalId,
      quantity: item.quantity ?? 1,
    })) ?? [];

  const resolvedClassEquipment = parseClassStartingEquipment(
    characterClass,
    true,
    state.classEquipmentChoiceIndexes,
    state.useClassGoldAlternative
  );

  const mergedEquipment = buildDerivedEquipment({
    includeBackgroundEquipment: state.includeBackgroundEquipment,
    backgroundEquipment,
    includeClassEquipment: state.includeClassEquipment,
    classEquipment: resolvedClassEquipment,
    customEquipment: state.equipment,
  });

  const derivedEquipment = mapEquipmentNames(mergedEquipment, equipment);

  const availableSpells = getAvailableSpellsForClass(characterClass, spells);
  const spellLimits = getSpellLimits(characterClass, state.level);
  const proficiency = proficiencyBonus(state.level);
  const inventory = resolveInventoryItems(
    mergedEquipment.map((item) => ({ id: item.id, quantity: item.quantity })),
    equipment
  );
  const armorClass = calculateArmorClass(finalScores, inventory);
  const hpTotal = estimatedHitPoints(
    state.level,
    characterClass?.hitDie ?? 8,
    finalScores.constitution
  );
  const spellcasting = spellcastingAbilityModifier(characterClass, finalScores);
  const cantripSpells = state.cantrips
    .map((id) => availableSpells.find((spell) => spell.id === id))
    .filter((spell): spell is SpellOption => Boolean(spell))
    .sort((a, b) => (a.nameRu || a.name).localeCompare(b.nameRu || b.name));
  const knownSpells = state.spells
    .map((id) => availableSpells.find((spell) => spell.id === id))
    .filter((spell): spell is SpellOption => Boolean(spell))
    .sort((a, b) => (a.nameRu || a.name).localeCompare(b.nameRu || b.name));
  const skillNameById = new Map((characterClass?.availableSkillsMeta ?? []).map((item) => [item.id, item.nameRu]));
  const getSkillName = (skillId: string) => skillNameById.get(skillId) ?? skillId;
  const classGold = state.useClassGoldAlternative ? characterClass?.startingGold ?? 0 : 0;
  const backgroundGold = background?.startingGold ?? 0;
  const totalStartingGold = classGold + backgroundGold;
  const encodedReviewReturn = encodeURIComponent("/character?step=review");
  const encodedOriginReturn = encodeURIComponent("/character?step=origin");
  const encodedClassReturn = encodeURIComponent("/character?step=class");
  const encodedEquipmentReturn = encodeURIComponent("/character?step=equipment");
  const encodedSpellsReturn = encodeURIComponent("/character?step=spells");
  const originFeatMeta = background?.originFeatMeta ?? null;
  const subclassesQuery = useBackendClassSubclasses(state.classId ?? "");
  const subclassesEnvelope = subclassesQuery.data as
    | {
        data?: {
          subclasses?: Array<{
            id: string;
            name?: string;
            nameRu?: string;
            features?: Array<{
              id?: string;
              level?: number;
              name?: string;
              nameRu?: string;
              description?: unknown;
            }>;
          }>;
        };
      }
    | undefined;
  const selectedSubclass =
    subclassesEnvelope?.data?.subclasses?.find((item) => item.id === state.subclassId) ?? null;
  const selectedSubclassFeatures = (selectedSubclass?.features ?? [])
    .filter((item) => (item.level ?? 0) <= state.level)
    .sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  const subclassInfluence = describeFeatureInfluence(selectedSubclassFeatures);

  return (
    <div className="space-y-6">
      <StepHeader
        title="Карточка персонажа"
        description="Итоговый лист с объяснением источников"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border/60 p-4">
          <p className="text-sm text-muted-foreground">Имя</p>
          <p className="font-semibold text-lg">{state.details.name || "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">Уровень {state.level}</p>
        </div>
        <div className="rounded-lg border border-border/60 p-4">
          <p className="text-sm text-muted-foreground">Происхождение</p>
          {race ? (
            <Link
              to={`/races/${race.externalId}?returnTo=${encodedOriginReturn}`}
              className="font-semibold text-primary hover:underline"
            >
              {race.nameRu}
            </Link>
          ) : (
            <p className="font-semibold">—</p>
          )}
          <p className="text-xs text-muted-foreground">
            {background ? (
              <Link
                to={`/backgrounds?returnTo=${encodedOriginReturn}#${background.externalId}`}
                className="text-primary hover:underline"
              >
                {background.nameRu}
              </Link>
            ) : (
              "—"
            )}
          </p>
          {originFeatMeta ? (
            <p className="text-xs text-muted-foreground">
              Черта предыстории:{" "}
              <Link
                to={`/feats?returnTo=${encodedOriginReturn}#${originFeatMeta.id}`}
                className="text-primary hover:underline"
              >
                {originFeatMeta.nameRu || originFeatMeta.name}
              </Link>
            </p>
          ) : null}
        </div>
        <div className="rounded-lg border border-border/60 p-4 md:col-span-2">
          <p className="text-sm text-muted-foreground">Класс</p>
          {characterClass ? (
            <Link
              to={`/classes/${characterClass.externalId}?returnTo=${encodedClassReturn}`}
              className="font-semibold text-primary hover:underline"
            >
              {characterClass.nameRu}
            </Link>
          ) : (
            <p className="font-semibold">—</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Подкласс: {selectedSubclass ? selectedSubclass.nameRu || selectedSubclass.name : "—"}
          </p>
          {selectedSubclassFeatures.length > 0 ? (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Особенности подкласса до текущего уровня:
              </p>
              {subclassInfluence.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subclassInfluence.map((tag) => (
                    <span
                      key={`review-subclass-${tag}`}
                      className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[11px] text-primary"
                    >
                      Влияет на: {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {selectedSubclassFeatures.map((feature) => (
                <div key={feature.id ?? `${feature.level}-${feature.name}`} className="rounded border border-border/50 p-2">
                  <p className="text-xs text-muted-foreground">
                    Ур. {feature.level ?? "?"}: {feature.nameRu || feature.name}
                  </p>
                  {firstDescriptionLine(feature.description, 180) ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {firstDescriptionLine(feature.description, 180)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <CharacterSheetPreview
        level={state.level}
        classData={characterClass}
        abilityScores={finalScores}
        skills={derivedSkills}
        equipment={mergedEquipment.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }))}
        equipmentCatalog={equipment}
      />

      <div className="rounded-lg border border-border/60 p-4">
        <p className="mb-3 font-medium">Характеристики и модификаторы</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {ABILITY_ORDER.map((ability) => {
            const base = state.abilityScores[ability];
            const bonus = state.abilityIncreases[ability] ?? 0;
            const total = finalScores[ability];
            const mod = abilityModifier(total);
            return (
              <div key={ability} className="rounded border border-border/40 p-3 text-sm">
                <p className="font-medium">{ABILITY_LABELS[ability]}</p>
                <p className="text-muted-foreground text-xs">База {base} + бонусы {bonus}</p>
                <p className="font-semibold text-lg">{total}</p>
                <p className="text-xs text-muted-foreground">Модификатор {mod >= 0 ? "+" : ""}{mod}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border/60 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-medium">Хиты: от чего зависят</p>
            <Tooltip
              position="right"
              content={
                <>
                  <TooltipHeader>Расчет хитов</TooltipHeader>
                  <TooltipDescription>На 1 уровне берется максимум кости хитов.</TooltipDescription>
                  <TooltipCalc>
                    <TooltipCalcRow label="1 уровень" value={`d${characterClass?.hitDie ?? 8} (макс)`} />
                    <TooltipCalcRow label="Телосложение" value={`${abilityModifier(finalScores.constitution) >= 0 ? "+" : ""}${abilityModifier(finalScores.constitution)} за уровень`} />
                    <TooltipCalcRow label="Уровень" value={state.level} />
                  </TooltipCalc>
                </>
              }
            >
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <CircleHelp className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Формула: максимум кости хитов на 1 уровне + модификатор Телосложения, далее среднее значение кости + модификатор Телосложения за каждый следующий уровень.
          </p>
          <p className="text-sm">
            Итого: <span className="font-semibold">{hpTotal}</span> хитов
          </p>
          <p className="text-xs text-muted-foreground">
            Кость класса: d{characterClass?.hitDie ?? 8} • Мод. Телосложения: {abilityModifier(finalScores.constitution) >= 0 ? "+" : ""}
            {abilityModifier(finalScores.constitution)}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-medium">Класс брони: от чего зависит</p>
            <Tooltip
              position="right"
              content={
                <>
                  <TooltipHeader>Расчет КД</TooltipHeader>
                  <TooltipDescription>Учитываются тип доспеха, модификатор Ловкости и щит.</TooltipDescription>
                  <TooltipCalc>
                    <TooltipCalcRow label="Формула" value={armorClass.formula} />
                    <TooltipCalcRow label="Итоговый КД" value={armorClass.total} highlight />
                  </TooltipCalc>
                </>
              }
            >
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <CircleHelp className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
          <p className="text-sm">
            Итоговый КД: <span className="font-semibold">{armorClass.total}</span>
          </p>
          <p className="text-xs text-muted-foreground">{armorClass.formula}</p>
          <p className="text-xs text-muted-foreground">
            Учтены правила типов брони: лёгкая (полная Ловкость), средняя (Ловкость с ограничением), тяжёлая (без Ловкости), щит добавляется отдельно.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3 bg-gradient-to-r from-amber-500/10 via-background to-emerald-500/10">
        <div className="flex items-center gap-2">
          <p className="font-medium">Золото и экономика старта</p>
          <Tooltip
            position="right"
            content={
              <>
                <TooltipHeader>Как считается золото</TooltipHeader>
                <TooltipDescription>Итог = золото класса (только если выбран вариант золота) + золото предыстории.</TooltipDescription>
                <TooltipCalc>
                  <TooltipCalcRow label="Класс" value={`${classGold} зм`} />
                  <TooltipCalcRow label="Предыстория" value={`${backgroundGold} зм`} />
                  <TooltipCalcRow label="Итого" value={`${totalStartingGold} зм`} highlight border />
                </TooltipCalc>
              </>
            }
          >
            <button type="button" className="text-muted-foreground hover:text-foreground">
              <CircleHelp className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded border border-border/40 p-2">
            <p className="text-xs text-muted-foreground">От класса</p>
            <p className="font-semibold">{classGold} зм</p>
          </div>
          <div className="rounded border border-border/40 p-2">
            <p className="text-xs text-muted-foreground">От предыстории</p>
            <p className="font-semibold">{backgroundGold} зм</p>
          </div>
          <div className="rounded border border-border/40 p-2">
            <p className="text-xs text-muted-foreground">Стартовый кошелек</p>
            <p className="font-semibold">{totalStartingGold} зм</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Навыки и источники</p>
        {derivedSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">Навыки не выбраны.</p>
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {derivedSkills.map((skill) => (
              <div key={skill.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">{getSkillName(skill.id)}</p>
                <p className="text-xs text-muted-foreground">
                  {skill.sources.join(" + ")}
                  {(skill.proficiencyMultiplier ?? 1) > 1 ? " • Экспертиза (x2 мастерства)" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Снаряжение и источники</p>
        {derivedEquipment.length === 0 ? (
          <p className="text-sm text-muted-foreground">Снаряжение не выбрано.</p>
        ) : (
          <div className="grid gap-2">
            {derivedEquipment.map((item) => (
              <div key={item.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">
                  <Link
                    to={`/equipment?returnTo=${encodedEquipmentReturn}#${equipment.find((eq) => eq.id === item.id || eq.externalId === item.id)?.externalId ?? item.id}`}
                    className="text-primary hover:underline"
                  >
                    {item.name}
                  </Link>{" "}
                  x{item.quantity}
                </p>
                <p className="text-xs text-muted-foreground">Источник: {item.sources.join(" + ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Заклинания</p>
        {!characterClass?.spellcasting ? (
          <p className="text-sm text-muted-foreground">Класс не использует заклинания на старте.</p>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium">Фокусы (заговоры)</p>
              {cantripSpells.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {cantripSpells.map((spell) => (
                    <Link
                      key={spell.id}
                      to={`/spells?returnTo=${encodedSpellsReturn}#${spell.externalId}`}
                      className="rounded border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/15"
                    >
                      {spell.nameRu || spell.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Не выбраны</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Заклинания</p>
              {knownSpells.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {knownSpells.map((spell) => (
                    <Link
                      key={spell.id}
                      to={`/spells?returnTo=${encodedSpellsReturn}#${spell.externalId}`}
                      className="rounded border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/15"
                    >
                      {spell.nameRu || spell.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Не выбраны</p>
              )}
            </div>
            {spellLimits.spellSlots && spellLimits.spellSlots.length > 0 ? (
              <div>
                <p className="text-sm font-medium">Ячейки заклинаний</p>
                <p className="text-sm text-muted-foreground">
                  {spellLimits.spellSlots
                    .map((count, idx) => `${idx + 1} ур.: ${count}`)
                    .join(", ")}
                </p>
              </div>
            ) : null}
            {spellcasting.ability ? (
              <div>
                <p className="text-sm font-medium">Параметры колдовства</p>
                <p className="text-sm text-muted-foreground">
                  Характеристика: {ABILITY_LABELS[spellcasting.ability]}
                </p>
                <p className="text-sm text-muted-foreground">
                  Бонус мастерства: {proficiency >= 0 ? "+" : ""}
                  {proficiency}
                </p>
                <p className="text-sm text-muted-foreground">
                  Сложность спасброска: {8 + proficiency + spellcasting.modifier}
                </p>
                <p className="text-sm text-muted-foreground">
                  Бонус атаки заклинанием: {proficiency + spellcasting.modifier >= 0 ? "+" : ""}
                  {proficiency + spellcasting.modifier}
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-border/60 p-4">
        <input
          type="checkbox"
          checked={state.isPublic}
          onChange={(event) => state.setPublic(event.target.checked)}
        />
        <div>
          <p className="font-medium">Публичный профиль</p>
          <p className="text-sm text-muted-foreground">
            Если включено, персонаж доступен по short-link.
          </p>
        </div>
      </label>

      <div className="flex flex-wrap gap-2">
        <Link
          to={`/races?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть расы
        </Link>
        <Link
          to={`/classes?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть классы
        </Link>
        <Link
          to={`/backgrounds?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть предыстории
        </Link>
        <Link
          to={`/feats?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть черты
        </Link>
        <Link
          to={`/equipment?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть снаряжение
        </Link>
        <Link
          to={`/spells?returnTo=${encodedReviewReturn}`}
          className="rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted/40"
        >
          Смотреть заклинания
        </Link>
      </div>
    </div>
  );
}
