import { ReactNode } from "react";
import { DiceBackground } from "./DiceBackground";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen animate-fade-in ${className}`}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />
        <DiceBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
