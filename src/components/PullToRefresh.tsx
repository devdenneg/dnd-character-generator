import { RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface PullToRefreshProps {
  children: React.ReactNode;
}

export function PullToRefresh({ children }: PullToRefreshProps) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { updateServiceWorker } = useRegisterSW();

  const MIN_PULL_DISTANCE = 80;
  const MAX_PULL_DISTANCE = 120;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      const y = e.touches[0].clientY;
      const diff = y - startY;

      if (diff > 0 && window.scrollY === 0) {
        // Add resistance
        const newY = Math.min(diff * 0.5, MAX_PULL_DISTANCE);
        setCurrentY(newY);
        // Prevent default scrolling when pulling
        if (e.cancelable) e.preventDefault();
      } else {
        setIsPulling(false);
        setCurrentY(0);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling) return;

      if (currentY >= MIN_PULL_DISTANCE) {
        setIsRefreshing(true);
        // Force update service worker and reload
        updateServiceWorker(true).then(() => {
            window.location.reload();
        });
      }

      setIsPulling(false);
      setCurrentY(0);
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchmove", handleTouchMove, { passive: false });
      element.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isPulling, startY, currentY, updateServiceWorker]);

  return (
    <div ref={contentRef} className="min-h-screen relative">
      {/* Refresh Indicator */}
      <div
        className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50 transition-transform duration-200"
        style={{ transform: `translateY(${Math.max(0, currentY - 40)}px)` }}
      >
        <div
          className={`
            bg-background/80 backdrop-blur-md border border-border rounded-full p-2
            shadow-lg transition-opacity duration-300
            ${currentY > 0 ? "opacity-100" : "opacity-0"}
          `}
        >
          <RefreshCw
            className={`w-5 h-5 text-primary ${isRefreshing ? "animate-spin" : ""}`}
            style={{ transform: `rotate(${currentY * 2}deg)` }}
          />
        </div>
      </div>

      {children}
    </div>
  );
}
