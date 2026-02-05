import { Button } from "@/components/ui/button";
import { Dices, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Парсим формулу броска (например, "1к10", "4к10+10", "2к6-3", "10к6 + 40")
  const parseFormula = useCallback(
    (formulaStr: string): { count: number; sides: number; bonus: number } | null => {
      // Убираем все пробелы для упрощения парсинга
      const cleanFormula = formulaStr.replace(/\s+/g, '');
      const match = cleanFormula.match(/^(\d+)к(\d+)([+\-]\d+)?$/i);
      if (match) {
        return {
          count: parseInt(match[1], 10),
          sides: parseInt(match[2], 10),
          bonus: match[3] ? parseInt(match[3], 10) : 0,
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
    setDiceRolls([]);

    // Симуляция анимации броска
    let rollCount = 0;
    const maxRolls = 10;

    intervalRef.current = setInterval(() => {
      rollCount++;

      // Бросаем все кубики
      const rolls: number[] = [];
      for (let i = 0; i < parsed.count; i++) {
        rolls.push(Math.floor(Math.random() * parsed.sides) + 1);
      }

      // Суммируем результаты кубиков и добавляем бонус
      const diceSum = rolls.reduce((sum, roll) => sum + roll, 0);
      const totalResult = diceSum + parsed.bonus;

      setDiceRolls(rolls);
      setResult(totalResult);

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
      setDiceRolls([]);
      setIsRolling(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isOpen]);

  if (!isOpen || !parsed) return null;

  const maxPossible = parsed.count * parsed.sides + parsed.bonus;
  const minPossible = parsed.count + parsed.bonus;

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
                  Бросаем {parsed.count === 1 ? 'кубик' : 'кубики'}...
                </p>
              </div>
            ) : result !== null ? (
              <div className="text-center">
                <div className="relative inline-block">
                  <div
                    className={`text-6xl md:text-8xl font-display font-bold ${
                      result === maxPossible
                        ? "text-gradient-critical"
                        : result === minPossible
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
                  {result === minPossible && (
                    <div className="absolute -top-2 -right-4 text-2xl animate-shake">
                      😢
                    </div>
                  )}
                </div>

                {/* Детали броска */}
                <div className="mt-3 space-y-1">
                  {parsed.count > 1 && (
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">Кубики:</span>
                      {diceRolls.map((roll, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 border border-border/30 text-sm font-semibold text-foreground"
                        >
                          {roll}
                        </span>
                      ))}
                    </div>
                  )}

                  {parsed.count === 1 && parsed.bonus === 0 && (
                    <p className="text-sm text-muted-foreground">
                      из {parsed.sides}
                    </p>
                  )}

                  {(parsed.count > 1 || parsed.bonus !== 0) && (
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      {parsed.count > 1 && (
                        <div>
                          Сумма кубиков: {diceRolls.reduce((sum, roll) => sum + roll, 0)}
                        </div>
                      )}
                      {parsed.bonus !== 0 && (
                        <div>
                          Бонус: {parsed.bonus > 0 ? '+' : ''}{parsed.bonus}
                        </div>
                      )}
                      {(parsed.count > 1 || parsed.bonus !== 0) && (
                        <div className="font-semibold text-foreground">
                          Итого: {result}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
            {parsed.bonus !== 0 && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Бонус:</span>
                <span className="font-mono text-foreground">
                  {parsed.bonus > 0 ? '+' : ''}{parsed.bonus}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Минимум:</span>
              <span className="font-mono text-foreground">{minPossible}</span>
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
