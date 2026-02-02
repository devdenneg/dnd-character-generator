import { useEffect } from "react";
import { Package, Info, Coins, Swords } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCharacterStore } from "@/store/characterStore";
import type { Equipment } from "@/types/character";
import { t } from "@/data/translations/ru";

export function EquipmentStep() {
  const { character, setEquipment, setWallet } = useCharacterStore();

  // Автоматически добавляем снаряжение при выборе класса и предыстории
  useEffect(() => {
    const allEquipment: Equipment[] = [];

    // Добавляем снаряжение от предыстории
    if (character.background) {
      character.background.equipment.forEach((itemName) => {
        const bgEquipment: Equipment = {
          id: `bg-${itemName.toLowerCase().replace(/\s+/g, '-')}`,
          name: itemName,
          nameRu: itemName,
          category: "gear" as const,
          cost: { quantity: 0, unit: "gp" },
          weight: 0,
          source: "background",
        };
        allEquipment.push(bgEquipment);
      });
    }

    // Добавляем снаряжение от класса
    if (character.class?.startingEquipment) {
      character.class.startingEquipment.equipment.forEach((item) => {
        allEquipment.push({
          ...item,
          source: "class",
        });
      });
    }

    // Устанавливаем снаряжение
    setEquipment(allEquipment);

    // Суммируем золото от класса и предыстории
    const classGold = character.class?.startingEquipment?.gold || 0;
    const backgroundGold = character.background?.startingGold || 0;
    const totalGold = classGold + backgroundGold;


    // Устанавливаем кошелек только если у нас есть золото для установки И мы не на шаге снаряжения
    // чтобы избежать циклических обновлений
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
  const backgroundEquipment = character.equipment.filter((e) => e.source === "background");
  const classEquipment = character.equipment.filter((e) => e.source === "class");

  const totalWeight = character.equipment.reduce((sum, item) => sum + item.weight, 0);

  // Получаем золото от каждого источника
  const classGold = character.class?.startingEquipment?.gold || 0;
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
                Снаряжение автоматически предоставляется вашим классом и предысторией.
                Каждая вещь отмечена своим источником.
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
                <div key={index} className="flex flex-col gap-1 p-2 bg-background/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.nameRu}</span>
                    <Badge variant="outline" className="text-xs">
                      Предыстория
                    </Badge>
                  </div>
                  {item.cost && item.cost.quantity > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {item.cost.quantity} {item.cost.unit}
                    </span>
                  )}
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
                <div key={index} className="flex flex-col gap-1 p-2 bg-background/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.nameRu}</span>
                    <Badge variant="default" className="text-xs">
                      Класс
                    </Badge>
                  </div>
                  {item.category === "weapon" && item.damage && (
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>Урон: {item.damage.dice} {item.damage.type}</span>
                      {item.properties && item.properties.length > 0 && (
                        <span className="text-blue-400">
                          {item.properties.join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                  {item.category === "armor" && (
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>КД: {item.armorClass}</span>
                      {item.armorType === "shield" ? (
                        <span className="text-amber-400">Бонус +2</span>
                      ) : item.armorType === "light" ? (
                        <span className="text-green-400">+ ЛОВ (не ограничен)</span>
                      ) : item.armorType === "medium" ? (
                        <span className="text-yellow-400">+ ЛОВ (макс +2)</span>
                      ) : item.armorType === "heavy" ? (
                        <span className="text-red-400">Без ЛОВ</span>
                      ) : (
                        <span className="text-green-400">+ ЛОВ (макс 2)</span>
                      )}
                    </div>
                  )}
                  {item.cost && item.cost.quantity > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {item.cost.quantity} {item.cost.unit}
                    </span>
                  )}
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
                Вес: {totalWeight.toFixed(1)} фунтов
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
              {character.equipment.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-destructive/10"
                >
                  {item.nameRu}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
