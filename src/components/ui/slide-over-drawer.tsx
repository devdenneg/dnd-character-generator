import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string; // Add className
  showBackButton?: boolean;
}

export function SlideOverDrawer({
  isOpen,
  onClose,
  title,
  children,
  actions,
  className, // Destructure className
  showBackButton = true,
}: SlideOverDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null); // Add REf

  // Handle opening
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Handle closing with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onClose();
    }, 250); // Match animation duration
  };

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when open and handle scrollbar layout shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Touch handling for swipe-to-close
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || touchStartY === null) return;
    const current = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;

    const deltaX = current - touchStart;
    const deltaY = currentY - touchStartY;

    // If scrolling vertically more than horizontally, ignore
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    // Only allow dragging to the right (closing)
    if (current > touchStart) {
      setTouchCurrent(current);
    }
  };

  const onTouchEnd = () => {
    if (touchStart !== null && touchCurrent !== null) {
      const distance = touchCurrent - touchStart;
      const width = drawerRef.current?.offsetWidth || 0;
      const threshold = width * 0.6; // 60% width threshold

      if (distance > threshold) {
        handleClose();
      }
    }
    setTouchStart(null);
    setTouchStartY(null);
    setTouchCurrent(null);
  };

  // Mouse handling for desktop drag-to-close
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseCurrent, setMouseCurrent] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseStart === null) return;
      const current = e.clientX;
      if (current > mouseStart) {
        setMouseCurrent(current);
      }
    };

    const handleMouseUp = () => {
      if (mouseStart !== null && mouseCurrent !== null) {
        const distance = mouseCurrent - mouseStart;
        const width = drawerRef.current?.offsetWidth || 0;
        const threshold = width * 0.6; // 60% width threshold
        if (distance > threshold) {
          handleClose();
        }
      }
      setMouseStart(null);
      setMouseCurrent(null);
    };

    if (mouseStart !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseStart, mouseCurrent]);

  // Prevent text selection during drag
  useEffect(() => {
    if (mouseStart !== null || touchStart !== null) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [mouseStart, touchStart]);

  const translateX =
    (touchStart !== null && touchCurrent !== null && touchCurrent > touchStart) ? touchCurrent - touchStart :
    (mouseStart !== null && mouseCurrent !== null && mouseCurrent > mouseStart) ? mouseCurrent - mouseStart :
    0;

  const isDragging = translateX > 0;

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`relative w-full max-w-xl h-full bg-card border-l border-border shadow-2xl flex flex-col transition-transform ease-out ${
          isDragging ? "duration-0" : "duration-300"
        } ${
          isClosing ? "translate-x-full" : "translate-x-0"
        } ${className || ""}`}
        style={{ transform: translateX > 0 ? `translateX(${translateX}px)` : undefined }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Desktop Drag Handle (Tongue) */}
        <div
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-24 bg-card border-y border-l border-border rounded-l-xl cursor-col-resize z-50 flex items-center justify-center group touch-none hidden md:flex shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]"
            onMouseDown={(e) => setMouseStart(e.clientX)}
            title="Потяните, чтобы закрыть"
        >
            <div className="w-1 h-8 rounded-full bg-muted-foreground/20 group-hover:bg-primary/50 transition-colors" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1 truncate">
               <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {actions}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
