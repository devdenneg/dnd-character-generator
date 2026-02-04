import { useEffect, useState } from "react";
import { Package, Info, Coins, Swords, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import type { Equipment } from "@/types/character";
import { t } from "@/data/translations/ru";

export function EquipmentStep() {
  const { character, setEquipment, setWallet } = useCharacterStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Автоматически добавляем снаряжение при выборе класса и предыстории
  useEffect(() => {
    const allEquipment: Equipment[] = [];
    const initialQuantities: Record<string, number> = {};

    // Добавляем снаряжение от предыстории
    if (character.background?.equipment && Array.isArray(character.background.equipment)) {
      character.background.equipment.forEach((item) => {
        const quantity = item.quantity || 1;
        allEquipment.push({
          ...item,
          source: "background",
          quantity,
        });
        initialQuantities[item.id] = quantity;
      });
    }

    // Добавляем снаряжение от класса
    if (character.class?.equipment && Array.isArray(character.class.equipment)) {
      character.class.equipment.forEach((item) => {
        const quantity = item.quantity || 1;
        allEquipment.push({
          ...item,
          source: "class",
          quantity,
        });
        initialQuantities[item.id] = quantity;
      });
    }

    // Устанавливаем снаряжение
    setEquipment(allEquipment);
    setQuantities(initialQuantities);

    // Суммируем золото от класса и предыстории
    const classGold = character.class?.startingGold || 0;
    const backgroundGold = character.background?.startingGold || 0;
    const totalGold = classGold + backgroundGold;

    // Устанавливаем кошелек только если у нас есть золото для установки
    if (totalGold > 0) {
      setWallet({
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: totalGold,
        platinum: 0,
      });
    }
  }, [character.class, character.background, setEquipment, setWallet]);

  // Разделяем снаряжение по источникам
  const backgroundEquipment = character.equipment.filter(
    (e) => e.source === "background"
  );
  const classEquipment = character.equipment.filter(
    (e) => e.source === "class"
  );

  // Функция для изменения количества предмета
  const updateQuantity = (itemId: string, delta: number) => {
    const currentQuantity = quantities[itemId] || 1;
    const newQuantity = Math.max(1, currentQuantity + delta);

    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));

    // Обновляем снаряжение в store
    const updatedEquipment = character.equipment.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setEquipment(updatedEquipment);
  };

  const totalWeight = character.equipment.reduce(
    (sum, item) => sum + (item.weight || 0) * (item.quantity || 1),
    0
  );

  // Получаем золото от каждого источника
  const classGold = character.class?.startingGold || 0;
  const backgroundGold = character.background?.startingGold || 0;
  const totalGold = character.wallet?.gold || 0;

  return (
    <div className="space-y-6">
      {/* Правила */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Снаряжение персонажа (PHB 2024)</p>
              <p className="text-sm text-muted-foreground">
                Снаряжение автоматически предоставляется вашим классом и
                предысторией. Каждая вещь отмечена своим источником.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Снаряжение от предыстории */}
      {backgroundEquipment.length > 0 && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="w-4 h-4" />
                Снаряжение от предыстории: {character.background?.nameRu}
              </CardTitle>
              {backgroundGold > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Coins className="w-3 h-3" />
                  {backgroundGold} зм
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {backgroundEquipment.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col gap-1 p-2 bg-background/50 rounded"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.nameRu || item.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Предыстория
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      {item.cost && item.cost.quantity > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {item.cost.quantity} {item.cost.unit}
                        </span>
                      )}
                      {item.weight && (
                        <span className="text-xs text-muted-foreground">
                          Вес: {item.weight} кг × {quantities[item.id] || 1} = {((item.weight || 0) * (quantities[item.id] || 1)).toFixed(1)} кг
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={(quantities[item.id] || 1) <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[2ch] text-center">
                        {quantities[item.id] || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Снаряжение от класса */}
      {classEquipment.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Swords className="w-4 h-4" />
                Снаряжение от класса: {character.class?.nameRu}
              </CardTitle>
              {classGold > 0 && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Coins className="w-3 h-3" />
                  {classGold} зм
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {classEquipment.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col gap-2 p-2 bg-background/50 rounded"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.nameRu || item.name}</span>
                    <Badge variant="default" className="text-xs">
                      Класс
                    </Badge>
                  </div>
                  {item.category === "weapon" && item.damage && (
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>
                        Урон: {item.damage.dice} {item.damage.type}
                      </span>
                      {item.properties && item.properties.length > 0 && (
                        <span className="text-blue-400">
                          {item.properties.join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                  {item.category === "armor" && item.armorClass && (
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>КД: {item.armorClass}</span>
                      {item.armorType === "shield" ? (
                        <span className="text-amber-400">Бонус +2</span>
                      ) : item.armorType === "light" ? (
                        <span className="text-green-400">
                          + ЛОВ (не ограничен)
                        </span>
                      ) : item.armorType === "medium" ? (
                        <span className="text-yellow-400">+ ЛОВ (макс +2)</span>
                      ) : item.armorType === "heavy" ? (
                        <span className="text-red-400">Без ЛОВ</span>
                      ) : (
                        <span className="text-green-400">+ ЛОВ (макс 2)</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      {item.cost && item.cost.quantity > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {item.cost.quantity} {item.cost.unit}
                        </span>
                      )}
                      {item.weight && (
                        <span className="text-xs text-muted-foreground">
                          Вес: {item.weight} кг × {quantities[item.id] || 1} = {((item.weight || 0) * (quantities[item.id] || 1)).toFixed(1)} кг
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={(quantities[item.id] || 1) <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[2ch] text-center">
                        {quantities[item.id] || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Общая информация */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {t("character.equipment")}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">
                Вес: {totalWeight.toFixed(1)} кг
              </Badge>
              {totalGold > 0 && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Coins className="w-3 h-3" />
                  {totalGold} зм
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {character.equipment.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Снаряжение не выбрано
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {character.equipment.map((item, index) => {
                const quantity = item.quantity || 1;
                return (
                  <Badge
                    key={item.id || index}
                    variant="outline"
                    className="cursor-pointer hover:bg-destructive/10"
                  >
                    {item.nameRu || item.name}
                    {quantity > 1 && (
                      <span className="ml-1 text-xs opacity-70">×{quantity}</span>
                    )}
                  </Badge>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
