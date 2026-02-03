import { Palette } from "lucide-react";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const themes: {
  value: Theme;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "default",
    label: "Midnight Slate",
    description: "Классическая тёмная тема",
    color: "from-slate-600 to-slate-800",
  },
  {
    value: "purple",
    label: "Deep Purple",
    description: "Глубокий фиолетовый",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "blue",
    label: "Ocean Blue",
    description: "Океанская синева",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "green",
    label: "Forest Green",
    description: "Лесная зелень",
    color: "from-green-500 to-emerald-500",
  },
  {
    value: "red",
    label: "Crimson Red",
    description: "Багровый красный",
    color: "from-red-500 to-rose-500",
  },
  {
    value: "orange",
    label: "Sunset Orange",
    description: "Закатный оранжевый",
    color: "from-orange-500 to-amber-500",
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2"
        title="Выбрать тему"
      >
        <Palette className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="p-3">
            <div className="text-xs font-semibold text-foreground px-3 py-2 mb-2">
              Цветовая тема
            </div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    theme === t.value
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} flex-shrink-0 shadow-md`}
                  />
                  <div className="flex-1 text-left">
                    <div
                      className={`text-sm font-semibold ${
                        theme === t.value ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {t.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.description}
                    </div>
                  </div>
                  {theme === t.value && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
