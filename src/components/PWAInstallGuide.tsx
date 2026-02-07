import { Button } from "@/components/ui/button";
import { Share, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function PWAInstallGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, показывали ли уже гайд
    const hasSeenGuide = localStorage.getItem("pwa_guide_seen");

    // Проверяем, запущено ли приложение уже в PWA (standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');

    if (!hasSeenGuide && !isStandalone) {
      // Показываем с небольшой задержкой для плавности
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("pwa_guide_seen", "true");
  };

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[10000] p-4 animate-in slide-in-from-bottom duration-500 pointer-events-none">
      <div className="max-w-md mx-auto bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-5 relative pointer-events-auto">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-3 flex-1">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Установите приложение</h3>
              <p className="text-sm text-muted-foreground">
                Добавьте на главный экран для быстрого доступа и работы офлайн
              </p>
            </div>

            <div className="space-y-2 text-sm bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border text-[10px] font-bold">1</span>
                <span>Нажмите кнопку «Поделиться» <Share className="w-3 h-3 inline mx-0.5" /></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border text-[10px] font-bold">2</span>
                <span>Выберите «На экран "Домой"»</span>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full h-9 text-xs">
              Понятно
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
