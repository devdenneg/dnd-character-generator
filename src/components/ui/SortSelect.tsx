import { Select } from "@/components/ui/select";

export interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

export function SortSelect({ value, onChange, options, className }: SortSelectProps) {
  return (
    <div className={`w-[180px] ${className}`}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        className="bg-card/50 backdrop-blur-sm"
      />
    </div>
  );
}
