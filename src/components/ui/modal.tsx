import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  icon,
  maxWidth = "max-w-lg",
}: ModalProps) {
  // Блокируем скролл body при открытии модалки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      onClick={onClose}
    >
      <div
        className={`bg-card/95 backdrop-blur-xl rounded-2xl w-full ${maxWidth} max-h-[85vh] flex flex-col shadow-2xl border border-border/50 animate-fade-in-scale`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || icon) && (
          <div className="p-6 border-b border-border/50 flex-shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                {icon && <div className="text-5xl">{icon}</div>}
                <div>
                  {title && (
                    <h2 className="text-xl font-bold text-foreground">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>,
    document.body,
  );
}

// Подкомпоненты для удобства
export function ModalHeader({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 border-b border-border/50 flex-shrink-0">
      {children}
    </div>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  return <div className="p-6 overflow-y-auto flex-1">{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 border-t border-border/50 flex gap-3 flex-shrink-0">
      {children}
    </div>
  );
}
