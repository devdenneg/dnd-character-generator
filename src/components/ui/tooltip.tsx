import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  maxWidth?: string;
}

export function Tooltip({
  children,
  content,
  className = "",
  position = "top",
  maxWidth = "max-w-sm",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
      }

      setCoords({ top, left });

      // Adjust if tooltip goes out of viewport
      if (tooltipEl) {
        const tooltipRect = tooltipEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Horizontal adjustment
        if (tooltipRect.right > viewportWidth - 10) {
          setCoords((prev) => ({
            ...prev,
            left: prev.left - (tooltipRect.right - viewportWidth + 20),
          }));
        }
        if (tooltipRect.left < 10) {
          setCoords((prev) => ({
            ...prev,
            left: prev.left + (10 - tooltipRect.left),
          }));
        }

        // Vertical adjustment
        if (tooltipRect.top < 10 && position === "top") {
          // Switch to bottom
          setCoords({
            top: rect.bottom + 8,
            left: rect.left + rect.width / 2,
          });
        }
        if (tooltipRect.bottom > viewportHeight - 10 && position === "bottom") {
          // Switch to top
          setCoords({
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
          });
        }
      }
    }
  }, [isVisible, position]);

  const getTransformOrigin = () => {
    switch (position) {
      case "top":
        return "translateX(-50%) translateY(-100%)";
      case "bottom":
        return "translateX(-50%)";
      case "left":
        return "translateX(-100%) translateY(-50%)";
      case "right":
        return "translateY(-50%)";
      default:
        return "translateX(-50%) translateY(-100%)";
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`
              fixed z-[999999] ${maxWidth} p-4 
              bg-card/95 backdrop-blur-xl 
              border border-border/50 
              rounded-xl shadow-2xl shadow-black/50
              text-sm text-foreground
              animate-fade-in-scale
            `}
            style={{
              top: coords.top,
              left: coords.left,
              transform: getTransformOrigin(),
            }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}

// Вспомогательные компоненты для контента тултипа
export function TooltipHeader({ children }: { children: ReactNode }) {
  return <p className="font-bold mb-2 text-foreground">{children}</p>;
}

export function TooltipDescription({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground mb-3">{children}</p>;
}

export function TooltipCalc({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-1 bg-muted/30 p-2.5 rounded-lg mb-3 font-mono text-xs">
      {children}
    </div>
  );
}

export function TooltipCalcRow({
  label,
  value,
  highlight = false,
  border = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  border?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${highlight ? "text-primary font-bold" : ""} ${border ? "border-t border-border pt-1 mt-1" : ""}`}
    >
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export function TooltipHighlight({
  children,
  color = "primary",
}: {
  children: ReactNode;
  color?: "primary" | "emerald" | "amber" | "purple";
}) {
  const colorClasses = {
    primary: "text-primary",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
  };

  return <p className={`mt-2 ${colorClasses[color]} text-xs`}>{children}</p>;
}
