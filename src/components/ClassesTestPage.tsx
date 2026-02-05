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

export function ClassesTestPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useBackendClasses();

  const mappedClasses = useMemo(() => {
    if (!data?.success || !data.data.classes) return [];
    return data.data.classes.map(mapBackendClassToFrontend);
  }, [data]);

  const filteredClasses = useMemo(() => {
    return mappedClasses.filter((c) =>
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
    <div className="container mx-auto p-6 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic tracking-tight">
            Классы (Backend)
          </h1>
          <p className="text-muted-foreground">
            Просмотр данных PHB 2024 из базы данных
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск класса..."
              className="pl-9 h-10 bg-card/50 backdrop-blur-sm focus-visible:ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="h-10 px-6 font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            На главную
          </Button>
        </div>
      </div>

      {!filteredClasses.length && searchQuery && (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground text-lg italic">
            Класс "{searchQuery}" не найден
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClasses.map((cls) => {
          const iconKey = cls.url.split("-")[0];
          const Icon = CLASS_ICONS[iconKey] || Shield;

          return (
            <div
              key={cls.url}
              className="group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 cursor-pointer duration-300"
              onClick={() => navigate(`/classes-test/${cls.url}`)}
            >
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-[10deg] shadow-inner">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl leading-none mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                      {cls.name.rus}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground/80 font-mono tracking-wider italic">
                      {cls.name.eng.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-primary/5 pt-5">
                  <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg">
                    <span className="text-muted-foreground font-medium">Кость хитов:</span>
                    <span className="font-bold text-foreground bg-background px-2 py-0.5 rounded shadow-sm border border-primary/10">
                      {cls.hitDice?.label || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg">
                    <span className="text-muted-foreground font-medium text-xs">Характеристика:</span>
                    <span className="font-bold text-foreground text-xs uppercase tracking-tighter">
                      {cls.primaryCharacteristics}
                    </span>
                  </div>
                  {cls.casterType && cls.casterType !== "NONE" && (
                    <div className="flex justify-between items-center bg-primary/5 p-2 rounded-lg border border-primary/10">
                      <span className="text-primary/70 font-semibold text-xs">Тип магии:</span>
                      <Badge variant="default" className="text-[10px] uppercase font-black bg-primary/80 hover:bg-primary">
                        {cls.casterType}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />

              {/* Bottom active line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-700" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
