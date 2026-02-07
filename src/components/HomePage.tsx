import { useRandomContent, useSearch } from "@/api/search";
import backgroundsImage from "@/components/assets/backgrounds.jpg";
import classesImage from "@/components/assets/classes.jpg";
import createCharImage from "@/components/assets/createChar.jpg";
import equipImage from "@/components/assets/equip.jpg";
import myCharImage from "@/components/assets/myChar.jpg";
import racesImage from "@/components/assets/races.jpg";
import spellsImage from "@/components/assets/spells.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ChevronRight, RefreshCw, Search, Sparkles, Upload, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  onNavigate: (page: string, itemId?: string) => void;
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

interface SearchResult {
  id: string;
  name: string;
  nameRu: string;
  type: "race" | "class" | "background" | "spell" | "equipment" | "glossary" | "feat";
  category: string;
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
  {
    id: "equipment",
    title: "Снаряжение",
    description: "Оружие, доспехи, инструменты и другое снаряжение",
    gradient: "from-orange-500 to-amber-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: equipImage,
  },
  {
    id: "glossary",
    title: "Глоссарий",
    description: "Справочник терминов, правил и условий",
    gradient: "from-emerald-500 to-green-600",
    roles: ["player", "master"],
    inDevelopment: false,
    image: undefined,
  },
  {
    id: "feats",
    title: "Черты",
    description: "Бонусы и особенности персонажа",
    gradient: "from-amber-500 to-orange-600",
    roles: ["player", "master"],
    inDevelopment: false,
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, isAuthenticated } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const navigate = useNavigate();

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Используем API для поиска
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearch(debouncedSearchQuery);

  // Random Content Logic
  const { data: randomContent = [], refetch: refetchRandom } = useRandomContent();
  const [currentRandomIndex, setCurrentRandomIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating || randomContent.length === 0) return;

    const interval = setInterval(() => {
      setCurrentRandomIndex((prev) => (prev + 1) % randomContent.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isRotating, randomContent.length]);

  const handleRandomClick = (item: SearchResult) => {
    handleSearchResultClick(item);
  };

  const currentRandomItem = randomContent[currentRandomIndex];

  // Обработчик клика на результат поиска
  const handleSearchResultClick = (result: SearchResult) => {
    let navigateTo = "";

    switch (result.type) {
      case "race":
        navigate(`/races/${result.id}`);
        setSearchQuery("");
        return;
      case "class":
        navigate(`/classes/${result.id}`);
        setSearchQuery("");
        return;
      case "background":
         navigate(`/backgrounds#${result.id}`);
         setSearchQuery("");
         return;
      case "spell":
         navigate(`/spells#${result.id}`);
         setSearchQuery("");
         return;
      case "equipment":
         navigate(`/equipment#${result.id}`);
         setSearchQuery("");
         return;
      case "glossary":
        navigate(`/glossary#${result.id}`);
        setSearchQuery("");
        return;
      case "feat":
        navigate(`/feats#${result.id}`);
        setSearchQuery("");
        return;
    }

    setSearchQuery("");
    onNavigate(navigateTo, result.id);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/glossary?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Filter menu items based on user role
  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(user?.role || "player")
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
      {/* Auth Info for non-authenticated users */}
      {!isAuthenticated && (
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-8 md:p-10 animate-fade-in relative overflow-hidden">
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
                Регистрируйтесь, чтобы сохранять созданных персонажей и получать
                к ним доступ с любого устройства.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={openRegister}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-6 py-3 text-base shadow-lg shadow-primary/20"
                >
                  Создать аккаунт
                </Button>
                <Button
                  variant="outline"
                  onClick={openLogin}
                  className="px-6 py-3 text-base border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* First Section: Game Content (Reference) - Enabled */}
      <div className="mb-16 relative">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-display font-semibold text-foreground">
              Справочник
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Расы, классы, предыстории, заклинания и снаряжение
            </p>
          </div>
        </div>

        {/* Random Article Block */}
        {currentRandomItem && (
          <div
            className="mb-8 relative group cursor-pointer"
            onMouseEnter={() => setIsRotating(false)}
            onMouseLeave={() => setIsRotating(true)}
            onClick={() => handleRandomClick(currentRandomItem)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 flex items-center justify-between overflow-hidden group-hover:border-primary/30 transition-colors duration-300">

              {/* Progress Fill Animation */}
              {isRotating && (
                 <div
                   key={currentRandomIndex}
                   className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/10 to-transparent z-0 animate-[progress_10s_linear]"
                 />
              )}

              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Случайная статья
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                       • {currentRandomItem.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {currentRandomItem.nameRu}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentRandomItem.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-background/50 hover:text-primary transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        refetchRandom();
                    }}
                >
                    <RefreshCw className="w-5 h-5" />
                </Button>
                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Поиск по справочнику..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-11 text-base bg-card/60 backdrop-blur-sm border-border/40 focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdowns */}
          {isSearchLoading && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 p-4 animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">Поиск...</span>
              </div>
            </div>
          )}

          {!isSearchLoading && searchQuery && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in">
              <div className="p-2">
                {searchResults.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {result.nameRu}
                      </p>
                      <p className="text-xs text-muted-foreground">{result.name}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isSearchLoading && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 p-4 animate-fade-in">
              <p className="text-sm text-muted-foreground text-center">
                Ничего не найдено по запросу "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleMenuItems
            .filter((item) =>
              ["races", "classes", "backgrounds", "spells", "equipment", "glossary", "feats"].includes(item.id)
            )
            .map((item, index) => (
              <div
                key={item.id}
                className="group w-full text-left rounded-2xl border bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-48"
                onClick={() => onNavigate(item.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/50 to-transparent" />
                  </div>
                )}
                {!item.image && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                )}

                <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-tight">
                    {item.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Second Section: Characters - Disabled (Coming Soon) */}
      <div className="mb-16 relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-[var(--z-overlay)] bg-background/40 backdrop-blur-[2px] rounded-3xl flex items-center justify-center cursor-not-allowed">
          <div className="bg-card/90 backdrop-blur-md border-2 border-primary/30 px-8 py-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <span className="text-2xl font-display font-bold text-primary uppercase tracking-widest">
              Скоро будет
            </span>
          </div>
        </div>

        <div className="opacity-40 grayscale pointer-events-none">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-display font-semibold text-foreground">Персонажи</h2>
              <p className="text-muted-foreground text-sm mt-1">Создание и управление персонажами</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleMenuItems
              .filter((item) => item.id === "character-wizard" || item.id === "my-characters")
              .map((item, index) => (
                <div
                  key={item.id}
                  className="group w-full text-left rounded-2xl border bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ease-out cursor-not-allowed relative overflow-hidden h-40"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.image && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/50 to-transparent" />
                    </div>
                  )}
                  <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {isAuthenticated && (
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-6">Управление контентом</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate("upload-content")}
              className="group w-full text-left rounded-2xl border bg-card/40 backdrop-blur-md border-border/40 p-6 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Загрузка контента</h3>
                  <p className="text-sm text-muted-foreground">Загружайте изображения для использования в игре</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Master Section */}
      {isAuthenticated && user?.role === "master" && (
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-6">Панель Мастера</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate("my-rooms")}
              className="group w-full text-left rounded-2xl border bg-card/40 backdrop-blur-md border-border/40 p-6 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Мои комнаты</h3>
                  <p className="text-sm text-muted-foreground">Управление игровыми комнатами</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
