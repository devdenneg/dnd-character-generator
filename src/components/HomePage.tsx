import {
  UserPlus,
  Sparkles,
  BookOpen,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  Users,
  Crown,
  DoorOpen,
  Plus,
  Zap,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PREMADE_CHARACTERS } from "@/data/premadeCharacters";
import { useCharacterStore } from "@/store/characterStore";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const MENU_ITEMS = [
  {
    id: "character-wizard",
    title: "Создание персонажа",
    description: "Пошаговый мастер создания персонажа по правилам PHB 2024",
    icon: UserPlus,
    gradient: "from-primary to-accent",
    roles: ["player", "master"],
  },
  {
    id: "my-characters",
    title: "Мои персонажи",
    description: "Сохранённые персонажи в облаке",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    roles: ["player", "master"],
  },
  {
    id: "my-achievements",
    title: "Мои достижения",
    description: "Полученные награды и ачивки",
    icon: Trophy,
    gradient: "from-yellow-500 to-amber-500",
    roles: ["player", "master"],
  },
  {
    id: "join-room",
    title: "Присоединиться к игре",
    description: "Найдите активную комнату и присоединитесь",
    icon: DoorOpen,
    gradient: "from-blue-500 to-cyan-500",
    roles: ["player"],
  },
  {
    id: "my-rooms",
    title: "Мои комнаты",
    description: "Управление игровыми комнатами",
    icon: DoorOpen,
    gradient: "from-amber-500 to-orange-500",
    roles: ["master"],
  },
  {
    id: "create-room",
    title: "Создать комнату",
    description: "Создайте новую игровую комнату",
    icon: Plus,
    gradient: "from-purple-500 to-pink-500",
    roles: ["master"],
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { loadCharacter } = useCharacterStore();

  const handleLogout = async () => {
    await logout();
  };

  const handleLoadPremadeCharacter = (
    characterData: any,
    premadeId: string,
  ) => {
    console.log("Loading premade character:", characterData);
    console.log("Character race:", characterData.race);
    console.log("Character class:", characterData.class);
    // Передаем ID готового персонажа как characterId, чтобы он не сбрасывался
    loadCharacter(characterData, `premade-${premadeId}`);
    console.log("Character loaded, navigating...");
    navigate("/character");
  };

  // Filter menu items based on user role
  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(user?.role || "player"),
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-3 md:py-6">
            <div className="flex items-center justify-between gap-3">
              {/* Logo */}
              <button
                onClick={() => onNavigate("home")}
                className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src="/logo.png"
                  alt="D&D Generator"
                  className="h-12 md:h-20 lg:h-28 w-auto"
                />
              </button>

              {/* Auth Section */}
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    {/* User Profile */}
                    <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-muted/50">
                      {user?.role === "master" ? (
                        <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <User className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <span className="text-xs md:text-sm text-foreground truncate max-w-[100px] md:max-w-[150px]">
                        {user?.name || user?.email?.split("@")[0]}
                      </span>
                      <span
                        className={`hidden md:inline text-xs px-1.5 py-0.5 rounded ${
                          user?.role === "master"
                            ? "bg-amber-500/20 text-amber-500"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {user?.role === "master" ? "Мастер" : "Игрок"}
                      </span>
                    </div>

                    {/* Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-muted-foreground hover:text-foreground p-2 md:px-3"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden md:inline md:ml-2">Выйти</span>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate("login")}
                      className="text-muted-foreground hover:text-foreground p-2 md:px-3"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden md:inline md:ml-2">Войти</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate("register")}
                      className="border-primary/50 hover:bg-primary/10 text-xs md:text-sm px-2 md:px-3"
                    >
                      <span className="md:hidden">Регистр.</span>
                      <span className="hidden md:inline">Регистрация</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Доступные инструменты
            </h2>
            <p className="text-muted-foreground text-sm">
              Выберите инструмент для работы с вашей игрой
            </p>
          </div>

          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Menu items
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleMenuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="animate-fade-in-up w-full text-left p-6 rounded-2xl border transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/80 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {item.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Готовые персонажи */}
          <div className="mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Готовые персонажи
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Быстрый старт для новичков
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PREMADE_CHARACTERS.map((premade, index) => (
                <button
                  key={premade.id}
                  onClick={() =>
                    handleLoadPremadeCharacter(premade.character, premade.id)
                  }
                  className="animate-fade-in-up text-left p-4 rounded-xl border transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50 hover:border-amber-500/50 hover:bg-card/80 cursor-pointer group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{premade.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-foreground mb-1 truncate">
                        {premade.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {premade.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {premade.character.race?.nameRu}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                          {premade.character.class?.nameRu}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Auth Info for non-authenticated users */}
          {!isAuthenticated && (
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Войдите в аккаунт
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Для сохранения персонажей в облаке
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Зарегистрируйтесь, чтобы сохранять созданных персонажей и
                получить к ним доступ с любого устройства.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => onNavigate("register")}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Создать аккаунт
                </Button>
                <Button variant="outline" onClick={() => onNavigate("login")}>
                  Войти
                </Button>
              </div>
            </div>
          )}

          {/* Quick Info */}
          <div className="mt-8 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">PHB 2024</h3>
                <p className="text-sm text-muted-foreground">
                  Актуальные правила Player's Handbook
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Все инструменты основаны на обновлённых правилах D&D 5th Edition
              2024 года. Включены все расы, классы, заклинания и предыстории из
              нового Player's Handbook.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  D&D Generator — Инструменты для мастеров и игроков
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Создано{" "}
                  <span className="text-primary font-medium">antonchik</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("glossary")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Глоссарий
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
