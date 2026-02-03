import {
  Sparkles,
  BookOpen,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  Crown,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiceBackground } from "@/components/DiceBackground";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import createCharImage from "@/components/assets/createChar.jpg";
import myCharImage from "@/components/assets/myChar.jpg";
import racesImage from "@/components/assets/races.jpg";
import classesImage from "@/components/assets/classes.jpg";
import backgroundsImage from "@/components/assets/backgrounds.jpg";
import spellsImage from "@/components/assets/spells.jpg";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  gradient: string;
  roles: ("player" | "master")[];
  inDevelopment: boolean;
  image?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "character-wizard",
    title: "Создание персонажа",
    description: "Пошаговый мастер создания персонажа по правилам PHB 2024",
    gradient: "from-primary to-accent",
    roles: ["player", "master"],
    inDevelopment: false,
    image: createCharImage,
  },
  {
    id: "my-characters",
    title: "Мои персонажи",
    description: "Сохранённые персонажи в облаке",
    gradient: "from-emerald-500 to-teal-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: myCharImage,
  },
  {
    id: "races",
    title: "Расы",
    description: "Все расы из Книги игрока 2024 года",
    gradient: "from-rose-500 to-pink-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: racesImage,
  },
  {
    id: "classes",
    title: "Классы",
    description: "Все классы из Книги игрока 2024 года",
    gradient: "from-cyan-500 to-blue-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: classesImage,
  },
  {
    id: "backgrounds",
    title: "Предыстории",
    description: "Все предыстории из Книги игрока 2024 года",
    gradient: "from-purple-500 to-indigo-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: backgroundsImage,
  },
  {
    id: "spells",
    title: "Заклинания",
    description: "Все заклинания из Книги игрока 2024 года",
    gradient: "from-violet-500 to-purple-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: spellsImage,
  },
  // Скрытые пункты меню (временно закомментированы)
  /*
  {
    id: "my-achievements",
    title: "Мои достижения",
    description: "Находится в разработке",
    icon: Trophy,
    gradient: "from-yellow-500 to-amber-500",
    roles: ["player", "master"],
    inDevelopment: true,
  },
  {
    id: "join-room",
    title: "Присоединиться к игре",
    description: "Находится в разработке",
    icon: DoorOpen,
    gradient: "from-blue-500 to-cyan-500",
    roles: ["player"],
    inDevelopment: true,
  },
  {
    id: "my-rooms",
    title: "Мои комнаты",
    description: "Управление игровыми комнатами",
    icon: DoorOpen,
    gradient: "from-amber-500 to-orange-500",
    roles: ["master"],
    inDevelopment: false,
  },
  {
    id: "create-room",
    title: "Создать комнату",
    description: "Создайте новую игровую комнату",
    icon: Plus,
    gradient: "from-purple-500 to-pink-500",
    roles: ["master"],
    inDevelopment: false,
  },
  */
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Секретная разблокировка для разработчика (7 кликов)
  const [devClickCounts, setDevClickCounts] = useState<Record<string, number>>(
    {}
  );

  // Загружаем разблокированные фичи из localStorage при инициализации
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>(() => {
    const unlocked = localStorage.getItem("dev_unlocked_features");
    return unlocked ? JSON.parse(unlocked) : [];
  });

  const handleLogout = async () => {
    await logout();
  };

  const handleDevClick = (itemId: string) => {
    const currentCount = (devClickCounts[itemId] || 0) + 1;
    const newCounts = { ...devClickCounts, [itemId]: currentCount };
    setDevClickCounts(newCounts);

    if (currentCount === 7) {
      // Разблокируем фичу
      const newUnlocked = [...unlockedFeatures, itemId];
      setUnlockedFeatures(newUnlocked);
      localStorage.setItem(
        "dev_unlocked_features",
        JSON.stringify(newUnlocked)
      );

      // Показываем уведомление
      const itemTitle = MENU_ITEMS.find((i) => i.id === itemId)?.title;
      alert(`🔓 Режим разработчика активирован для "${itemTitle}"`);

      // Сбрасываем счётчик
      const resetCounts = { ...newCounts, [itemId]: 0 };
      setDevClickCounts(resetCounts);
    }
  };

  // Filter menu items based on user role
  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(user?.role || "player")
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />
        <DiceBackground />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <button
                style={{ position: "relative" }}
                onClick={() => onNavigate("home")}
                className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity group"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-animated group-hover:scale-105 transition-transform">
                  🎲G
                </span>
                <span
                  className="font-display font-bold"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "30%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  DND
                </span>
              </button>

              {/* Auth Section */}
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    {/* User Profile */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/30 transition-colors">
                      {user?.role === "master" ? (
                        <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <User className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <div className="hidden sm:block">
                        <span className="text-sm text-foreground font-medium block">
                          {user?.name || user?.email?.split("@")[0]}
                        </span>
                        <span className="text-xs text-muted-foreground block">
                          {user?.role === "master" ? "Мастер" : "Игрок"}
                        </span>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate("login")}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden md:inline md:ml-2">Войти</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onNavigate("register")}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-4 py-2"
                    >
                      <span className="md:hidden">Регистр.</span>
                      <span className="hidden md:inline">Регистрация</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-10 md:py-12 flex-1">
          {/* Auth Info for non-authenticated users - moved higher */}
          {!isAuthenticated && (
            <div className="mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-8 md:p-10 animate-fade-in relative overflow-hidden">
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />

              <div className="flex items-start gap-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    Создайте аккаунт
                  </h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Регистрируйтесь, чтобы сохранять созданных персонажей и
                    получать к ним доступ с любого устройства.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => onNavigate("register")}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-6 py-3 text-base shadow-lg shadow-primary/20"
                    >
                      Создать аккаунт
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate("login")}
                      className="px-6 py-3 text-base border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      Войти
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {/* <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6 animate-fade-in backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">PHB 2024 Edition</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up delay-75">
              <span className="text-gradient">D&D Generator</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100 leading-relaxed">
              Полный комплект инструментов для мастеров и игроков Dungeons &
              Dragons 5th Edition
            </p>
          </div> */}

          {/* First Section: Characters */}
          <div className="mb-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-display font-semibold text-foreground">
                  Персонажи
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Создание и управление персонажами
                </p>
              </div>
            </div>

            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-muted" />
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Character items
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleMenuItems
                  .filter(
                    (item) =>
                      item.id === "character-wizard" ||
                      item.id === "my-characters"
                  )
                  .map((item, index) => {
                    const isDisabled =
                      item.inDevelopment && !unlockedFeatures.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (isDisabled) {
                            handleDevClick(item.id);
                          } else {
                            onNavigate(item.id);
                          }
                        }}
                        className={`
                          w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden
                          ${
                            isDisabled
                              ? "bg-card/5 border-border/10 cursor-not-allowed grayscale"
                              : "group animate-fade-in-up bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 cursor-pointer relative"
                          }
                        `}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Background image with fade effect */}
                        {item.image && !isDisabled && (
                          <div className="absolute inset-0">
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            {/* Fade overlay from left */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-card/80 to-card/95" />
                            {/* Top/bottom gradients for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-card/40" />
                          </div>
                        )}

                        {/* Glassmorphism glow effect */}
                        {!isDisabled && !item.image && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity blur-xl`}
                          />
                        )}

                        {/* Shine effect on hover */}
                        {!isDisabled && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-transparent translate-x-[-100%] group-hover:animate-shine transition-transform" />
                        )}

                        {/* Content */}
                        <div className="flex items-start gap-5 relative z-5 p-6">
                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-semibold text-lg md:text-xl text-foreground mb-2 ${
                                !isDisabled
                                  ? "group-hover:text-primary transition-colors"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Second Section: Game Content */}
          <div className="mb-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-display font-semibold text-foreground">
                  Справочник
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Расы, классы, предыстории и заклинания
                </p>
              </div>
            </div>

            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-muted" />
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Content items
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleMenuItems
                  .filter((item) =>
                    ["races", "classes", "backgrounds", "spells"].includes(
                      item.id
                    )
                  )
                  .map((item, index) => {
                    const isDisabled =
                      item.inDevelopment && !unlockedFeatures.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (isDisabled) {
                            handleDevClick(item.id);
                          } else {
                            onNavigate(item.id);
                          }
                        }}
                        className={`
                          w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden
                          ${
                            isDisabled
                              ? "bg-card/5 border-border/10 cursor-not-allowed grayscale"
                              : "group animate-fade-in-up bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 cursor-pointer relative"
                          }
                        `}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Background image with fade effect */}
                        {item.image && !isDisabled && (
                          <div className="absolute inset-0">
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            {/* Fade overlay from left */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-card/80 to-card/95" />
                            {/* Top/bottom gradients for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-card/40" />
                          </div>
                        )}

                        {/* Glassmorphism glow effect */}
                        {!isDisabled && !item.image && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity blur-xl`}
                          />
                        )}

                        {/* Shine effect on hover */}
                        {!isDisabled && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-transparent translate-x-[-100%] group-hover:animate-shine transition-transform" />
                        )}

                        {/* Content */}
                        <div className="flex items-start gap-4 relative z-5 p-6">
                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-semibold text-base md:text-lg text-foreground mb-1 ${
                                !isDisabled
                                  ? "group-hover:text-primary transition-colors"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">🎲</span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    D&D Generator
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Инструменты для мастеров и игроков Dungeons & Dragons 5th
                  Edition
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Создано</span>
                  <span className="text-primary font-medium">antonchik</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-5 text-base">
                  Навигация
                </h4>
                <div className="space-y-2.5">
                  <button
                    onClick={() => onNavigate("character-wizard")}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>Создать персонажа</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                  <button
                    onClick={() => onNavigate("my-characters")}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>Мои персонажи</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                  <button
                    onClick={() => onNavigate("races")}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>Расы</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                  <button
                    onClick={() => onNavigate("classes")}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>Классы</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                  <button
                    onClick={() => onNavigate("glossary")}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>Глоссарий</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Social & Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-5 text-base">
                  Информация
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        D&D 5e SRD
                      </p>
                      <p className="text-xs text-muted-foreground">
                        System Reference Document
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        PHB 2024
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Player's Handbook
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        Официальные правила
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Wizards of the Coast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/30 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 D&D Generator. Все права защищены.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Работает
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    v1.0.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
