interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
