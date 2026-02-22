import { BackgroundsPage } from "@/components/BackgroundsPage";
import { BestiaryPage } from "@/components/BestiaryPage";
import { BrowseRoomsPage } from "@/components/BrowseRoomsPage";
import { ClassDetailsPage } from "@/components/ClassDetailsPage";
import { ClassesPage } from "@/components/ClassesPage";
import { CreateRoomPage } from "@/components/CreateRoomPage";
import { EquipmentPage } from "@/components/EquipmentPage";
import FeatsPage from "@/components/FeatsPage";
import GlossaryPage from "@/components/GlossaryPage";
import { HomePage } from "@/components/HomePage";
import { JoinRoomPage } from "@/components/JoinRoomPage";
import { MasterAchievementsPage } from "@/components/MasterAchievementsPage";
import { MyRoomsPage } from "@/components/MyRoomsPage";
import { NotFoundPage } from "@/components/NotFoundPage";
import { PageLayout } from "@/components/PageLayout";
import { PlayerAchievementsPage } from "@/components/PlayerAchievementsPage";
import { RaceDetailsPage } from "@/components/RaceDetailsPage";
import { RacesPage } from "@/components/RacesPage";
import { PullToRefresh } from "@/components/PullToRefresh";
import ReloadPrompt from "@/components/ReloadPrompt";
import { RoomDetailsPage } from "@/components/RoomDetailsPage";
import { SpellsPage } from "@/components/SpellsPage";
import { UploadContentPage } from "@/components/UploadContentPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { DiceRollProvider } from "@/contexts/DiceRollContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { TelegramProvider } from "@/contexts/TelegramContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
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

function HomePageWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page: string, itemId?: string) => {
    switch (page) {
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
      case "feats":
        navigate(itemId ? `/feats#${itemId}` : "/feats");
        break;
      case "bestiary":
        navigate(itemId ? `/bestiary#${itemId}` : "/bestiary");
        break;
      default:
        navigate("/");
    }
  };

  return <HomePage onNavigate={handleNavigate} />;
}

function BackgroundsPageWrapper() {
  const navigate = useNavigate();

  return <BackgroundsPage onBack={() => navigate("/")} />;
}

function SpellsPageWrapper() {
  const navigate = useNavigate();

  return <SpellsPage onBack={() => navigate("/")} />;
}

function EquipmentPageWrapper() {
  const navigate = useNavigate();

  return <EquipmentPage onBack={() => navigate("/")} />;
}

function BestiaryPageWrapper() {
  const navigate = useNavigate();

  return <BestiaryPage onBack={() => navigate("/")} />;
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!(location.state as { scrollY?: number } | null)?.scrollY) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  const isClassDetails =
    location.pathname.startsWith("/classes/") && location.pathname !== "/classes";
  const isRaceDetails =
    location.pathname.startsWith("/races/") && location.pathname !== "/races";
  const showHeaderFooter = !isClassDetails && !isRaceDetails;

  return (
    <PageLayout showHeader={showHeaderFooter} showFooter={showHeaderFooter}>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/races" element={<RacesPage />} />
        <Route path="/races/:raceId" element={<RaceDetailsPage />} />
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
        <Route path="/feats" element={<FeatsPage />} />
        <Route path="/bestiary" element={<BestiaryPageWrapper />} />
        <Route
          path="/upload-content"
          element={<UploadContentPage onBack={() => (window.location.hash = "/")} />}
        />
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
                    <PullToRefresh>
                      <AppRoutes />
                    </PullToRefresh>
                    <ReloadPrompt />
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
