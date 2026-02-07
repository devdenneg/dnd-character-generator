import { useNavigate } from "react-router-dom";

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
