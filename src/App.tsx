import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { LoginPage } from "@/components/auth/LoginPage";
import { RegisterPage } from "@/components/auth/RegisterPage";
import { MyCharactersPage } from "@/components/MyCharactersPage";
import { CreateRoomPage } from "@/components/CreateRoomPage";
import { MyRoomsPage } from "@/components/MyRoomsPage";
import { RoomDetailsPage } from "@/components/RoomDetailsPage";
import { JoinRoomPage } from "@/components/JoinRoomPage";
import { BrowseRoomsPage } from "@/components/BrowseRoomsPage";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { TelegramProvider } from "@/contexts/TelegramContext";
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
  const { currentStep, resetCharacter } = useCharacterStore();
  const [showGlossary, setShowGlossary] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Clear character store when leaving the page
  useEffect(() => {
    return () => {
      resetCharacter();
    };
  }, [resetCharacter]);

  // Show login required message
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 max-w-md w-full bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Home className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Требуется вход</h2>
          <p className="text-muted-foreground mb-6">
            Для создания персонажа необходимо войти в аккаунт
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/login")}>Войти</Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Регистрация
            </Button>
          </div>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            ← На главную
          </Button>
        </div>
      </div>
    );
  }

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

  const handleBackToHome = () => {
    resetCharacter();
    navigate("/");
  };

  return (
    <div className="animate-fade-in">
      <WizardLayout onBack={handleBackToHome}>{renderStep()}</WizardLayout>

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
      case "my-characters":
        navigate("/my-characters");
        break;
      case "join-room":
        navigate("/join-room");
        break;
      case "my-rooms":
        navigate("/my-rooms");
        break;
      case "create-room":
        navigate("/create-room");
        break;
      case "glossary":
        navigate("/glossary");
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
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
      <Route path="/my-characters" element={<MyCharactersPage />} />
      <Route path="/join-room" element={<BrowseRoomsPage />} />
      <Route path="/join-room/:id" element={<JoinRoomPage />} />
      <Route path="/my-rooms" element={<MyRoomsPage />} />
      <Route path="/create-room" element={<CreateRoomPage />} />
      <Route path="/room/:id" element={<RoomDetailsPage />} />
      <Route path="/glossary" element={<GlossaryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <AuthProvider>
          <SocketProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SocketProvider>
        </AuthProvider>
      </TelegramProvider>
    </QueryClientProvider>
  );
}

export default App;
