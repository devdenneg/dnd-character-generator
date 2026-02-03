import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, DiceD20, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCharacterStore } from "@/store/characterStore";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { loadedCharacterId, resetCharacter } = useCharacterStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    resetCharacter();
    setMobileMenuOpen(false);
  };

  const navigation = [
    { name: "Главная", path: "/", icon: Home },
    { name: "Создать персонажа", path: "/character", icon: DiceD20 },
    { name: "Мои персонажи", path: "/my-characters", icon: User },
    { name: "Глоссарий", path: "/glossary", icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
              <DiceD20 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient font-display">
                D&D Генератор
              </h1>
              <p className="text-xs text-muted-foreground">
                Создавай персонажей в PHB 2024
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && loadedCharacterId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => resetCharacter()}
                className="hidden sm:flex"
              >
                <Settings className="w-4 h-4" />
                Новый персонаж
              </Button>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Регистрация</Button>
                </Link>
              </div>
            )}
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all ${
                    mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 mt-2 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/50 mt-2 pt-2">
                {isAuthenticated && loadedCharacterId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      resetCharacter();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Новый персонаж
                  </Button>
                )}
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Войти
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button size="sm" className="w-full">
                        Регистрация
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
