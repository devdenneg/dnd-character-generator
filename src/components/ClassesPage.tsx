import { useBackendClasses } from "@/api/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mapBackendClassToFrontend } from "@/utils/classMapper";
import {
    AlertCircle,
    Crown,
    Flame,
    Loader2,
    Mountain,
    Scroll,
    Search,
    Shield,
    Zap
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLASS_ICONS: Record<string, React.ElementType> = {
  barbarian: Flame,
  bard: Crown,
  cleric: Shield,
  druid: Mountain,
  fighter: Shield,
  monk: Zap,
  paladin: Crown,
  ranger: Mountain,
  rogue: Zap,
  sorcerer: Flame,
  warlock: Flame,
  wizard: Scroll,
};

export function ClassesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useBackendClasses();

  const mappedClasses = useMemo(() => {
    if (!data?.success || !data.data.classes) return [];
    return data.data.classes.map(mapBackendClassToFrontend);
  }, [data]);

  const filteredClasses = useMemo(() => {
    return mappedClasses.filter((c: any) =>
      c.name.rus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.eng.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mappedClasses, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-lg">Загрузка классов с сервера...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 flex flex-col items-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-destructive mb-2">Ошибка загрузки</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Не удалось загрузить список классов. Пожалуйста, проверьте соединение с сервером или попробуйте позже.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Повторить попытку
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-[1400px] animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic tracking-tight font-display">
            Классы
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Герои D&D бывают разными: от яростных варваров до могущественных волшебников.
            Выберите свой путь и создайте легенду.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Поиск класса..."
              className="pl-11 h-12 bg-card/50 backdrop-blur-sm focus-visible:ring-primary/30 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="h-12 px-8 font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            На главную
          </Button>
        </div>
      </div>

      {!filteredClasses.length && searchQuery && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground text-xl italic">
            Класс "{searchQuery}" не найден
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredClasses.map((cls: any) => (
          <div
            key={cls.url}
            className="group relative h-[500px] w-full overflow-hidden rounded-[2rem] bg-card text-card-foreground shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-0"
            onClick={() => navigate(`/classes/${cls.url}`)}
          >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                  <img
                      src={cls.image}
                      alt={cls.name.rus}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-100"
                      loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          {cls.source?.name?.rus && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                                  {cls.source.name.rus}
                              </span>
                          )}
                          {cls.isReprinted && (
                               <span className="text-[10px] font-bold uppercase tracking-widest text-orange-300 bg-orange-500/20 px-2 py-1 rounded backdrop-blur-sm border border-orange-500/30">
                                   Переиздание
                               </span>
                          )}
                      </div>

                      <h3 className="font-display font-black text-4xl text-white mb-2 leading-tight drop-shadow-xl">
                          {cls.name.rus}
                      </h3>
                      <p className="text-sm font-bold text-white/50 tracking-[0.2em] uppercase font-mono mb-6">
                           {cls.name.eng}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-white/90 text-sm">
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/5 group-hover:border-white/20 transition-colors">
                              <span className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1">Кость хитов</span>
                              <span className="font-mono font-bold text-lg text-primary-foreground">
                                  {cls.hitDice?.label || "—"}
                              </span>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/5 group-hover:border-white/20 transition-colors">
                              <span className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1">Магия</span>
                              {cls.casterType && cls.casterType !== "NONE" ? (
                                   <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/5 hover:bg-white/10">
                                       {cls.casterType}
                                   </Badge>
                              ) : (
                                  <span className="text-white/40 text-xs font-medium italic">Нет</span>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
