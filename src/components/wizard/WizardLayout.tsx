import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useCharacterStore, type WizardStep } from "@/store/characterStore";
import { t } from "@/data/translations/ru";

interface WizardLayoutProps {
  children: ReactNode;
  onBack?: () => void;
}

const STEP_INFO: Record<WizardStep, { label: string; icon: string }> = {
  race: { label: t("steps.race"), icon: "🧝" },
  class: { label: t("steps.class"), icon: "⚔️" },
  skills: { label: "Навыки", icon: "🎯" },
  abilities: { label: t("steps.abilities"), icon: "💪" },
  background: { label: t("steps.background"), icon: "📜" },
  abilityIncrease: { label: "Бонусы", icon: "✨" },
  equipment: { label: t("steps.equipment"), icon: "🎒" },
  spells: { label: "Заклинания", icon: "🔮" },
  details: { label: t("steps.details"), icon: "📝" },
  summary: { label: t("steps.summary"), icon: "🏆" },
};

export function WizardLayout({ children, onBack }: WizardLayoutProps) {
  const {
    currentStep,
    nextStep,
    previousStep,
    canProceed,
    completedSteps,
    character,
    setStep,
  } = useCharacterStore();

  const isSpellcaster = character.class?.spellcasting !== undefined;
  const canProceedToNext = canProceed();

  // Функция для получения сообщения о том, что нужно заполнить
  const getRequiredFieldsMessage = (): string => {
    switch (currentStep) {
      case "race":
        return "Выберите расу персонажа";
      case "class":
        return "Выберите класс персонажа";
      case "skills":
        if (!character.class) return "Сначала выберите класс";
        const backgroundSkills = character.background?.skillProficiencies || [];
        const classSkillCount = character.skillProficiencies.filter(
          (s) => !backgroundSkills.includes(s)
        ).length;
        const required = character.class.skillCount;
        return `Выберите навыки от класса (${classSkillCount}/${required})`;
      case "abilities":
        const scores = Object.values(character.abilityScores);
        const standardArray = [15, 14, 13, 12, 10, 8];
        const remaining = standardArray.filter((val) => !scores.includes(val));
        if (remaining.length > 0) {
          return `Распределите все значения: ${remaining.join(", ")}`;
        }
        return "Распределите характеристики";
      case "background":
        return "Выберите предысторию персонажа";
      case "abilityIncrease":
        const increases = character.abilityScoreIncreases;
        const plus2Count = Object.values(increases).filter(
          (v) => v === 2
        ).length;
        const plus1Count = Object.values(increases).filter(
          (v) => v === 1
        ).length;

        if (plus2Count === 0 && plus1Count === 0) {
          return "Выберите стратегию и распределите бонусы";
        }

        // Стратегия +2/+1
        if (plus2Count === 1 && plus1Count === 0) {
          return "Выберите характеристику для бонуса +1";
        }
        if (plus2Count === 0 && plus1Count === 1) {
          return "Выберите характеристику для бонуса +2";
        }

        // Стратегия +1/+1/+1
        if (plus2Count === 0 && plus1Count < 3) {
          return `Выберите ещё ${3 - plus1Count} характеристик(и) для +1`;
        }

        return "Распределите бонусы";
      case "equipment":
        return "Снаряжение автоматически предоставлено";
      case "spells":
        return "Выберите заклинания (необязательно)";
      case "details":
        if (!character.name || character.name.trim().length === 0) {
          return "Введите имя персонажа";
        }
        return "Заполните детали персонажа";
      case "summary":
        return "Просмотрите и экспортируйте персонажа";
      default:
        return "Заполните необходимые поля";
    }
  };

  const visibleSteps = Object.entries(STEP_INFO).filter(([step]) => {
    if (step === "spells" && !isSpellcaster) return false;
    return true;
  });

  const totalSteps = visibleSteps.length;
  const stepInfo = STEP_INFO[currentStep];
  const currentVisibleIndex = visibleSteps.findIndex(
    ([step]) => step === currentStep
  );
  const progress = ((currentVisibleIndex + 1) / totalSteps) * 100;

  const isFirstStep = currentVisibleIndex === 0;
  const isLastStep = currentStep === "summary";

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Step Progress (Desktop) */}
        <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 border-r border-border/50 bg-card/50 backdrop-blur-xl z-40">
          {/* Logo */}
          <div className="p-6 border-b border-border/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1
                    className="text-sm font-bold text-gradient"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    D&D Character
                  </h1>
                  <p className="text-xs text-muted-foreground">PHB 2024</p>
                </div>
              </div>
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="На главную"
                >
                  <Home className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Steps */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {visibleSteps.map(([step, info], idx) => {
                const isActive = currentStep === step;
                const isCompleted = completedSteps.includes(step as WizardStep);
                const isPast = idx < currentVisibleIndex;
                const isSummary = step === "summary";
                const allStepsCompleted = visibleSteps
                  .filter(([s]) => s !== "summary")
                  .every(([s]) => completedSteps.includes(s as WizardStep));
                const isClickable =
                  isCompleted ||
                  isPast ||
                  isActive ||
                  (isSummary && allStepsCompleted);

                return (
                  <button
                    key={step}
                    onClick={() => isClickable && setStep(step as WizardStep)}
                    disabled={!isClickable}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full
                      ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : isCompleted || isPast
                          ? "text-foreground/80 hover:bg-muted/50 cursor-pointer"
                          : "text-muted-foreground cursor-not-allowed"
                      }
                    `}
                  >
                    {/* Step indicator */}
                    <div
                      className={`
                        w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium
                        transition-all
                        ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {isCompleted && !isActive ? "✓" : idx + 1}
                    </div>

                    {/* Step label */}
                    <span
                      className={`text-sm ${isActive ? "font-medium" : ""}`}
                    >
                      {info.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Character Preview */}
          {(character.race || character.class) && (
            <div className="p-4 border-t border-border/50 flex-shrink-0">
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-1">Персонаж</p>
                <p className="text-sm font-medium">
                  {character.name || "Без имени"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {character.race?.nameRu}
                  {character.race && character.class && " • "}
                  {character.class?.nameRu}
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-card/80 backdrop-blur-xl border-b border-border/50 flex-shrink-0 z-50">
            <div className="px-4 py-3">
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {onBack && (
                    <button
                      onClick={onBack}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors mr-1"
                    >
                      <Home className="w-4 h-4" />
                    </button>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Шаг {currentVisibleIndex + 1}/{totalSteps}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{stepInfo.icon}</span>
                  <span className="font-medium text-sm">{stepInfo.label}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </header>

          {/* Content - Scrollable */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              {/* Page Title - Desktop */}
              <div className="hidden lg:block mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{stepInfo.icon}</span>
                  <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stepInfo.label}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="progress-bar flex-1 max-w-xs">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {currentVisibleIndex + 1} из {totalSteps}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              {children}
            </div>
          </main>

          {/* Footer Navigation */}
          <footer className="bg-card/80 backdrop-blur-xl border-t border-border/50 flex-shrink-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={isFirstStep}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t("app.back")}</span>
              </Button>

              {/* Character preview */}
              <div className="lg:hidden flex-1 text-center">
                {(character.race || character.class) && (
                  <p className="text-xs text-muted-foreground truncate">
                    {character.race?.nameRu}
                    {character.race && character.class && " • "}
                    {character.class?.nameRu}
                  </p>
                )}
              </div>

              {!isLastStep && (
                <>
                  {!canProceedToNext ? (
                    <Tooltip
                      content={
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground mb-1">
                              Необходимо заполнить поля
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {getRequiredFieldsMessage()}
                            </p>
                          </div>
                        </div>
                      }
                      position="top"
                      maxWidth="max-w-xs"
                    >
                      <Button
                        onClick={nextStep}
                        disabled={true}
                        className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <span className="hidden sm:inline">
                          {t("app.next")}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceedToNext}
                      className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <span className="hidden sm:inline">{t("app.next")}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
