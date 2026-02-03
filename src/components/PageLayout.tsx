import { ReactNode } from "react";
import { DiceBackground } from "./DiceBackground";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageLayout({
  children,
  className = "",
  showHeader = true,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col animate-fade-in ${className}`}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />
        <DiceBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {showHeader && <Header />}
        <main className="flex-1">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
