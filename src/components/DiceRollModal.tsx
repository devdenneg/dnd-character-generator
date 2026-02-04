import { useState, useEffect, useRef, useCallback } from "react";
import { Dices, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiceRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  formula: string;
}

export function DiceRollModal({
  isOpen,
  onClose,
  formula,
}: DiceRollModalProps) {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Парсим формулу броска (например, "1к10")
  const parseFormula = useCallback(
    (formulaStr: string): { count: number; sides: number } | null => {
      const match = formulaStr.match(/^(\d+)к(\d+)$/i);
      if (match) {
        return {
          count: parseInt(match[1], 10),
          sides: parseInt(match[2], 10),
        };
      }
      return null;
    },
    []
  );

  const parsed = parseFormula(formula);

  // Выполняем бросок
  const rollDice = useCallback(() => {
    if (!parsed) return;

    // Очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRolling(true);
    setResult(null);

    // Симуляция анимации броска
    let rollCount = 0;
    const maxRolls = 10;

    intervalRef.current = setInterval(() => {
      rollCount++;
      const tempResult = Math.floor(Math.random() * parsed.sides) + 1;
      setResult(tempResult);

      if (rollCount >= maxRolls) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRolling(false);
      }
    }, 100);
  }, [parsed]);

  // Очищаем интервал при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Автоматический бросок при открытии
  useEffect(() => {
    if (isOpen && parsed) {
      rollDice();
    }
  }, [isOpen, formula]);

  // Сброс при закрытии
  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setIsRolling(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isOpen]);

  if (!isOpen || !parsed) return null;

  const maxPossible = parsed.count * parsed.sides;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full animate-modal-content">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <Dices className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Бросок кубика
              </h2>
              <p className="text-xs text-muted-foreground">{formula}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Результат броска */}
          <div className="mb-6">
            {isRolling ? (
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-display font-bold text-gradient animate-dice-pulse">
                  ?
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Бросаем кубик...
                </p>
              </div>
            ) : result !== null ? (
              <div className="text-center">
                <div className="relative inline-block">
                  <div
                    className={`text-6xl md:text-8xl font-display font-bold ${
                      result === maxPossible
                        ? "text-gradient-critical"
                        : result === 1
                        ? "text-gradient-fail"
                        : "text-gradient-success"
                    }`}
                  >
                    {result}
                  </div>
                  {result === maxPossible && (
                    <div className="absolute -top-2 -right-4 text-2xl animate-bounce">
                      🎉
                    </div>
                  )}
                  {result === 1 && (
                    <div className="absolute -top-2 -right-4 text-2xl animate-shake">
                      😢
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {parsed.count === 1
                    ? `из ${parsed.sides}`
                    : `сумма ${parsed.count} кубиков (d${parsed.sides})`}
                </p>
              </div>
            ) : null}
          </div>

          {/* Информация о формуле */}
          <div className="bg-muted/50 border border-border/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Формула:</span>
              <span className="font-mono text-foreground font-medium">
                {formula}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Минимум:</span>
              <span className="font-mono text-foreground">{parsed.count}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Максимум:</span>
              <span className="font-mono text-foreground">{maxPossible}</span>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3">
            <Button
              onClick={rollDice}
              disabled={isRolling}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Перебросить
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isRolling}
              className="flex-1"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
