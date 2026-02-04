import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Shield, Sparkles } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto relative overflow-hidden">
      {/* Magic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="magic-particle-footer absolute bottom-10 left-[10%] w-1 h-1 bg-primary rounded-full animate-magic-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="magic-particle-footer absolute bottom-20 left-[30%] w-0.5 h-0.5 bg-accent rounded-full animate-magic-float"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          className="magic-particle-footer absolute bottom-5 right-[20%] w-1 h-1 bg-primary rounded-full animate-magic-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="magic-particle-footer absolute bottom-15 right-[40%] w-0.5 h-0.5 bg-accent rounded-full animate-magic-float"
          style={{ animationDelay: "2.2s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="group">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl animate-dice-shake">🎲</span>
              <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
                D&D Generator
              </h3>
              <span
                className="text-sm animate-sparkle"
                style={{ animationDelay: "0.5s" }}
              >
                ✨
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
              Инструменты для мастеров и игроков Dungeons & Dragons 5th Edition
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground relative">
              <span className="group-hover:text-primary transition-colors duration-300">
                Создано
              </span>
              <span className="text-primary font-medium group-hover:text-accent transition-colors duration-300">
                antonchik
              </span>
              <span
                className="text-xs animate-sparkle"
                style={{ animationDelay: "1s" }}
              >
                ⚔️
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-5 text-base relative">
              Навигация
              <span className="absolute -top-1 -right-2 text-xs animate-sparkle">
                🗺️
              </span>
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate("/character")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-all duration-300 p-2.5 rounded-lg hover:bg-muted/30 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <div className="flex items-center justify-between relative z-10">
                  <span>Создать персонажа</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
              <button
                onClick={() => navigate("/my-characters")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-all duration-300 p-2.5 rounded-lg hover:bg-muted/30 group relative overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  style={{ animationDelay: "0.1s" }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <span>Мои персонажи</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
              <button
                onClick={() => navigate("/races")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-all duration-300 p-2.5 rounded-lg hover:bg-muted/30 group relative overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  style={{ animationDelay: "0.2s" }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <span>Расы</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
              <button
                onClick={() => navigate("/classes")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-all duration-300 p-2.5 rounded-lg hover:bg-muted/30 group relative overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  style={{ animationDelay: "0.3s" }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <span>Классы</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
              <button
                onClick={() => navigate("/glossary")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-all duration-300 p-2.5 rounded-lg hover:bg-muted/30 group relative overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  style={{ animationDelay: "0.4s" }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <span>Глоссарий</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Social & Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-5 text-base relative">
              Информация
              <span
                className="absolute -top-1 -right-2 text-xs animate-sparkle"
                style={{ animationDelay: "0.5s" }}
              >
                📜
              </span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-all duration-300 group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    D&D 5e SRD
                  </p>
                  <p className="text-xs text-muted-foreground">
                    System Reference Document
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-all duration-300 group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 relative z-10">
                  <Shield className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-foreground font-medium group-hover:text-cyan-500 transition-colors">
                    PHB 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Player's Handbook
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition-all duration-300 group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-foreground font-medium group-hover:text-violet-500 transition-colors">
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
        <div className="border-t border-border/30 pt-6 relative overflow-hidden">
          {/* Glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-gradient-flow-footer" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground relative">
              © 2024 D&D Generator. Все права защищены.
              <span
                className="absolute -top-1 right-0 text-xs animate-sparkle"
                style={{ animationDelay: "1.5s" }}
              >
                ⚔️
              </span>
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Работает</span>
                <span
                  className="text-xs animate-sparkle"
                  style={{ animationDelay: "2s" }}
                >
                  ✨
                </span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 hover:scale-105 transition-all cursor-default">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
