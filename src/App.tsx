import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookOpen, Home } from "lucide-react";
import {
  WizardLayout,
  RaceStep,
  ClassStep,
  SkillsStep,
  AbilitiesStep,
  BackgroundStep,
  AbilityIncreaseStep,
  EquipmentStep,
  SpellsStep,
  DetailsStep,
  SummaryStep,
} from "@/components/wizard";
import { Glossary } from "@/components/Glossary";
import { HomePage } from "@/components/HomePage";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import "@/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

function CharacterWizardPage() {
  const navigate = useNavigate();
  const { currentStep } = useCharacterStore();
  const [showGlossary, setShowGlossary] = useState(false);

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case "race":
          return <RaceStep />;
        case "class":
          return <ClassStep />;
        case "skills":
          return <SkillsStep />;
        case "abilities":
          return <AbilitiesStep />;
        case "background":
          return <BackgroundStep />;
        case "abilityIncrease":
          return <AbilityIncreaseStep />;
        case "equipment":
          return <EquipmentStep />;
        case "spells":
          return <SpellsStep />;
        case "details":
          return <DetailsStep />;
        case "summary":
          return <SummaryStep />;
        default:
          return <RaceStep />;
      }
    })();

    return (
      <div key={currentStep} className="animate-fade-in-up">
        {stepContent}
      </div>
    );
  };

  if (showGlossary) {
    return (
      <div className="min-h-screen animate-fade-in">
        {/* Background */}
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10">
          <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-xl font-bold text-gradient"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Глоссарий D&D
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    PHB 2024 — Справочник терминов
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowGlossary(false)}
                  className="gap-2"
                >
                  ← Вернуться
                </Button>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-6">
            <div className="animate-fade-in-up">
              <Glossary />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <WizardLayout onBack={() => navigate("/")}>{renderStep()}</WizardLayout>

      {/* Floating Glossary Button */}
      <Button
        size="lg"
        className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 shadow-lg gap-2 z-50 bg-card/90 backdrop-blur border border-border hover:bg-card hover:border-primary/50 transition-all"
        variant="outline"
        onClick={() => setShowGlossary(true)}
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">Глоссарий</span>
      </Button>
    </div>
  );
}

function GlossaryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10">
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-xl font-bold text-gradient"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Глоссарий D&D
                </h1>
                <p className="text-sm text-muted-foreground">
                  PHB 2024 — Справочник терминов
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                На главную
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="animate-fade-in-up">
            <Glossary />
          </div>
        </main>
      </div>
    </div>
  );
}

function HomePageWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    switch (page) {
      case "character-wizard":
        navigate("/character");
        break;
      case "glossary":
        navigate("/glossary");
        break;
      default:
        navigate("/");
    }
  };

  return <HomePage onNavigate={handleNavigate} />;
}

function AppRoutes() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="app-background" />
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePageWrapper />} />
      <Route path="/character" element={<CharacterWizardPage />} />
      <Route path="/glossary" element={<GlossaryPage />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
