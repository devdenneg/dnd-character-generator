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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
        {filteredClasses.map((cls: any) => (
          <div
            key={cls.url}
            className="group relative h-[280px] w-full overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-border/50"
            onClick={() => navigate(`/classes/${cls.url}`)}
          >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                      src={cls.image}
                      alt={cls.name.rus}
                      className="h-full w-full object-cover object-top transition-transform duration-700 md:group-hover:scale-105 filter brightness-[0.6] md:brightness-[0.7] md:group-hover:brightness-90"
                      loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-1">
                          {cls.source?.name?.rus && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                                  {cls.source.name.rus}
                              </span>
                          )}
                          {cls.isReprinted && (
                               <span className="text-[10px] font-bold uppercase tracking-widest text-orange-200 bg-orange-500/20 px-2 py-0.5 rounded-md backdrop-blur-sm border border-orange-500/30">
                                   Переиздание
                               </span>
                          )}
                      </div>

                      <h3 className="font-display font-black text-2xl md:text-3xl text-white leading-tight drop-shadow-md transition-colors group-hover:text-primary">
                          {cls.name.rus}
                      </h3>
                      <p className="text-xs font-bold text-white/50 tracking-[0.15em] uppercase font-mono mb-2">
                           {cls.name.eng}
                      </p>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 text-white/80 text-xs border-t border-white/10 pt-3 mt-1">
                          <div className="flex items-center gap-1.5">
                              <span className="text-white/40 font-bold uppercase">Хиты</span>
                              <span className="font-mono font-bold text-white">
                                  {cls.hitDice?.label || "—"}
                              </span>
                          </div>
                          {cls.casterType && cls.casterType !== "NONE" && (
                              <div className="flex items-center gap-1.5">
                                   <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary),0.8)]" />
                                   <span className="font-bold text-white tracking-wide">{cls.casterType}</span>
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
