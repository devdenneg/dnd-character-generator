import { useState } from "react";
import { Search, Check, X, Heart, Sparkles, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { getAllClasses } from "@/data/phb2024";
import type { CharacterClass, Subclass } from "@/types/character";
import { t, getAbilityNameRu } from "@/data/translations/ru";

// Визуальные данные классов - обновлённые цвета
const CLASS_DATA: Record<string, { gradient: string; icon: string }> = {
  barbarian: { gradient: "from-red-500/90 to-orange-600/90", icon: "🪓" },
  bard: { gradient: "from-fuchsia-500/90 to-pink-600/90", icon: "🎵" },
  cleric: { gradient: "from-amber-500/90 to-yellow-600/90", icon: "✝️" },
  druid: { gradient: "from-emerald-500/90 to-green-600/90", icon: "🌿" },
  fighter: { gradient: "from-slate-500/90 to-zinc-600/90", icon: "🛡️" },
  monk: { gradient: "from-amber-500/90 to-orange-600/90", icon: "👊" },
  paladin: { gradient: "from-sky-500/90 to-blue-600/90", icon: "⚜️" },
  ranger: { gradient: "from-teal-500/90 to-emerald-600/90", icon: "🏹" },
  rogue: { gradient: "from-zinc-600/90 to-slate-700/90", icon: "🗡️" },
  sorcerer: { gradient: "from-rose-500/90 to-red-600/90", icon: "🔥" },
  warlock: { gradient: "from-violet-600/90 to-purple-700/90", icon: "👁️" },
  wizard: { gradient: "from-indigo-500/90 to-blue-600/90", icon: "📚" },
};

const DEFAULT_DATA = { gradient: "from-slate-500/90 to-zinc-600/90", icon: "⚔️" };

export function ClassStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalClass, setModalClass] = useState<CharacterClass | null>(null);
  const { character, setClass, setSubclass } = useCharacterStore();
  const classes = getAllClasses();

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.nameRu.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectClass = (cls: CharacterClass) => {
    setClass(cls);
    setModalClass(null);
  };

  const handleSelectSubclass = (subclass: Subclass) => {
    setSubclass(subclass);
  };

  const getData = (id: string) => CLASS_DATA[id] || DEFAULT_DATA;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("app.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Class grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredClasses.map((cls) => {
          const isSelected = character.class?.id === cls.id;
          const data = getData(cls.id);

          return (
            <div
              key={cls.id}
              onClick={() => handleSelectClass(cls)}
              className={`
                relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200
                ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                    : "hover:scale-[1.02] hover:shadow-lg"
                }
              `}
            >
              <div
                className={`bg-gradient-to-br ${data.gradient} p-3 aspect-[4/5]`}
              >
                {/* Icon */}
                <div className="text-4xl mb-2 drop-shadow-lg">{data.icon}</div>

                {/* Name */}
                <h3 className="text-white font-bold text-sm leading-tight drop-shadow">
                  {cls.nameRu}
                </h3>
                <p className="text-white/60 text-[10px] mb-2">{cls.name}</p>

                {/* Stats */}
                <div className="flex gap-1 flex-wrap">
                  <Badge className="bg-black/30 text-white border-0 text-[10px] px-1.5 py-0">
                    <Heart className="w-2.5 h-2.5 mr-0.5" />d{cls.hitDie}
                  </Badge>
                  {cls.spellcasting && (
                    <Badge className="bg-purple-500/50 text-white border-0 text-[10px] px-1.5 py-0">
                      <Sparkles className="w-2.5 h-2.5" />
                    </Badge>
                  )}
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}

                {/* Info button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalClass(cls);
                  }}
                  className="absolute bottom-2 right-2 bg-white/20 hover:bg-white/30 rounded-full px-2 py-0.5 text-white text-[10px] transition-colors"
                >
                  Инфо
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalClass && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div
            className="bg-card rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className={`bg-gradient-to-br ${getData(modalClass.id).gradient} p-5 rounded-t-2xl flex-shrink-0`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">
                    {getData(modalClass.id).icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {modalClass.nameRu}
                    </h2>
                    <p className="text-white/70">{modalClass.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalClass(null)}
                  className="bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick stats */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <Badge className="bg-black/30 text-white border-0">
                  <Heart className="w-3 h-3 mr-1" />d{modalClass.hitDie}
                </Badge>
                <Badge className="bg-black/30 text-white border-0">
                  {modalClass.primaryAbility
                    .map((a) => getAbilityNameRu(a))
                    .join("/")}
                </Badge>
                {modalClass.spellcasting && (
                  <Badge className="bg-purple-500/50 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Заклинатель
                  </Badge>
                )}
              </div>
            </div>

            {/* Modal content - scrollable */}
            <div className="p-5 overflow-y-auto flex-1">
              <p className="text-muted-foreground mb-4 text-sm">
                {modalClass.description}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Хиты</p>
                  <p className="text-lg font-bold">d{modalClass.hitDie}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Основная</p>
                  <p className="text-sm font-bold">
                    {modalClass.primaryAbility
                      .map((a) => getAbilityNameRu(a))
                      .join("/")}
                  </p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Спасброски</p>
                  <p className="text-sm font-bold">
                    {modalClass.savingThrows
                      .map((s) => getAbilityNameRu(s))
                      .join(", ")}
                  </p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Навыки</p>
                  <p className="text-lg font-bold">{modalClass.skillCount}</p>
                </div>
              </div>

              {/* Proficiencies */}
              <div className="mb-4">
                <h4 className="font-bold mb-2 text-sm">
                  {t("character.proficiencies")}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {modalClass.armorProficiencies.map((p) => (
                    <Badge key={p} variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      {p}
                    </Badge>
                  ))}
                  {modalClass.weaponProficiencies.map((p) => (
                    <Badge key={p} variant="outline" className="text-xs">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-bold mb-2 text-sm">
                  {t("character.features")} (1 уровень)
                </h4>
                <div className="space-y-2">
                  {modalClass.features
                    .filter((f) => f.level === 1)
                    .map((feature) => (
                      <div
                        key={feature.name}
                        className="bg-muted/20 p-3 rounded-lg"
                      >
                        <p className="font-medium text-primary text-sm">
                          {feature.nameRu}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Subclasses */}
              {modalClass.subclassLevel === 1 && (
                <div>
                  <h4 className="font-bold mb-2 text-sm">
                    {t("character.subclass")}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {modalClass.subclasses.map((sub) => (
                      <div
                        key={sub.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          character.subclass?.id === sub.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleSelectSubclass(sub)}
                      >
                        <p className="font-medium text-sm flex items-center gap-2">
                          {sub.nameRu}
                          {character.subclass?.id === sub.id && (
                            <Check className="w-3 h-3 text-primary" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalClass.subclassLevel > 1 && (
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  Подкласс выбирается на {modalClass.subclassLevel} уровне
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div className="p-4 border-t border-border flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalClass(null)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1"
                onClick={() => handleSelectClass(modalClass)}
              >
                <Check className="w-4 h-4 mr-2" />
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Selected indicator bar */}
      {character.class && (
        <div className="bg-card border border-primary/30 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-primary/5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getData(character.class.id).icon}</span>
            <div>
              <p className="font-semibold text-foreground">{character.class.nameRu}</p>
              <p className="text-sm text-muted-foreground">
                d{character.class.hitDie} •{" "}
                {character.subclass
                  ? character.subclass.nameRu
                  : character.class.name}
              </p>
            </div>
          </div>
          <Badge className="bg-primary/15 text-primary border-primary/30">Выбрано</Badge>
        </div>
      )}
    </div>
  );
}
