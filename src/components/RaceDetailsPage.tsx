import { useBackendRaceByExternalId } from "@/api/hooks";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RaceTrait } from "@/types/api";
import { ChevronLeft, Loader2, Users as UsersIcon, Zap } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContentRenderer } from "./content/ContentRenderer";

export function RaceDetailsPage() {
  const { raceId } = useParams();
  const navigate = useNavigate();


  const { data: backendResponse, isLoading, error } = useBackendRaceByExternalId(raceId || "");

  const selectedRace = backendResponse?.data?.race || null;

  useScrollRestoration(isLoading);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto p-20 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground animate-pulse">Загрузка данных расы...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !selectedRace) {
    return (
      <PageLayout>
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Раса не найдена или произошла ошибка</h1>
          <p className="text-muted-foreground mb-8">
            {error ? (error as any).message : "Мы не смогли найти запрашиваемую расу в нашей базе данных."}
          </p>
          <Button onClick={() => navigate("/races")}>Вернуться к списку</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen animate-fade-in pb-20 bg-background font-sans selection:bg-primary/20">
        {/* --- Hero Section --- */}
        <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden select-none bg-black group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={selectedRace.image || "/images/placeholders/race.webp"}
                    alt={selectedRace.nameRu}
                    className="w-full h-full object-cover object-top opacity-70 transition-transform duration-700 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-end pb-16">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10 -ml-4"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Назад
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                   <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                       {typeof selectedRace.source === 'string' ? selectedRace.source : selectedRace.source?.name?.rus || "PHB 2024"}
                   </div>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-2xl font-display animate-slide-up" style={{ animationDelay: '200ms' }}>
                    {selectedRace.nameRu}
                </h1>

                <div className="max-w-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>
                   <p className="text-lg md:text-xl text-white/90 font-light italic leading-relaxed border-l-4 border-primary pl-6">
                   {typeof selectedRace.description?.[0] === 'string' && selectedRace.description[0].startsWith('{@i')
                        ? selectedRace.description[0].replace(/{@i |}/g, '')
                        : "Представитель одной из удивительных рас мира Dungeons & Dragons."}
                   </p>
                </div>
            </div>
        </div>

        {/* --- Main Content Layout --- */}
        <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* Left Column: Content (8 cols) */}
                <div className="lg:col-span-8 space-y-12 min-w-0">
                    <section className="animate-fade-in">
                        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:underline prose-blockquote:border-l-primary prose-img:rounded-xl">
                            <ContentRenderer content={selectedRace.description as any} />
                        </div>
                    </section>

                    <section className="animate-slide-up space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold font-display">Черты расы</h2>
                            <div className="h-px flex-1 bg-border/60" />
                        </div>

                        <div className="space-y-12">
                            {selectedRace.traits.map((trait: RaceTrait) => (
                                 <div key={trait.id} className="scroll-mt-32 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-muted/40 border border-border/60 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors shrink-0">
                                            <Zap className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors font-display">{trait.nameRu}</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{trait.name}</p>
                                        </div>
                                    </div>

                                    <div className="prose prose-zinc dark:prose-invert prose-base max-w-none pl-4 md:pl-14 border-l-2 border-border/40 group-hover:border-primary/30 transition-colors">
                                        <ContentRenderer content={trait.description as any} />
                                    </div>
                                 </div>
                            ))}
                        </div>
                    </section>
                </div>


                {/* Right Column: Sticky Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6 hidden lg:block">
                    <div className="sticky top-28 space-y-6 animate-slide-left" style={{ animationDelay: '500ms' }}>
                         <Card className="p-6 border-border/60 shadow-xl bg-card/80 backdrop-blur-md">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 pb-4 border-b border-border/50">
                                <UsersIcon className="w-5 h-5 text-primary" />
                                Характеристики
                            </h3>
                            <div className="space-y-6">
                                {selectedRace.properties && Object.entries(selectedRace.properties).map(([key, value]) => {
                                    // Map English keys to Russian labels
                                    const labels: Record<string, string> = {
                                        size: "Размер",
                                        type: "Тип",
                                        speed: "Скорость"
                                    };

                                    return (
                                        <div key={key} className="space-y-1.5">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                {labels[key] || key}
                                            </div>
                                            <div className="font-medium text-foreground bg-muted/20 p-2.5 rounded-lg border border-border/40 text-sm leading-relaxed">
                                                {String(value)}
                                            </div>
                                        </div>
                                    );
                                })}

                                {(!selectedRace.properties || Object.keys(selectedRace.properties).length === 0) && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Размер</div>
                                            <div className="font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/40 text-center text-sm">
                                                {selectedRace.size === "Medium" ? "Средний" : selectedRace.size === "Small" ? "Малый" : "Большой"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Скорость</div>
                                            <div className="font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/40 text-center text-sm">
                                                {selectedRace.speed}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedRace.hasLineages && (
                                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium text-center">
                                        Имеет вариации наследия
                                    </div>
                                )}
                            </div>
                         </Card>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </PageLayout>
  );
}

function useScrollRestoration(loading: boolean) {
  const location = useLocation();

  useEffect(() => {
    if (!loading && (location.state as any)?.scrollY) {
      window.scrollTo({
        top: (location.state as any).scrollY,
        behavior: "instant"
      });
    }
  }, [loading, location.state]);
}
