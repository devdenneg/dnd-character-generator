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
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-20 relative overflow-hidden">
      {/* Magical particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="magic-particle absolute top-2 left-10 w-1 h-1 bg-primary rounded-full animate-magic-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="magic-particle absolute top-4 left-1/4 w-0.5 h-0.5 bg-accent rounded-full animate-magic-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="magic-particle absolute top-1 right-20 w-1 h-1 bg-primary rounded-full animate-magic-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="magic-particle absolute top-3 right-1/3 w-0.5 h-0.5 bg-accent rounded-full animate-magic-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="magic-particle absolute bottom-2 left-1/3 w-1 h-1 bg-primary rounded-full animate-magic-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            style={{ position: "relative" }}
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity group"
          >
            <span className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-animated group-hover:scale-105 transition-transform">
              🎲G
            </span>
            <span
              className="font-display font-bold text-lg md:text-xl lg:text-2xl"
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
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <LogIn className="w-4 h-4 relative z-10" />
                  <span className="hidden md:inline md:ml-2 relative z-10">
                    Войти
                  </span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={openRegister}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-4 py-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="md:hidden">Регистр.</span>
                    <span className="hidden md:inline">Регистрация</span>
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-gradient-flow" />
    </header>
  );
}
