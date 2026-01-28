import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCharacterStore, type WizardStep } from "@/store/characterStore";
import { t } from "@/data/translations/ru";

interface WizardLayoutProps {
  children: ReactNode;
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

export function WizardLayout({ children }: WizardLayoutProps) {
  const {
    currentStep,
    nextStep,
    previousStep,
    canProceed,
    completedSteps,
    character,
  } = useCharacterStore();

  // Вычисляем видимые шаги напрямую (без useMemo для гарантии актуальности)
  const isSpellcaster = character.class?.spellcasting !== undefined;

  const visibleSteps = Object.entries(STEP_INFO).filter(([step]) => {
    if (step === "spells" && !isSpellcaster) return false;
    return true;
  });

  const totalSteps = visibleSteps.length;
  const stepInfo = STEP_INFO[currentStep];
  const currentVisibleIndex = visibleSteps.findIndex(
    ([step]) => step === currentStep,
  );
  const progress = ((currentVisibleIndex + 1) / totalSteps) * 100;

  const isFirstStep = currentVisibleIndex === 0;
  const isLastStep = currentStep === "summary";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b-2 border-primary/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top row */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Scroll className="w-6 h-6 text-primary" />
              <h1
                className="text-lg font-bold text-gold hidden sm:block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("app.title")}
              </h1>
            </div>

            {/* Current step */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stepInfo.icon}</span>
              <div className="text-right">
                <p className="font-bold text-sm">{stepInfo.label}</p>
                <p className="text-xs text-muted-foreground">
                  Шаг {currentVisibleIndex + 1} из {totalSteps}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full mb-2 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step tabs */}
          <div className="flex gap-1 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {visibleSteps.map(([step, info], idx) => {
              const isActive = currentStep === step;
              const isCompleted = completedSteps.includes(step as WizardStep);

              return (
                <div
                  key={step}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium 
                    whitespace-nowrap transition-all flex-shrink-0 border
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : isCompleted
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted/30 text-muted-foreground border-transparent"
                    }
                  `}
                >
                  <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-[10px]">
                    {isCompleted && !isActive ? "✓" : idx + 1}
                  </span>
                  <span className={`${isActive ? "" : "hidden md:inline"}`}>
                    {info.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-6 px-4">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Footer navigation */}
      <footer className="sticky bottom-0 z-50 bg-card border-t-2 border-primary/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("app.back")}
          </Button>

          {/* Character preview */}
          {(character.race || character.class) && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              {character.race && <span>{character.race.nameRu}</span>}
              {character.race && character.class && (
                <span className="text-muted-foreground">•</span>
              )}
              {character.class && <span>{character.class.nameRu}</span>}
            </div>
          )}

          <Button
            onClick={nextStep}
            disabled={!canProceed() && !isLastStep}
            className="gap-2"
          >
            {isLastStep ? (
              <>
                Экспорт PDF
                <span>📄</span>
              </>
            ) : (
              <>
                {t("app.next")}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
