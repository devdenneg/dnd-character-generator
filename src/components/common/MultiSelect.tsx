// Multi-select checkbox component for forms

import { Label } from "@/components/ui/label";

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              className="mt-0.5"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Выбрано: {selected.length} {selected.length === 1 ? "пункт" : selected.length > 1 && selected.length < 5 ? "пункта" : "пунктов"}
      </p>
    </div>
  );
}
