import { useBackendRacesMeta } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RaceMeta } from "@/types/api";
import {
    AlertCircle,
    Loader2,
    Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RacesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useBackendRacesMeta();

  const races = useMemo(() => {
    if (!data?.success || !data.data.races) return [];
    return data.data.races as RaceMeta[];
  }, [data]);

  const filteredRaces = useMemo(() => {
    return races.filter((race: RaceMeta) =>
      race.nameRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [races, searchQuery]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-lg">Загрузка рас с сервера...</p>
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
              Не удалось загрузить список рас. Пожалуйста, проверьте соединение с сервером или попробуйте позже.
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
            Расы
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            От благородных эльфов до выносливых дварфов — мир D&D населён множеством уникальных народов.
            Выберите своё происхождение.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Поиск расы..."
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

      {!filteredRaces.length && searchQuery && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground text-xl italic">
            Раса "{searchQuery}" не найдена
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 pb-20">
        {filteredRaces.map((race: RaceMeta) => (
          <div
            key={race.id}
            className="group relative flex sm:block gap-3 sm:gap-0 p-2 sm:p-0 min-h-24 h-auto sm:h-[280px] w-full overflow-hidden rounded-xl bg-card sm:bg-card text-card-foreground shadow-sm transition-all duration-300 sm:duration-500 ease-out hover:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 cursor-pointer border border-border/50 hover:border-primary/50"
            onClick={() => navigate(`/races/${race.externalId}`)}
          >
              {/* Image Background (Desktop) / Thumbnail (Mobile) */}
              <div className="relative w-32 sm:w-full h-full sm:h-full rounded-lg sm:rounded-none overflow-hidden flex-shrink-0">
                  <img
                      src={race.image || "/images/placeholders/race.webp"}
                      alt={race.nameRu}
                      className="h-full w-full object-cover object-top transition-transform duration-700 md:group-hover:scale-105 filter sm:brightness-[0.6] md:brightness-[0.7] md:group-hover:brightness-90"
                      loading="lazy"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay (Desktop) / Side Content (Mobile) */}
              <div className="relative sm:absolute inset-0 z-10 flex flex-col justify-center sm:justify-end p-0 sm:p-5 flex-1 min-w-0">
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                          {race.source && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:text-white/80 bg-muted sm:bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-border/50 sm:border-white/10 whitespace-nowrap">
                                  {typeof race.source === 'string' ? race.source : race.source?.name?.rus || "PHB 2024"}
                              </span>
                          )}
                          {race.hasLineages && (
                               <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 sm:text-blue-200 bg-blue-500/10 sm:bg-blue-500/20 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-blue-500/20 sm:border-blue-500/30 whitespace-nowrap">
                                   Наследия
                               </span>
                          )}
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-foreground sm:text-white leading-tight sm:drop-shadow-md transition-colors group-hover:text-primary truncate">
                          {race.nameRu}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-muted-foreground sm:text-white/50 tracking-[0.1em] sm:tracking-[0.15em] uppercase font-mono mb-1 sm:mb-2 truncate">
                           {race.name}
                      </p>

                      {/* Stats Row */}
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-xs text-muted-foreground sm:text-white/80 border-t border-border/50 sm:border-white/10 pt-2 sm:pt-3 mt-1">
                          <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground/70 sm:text-white/40 font-bold uppercase text-[10px] sm:text-xs">Размер</span>
                              <span className="font-mono font-bold text-foreground sm:text-white">
                                  {race.size === "Medium" ? "Сред." : race.size === "Small" ? "Мал." : "Бол."}
                              </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground/70 sm:text-white/40 font-bold uppercase text-[10px] sm:text-xs">Ск.</span>
                              <span className="font-mono font-bold text-foreground sm:text-white">
                                  {race.speed}
                              </span>
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
