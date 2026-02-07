import { useBackendClasses } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mapBackendClassToFrontend } from "@/utils/classMapper";
import {
    AlertCircle,
    Loader2,
    Search
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";



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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 pb-20">
        {filteredClasses.map((cls: any) => (
          <div
            key={cls.url}
            className="group relative flex sm:block gap-3 sm:gap-0 p-2 sm:p-0 min-h-24 h-auto sm:h-[280px] w-full overflow-hidden rounded-xl bg-card sm:bg-card text-card-foreground shadow-sm transition-all duration-300 sm:duration-500 ease-out hover:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 cursor-pointer border border-border/50 hover:border-primary/50"
            onClick={() => navigate(`/classes/${cls.url}`)}
          >
              {/* Image Background (Desktop) / Thumbnail (Mobile) */}
              <div className="relative w-32 sm:w-full h-full sm:h-full rounded-lg sm:rounded-none overflow-hidden flex-shrink-0">
                  <img
                      src={cls.image}
                      alt={cls.name.rus}
                      className="h-full w-full object-cover object-top transition-transform duration-700 md:group-hover:scale-105 filter sm:brightness-[0.6] md:brightness-[0.7] md:group-hover:brightness-90"
                      loading="lazy"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay (Desktop) / Side Content (Mobile) */}
              <div className="relative sm:absolute inset-0 z-10 flex flex-col justify-center sm:justify-end p-0 sm:p-5 flex-1 min-w-0">
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                          {cls.source?.name?.rus && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:text-white/80 bg-muted sm:bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-border/50 sm:border-white/10 whitespace-nowrap">
                                  {cls.source.name.rus}
                              </span>
                          )}
                          {cls.isReprinted && (
                               <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 sm:text-orange-200 bg-orange-500/10 sm:bg-orange-500/20 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-orange-500/20 sm:border-orange-500/30 whitespace-nowrap">
                                   Переиздание
                               </span>
                          )}
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-foreground sm:text-white leading-tight sm:drop-shadow-md transition-colors group-hover:text-primary truncate">
                          {cls.name.rus}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-muted-foreground sm:text-white/50 tracking-[0.1em] sm:tracking-[0.15em] uppercase font-mono mb-1 sm:mb-2 truncate">
                           {cls.name.eng}
                      </p>

                      {/* Stats Row */}
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-xs text-muted-foreground sm:text-white/80 border-t border-border/50 sm:border-white/10 pt-2 sm:pt-3 mt-1">
                          <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground/70 sm:text-white/40 font-bold uppercase text-[10px] sm:text-xs">Хиты</span>
                              <span className="font-mono font-bold text-foreground sm:text-white">
                                  {cls.hitDice?.label || "—"}
                              </span>
                          </div>
                          {cls.casterType && cls.casterType !== "NONE" && cls.spellcastingAbility && (
                              <div className="flex items-center gap-1.5">
                                   <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                                   <span className="font-bold text-purple-600 sm:text-purple-200 tracking-wide capitalize text-[10px] sm:text-xs">Магия: {cls.spellcastingAbility}</span>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
