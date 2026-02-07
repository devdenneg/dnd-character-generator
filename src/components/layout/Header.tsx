import { ThemeSelector } from "@/components/ThemeSelector";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/constants/menuItems";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { Crown, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-[100] relative">
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

      <div className="max-w-6xl mx-auto px-4 py-4 md:py-4 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            style={{ position: "relative" }}
            onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
            }}
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity group relative z-[110]"
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Selector */}
            <ThemeSelector />

            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Profile */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/30 transition-colors">
                  {user?.role === "master" ? (
                    <Crown className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  ) : (
                    <User className="w-5 h-5 text-primary flex-shrink-0" />
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
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2.5"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openLogin}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2.5 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <LogIn className="w-5 h-5 relative z-10" />
                  <span className="hidden md:inline md:ml-2 relative z-10">
                    Войти
                  </span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={openRegister}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-4 py-2.5 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="md:hidden text-sm font-medium">Регистр.</span>
                    <span className="hidden md:inline">Регистрация</span>
                  </span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Burger Button */}
          <button
            className="md:hidden relative z-[110] p-2 hover:bg-accent/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
                <X className="w-7 h-7 text-foreground" />
            ) : (
                <Menu className="w-7 h-7 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-gradient-flow" />

      {/* Mobile Fullscreen Menu - Portalled to Body */}
      {createPortal(
        <div
          className={`fixed inset-0 z-[9999] bg-background md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-display font-bold text-gradient-animated">
                🎲G
              </span>
              <span className="font-display font-bold text-xl">DND</span>
            </div>
            <button
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-7 h-7 text-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col gap-6">
                  {/* Theme Toggle in Menu */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50">
                      <span className="text-lg font-medium">Тема оформления</span>
                      <ThemeSelector />
                  </div>

                  <div className="h-px bg-border/50 w-full" />

                  {/* Navigation Links */}
                  <div className="grid grid-cols-1 gap-4">
                      {MENU_ITEMS
                          .filter(item => ["races", "classes", "backgrounds", "spells", "equipment", "glossary", "feats", "bestiary"].includes(item.id))
                          .map((item) => (
                          <button
                              key={item.id}
                              onClick={() => {
                                  navigate(item.id === "character-wizard" || item.id === "my-characters" ? `/${item.id}` : (item.id === "bestiary" ? "/bestiary" : `/${item.id}`));
                                  setIsMenuOpen(false);
                              }}
                              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:bg-primary/5 hover:border-primary/30 transition-all text-left group"
                          >
                              <span className={`w-2 h-8 rounded-full bg-gradient-to-b ${item.gradient}`} />
                              <span className="text-lg font-medium group-hover:text-primary transition-colors">{item.title}</span>
                          </button>
                      ))}
                  </div>
              </nav>
          </div>

          {/* Mobile Menu Footer (Auth) */}
          <div className="p-6 border-t border-border/50 bg-card/30 backdrop-blur-md">
              {isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
                           {user?.role === "master" ? (
                              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                  <Crown className="w-5 h-5 text-amber-500" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                              </div>
                            )}
                            <div>
                              <span className="text-base font-medium block">
                                {user?.name || user?.email?.split("@")[0]}
                              </span>
                              <span className="text-xs text-muted-foreground block">
                                {user?.role === "master" ? "Мастер" : "Игрок"}
                              </span>
                            </div>
                      </div>
                      <Button
                          variant="destructive"
                          size="lg"
                          onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                          }}
                          className="w-full"
                      >
                          <LogOut className="w-5 h-5 mr-2" />
                          Выйти
                      </Button>
                  </div>
              ) : (
                  <div className="flex flex-col gap-3">
                      <Button
                          variant="default"
                          size="lg"
                          onClick={() => {
                              openLogin();
                              setIsMenuOpen(false);
                          }}
                          className="w-full bg-gradient-to-r from-primary to-accent text-lg h-12"
                      >
                          <LogIn className="w-5 h-5 mr-2" />
                          Войти
                      </Button>
                      <Button
                          variant="outline"
                          size="lg"
                          onClick={() => {
                              openRegister();
                              setIsMenuOpen(false);
                          }}
                          className="w-full text-lg h-12"
                      >
                          Регистрация
                      </Button>
                  </div>
              )}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
