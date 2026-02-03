import { useMemo } from "react";

// D&D dice symbols
const DICE_SYMBOLS = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function generateRandomDice() {
  const diceCount = 20; // Увеличили количество кубиков
  return Array.from({ length: diceCount }, (_, i) => ({
    id: i,
    symbol: DICE_SYMBOLS[i % DICE_SYMBOLS.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 50, // Больше размер для кубиков
    opacity: 0.03 + Math.random() * 0.08, // Меньшая прозрачность
    duration: 20 + Math.random() * 15,
    rotationDuration: 15 + Math.random() * 15,
  }));
}

export function DiceBackground() {
  const dice = useMemo(() => generateRandomDice(), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {dice.map((die) => (
        <div
          key={die.id}
          className="absolute transition-transform duration-300"
          style={{
            left: `${die.x}%`,
            top: `${die.y}%`,
            fontSize: `${die.size}px`,
            opacity: die.opacity,
            filter: "blur(0.5px)",
            animation: `float ${die.duration}s ease-in-out infinite, rotate ${die.rotationDuration}s linear infinite`,
            animationDelay: `${die.id * -2}s`,
          }}
        >
          {die.symbol}
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(40px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-30px, 40px) rotate(180deg);
          }
          75% {
            transform: translate(-40px, -15px) rotate(270deg);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
