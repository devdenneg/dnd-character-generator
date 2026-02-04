import { createContext, useContext, useState, ReactNode } from "react";
import { DiceRollModal } from "@/components/DiceRollModal";

interface DiceRollContextType {
  openRoll: (formula: string) => void;
  closeRoll: () => void;
}

const DiceRollContext = createContext<DiceRollContextType | undefined>(
  undefined
);

export function DiceRollProvider({ children }: { children: ReactNode }) {
  const [showRoll, setShowRoll] = useState(false);
  const [formula, setFormula] = useState("");

  const openRoll = (rollFormula: string) => {
    setFormula(rollFormula);
    setShowRoll(true);
  };

  const closeRoll = () => {
    setShowRoll(false);
    setFormula("");
  };

  return (
    <DiceRollContext.Provider value={{ openRoll, closeRoll }}>
      {children}
      <DiceRollModal isOpen={showRoll} onClose={closeRoll} formula={formula} />
    </DiceRollContext.Provider>
  );
}

export function useDiceRoll() {
  const context = useContext(DiceRollContext);
  if (!context) {
    throw new Error("useDiceRoll must be used within DiceRollProvider");
  }
  return context;
}
