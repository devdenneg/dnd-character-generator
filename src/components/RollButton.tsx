import { useDiceRoll } from "@/contexts/DiceRollContext";
import { Dices } from "lucide-react";

interface RollButtonProps {
  formula: string;
}

export function RollButton({ formula }: RollButtonProps) {
  const { openRoll } = useDiceRoll();

  return (
    <button
      onClick={() => openRoll(formula)}
      className="inline-flex items-center px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono text-sm cursor-pointer hover:bg-purple-500/30 hover:text-purple-300 transition-all"
      title="Нажмите, чтобы бросить кубик"
    >
      <Dices className="w-3 h-3 mr-1" />
      {formula}
    </button>
  );
}
