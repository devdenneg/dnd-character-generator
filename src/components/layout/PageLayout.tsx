import { ReactNode } from "react";
import { DiceBackground } from "../DiceBackground";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {showHeader && <Header />}

      {/* Main Content */}
      <main className={`flex-1 relative z-10 ${className}`}>
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="app-background" />
          <div className="ambient-glow ambient-glow-1" />
          <div className="ambient-glow ambient-glow-2" />
          <DiceBackground />
        </div>

        {/* Content */}
        <div className="relative">{children}</div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
