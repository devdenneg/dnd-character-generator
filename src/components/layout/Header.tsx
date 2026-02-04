import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { ThemeSelector } from "@/components/ThemeSelector";

export function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            style={{ position: "relative" }}
            onClick={() => navigate("/")}
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
            {/* Theme Selector */}
            <ThemeSelector />

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
                  onClick={openLogin}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:inline md:ml-2">Войти</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={openRegister}
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
  );
}
