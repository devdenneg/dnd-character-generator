import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ReactNode } from "react";
import { CreatorStepper } from "./CreatorStepper";

interface CreatorLayoutProps {
  children: ReactNode;
}

export function CreatorLayout({ children }: CreatorLayoutProps) {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 space-y-4">
      <CreatorStepper />
      <Card>
        <CardHeader />
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
}
