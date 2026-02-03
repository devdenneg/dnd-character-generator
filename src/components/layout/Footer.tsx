import { Github, Twitter, Mail, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">О проекте</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Генератор персонажей для Dungeons & Dragons 5-го издания (2024).
              Создавайте уникальных героев с полным набором механик PHB 2024.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Полезные ссылки
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.dndbeyond.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  D&D Beyond
                </a>
              </li>
              <li>
                <a
                  href="https://roll20.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roll20
                </a>
              </li>
              <li>
                <a
                  href="https://www.dnd.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Официальный сайт D&D
                </a>
              </li>
            </ul>
          </div>

          {/* Version */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Версия</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">PHB 2024</span>
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Генератор находится в активной разработке. Некоторые функции могут
              измениться.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Создано с</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>для сообщества D&D</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:support@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
