import { BackgroundsPage } from "@/components/BackgroundsPage";
import { BrowseRoomsPage } from "@/components/BrowseRoomsPage";
import { ClassDetailsPage } from "@/components/ClassDetailsPage";
import { ClassesPage } from "@/components/ClassesPage";
import { CreateRoomPage } from "@/components/CreateRoomPage";
import { EquipmentPage } from "@/components/EquipmentPage";
import { Glossary } from "@/components/Glossary";
import { HomePage } from "@/components/HomePage";
import { JoinRoomPage } from "@/components/JoinRoomPage";
import { MasterAchievementsPage } from "@/components/MasterAchievementsPage";
import { MyCharactersPage } from "@/components/MyCharactersPage";
import { MyRoomsPage } from "@/components/MyRoomsPage";
import { NotFoundPage } from "@/components/NotFoundPage";
import { PageLayout } from "@/components/PageLayout";
import { PlayerAchievementsPage } from "@/components/PlayerAchievementsPage";
import { RacesPage } from "@/components/RacesPage";
import { RoomDetailsPage } from "@/components/RoomDetailsPage";
import { SpellsPage } from "@/components/SpellsPage";
import { UploadContentPage } from "@/components/UploadContentPage";
import { Button } from "@/components/ui/button";
import {
  AbilitiesStep,
  AbilityIncreaseStep,
  BackgroundStep,
  ClassStep,
  DetailsStep,
  EquipmentStep,
  RaceStep,
  SkillsStep,
  SpellsStep,
  SummaryStep,
  WizardLayout,
} from "@/components/wizard";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthModalProvider, useAuthModal } from "@/contexts/AuthModalContext";
import { DiceRollProvider } from "@/contexts/DiceRollContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { TelegramProvider } from "@/contexts/TelegramContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/i18n";
import { useCharacterStore } from "@/store/characterStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookOpen, Home } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
  const { currentStep, resetCharacter, loadedCharacterId } =
    useCharacterStore();
  const [showGlossary, setShowGlossary] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  // Clear character store when leaving page
  useEffect(() => {
    return () => {
      // Не сбрасываем если персонаж был загружен из сохранения
      if (!loadedCharacterId) {
        resetCharacter();
      }
    };
  }, [resetCharacter, loadedCharacterId]);

  // Show login required message
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative z-20 max-w-md w-full mx-auto bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Home className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Требуется вход</h2>
          <p className="text-muted-foreground mb-6">
            Для создания персонажа необходимо войти в аккаунт
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={openLogin}>Войти</Button>
            <Button variant="outline" onClick={openRegister}>
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
  );
}

function HomePageWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page: string, itemId?: string) => {
    switch (page) {
      case "character-wizard":
        navigate("/character");
        break;
      case "my-characters":
        navigate("/my-characters");
        break;
      case "races":
        navigate(itemId ? `/races#${itemId}` : "/races");
        break;
      case "classes":
        navigate(itemId ? `/classes#${itemId}` : "/classes");
        break;
      case "backgrounds":
        navigate(itemId ? `/backgrounds#${itemId}` : "/backgrounds");
        break;
      case "spells":
        navigate(itemId ? `/spells#${itemId}` : "/spells");
        break;
      case "equipment":
        navigate(itemId ? `/equipment#${itemId}` : "/equipment");
        break;
      case "my-achievements":
        navigate("/achievements");
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
      case "upload-content":
        navigate("/upload-content");
        break;
      default:
        navigate("/");
    }
  };

  return <HomePage onNavigate={handleNavigate} />;
}

function RacesPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return <RacesPage onBack={handleBack} />;
}



function BackgroundsPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return <BackgroundsPage onBack={handleBack} />;
}

function SpellsPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return <SpellsPage onBack={handleBack} />;
}

function EquipmentPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return <EquipmentPage onBack={handleBack} />;
}

function AppRoutes() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Сброс скролла при изменении маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  // Определяем, нужно ли показывать Header и Footer
  const isCharacterWizard = location.pathname === "/character";
  const showHeaderFooter = !isCharacterWizard;

  return (
    <PageLayout showHeader={showHeaderFooter} showFooter={showHeaderFooter}>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/character" element={<CharacterWizardPage />} />
        <Route path="/my-characters" element={<MyCharactersPage />} />
        <Route path="/races" element={<RacesPageWrapper />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:classId" element={<ClassDetailsPage />} />
        <Route path="/backgrounds" element={<BackgroundsPageWrapper />} />
        <Route path="/spells" element={<SpellsPageWrapper />} />
        <Route path="/equipment" element={<EquipmentPageWrapper />} />
        <Route path="/join-room" element={<BrowseRoomsPage />} />
        <Route path="/join-room/:id" element={<JoinRoomPage />} />
        <Route path="/my-rooms" element={<MyRoomsPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/room/:id" element={<RoomDetailsPage />} />
        <Route
          path="/room/:roomId/achievements"
          element={<MasterAchievementsPage />}
        />
        <Route path="/achievements" element={<PlayerAchievementsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/upload-content" element={<UploadContentPage onBack={() => window.location.hash = "/"} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TelegramProvider>
          <AuthProvider>
            <AuthModalProvider>
              <DiceRollProvider>
                <SocketProvider>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </SocketProvider>
              </DiceRollProvider>
            </AuthModalProvider>
          </AuthProvider>
        </TelegramProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
