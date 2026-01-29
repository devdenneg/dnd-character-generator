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
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;

      let top = 0;
      let left = 0;

      // Определяем начальную позицию
      switch (position) {
        case "top":
          top = rect.top - tooltipRect.height - 8;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          // Проверяем, влезает ли сверху
          if (top < padding) {
            top = rect.bottom + 8;
          }
          break;
        case "bottom":
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          // Проверяем, влезает ли снизу
          if (top + tooltipRect.height > viewportHeight - padding) {
            top = rect.top - tooltipRect.height - 8;
          }
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.left - tooltipRect.width - 8;
          // Проверяем, влезает ли слева
          if (left < padding) {
            left = rect.right + 8;
          }
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.right + 8;
          // Проверяем, влезает ли справа
          if (left + tooltipRect.width > viewportWidth - padding) {
            left = rect.left - tooltipRect.width - 8;
          }
          break;
      }

      // Корректируем горизонтальное положение
      if (left < padding) {
        left = padding;
      } else if (left + tooltipRect.width > viewportWidth - padding) {
        left = viewportWidth - tooltipRect.width - padding;
      }

      // Корректируем вертикальное положение
      if (top < padding) {
        top = padding;
      } else if (top + tooltipRect.height > viewportHeight - padding) {
        top = viewportHeight - tooltipRect.height - padding;
      }

      setCoords({ top, left });
    }
  }, [isVisible, position]);

  const getTransformOrigin = () => {
    return "none";
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
