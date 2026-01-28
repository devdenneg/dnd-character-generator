import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface FitTextProps {
  children: ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
  className?: string;
}

export function FitText({
  children,
  minFontSize = 10,
  maxFontSize = 18,
  className = "",
}: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fitText = () => {
      let currentSize = maxFontSize;
      text.style.fontSize = `${currentSize}px`;

      while (
        text.scrollWidth > container.clientWidth &&
        currentSize > minFontSize
      ) {
        currentSize -= 1;
        text.style.fontSize = `${currentSize}px`;
      }

      setFontSize(currentSize);
    };

    fitText();

    const resizeObserver = new ResizeObserver(fitText);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [children, minFontSize, maxFontSize]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <span
        ref={textRef}
        className="whitespace-nowrap block"
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </span>
    </div>
  );
}
