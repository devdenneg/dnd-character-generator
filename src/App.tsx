import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookOpen, Flame } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import "@/i18n";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

// Фоновые эффекты таверны
function TavernBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Основной фон */}
      <div className="tavern-background" />

      {/* Эффект дыма снизу */}
      <div className="smoke-effect" />

      {/* Мерцающие свечи с параллаксом */}
      <div
        className="candle-glow candle-glow-1"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />
      <div
        className="candle-glow candle-glow-2"
        style={{
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
      />
      <div
        className="candle-glow candle-glow-3"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
        }}
      />

      {/* Текстурный шум */}
      <div className="texture-overlay" />
    </>
  );
}

function CharacterWizard() {
  const { currentStep } = useCharacterStore();
  const [showGlossary, setShowGlossary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      <div
        key={currentStep}
        className="animate-fade-in-up"
        style={{ animationDuration: "0.5s" }}
      >
        {stepContent}
      </div>
    );
  };

  if (showGlossary) {
    return (
      <>
        <TavernBackground />
        <div
          className={`min-h-screen relative z-10 ${isLoaded ? "animate-fade-in-scale" : "opacity-0"}`}
        >
          <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="animate-slide-left">
                  <h1
                    className="text-2xl font-bold text-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Создание персонажа D&D
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Книга игрока 2024
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowGlossary(false)}
                  className="btn-tavern animate-slide-right"
                >
                  Вернуться к персонажу
                </Button>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6">
            <div
              className="max-w-4xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Glossary />
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <TavernBackground />

      <div
        className={`relative z-10 ${isLoaded ? "animate-fade-in-scale" : "opacity-0"}`}
      >
        <WizardLayout>{renderStep()}</WizardLayout>
      </div>

      {/* Floating Glossary Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 shadow-lg gap-2 z-50 btn-tavern animate-float"
        onClick={() => setShowGlossary(true)}
      >
        <BookOpen className="w-5 h-5" />
        Глоссарий
      </Button>

      {/* Декоративная свеча в углу */}
      <div
        className="fixed bottom-6 left-6 z-40 opacity-60 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Flame
          className="w-8 h-8 text-candle"
          style={{ filter: "drop-shadow(0 0 10px #ff9f43)" }}
        />
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterWizard />
    </QueryClientProvider>
  );
}

export default App;
