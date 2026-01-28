import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Users,
  Circle,
  Heart,
  Shield,
  Zap,
  Footprints,
  Sparkles,
  Swords,
  Star,
  Coins,
  BookOpen,
} from "lucide-react";

interface Character {
  id: string;
  name: string;
  data: any;
}

interface RoomPlayer {
  id: string;
  userId: string;
  characterId: string;
  isOnline: boolean;
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  character: Character;
}

interface MasterRoomViewProps {
  room: any;
  players: RoomPlayer[];
  onStartGame: () => void;
  isStarting: boolean;
}

function getModifier(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function getProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

// Словарь навыков на русском
const SKILL_NAMES_RU: Record<string, string> = {
  acrobatics: "Акробатика",
  animal_handling: "Уход за животными",
  arcana: "Магия",
  athletics: "Атлетика",
  deception: "Обман",
  history: "История",
  insight: "Проницательность",
  intimidation: "Запугивание",
  investigation: "Расследование",
  medicine: "Медицина",
  nature: "Природа",
  perception: "Восприятие",
  performance: "Выступление",
  persuasion: "Убеждение",
  religion: "Религия",
  sleight_of_hand: "Ловкость рук",
  stealth: "Скрытность",
  survival: "Выживание",
};

// Типы урона на русском
const DAMAGE_TYPES_RU: Record<string, string> = {
  slashing: "рубящий",
  piercing: "колющий",
  bludgeoning: "дробящий",
  fire: "огонь",
  cold: "холод",
  lightning: "молния",
  thunder: "звук",
  poison: "яд",
  acid: "кислота",
  necrotic: "некротика",
  radiant: "излучение",
  force: "силовое поле",
  psychic: "психика",
};

// Начальное золото по предыстории (PHB 2024)
const BACKGROUND_STARTING_GOLD: Record<string, number> = {
  acolyte: 15,
  artisan: 25,
  charlatan: 15,
  criminal: 15,
  entertainer: 11,
  farmer: 15,
  guard: 12,
  guide: 2,
  hermit: 16,
  merchant: 22,
  noble: 29,
  sage: 8,
  sailor: 10,
  scribe: 23,
  soldier: 14,
  wayfarer: 16,
};

// Вычислить wallet с учетом предыстории
function getWallet(character: any) {
  const wallet = character.wallet || {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  };

  // Если кошелек пустой, добавляем золото от предыстории
  if (
    character.background &&
    wallet.gold === 0 &&
    wallet.silver === 0 &&
    wallet.copper === 0
  ) {
    return {
      ...wallet,
      gold: BACKGROUND_STARTING_GOLD[character.background.id] || 15,
    };
  }

  return wallet;
}

export function MasterRoomView({
  room,
  players,
  onStartGame,
  isStarting,
}: MasterRoomViewProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  // Auto-select first player when players list changes
  useEffect(() => {
    if (players.length > 0 && !selectedPlayerId) {
      setSelectedPlayerId(players[0].id);
    }
  }, [players, selectedPlayerId]);

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId);

  // Debug logging
  useEffect(() => {
    if (selectedPlayer) {
      console.log(
        "📋 Selected player character data:",
        selectedPlayer.character.data,
      );
      console.log("💰 Wallet data:", selectedPlayer.character.data.wallet);
    }
  }, [selectedPlayer]);

  return (
    <div className="space-y-6">
      {/* Start Game Button */}
      {!room.isStarted && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Готовы начать игру?
              </h3>
              <p className="text-sm text-muted-foreground">
                После начала игры новые игроки не смогут присоединиться
              </p>
            </div>
            <Button
              onClick={onStartGame}
              disabled={isStarting || players.length === 0}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-2"
            >
              <Play className="w-4 h-4" />
              {isStarting ? "Запуск..." : "Начать игру"}
            </Button>
          </div>
        </div>
      )}

      {room.isStarted && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
          <p className="text-emerald-500 font-semibold">🎮 Игра началась!</p>
        </div>
      )}

      {/* Players Tabs */}
      {players.length === 0 ? (
        <div className="text-center py-12 bg-card/40 rounded-2xl">
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Нет игроков
          </h3>
          <p className="text-muted-foreground">
            Поделитесь ссылкой для приглашения игроков
          </p>
        </div>
      ) : (
        <>
          {/* Player Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedPlayerId === player.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 bg-card/40 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Circle
                    className={`w-2 h-2 ${
                      player.isOnline
                        ? "fill-emerald-500 text-emerald-500"
                        : "fill-muted text-muted"
                    }`}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-foreground">
                      {player.character?.name || "Без персонажа"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.user.name || player.user.email}
                    </p>
                  </div>
                </div>
              </button>
            ))}
            {/* Overall Tab */}
            <button
              onClick={() => setSelectedPlayerId("__overall__")}
              className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${
                selectedPlayerId === "__overall__"
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-card/40 hover:border-primary/50"
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-sm text-foreground">
                  📊 Общее
                </p>
                <p className="text-xs text-muted-foreground">
                  Сводная информация
                </p>
              </div>
            </button>
          </div>

          {/* Overall View */}
          {selectedPlayerId === "__overall__" ? (
            <div className="space-y-6">
              {/* Characters Stats Table */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Характеристики персонажей
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                          Персонаж
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          HP
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          AC
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          СИЛ
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          ЛОВ
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          ВЫН
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          ИНТ
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          МУД
                        </th>
                        <th className="text-center py-3 px-2 text-muted-foreground font-semibold">
                          ХАР
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player) => {
                        if (!player.character?.data) return null;

                        const char = player.character.data;
                        const conScore = char.abilityScores?.constitution || 10;
                        const conIncrease =
                          char.abilityScoreIncreases?.constitution || 0;
                        const conMod = Math.floor(
                          (conScore + conIncrease - 10) / 2,
                        );
                        const hitDie = char.class?.hitDie || 8;
                        const hp = hitDie + conMod;

                        const dexScore = char.abilityScores?.dexterity || 10;
                        const dexIncrease =
                          char.abilityScoreIncreases?.dexterity || 0;
                        const dexMod = Math.floor(
                          (dexScore + dexIncrease - 10) / 2,
                        );
                        const ac = 10 + dexMod;

                        const getTotal = (ability: string) => {
                          const score = char.abilityScores?.[ability] || 10;
                          const increase =
                            char.abilityScoreIncreases?.[ability] || 0;
                          return score + increase;
                        };

                        return (
                          <tr
                            key={player.id}
                            className="border-b border-border/30 hover:bg-muted/20"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-semibold text-foreground">
                                  {player.character.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {char.race?.nameRu} {char.class?.nameRu}{" "}
                                  {char.level}
                                </p>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2 font-bold text-red-400">
                              {hp}
                            </td>
                            <td className="text-center py-3 px-2 font-bold text-blue-400">
                              {ac}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("strength"))}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("dexterity"))}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("constitution"))}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("intelligence"))}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("wisdom"))}
                            </td>
                            <td className="text-center py-3 px-2">
                              {getModifier(getTotal("charisma"))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Equipment Registry */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Swords className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Реестр снаряжения
                  </h3>
                </div>
                <div className="space-y-4">
                  {/* Weapons */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Оружие:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Персонаж
                            </th>
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Оружие
                            </th>
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Урон
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.flatMap((player) => {
                            if (!player.character?.data?.equipment) return [];
                            return player.character.data.equipment
                              .filter((e: any) => e.category === "weapon")
                              .map((weapon: any, idx: number) => (
                                <tr
                                  key={`${player.id}-${idx}`}
                                  className="border-b border-border/20"
                                >
                                  <td className="py-2 px-3 font-medium text-foreground">
                                    {player.character.name}
                                  </td>
                                  <td className="py-2 px-3">{weapon.nameRu}</td>
                                  <td className="py-2 px-3 text-muted-foreground">
                                    {weapon.damage?.dice}{" "}
                                    {DAMAGE_TYPES_RU[weapon.damage?.type] ||
                                      weapon.damage?.type}
                                  </td>
                                </tr>
                              ));
                          })}
                          {players.every(
                            (p) =>
                              !p.character?.data?.equipment?.some(
                                (e: any) => e.category === "weapon",
                              ),
                          ) && (
                            <tr>
                              <td
                                colSpan={3}
                                className="py-4 text-center text-muted-foreground"
                              >
                                Нет оружия
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Armor */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Доспехи:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Персонаж
                            </th>
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Доспех
                            </th>
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              КД
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.flatMap((player) => {
                            if (!player.character?.data?.equipment) return [];
                            return player.character.data.equipment
                              .filter((e: any) => e.category === "armor")
                              .map((armor: any, idx: number) => (
                                <tr
                                  key={`${player.id}-${idx}`}
                                  className="border-b border-border/20"
                                >
                                  <td className="py-2 px-3 font-medium text-foreground">
                                    {player.character.name}
                                  </td>
                                  <td className="py-2 px-3">{armor.nameRu}</td>
                                  <td className="py-2 px-3 text-muted-foreground">
                                    {armor.armorClass || "—"}
                                  </td>
                                </tr>
                              ));
                          })}
                          {players.every(
                            (p) =>
                              !p.character?.data?.equipment?.some(
                                (e: any) => e.category === "armor",
                              ),
                          ) && (
                            <tr>
                              <td
                                colSpan={3}
                                className="py-4 text-center text-muted-foreground"
                              >
                                Нет доспехов
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Other Equipment */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Снаряжение:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Персонаж
                            </th>
                            <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                              Предмет
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.flatMap((player) => {
                            if (!player.character?.data?.equipment) return [];
                            return player.character.data.equipment
                              .filter((e: any) => e.category === "gear")
                              .map((item: any, idx: number) => (
                                <tr
                                  key={`${player.id}-${idx}`}
                                  className="border-b border-border/20"
                                >
                                  <td className="py-2 px-3 font-medium text-foreground">
                                    {player.character.name}
                                  </td>
                                  <td className="py-2 px-3">{item.nameRu}</td>
                                </tr>
                              ));
                          })}
                          {players.every(
                            (p) =>
                              !p.character?.data?.equipment?.some(
                                (e: any) => e.category === "gear",
                              ),
                          ) && (
                            <tr>
                              <td
                                colSpan={2}
                                className="py-4 text-center text-muted-foreground"
                              >
                                Нет снаряжения
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedPlayer?.character?.data ? (
            <div className="space-y-4">
              {/* Character Header */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {selectedPlayer.character.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedPlayer.character.data.race?.nameRu}{" "}
                      {selectedPlayer.character.data.class?.nameRu}
                      {selectedPlayer.character.data.level &&
                        ` • Уровень ${selectedPlayer.character.data.level}`}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center bg-card p-3 rounded-xl border-2 border-red-500/30">
                    <Heart className="w-5 h-5 mx-auto text-red-500 mb-1" />
                    <div className="text-xl font-bold">
                      {(() => {
                        const conScore =
                          selectedPlayer.character.data.abilityScores
                            ?.constitution || 10;
                        const conIncrease =
                          selectedPlayer.character.data.abilityScoreIncreases
                            ?.constitution || 0;
                        const conMod = Math.floor(
                          (conScore + conIncrease - 10) / 2,
                        );
                        const hitDie =
                          selectedPlayer.character.data.class?.hitDie || 8;
                        return hitDie + conMod;
                      })()}
                    </div>
                    <div className="text-xs text-muted-foreground">HP</div>
                  </div>
                  <div className="text-center bg-card p-3 rounded-xl border-2 border-blue-500/30">
                    <Shield className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                    <div className="text-xl font-bold">
                      {(() => {
                        const dexScore =
                          selectedPlayer.character.data.abilityScores
                            ?.dexterity || 10;
                        const dexIncrease =
                          selectedPlayer.character.data.abilityScoreIncreases
                            ?.dexterity || 0;
                        const dexMod = Math.floor(
                          (dexScore + dexIncrease - 10) / 2,
                        );
                        return 10 + dexMod;
                      })()}
                    </div>
                    <div className="text-xs text-muted-foreground">AC</div>
                  </div>
                  <div className="text-center bg-card p-3 rounded-xl border-2 border-green-500/30">
                    <Footprints className="w-5 h-5 mx-auto text-green-500 mb-1" />
                    <div className="text-xl font-bold">
                      {selectedPlayer.character.data.race?.speed || 30}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Скорость
                    </div>
                  </div>
                  <div className="text-center bg-card p-3 rounded-xl border-2 border-amber-500/30">
                    <Zap className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                    <div className="text-xl font-bold">
                      {(() => {
                        const dexScore =
                          selectedPlayer.character.data.abilityScores
                            ?.dexterity || 10;
                        const dexIncrease =
                          selectedPlayer.character.data.abilityScoreIncreases
                            ?.dexterity || 0;
                        return getModifier(dexScore + dexIncrease);
                      })()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Инициатива
                    </div>
                  </div>
                </div>

                {/* Abilities */}
                <div className="grid grid-cols-6 gap-2">
                  {[
                    { key: "strength", label: "СИЛ" },
                    { key: "dexterity", label: "ЛОВ" },
                    { key: "constitution", label: "ВЫН" },
                    { key: "intelligence", label: "ИНТ" },
                    { key: "wisdom", label: "МУД" },
                    { key: "charisma", label: "ХАР" },
                  ].map(({ key, label }) => {
                    const value =
                      selectedPlayer.character.data.abilityScores?.[key] || 10;
                    const increase =
                      selectedPlayer.character.data.abilityScoreIncreases?.[
                        key
                      ] || 0;
                    const totalValue = value + increase;
                    return (
                      <div
                        key={key}
                        className="text-center p-2 rounded-lg bg-background/50"
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {label}
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          {getModifier(totalValue)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ({totalValue})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Wallet */}
                {(() => {
                  const wallet = getWallet(selectedPlayer.character.data);
                  return (
                    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <h3 className="font-semibold text-foreground text-sm">
                          Кошелек
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-center">
                        <div className="p-2 bg-amber-500/10 rounded">
                          <div className="text-xs text-amber-400 font-bold">
                            {wallet.platinum || 0}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            пп
                          </div>
                        </div>
                        <div className="p-2 bg-yellow-500/10 rounded">
                          <div className="text-xs text-yellow-400 font-bold">
                            {wallet.gold || 0}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            зм
                          </div>
                        </div>
                        <div className="p-2 bg-blue-500/10 rounded">
                          <div className="text-xs text-blue-400 font-bold">
                            {wallet.electrum || 0}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            эм
                          </div>
                        </div>
                        <div className="p-2 bg-slate-500/10 rounded">
                          <div className="text-xs text-slate-400 font-bold">
                            {wallet.silver || 0}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            см
                          </div>
                        </div>
                        <div className="p-2 bg-orange-500/10 rounded">
                          <div className="text-xs text-orange-400 font-bold">
                            {wallet.copper || 0}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            мм
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Skills */}
                {selectedPlayer.character.data.skillProficiencies?.length >
                  0 && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Владение навыками (
                        {
                          selectedPlayer.character.data.skillProficiencies
                            .length
                        }
                        )
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPlayer.character.data.skillProficiencies.map(
                        (skill: string) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {SKILL_NAMES_RU[skill] || skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Proficiencies */}
                {selectedPlayer.character.data.class && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Владения
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedPlayer.character.data.class.savingThrows
                        ?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Спасброски:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPlayer.character.data.class.savingThrows.map(
                              (save: string, idx: number) => {
                                const abilityNames: Record<string, string> = {
                                  strength: "Сила",
                                  dexterity: "Ловкость",
                                  constitution: "Телосложение",
                                  intelligence: "Интеллект",
                                  wisdom: "Мудрость",
                                  charisma: "Харизма",
                                };
                                return (
                                  <Badge
                                    key={idx}
                                    variant="default"
                                    className="text-xs"
                                  >
                                    {abilityNames[save] || save}
                                  </Badge>
                                );
                              },
                            )}
                          </div>
                        </div>
                      )}
                      {selectedPlayer.character.data.class.armorProficiencies
                        ?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Доспехи:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPlayer.character.data.class.armorProficiencies.map(
                              (prof: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {prof}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                      {selectedPlayer.character.data.class.weaponProficiencies
                        ?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Оружие:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPlayer.character.data.class.weaponProficiencies.map(
                              (prof: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {prof}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Equipment - Weapons */}
                {selectedPlayer.character.data.equipment?.filter(
                  (e: any) => e.category === "weapon",
                ).length > 0 && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Swords className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Оружие
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPlayer.character.data.equipment
                        .filter((e: any) => e.category === "weapon")
                        .map((weapon: any, idx: number) => {
                          const profBonus = getProficiencyBonus(
                            selectedPlayer.character.data.level || 1,
                          );
                          const strScore =
                            selectedPlayer.character.data.abilityScores
                              ?.strength || 10;
                          const strIncrease =
                            selectedPlayer.character.data.abilityScoreIncreases
                              ?.strength || 0;
                          const strMod = Math.floor(
                            (strScore + strIncrease - 10) / 2,
                          );
                          const dexScore =
                            selectedPlayer.character.data.abilityScores
                              ?.dexterity || 10;
                          const dexIncrease =
                            selectedPlayer.character.data.abilityScoreIncreases
                              ?.dexterity || 0;
                          const dexMod = Math.floor(
                            (dexScore + dexIncrease - 10) / 2,
                          );

                          const isFinesse = weapon.properties?.some(
                            (p: string) =>
                              p.toLowerCase().includes("фехтовальное"),
                          );
                          const isRanged = weapon.properties?.some(
                            (p: string) =>
                              p.toLowerCase().includes("дистанция"),
                          );

                          const attackMod = isFinesse
                            ? Math.max(strMod, dexMod)
                            : isRanged
                              ? dexMod
                              : strMod;
                          const attackBonus = attackMod + profBonus;

                          return (
                            <div
                              key={idx}
                              className="p-3 bg-background/50 rounded-lg text-sm"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <p className="font-medium text-foreground">
                                  {weapon.nameRu}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {attackBonus >= 0 ? "+" : ""}
                                  {attackBonus} атака
                                </Badge>
                              </div>
                              {weapon.damage && (
                                <p className="text-xs text-muted-foreground">
                                  Урон: {weapon.damage.dice}
                                  {attackMod !== 0 &&
                                    ` ${attackMod >= 0 ? "+" : ""}${attackMod}`}{" "}
                                  {DAMAGE_TYPES_RU[weapon.damage.type] ||
                                    weapon.damage.type}
                                </p>
                              )}
                              {weapon.properties &&
                                weapon.properties.length > 0 && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {weapon.properties.join(", ")}
                                  </p>
                                )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Equipment - Armor */}
                {selectedPlayer.character.data.equipment?.filter(
                  (e: any) => e.category === "armor",
                ).length > 0 && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Доспехи
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPlayer.character.data.equipment
                        .filter((e: any) => e.category === "armor")
                        .map((armor: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 bg-background/50 rounded-lg text-sm"
                          >
                            <p className="font-medium text-foreground">
                              {armor.nameRu}
                            </p>
                            {armor.armorClass && (
                              <p className="text-xs text-muted-foreground">
                                КД: {armor.armorClass}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Spells */}
                {(selectedPlayer.character.data.cantripsKnown?.length > 0 ||
                  selectedPlayer.character.data.spellsKnown?.length > 0) && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Заклинания
                      </h3>
                    </div>
                    {selectedPlayer.character.data.class?.spellcasting && (
                      <div className="mb-3 p-2 bg-purple-500/10 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Характеристика заклинаний:{" "}
                          <span className="text-foreground font-semibold">
                            {(() => {
                              const spellAbility =
                                selectedPlayer.character.data.class.spellcasting
                                  .ability;
                              const score =
                                selectedPlayer.character.data.abilityScores?.[
                                  spellAbility
                                ] || 10;
                              const increase =
                                selectedPlayer.character.data
                                  .abilityScoreIncreases?.[spellAbility] || 0;
                              const mod = Math.floor(
                                (score + increase - 10) / 2,
                              );
                              const profBonus = getProficiencyBonus(
                                selectedPlayer.character.data.level || 1,
                              );
                              const saveDC = 8 + profBonus + mod;
                              const attackBonus = profBonus + mod;
                              return `СЛ ${saveDC} • Атака ${attackBonus >= 0 ? "+" : ""}${attackBonus}`;
                            })()}
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="space-y-3">
                      {selectedPlayer.character.data.cantripsKnown?.length >
                        0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Заговоры (
                            {selectedPlayer.character.data.cantripsKnown.length}
                            ):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPlayer.character.data.cantripsKnown.map(
                              (spell: any) => (
                                <Badge
                                  key={spell.id}
                                  variant="outline"
                                  className="text-xs"
                                  title={spell.description}
                                >
                                  {spell.nameRu}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                      {selectedPlayer.character.data.spellsKnown?.length >
                        0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Заклинания 1 круга (
                            {selectedPlayer.character.data.spellsKnown.length}):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPlayer.character.data.spellsKnown.map(
                              (spell: any) => (
                                <Badge
                                  key={spell.id}
                                  variant="outline"
                                  className="text-xs"
                                  title={spell.description}
                                >
                                  {spell.nameRu}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Race Traits */}
                {selectedPlayer.character.data.race?.traits?.length > 0 && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Особенности вида:{" "}
                        {selectedPlayer.character.data.race.nameRu}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedPlayer.character.data.race.traits.map(
                        (trait: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3 bg-background/50 rounded-lg border border-emerald-500/20"
                          >
                            <p className="font-semibold text-foreground text-sm mb-1">
                              {trait.nameRu}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {trait.description}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Class Features */}
                {selectedPlayer.character.data.class?.features?.length > 0 && (
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-amber-500" />
                      <h3 className="font-semibold text-foreground text-sm">
                        Умения класса:{" "}
                        {selectedPlayer.character.data.class.nameRu}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedPlayer.character.data.class.features
                        .filter(
                          (f: any) =>
                            f.level <=
                            (selectedPlayer.character.data.level || 1),
                        )
                        .map((feature: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3 bg-background/50 rounded-lg border border-amber-500/20"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <p className="font-semibold text-foreground text-sm">
                                {feature.nameRu}
                              </p>
                              <Badge
                                variant="outline"
                                className="text-[10px] ml-2"
                              >
                                {feature.level} ур
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-card/40 rounded-2xl">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Персонаж не найден
              </h3>
              <p className="text-muted-foreground">
                У этого игрока нет персонажа
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
