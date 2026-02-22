import { Label } from "@/components/ui/label";
import { useBackendClassSubclasses } from "@/api/hooks";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { describeFeatureInfluence, detectSubclassImpacts } from "@/utils/subclassInsights";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, ClassOption, SubclassOption } from "../../types";
import { getSkillConflictInfo } from "../../utils/characterDerivations";

interface ClassStepProps {
  classes: ClassOption[];
  selectedBackground: BackgroundOption | null;
}

export function ClassStep({ classes, selectedBackground }: ClassStepProps) {
  const navigate = useNavigate();
  const classId = useCreatorStore((state) => state.classId);
  const subclassId = useCreatorStore((state) => state.subclassId);
  const level = useCreatorStore((state) => state.level);
  const setClass = useCreatorStore((state) => state.setClass);
  const setSubclass = useCreatorStore((state) => state.setSubclass);
  const skills = useCreatorStore((state) => state.skills);
  const featSkills = useCreatorStore((state) => state.featSkills);
  const expertiseSkills = useCreatorStore((state) => state.expertiseSkills);
  const replacementSkills = useCreatorStore((state) => state.replacementSkills);
  const toggleSkill = useCreatorStore((state) => state.toggleSkill);
  const toggleFeatSkill = useCreatorStore((state) => state.toggleFeatSkill);
  const toggleReplacementSkill = useCreatorStore((state) => state.toggleReplacementSkill);
  const toggleExpertiseSkill = useCreatorStore((state) => state.toggleExpertiseSkill);
  const setReplacementSkills = useCreatorStore((state) => state.setReplacementSkills);

  const selectedClass = classes.find((item) => item.id === classId) ?? null;
  const subclassesQuery = useBackendClassSubclasses(classId ?? "");
  const subclassEnvelope = subclassesQuery.data as
    | {
        data?: {
          subclassLevel?: number;
          subclasses?: SubclassOption[];
        };
      }
    | undefined;
  const subclassLevel = subclassEnvelope?.data?.subclassLevel ?? selectedClass?.subclassLevel ?? 99;
  const subclasses = subclassEnvelope?.data?.subclasses ?? [];
  const needsSubclassChoice = Boolean(selectedClass && level >= subclassLevel && subclasses.length > 0);
  const selectedSubclass = subclasses.find((item) => item.id === subclassId) ?? null;
  const skillChoices = selectedClass?.skillChoices ?? [];
  const skillCount = selectedClass?.skillCount ?? 0;
  const availableSkillsMeta = selectedClass?.availableSkillsMeta ?? [];

  const backgroundSkills = selectedBackground?.skillProficiencies ?? [];
  const backgroundSkillMeta = selectedBackground?.skillProficienciesMeta ?? [];
  const originFeatMeta = selectedBackground?.originFeatMeta ?? null;

  const skillNameById = useMemo(() => {
    const map = new Map<string, string>();

    for (const row of availableSkillsMeta) {
      map.set(row.id, row.nameRu);
    }
    for (const row of selectedClass?.skillChoicesMeta ?? []) {
      map.set(row.id, row.nameRu);
    }
    for (const row of backgroundSkillMeta) {
      map.set(row.id, row.nameRu);
    }

    return map;
  }, [availableSkillsMeta, selectedClass?.skillChoicesMeta, backgroundSkillMeta]);

  const getSkillName = (skillId: string) => skillNameById.get(skillId) ?? skillId;

  const featDescriptionPreview = useMemo(() => {
    const raw = originFeatMeta?.description;
    if (!raw) return "";

    const extractText = (value: unknown): string => {
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value.map((item) => extractText(item)).join(" ");
      if (typeof value === "object" && value !== null) {
        const entry = value as Record<string, unknown>;
        if (typeof entry.text === "string") return entry.text;
        if (Array.isArray(entry.entries)) {
          return (entry.entries as unknown[]).map((item) => extractText(item)).join(" ");
        }
      }
      return "";
    };

    const plain = extractText(raw)
      .replace(/\{@[^ ]+\s([^}|]+)(?:\|[^}]*)?\}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    if (!plain) return "";
    return plain.length > 280 ? `${plain.slice(0, 280)}...` : plain;
  }, [originFeatMeta?.description]);

  const featSuggestedSkillCount = useMemo(() => {
    const featId = (originFeatMeta?.id ?? "").toLowerCase();
    if (featId.startsWith("skilled")) return 3;

    const text = featDescriptionPreview.toLowerCase();
    if (!text.includes("навык") && !text.includes("skill")) return 0;
    if (text.includes("три") || text.includes("three") || text.includes("3 ")) return 3;
    if (text.includes("два") || text.includes("two") || text.includes("2 ")) return 2;
    if (text.includes("один") || text.includes("one") || text.includes("1 ")) return 1;

    return 0;
  }, [originFeatMeta?.id, featDescriptionPreview]);

  const conflictInfo = useMemo(
    () =>
      getSkillConflictInfo({
        classSkills: skills,
        backgroundSkills,
        featSkills,
      }),
    [skills, backgroundSkills, featSkills]
  );

  const allowedReplacementPool = useMemo(
    () =>
      (availableSkillsMeta.length > 0
        ? availableSkillsMeta.map((row) => row.id)
        : skillChoices).filter(
        (skill) =>
          !conflictInfo.baseSkillSet.has(skill) || replacementSkills.includes(skill)
      ),
    [availableSkillsMeta, skillChoices, conflictInfo.baseSkillSet, replacementSkills]
  );

  useEffect(() => {
    const sanitized = replacementSkills
      .filter((skill) => allowedReplacementPool.includes(skill))
      .slice(0, conflictInfo.requiredReplacementCount);

    if (JSON.stringify(sanitized) !== JSON.stringify(replacementSkills)) {
      setReplacementSkills(sanitized);
    }
  }, [
    replacementSkills,
    allowedReplacementPool,
    conflictInfo.requiredReplacementCount,
    setReplacementSkills,
  ]);

  useEffect(() => {
    const allowed = new Set([...skills, ...featSkills, ...backgroundSkills, ...replacementSkills]);
    const stale = expertiseSkills.filter((skill) => !allowed.has(skill));
    if (stale.length === 0) return;
    for (const skill of stale) {
      toggleExpertiseSkill(skill);
    }
  }, [skills, featSkills, backgroundSkills, replacementSkills, expertiseSkills, toggleExpertiseSkill]);

  useEffect(() => {
    if (!subclassId) return;
    if (!selectedClass) {
      setSubclass(null);
      return;
    }

    if (level < subclassLevel) {
      setSubclass(null);
      return;
    }

    const isValid = subclasses.some((item) => item.id === subclassId);
    if (!isValid && subclasses.length > 0) {
      setSubclass(null);
    }
  }, [subclassId, selectedClass, level, subclassLevel, subclasses, setSubclass]);

  const canToggleClassSkill = (skill: string) => {
    if (skills.includes(skill)) return true;
    return skills.length < skillCount;
  };

  const canToggleReplacementSkill = (skill: string) => {
    if (replacementSkills.includes(skill)) return true;
    return replacementSkills.length < conflictInfo.requiredReplacementCount;
  };

  const canToggleFeatSkill = (skill: string) => {
    if (featSkills.includes(skill)) return true;
    if (featSuggestedSkillCount <= 0) return true;
    return featSkills.length < featSuggestedSkillCount;
  };

  return (
    <div className="space-y-6">
      <StepHeader
        title="Класс и навыки"
        description="Навыки собираются из класса, предыстории и черт"
      />

      <div className="space-y-2">
        <Label>Класс</Label>
        <div className="grid gap-2 md:grid-cols-2">
          {classes.map((item) => (
            <button
              key={item.id}
              onClick={() => setClass(item.id)}
              className={`rounded-lg border px-4 py-3 text-left ${
                classId === item.id
                  ? "border-primary bg-primary/10"
                  : "border-border/60 hover:bg-muted/40"
              }`}
              >
                <p className="font-medium">{item.nameRu}</p>
                <p className="text-xs text-muted-foreground">
                  {item.skillCount > 0
                    ? `Навыки класса: выберите ${item.skillCount}`
                    : "Навыки класса не выбираются"}
                </p>
              </button>
            ))}
          </div>
        </div>

      {selectedClass && (
        <div className="space-y-4">
          {needsSubclassChoice ? (
            <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <Label>Подкласс (обязателен с уровня {subclassLevel})</Label>
              {subclassesQuery.isLoading ? (
                <p className="text-xs text-muted-foreground">Загрузка списка подклассов...</p>
              ) : (
                <select
                  value={subclassId ?? ""}
                  onChange={(event) => setSubclass(event.target.value || null)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Выберите подкласс</option>
                  {subclasses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nameRu || item.name}
                    </option>
                  ))}
                </select>
              )}
              {subclassId ? (
                <p className="text-xs text-muted-foreground">
                  Выбран: {subclasses.find((item) => item.id === subclassId)?.nameRu ?? subclasses.find((item) => item.id === subclassId)?.name}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">Без выбора подкласса дальше пройти нельзя.</p>
              )}
            </div>
          ) : null}

          {selectedSubclass ? (
            <div className="space-y-3 rounded-lg border border-border/60 bg-card/40 p-3">
              <p className="text-sm font-semibold">
                Подкласс: {selectedSubclass.nameRu || selectedSubclass.name}
              </p>
              {Array.isArray(selectedSubclass.description) ? (
                <div className="prose prose-zinc dark:prose-invert max-w-none text-sm">
                  <ContentRenderer content={selectedSubclass.description as any} />
                </div>
              ) : null}

              {(() => {
                const features = (selectedSubclass.features ?? []).slice().sort((a, b) => a.level - b.level);
                if (features.length === 0) return null;
                const active = features.filter((feature) => feature.level <= level);
                const upcoming = features.filter((feature) => feature.level > level);
                const influence = describeFeatureInfluence(features);

                return (
                  <div className="space-y-2">
                    {influence.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {influence.map((tag) => (
                          <span
                            key={`subclass-impact-${tag}`}
                            className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary"
                          >
                            Влияет на: {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Уже активно (до уровня {level})
                      </p>
                      {active.length === 0 ? (
                        <p className="text-xs text-muted-foreground">
                          На текущем уровне особенности подкласса еще не открыты.
                        </p>
                      ) : (
                        active.map((feature) => {
                          const tags = detectSubclassImpacts(feature.description);
                          return (
                            <div key={feature.id} className="rounded border border-border/50 p-2">
                              <p className="text-sm font-medium">
                                Ур. {feature.level}: {feature.nameRu || feature.name}
                              </p>
                              {tags.length > 0 ? (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {tags.map((tag) => (
                                    <span
                                      key={`${feature.id}-${tag}`}
                                      className="rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {upcoming.length > 0 ? (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Следующие особенности</p>
                        {upcoming.slice(0, 4).map((feature) => (
                          <p key={`upcoming-${feature.id}`} className="text-xs text-muted-foreground">
                            Ур. {feature.level}: {feature.nameRu || feature.name}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })()}
            </div>
          ) : null}

          <div className="space-y-2 rounded-lg border border-border/60 p-3">
            <p className="text-sm font-medium">Черта происхождения</p>
            {originFeatMeta ? (
              <div className="space-y-2 text-sm">
                <button
                  type="button"
                  onClick={() => navigate(`/feats#${originFeatMeta.id}`)}
                  className="text-primary hover:underline"
                >
                  {originFeatMeta.nameRu || originFeatMeta.name}
                </button>
                {featDescriptionPreview ? (
                  <p className="text-xs text-muted-foreground">{featDescriptionPreview}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Описание черты пока отсутствует.</p>
                )}
                {featSuggestedSkillCount > 0 ? (
                  <p className="text-xs text-amber-700">
                    Эта черта даёт выбор навыков: {featSuggestedSkillCount}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Дополнительные навыки зависят от текста черты.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Черта не найдена в базе. Проверьте поле `originFeat` у предыстории.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Навыки класса ({skills.length}/{skillCount})
            </Label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {skillChoices.map((skill) => (
                <button
                  key={skill}
                  onClick={() => canToggleClassSkill(skill) && toggleSkill(skill)}
                  disabled={!canToggleClassSkill(skill)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    skills.includes(skill)
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:bg-muted/30"
                  } disabled:opacity-50`}
                >
                  {getSkillName(skill)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-border/60 p-3">
            <p className="text-sm font-medium">Навыки из предыстории</p>
            {backgroundSkills.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Выберите предысторию на первом шаге.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {backgroundSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs"
                  >
                    {getSkillName(skill)}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 rounded-lg border border-border/60 p-3">
            <Label>
              Доп. навыки от черты
              {featSuggestedSkillCount > 0
                ? ` (${featSkills.length}/${featSuggestedSkillCount})`
                : ` (${featSkills.length})`}
            </Label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(availableSkillsMeta.length > 0
                ? availableSkillsMeta
                : skillChoices.map((skill) => ({ id: skill, nameRu: getSkillName(skill) }))).map((row) => (
                <button
                  key={row.id}
                  onClick={() => canToggleFeatSkill(row.id) && toggleFeatSkill(row.id)}
                  disabled={!canToggleFeatSkill(row.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    featSkills.includes(row.id)
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border/50 hover:bg-muted/30"
                  } disabled:opacity-50`}
                >
                  {row.nameRu}
                </button>
              ))}
            </div>
          </div>

          {conflictInfo.requiredReplacementCount > 0 ? (
            <div className="space-y-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
              <p className="text-sm font-semibold text-amber-700">
                Обнаружены дубли навыков: нужно выбрать замену ({replacementSkills.length}/{conflictInfo.requiredReplacementCount})
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {conflictInfo.conflicts.map((conflict) => (
                  <div key={conflict.id} className="rounded-md border border-amber-500/30 p-2 text-xs">
                    <p className="font-medium">{getSkillName(conflict.id)}</p>
                    <p className="text-muted-foreground">Источники: {conflict.sources.join(" + ")}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Навыки-компенсации</Label>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {allowedReplacementPool.map((skill) => (
                    <button
                      key={skill}
                      onClick={() =>
                        canToggleReplacementSkill(skill) &&
                        toggleReplacementSkill(skill)
                      }
                      disabled={!canToggleReplacementSkill(skill)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm ${
                        replacementSkills.includes(skill)
                          ? "border-amber-600 bg-amber-500/20"
                          : "border-border/50 hover:bg-muted/30"
                      } disabled:opacity-50`}
                    >
                      {getSkillName(skill)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-2 rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
            <Label>Экспертиза навыков (x2 бонус мастерства)</Label>
            <p className="text-xs text-muted-foreground">
              Отметьте навыки, для которых действует правило экспертизы (если даёт класс/черта).
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from(new Set([...skills, ...backgroundSkills, ...featSkills, ...replacementSkills])).map((skill) => (
                <button
                  key={`expertise-${skill}`}
                  type="button"
                  onClick={() => toggleExpertiseSkill(skill)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    expertiseSkills.includes(skill)
                      ? "border-indigo-600 bg-indigo-500/20"
                      : "border-border/50 hover:bg-muted/30"
                  }`}
                >
                  {getSkillName(skill)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
