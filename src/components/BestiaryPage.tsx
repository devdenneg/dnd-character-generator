import { useBackendBestiaryByExternalId, useBackendBestiaryMeta } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BestiaryMeta {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  type: string;
  size: string;
  cr: string;
  source: string;
}

interface MonsterFull {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  size: string;
  type: string;
  alignment: string;
  ac: any;
  hp: any;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  saves: any;
  skills: any;
  vulnerabilities: string;
  resistances: string;
  immunities: string;
  senses: string;
  languages: string;
  cr: string;
  traits: any[];
  actions: any[];
  reactions: any[];
  legendary: any;
  description: any[];
  source: string;
  imageUrl: string;
}

export function BestiaryPage({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: metaData, isLoading: isLoadingMeta } = useBackendBestiaryMeta();

  // Handle drawer selection via URL hash
  const selectedMonsterExternalId = useMemo(
    () => location.hash.replace("#", "") || null,
    [location.hash]
  );

  const { data: selectedApiData, isLoading: isLoadingMonster } = useBackendBestiaryByExternalId(
    selectedMonsterExternalId || ""
  );

  const selectedMonster = selectedApiData?.data?.monster as MonsterFull | undefined;

  const monsters = useMemo(() => (metaData?.data?.monsters as BestiaryMeta[]) || [], [metaData]);

  const filteredMonsters = useMemo(() => {
    let result = monsters;
    if (searchTerm.trim()) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.nameRu.toLowerCase().includes(lowerQuery) ||
          m.name.toLowerCase().includes(lowerQuery) ||
          m.type.toLowerCase().includes(lowerQuery)
      );
    }
    return result;
  }, [monsters, searchTerm]);

  const openMonster = (externalId: string) => {
    navigate(`${location.pathname}#${externalId}`);
  };

  const closeDrawer = () => {
    navigate(location.pathname);
  };

  const formatMod = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const renderStatBlock = (monster: MonsterFull) => {
    return (
      <div className="space-y-4 text-sm text-foreground/90">
        <div className="border-b pb-2">
            <h3 className="text-xl font-bold font-serif text-primary mb-1">{monster.nameRu}</h3>
            <div className="text-sm italic text-muted-foreground">{monster.size} {monster.type}, {monster.alignment}</div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm border-b pb-2 text-primary-foreground/90">
             <div className="flex justify-between"><span className="font-bold">Класс Доспеха:</span> <span>{monster.ac?.value || monster.ac?.[0]?.ac || JSON.stringify(monster.ac)}</span></div>
             <div className="flex justify-between"><span className="font-bold">Хиты:</span> <span>{monster.hp?.value || monster.hp?.average || "?"} ({monster.hp?.formula || "?"})</span></div>
             <div className="flex justify-between"><span className="font-bold">Скорость:</span> <span>{monster.speed}</span></div>
        </div>

        <div className="grid grid-cols-6 gap-2 text-center border-b pb-2">
            {[
                { lbl: "СИЛ", val: monster.str },
                { lbl: "ЛОВ", val: monster.dex },
                { lbl: "ТЕЛ", val: monster.con },
                { lbl: "ИНТ", val: monster.int },
                { lbl: "МУД", val: monster.wis },
                { lbl: "ХАР", val: monster.cha }
            ].map(stat => (
                <div key={stat.lbl} className="flex flex-col">
                    <span className="font-bold text-xs text-muted-foreground">{stat.lbl}</span>
                    <span className="font-medium text-foreground">{stat.val} ({formatMod(stat.val)})</span>
                </div>
            ))}
        </div>

        <div className="space-y-1 border-b pb-2">
            {monster.saves && <div className="flex gap-2"><span className="font-bold">Спасброски:</span> <span>{Object.entries(monster.saves).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(", ")}</span></div>}
            {monster.skills && <div className="flex gap-2"><span className="font-bold">Навыки:</span> <span>{JSON.stringify(monster.skills)}</span></div>}
            {monster.vulnerabilities && <div className="flex gap-2"><span className="font-bold">Уязвимость к урону:</span> <span>{monster.vulnerabilities}</span></div>}
            {monster.resistances && <div className="flex gap-2"><span className="font-bold">Устойчивость к урону:</span> <span>{monster.resistances}</span></div>}
            {monster.immunities && <div className="flex gap-2"><span className="font-bold">Иммунитет:</span> <span>{monster.immunities}</span></div>}
            {monster.senses && <div className="flex gap-2"><span className="font-bold">Чувства:</span> <span>{monster.senses}</span></div>}
            {monster.languages && <div className="flex gap-2"><span className="font-bold">Языки:</span> <span>{monster.languages}</span></div>}
            <div className="flex gap-2"><span className="font-bold">Опасность:</span> <span>{monster.cr}</span></div>
        </div>

        {/* Traits */}
        {monster.traits && monster.traits.length > 0 && (
            <div className="space-y-4">
                {monster.traits.map((t: any, i: number) => (
                    <div key={i} className="text-sm">
                        <span className="font-bold font-serif italic text-base block mb-1">{t.name?.rus || t.name || "Trait"}.</span>
                        <div className="text-foreground/90">
                           {parseEquipmentDescription(t.description)}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Actions */}
         {monster.actions && monster.actions.length > 0 && (
            <div className="space-y-4 mt-6 pt-4 border-t text-primary-foreground/90">
                <h4 className="text-xl font-bold border-b border-primary/20 pb-2 mb-4 text-primary">Действия</h4>
                {monster.actions.map((t: any, i: number) => (
                    <div key={i} className="text-sm">
                        <span className="font-bold font-serif italic text-base block mb-1">{t.name?.rus || t.name || "Action"}.</span>
                        <div className="text-foreground/90">
                           {parseEquipmentDescription(t.description)}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Legendary Actions */}
        {monster.legendary && (
             <div className="space-y-4 mt-6 pt-4 border-t">
                <h4 className="text-xl font-bold border-b border-primary/20 pb-2 mb-4 text-primary">Легендарные действия</h4>
                <p className="text-sm italic mb-4">{monster.legendary.count || 3} легендарных действия.</p>
                {monster.legendary.actions?.map((t: any, i: number) => (
                    <div key={i} className="text-sm">
                         <span className="font-bold font-serif italic text-base block mb-1">{t.name?.rus || t.name || "Legendary Action"}.</span>
                         <div className="text-foreground/90">
                            {parseEquipmentDescription(t.description)}
                         </div>
                    </div>
                ))}
             </div>
        )}

        {/* Description */}
        {monster.description && (
             <div className="mt-6 pt-4 border-t border-border/50">
                 <h4 className="text-xl font-bold border-b border-primary/20 pb-2 mb-4 text-primary">Описание</h4>
                 <div className="text-sm text-foreground/90">
                     {parseEquipmentDescription(monster.description)}
                 </div>
             </div>
        )}
      </div>
    );
  };

  return (
    <>
    <div className="container max-w-7xl mx-auto p-4 pt-8 pb-8 animate-fade-in">
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Назад
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Бестиарий</h1>
            <p className="text-muted-foreground">
              {filteredMonsters.length} {filteredMonsters.length === 1 ? "существо" : filteredMonsters.length > 1 && filteredMonsters.length < 5 ? "существа" : "существ"}
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или типу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 backdrop-blur"
          />
        </div>
      </div>

      {isLoadingMeta && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-muted/50 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoadingMeta && filteredMonsters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMonsters.map((monster) => (
            <div
              key={monster.id}
              onClick={() => openMonster(monster.externalId)}
              className="p-4 rounded-lg border cursor-pointer transition-all bg-card border-border hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {monster.nameRu}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {monster.name}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap flex-shrink-0">
                  CR {monster.cr}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground/80 capitalize">
                  {monster.size}
                </span>
                <span className="text-xs text-muted-foreground/80">•</span>
                <span className="text-xs text-muted-foreground/80 capitalize">
                  {monster.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoadingMeta && filteredMonsters.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
          <p className="text-lg font-medium text-muted-foreground">
            Существа не найдены
          </p>
        </div>
      )}
    </div>

    {selectedMonsterExternalId && (
      <SlideOverDrawer
        isOpen={!!selectedMonsterExternalId}
        onClose={closeDrawer}
        title={selectedMonster ? selectedMonster.nameRu : "Загрузка..."}
      >
        {isLoadingMonster ? (
           <div className="space-y-4 p-4">
              <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              <div className="h-32 bg-muted animate-pulse rounded" />
           </div>
        ) : selectedMonster ? (
          <div className="p-1">
            {renderStatBlock(selectedMonster)}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Существо не найдено
          </div>
        )}
      </SlideOverDrawer>
    )}
    </>
  );
}
