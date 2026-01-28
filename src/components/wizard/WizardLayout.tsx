import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar - Step Progress (Desktop) */}
        <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 border-r border-border/50 bg-card/50 backdrop-blur-xl z-40">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
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
          </div>

          {/* Steps */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {visibleSteps.map(([step, info], idx) => {
                const isActive = currentStep === step;
                const isCompleted = completedSteps.includes(step as WizardStep);
                const isPast = idx < currentVisibleIndex;

                return (
                  <div
                    key={step}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                      ${isActive 
                        ? "bg-primary/15 text-primary" 
                        : isCompleted || isPast
                          ? "text-foreground/80 hover:bg-muted/50"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    {/* Step indicator */}
                    <div
                      className={`
                        w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium
                        transition-all
                        ${isActive 
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
                    <span className={`text-sm ${isActive ? "font-medium" : ""}`}>
                      {info.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Character Preview */}
          {(character.race || character.class) && (
            <div className="p-4 border-t border-border/50">
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
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
            <div className="px-4 py-3">
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
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

          {/* Content */}
          <main className="flex-1 p-4 lg:p-8">
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
          <footer className="sticky bottom-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border/50">
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

              {/* Mobile character preview */}
              <div className="lg:hidden flex-1 text-center">
                {(character.race || character.class) && (
                  <p className="text-xs text-muted-foreground truncate">
                    {character.race?.nameRu}
                    {character.race && character.class && " • "}
                    {character.class?.nameRu}
                  </p>
                )}
              </div>

              <Button
                onClick={nextStep}
                disabled={!canProceed() && !isLastStep}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isLastStep ? (
                  <>
                    <span className="hidden sm:inline">Экспорт PDF</span>
                    <span>📄</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">{t("app.next")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
