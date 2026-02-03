import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Shield, Sparkles } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();

  return (
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
              Инструменты для мастеров и игроков Dungeons & Dragons 5th Edition
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
                onClick={() => navigate("/character")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
              >
                <div className="flex items-center justify-between">
                  <span>Создать персонажа</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
              <button
                onClick={() => navigate("/my-characters")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
              >
                <div className="flex items-center justify-between">
                  <span>Мои персонажи</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
              <button
                onClick={() => navigate("/races")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
              >
                <div className="flex items-center justify-between">
                  <span>Расы</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
              <button
                onClick={() => navigate("/classes")}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-lg hover:bg-muted/30 group"
              >
                <div className="flex items-center justify-between">
                  <span>Классы</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
              <button
                onClick={() => navigate("/glossary")}
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
                  <p className="text-sm text-foreground font-medium">PHB 2024</p>
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
  );
}
