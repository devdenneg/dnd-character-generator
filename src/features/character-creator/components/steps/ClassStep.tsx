import { Label } from "@/components/ui/label";
import { useEffect, useMemo } from "react";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, ClassOption } from "../../types";
import { ALL_SKILLS } from "../../utils/constants";
import { getSkillConflictInfo } from "../../utils/characterDerivations";

interface ClassStepProps {
  classes: ClassOption[];
  selectedBackground: BackgroundOption | null;
}

export function ClassStep({ classes, selectedBackground }: ClassStepProps) {
  const classId = useCreatorStore((state) => state.classId);
  const setClass = useCreatorStore((state) => state.setClass);
  const skills = useCreatorStore((state) => state.skills);
  const featSkills = useCreatorStore((state) => state.featSkills);
  const replacementSkills = useCreatorStore((state) => state.replacementSkills);
  const toggleSkill = useCreatorStore((state) => state.toggleSkill);
  const toggleFeatSkill = useCreatorStore((state) => state.toggleFeatSkill);
  const toggleReplacementSkill = useCreatorStore((state) => state.toggleReplacementSkill);
  const setReplacementSkills = useCreatorStore((state) => state.setReplacementSkills);

  const selectedClass = classes.find((item) => item.id === classId) ?? null;
  const skillChoices = selectedClass?.skillChoices ?? [];
  const skillCount = selectedClass?.skillCount ?? 0;

  const backgroundSkills = selectedBackground?.skillProficiencies ?? [];

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
      ALL_SKILLS.filter(
        (skill) =>
          !conflictInfo.baseSkillSet.has(skill) || replacementSkills.includes(skill)
      ),
    [conflictInfo.baseSkillSet, replacementSkills]
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

  const canToggleClassSkill = (skill: string) => {
    if (skills.includes(skill)) return true;
    return skills.length < skillCount;
  };

  const canToggleReplacementSkill = (skill: string) => {
    if (replacementSkills.includes(skill)) return true;
    return replacementSkills.length < conflictInfo.requiredReplacementCount;
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
              <p className="text-xs text-muted-foreground">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedClass && (
        <div className="space-y-4">
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
                  {skill}
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
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 rounded-lg border border-border/60 p-3">
            <Label>Доп. навыки от черт (если есть)</Label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_SKILLS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleFeatSkill(skill)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    featSkills.includes(skill)
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border/50 hover:bg-muted/30"
                  }`}
                >
                  {skill}
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
                    <p className="font-medium">{conflict.id}</p>
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
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
