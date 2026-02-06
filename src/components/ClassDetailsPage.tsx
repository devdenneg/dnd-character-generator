import { useBackendClassByExternalId } from "@/api/hooks";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mapBackendClassToFrontend } from "@/utils/classMapper";
import { translateAbility } from "@/utils/classTranslations";
import { ArrowRight, BookOpen, ChevronLeft, Loader2, Shield, Swords } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ContentRenderer } from "./content/ContentRenderer";

export function ClassDetailsPage() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const viewTab = searchParams.get("tab") || "description";
  const setViewTab = (tab: string) => {
    setSearchParams(prev => {
      prev.set("tab", tab);
      return prev;
    }, { replace: true });
  };

  const { data: backendResponse, isLoading, error } = useBackendClassByExternalId(classId || "");

  const selectedClass = useMemo(() => {
    if (backendResponse?.data?.class) {
      return mapBackendClassToFrontend(backendResponse.data.class);
    }
    return null;
  }, [backendResponse]);

  useScrollRestoration(isLoading);



  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto p-20 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground animate-pulse">Загрузка данных класса...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !selectedClass) {
    return (
      <PageLayout>
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Класс не найден или произошла ошибка</h1>
          <p className="text-muted-foreground mb-8">
            {error ? (error as any).message : "Мы не смогли найти запрашиваемый класс в нашей базе данных."}
          </p>
          <Button onClick={() => navigate("/classes")}>Вернуться к списку</Button>
        </div>
      </PageLayout>
    );
  }

  // Helper for spell slots
  const getSpellSlots = (level: number, casterType?: string, _warlockSlots?: boolean) => {
      // console.log('getSpellSlots', level, casterType); // DEBUG
      if (!casterType || casterType === 'NONE') return [];

      // Standard full caster slots
      const fullCasterSlots = [
          [2], // 1
          [3], // 2
          [4, 2], // 3
          [4, 3], // 4
          [4, 3, 2], // 5
          [4, 3, 3], // 6
          [4, 3, 3, 1], // 7
          [4, 3, 3, 2], // 8
          [4, 3, 3, 3, 1], // 9
          [4, 3, 3, 3, 2], // 10
          [4, 3, 3, 3, 2, 1], // 11
          [4, 3, 3, 3, 2, 1], // 12
          [4, 3, 3, 3, 2, 1, 1], // 13
          [4, 3, 3, 3, 2, 1, 1], // 14
          [4, 3, 3, 3, 2, 1, 1, 1], // 15
          [4, 3, 3, 3, 2, 1, 1, 1], // 16
          [4, 3, 3, 3, 2, 1, 1, 1, 1], // 17
          [4, 3, 3, 3, 3, 1, 1, 1, 1], // 18
          [4, 3, 3, 3, 3, 2, 1, 1, 1], // 19
          [4, 3, 3, 3, 3, 2, 2, 1, 1], // 20
      ];

      if (casterType === 'FULL') {
          const slots = fullCasterSlots[level - 1] || [];
          // Pad with 0/null to length 9 for full table consistency
          return Array.from({length: 9}, (_, i) => slots[i] || "—");
      }
      return Array.from({length: 9}, () => "—");
  };

  const getWarlockSlots = (level: number) => {
    // Warlock Table: Level -> [Slots, Slot Level]
    // 1: 1, 1st
    // 2: 2, 1st
    // 3: 2, 2nd
    // 4: 2, 2nd
    // 5: 2, 3rd
    // 6: 2, 3rd
    // 7: 2, 4th
    // 8: 2, 4th
    // 9: 2, 5th
    // ...
    // 11: 3, 5th
    // 17: 4, 5th

    let count = 2;
    if (level === 1) count = 1;
    if (level >= 11) count = 3;
    if (level >= 17) count = 4;

    let slotLevel = 1;
    if (level >= 3) slotLevel = 2;
    if (level >= 5) slotLevel = 3;
    if (level >= 7) slotLevel = 4;
    if (level >= 9) slotLevel = 5;

    return { count, slotLevel };
  };

  const showSpellSlots = Boolean(selectedClass.casterType && selectedClass.casterType !== 'NONE');
  const isWarlock = selectedClass.casterType === 'PACT';


  return (
    <PageLayout showHeader={false} showFooter={false}>
      <div className="flex flex-col min-h-screen animate-fade-in pb-20 bg-background font-sans selection:bg-primary/20">
        {/* --- Hero Section --- */}
        <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden select-none bg-black group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={selectedClass.image}
                    alt={selectedClass.name.rus}
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
                        // Navigate back to classes list
          onClick={() => navigate("/classes")}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        К списку классов
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                   <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                       {selectedClass.source.name.rus}
                   </div>
                   {selectedClass.isReprinted && (
                       <div className="px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
                           Переиздание
                       </div>
                   )}
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-2xl font-display animate-slide-up" style={{ animationDelay: '200ms' }}>
                    {selectedClass.name.rus}
                </h1>

                <div className="max-w-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>
                   <p className="text-lg md:text-xl text-white/90 font-light italic leading-relaxed border-l-4 border-primary pl-6">
                   {/* Fallback flavor text if description is complex */}
                   {typeof selectedClass.description[0] === 'string' && selectedClass.description[0].startsWith('{@i')
                        ? selectedClass.description[0].replace(/{@i |}/g, '')
                        : "Герой D&D, чья сила проистекает из..."}
                   </p>
                </div>
            </div>
        </div>

        {/* --- Main Content Layout --- */}
        <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* Left Column: Content (8 cols) */}
                <div className="lg:col-span-8 space-y-8 min-w-0">
                    <Tabs value={viewTab} onValueChange={setViewTab} className="w-full">
                        {/* Sticky Navigation Bar */}
                        <div className="sticky top-[3.5rem] z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 py-1 -mx-4 px-4 md:-mx-6 md:px-6 lg:mx-0 lg:px-0 lg:rounded-none mb-8">
                             <TabsList className="w-full justify-start h-auto bg-transparent p-0 gap-8 overflow-x-auto no-scrollbar mask-gradient-r">
                                {['description', 'features', 'equipment', 'table'].map(tab => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-1 py-4 text-base font-medium transition-all hover:text-primary/80"
                                    >
                                        {{
                                            'description': 'Описание',
                                            'features': 'Умения',
                                            'equipment': 'Снаряжение',
                                            'table': 'Таблица'
                                        }[tab]}
                                    </TabsTrigger>
                                ))}
                                {selectedClass.subclasses?.length ? (
                                    <TabsTrigger
                                        value="subclasses"
                                         className="data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-1 py-4 text-base font-medium transition-all hover:text-primary/80"
                                    >
                                        Подклассы
                                    </TabsTrigger>
                                ) : null}
                            </TabsList>
                        </div>

                            <TabsContent value="description" className="mt-0 space-y-10 animate-fade-in">
                                <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:underline prose-blockquote:border-l-primary prose-img:rounded-xl">
                                  <ContentRenderer content={selectedClass.description as any} />
                                </div>
                            </TabsContent>



                            <TabsContent value="features" className="mt-0 animate-slide-up">
                                <div className="max-w-4xl mx-auto space-y-16">
                                    {selectedClass.features.sort((a, b) => a.level - b.level).map((feature) => (
                                         <div key={feature.key} id={`feature-${feature.key}`} className="scroll-mt-32 group">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-muted/40 border border-border/60 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors shrink-0">
                                                    <span className="text-2xl font-bold text-primary font-display">{feature.level}</span>
                                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Уровень</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-bold group-hover:text-primary transition-colors font-display">{feature.name}</h3>
                                                    {feature.isSubclass && <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">Подкласс</span>}
                                                </div>
                                            </div>

                                            <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none pl-4 md:pl-20 border-l-2 border-border/40 group-hover:border-primary/30 transition-colors">
                                                <ContentRenderer content={feature.description as any} />
                                            </div>
                                         </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="equipment" className="mt-0 animate-slide-up">
                                <Card className="p-8 border-border bg-card/50">
                                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                                        <h2 className="font-display text-3xl mb-6">Начальное снаряжение</h2>
                                        <p className="lead text-xl text-muted-foreground mb-8">
                                            Вы начинаете со следующим снаряжением в дополнение к снаряжению, полученному за ваше происхождение:
                                        </p>
                                        <ContentRenderer content={selectedClass.equipment as any} />
                                    </div>
                                </Card>
                            </TabsContent>



                            <TabsContent value="table" className="mt-0 animate-slide-up">
                                  {/* Class Table - Compact Mode */}
                                  <div className="not-prose mb-8">
                                      <div className="rounded-xl border border-border/60 overflow-hidden shadow-sm bg-card/30">
                                         <div className="overflow-x-auto custom-scrollbar">
                                             <table className="w-full text-xs">
                                             <thead>
                                               {/* Group Header Row */}
                                               <tr className="bg-muted/40">
                                                 <th className="p-2 border-b border-border/60" colSpan={3}></th> {/* Level, PB, Features */}
                                                 {selectedClass.table?.map(t => (
                                                     <th key={`h1-${t.name}`} className="p-2 border-b border-border/60"></th>
                                                 ))}
                                                 {((showSpellSlots && !isWarlock) || isWarlock) && (
                                                     <th className="p-2 border-b border-border/60 text-center font-bold text-[10px] uppercase tracking-wider text-muted-foreground border-l border-border/40 bg-muted/60" colSpan={isWarlock ? 2 : 9}>
                                                         Магия
                                                     </th>
                                                 )}
                                               </tr>
                                               <tr className="bg-muted/40 border-b border-border/60">
                                                 <th className="p-2 text-left font-bold text-muted-foreground w-12">Ур.</th>
                                                 <th className="p-2 text-center font-bold text-muted-foreground w-12">БМ</th>
                                                 <th className="p-2 text-left font-bold text-muted-foreground min-w-[200px]">Умения класса</th>
                                                 {selectedClass.table?.map(t => (
                                                     <th key={t.name} className="p-2 text-center font-bold text-muted-foreground whitespace-nowrap">
                                                       {t.name}
                                                     </th>
                                                   ))
                                                 }
                                                 {showSpellSlots && !isWarlock && Array.from({length: 9}).map((_, i) => (
                                                     <th key={`slot-${i+1}`} className="p-2 text-center font-bold text-muted-foreground w-10 border-l border-border/40">
                                                         {i + 1}
                                                     </th>
                                                 ))}
                                                 {isWarlock && (
                                                     <>
                                                         <th className="p-2 text-center font-bold text-muted-foreground w-20 border-l border-border/40">Ячеек</th>
                                                         <th className="p-2 text-center font-bold text-muted-foreground w-20 border-l border-border/40">Круг</th>
                                                     </>
                                                 )}
                                               </tr>
                                             </thead>
                                             <tbody className="divide-y divide-border/40">
                                               {Array.from({ length: 20 }, (_, i) => i + 1).map(level => {
                                                 const profBonus = Math.ceil(level / 4) + 1;

                                                 // Flatten features including scaling (ASI etc)
                                                 const levelFeatures = [
                                                     ...selectedClass.features.filter(f => f.level === level && !f.isSubclass),
                                                     ...selectedClass.features
                                                          .filter(f => f.scaling?.some(s => s.level === level))
                                                          .map(f => {
                                                              const scaled = f.scaling?.find(s => s.level === level);
                                                              return scaled ? { ...scaled, key: f.key, name: scaled.name || f.name } : null;
                                                          })
                                                          .filter(Boolean)
                                                 ].sort((a, b) => (a as any).name.localeCompare((b as any).name));

                                                 const spellSlots = getSpellSlots(level, selectedClass.casterType);

                                                 return (
                                                   <tr key={level} className="hover:bg-muted/40 transition-colors group text-muted-foreground/90 hover:text-foreground">
                                                     <td className="p-2 font-mono font-medium group-hover:text-primary transition-colors">{level}</td>
                                                     <td className="p-2 text-center font-mono text-primary font-bold">+{profBonus}</td>
                                                     <td className="p-2">
                                                         {levelFeatures.length > 0 ? (
                                                             <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                                                                 {levelFeatures.map((f: any, i) => (
                                                                     <span key={`${f.key}-${level}`} className="inline-flex items-center">
                                                                         <a
                                                                           href={`#feature-${f.key}`}
                                                                           onClick={(e) => {
                                                                               e.preventDefault();
                                                                               const el = document.getElementById(`feature-${f.key}`);
                                                                               if (el) {
                                                                                   el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                                   setViewTab('features');
                                                                               } else {
                                                                                   setViewTab('features');
                                                                                   setTimeout(() => {
                                                                                        const target = document.getElementById(`feature-${f.key}`);
                                                                                        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                                   }, 100);
                                                                               }
                                                                           }}
                                                                           className="text-foreground/90 hover:text-primary hover:underline underline-offset-2 decoration-primary/50 transition-colors"
                                                                         >
                                                                             {f.name}
                                                                         </a>
                                                                         {i < levelFeatures.length - 1 && <span className="text-muted-foreground/30 ml-1">•</span>}
                                                                     </span>
                                                                 ))}
                                                             </div>
                                                         ) : (
                                                             <span className="text-muted-foreground/20">—</span>
                                                         )}
                                                     </td>
                                                     {selectedClass.table?.map(col => {
                                                       // Find the latest scaling value applicable for this level
                                                       const relevantScaling = col.scaling
                                                           .sort((a, b) => b.level - a.level)
                                                           .find(s => s.level <= level);

                                                       const val = relevantScaling?.value || "—";

                                                       return (
                                                         <td key={col.name} className="p-2 text-center font-mono">
                                                           {val}
                                                         </td>
                                                       );
                                                     })}
                                                     {showSpellSlots && !isWarlock && spellSlots.map((slot, i) => (
                                                         <td key={i} className="p-2 text-center font-mono border-l border-border/40">
                                                             {slot}
                                                         </td>
                                                     ))}
                                                     {isWarlock && (
                                                         <>
                                                             <td className="p-2 text-center font-mono border-l border-border/40">
                                                                 {getWarlockSlots(level).count}
                                                             </td>
                                                             <td className="p-2 text-center font-mono border-l border-border/40">
                                                                 {getWarlockSlots(level).slotLevel}-й
                                                             </td>
                                                         </>
                                                     )}
                                                   </tr>
                                                 );
                                               })}
                                             </tbody>
                                           </table>
                                         </div>
                                      </div>
                                  </div>
                             </TabsContent>

                            {selectedClass.subclasses?.length ? (
                                <TabsContent value="subclasses" className="mt-0 animate-slide-up">
                                    <div className="grid gap-8">
                                       {selectedClass.subclasses.map((subclass, index) => (
                                           <Card key={index} className="overflow-hidden border-border bg-card/50 hover:bg-card/80 transition-colors">
                                               <div className="p-8">
                                                    <div className="flex items-start justify-between mb-6">
                                                         <div>
                                                             <h3 className="text-2xl font-bold font-display text-primary mb-2">{subclass.subclassName.rus}</h3>
                                                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                 <span>{(subclass as any).source?.name?.rus || "Официальный источник"}</span>
                                                             </div>
                                                         </div>
                                                         <Button variant="outline" size="sm" className="hidden md:flex">Подробнее</Button>
                                                    </div>
                                                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                                                        <ContentRenderer content={subclass.description as any} />
                                                    </div>
                                               </div>
                                           </Card>
                                       ))}
                                   </div>
                                </TabsContent>
                            ) : null}
                    </Tabs>
                </div>

                {/* Right Column: Sticky Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6 hidden lg:block">
                    <div className="sticky top-28 space-y-6 animate-slide-left" style={{ animationDelay: '500ms' }}>
                         <Card className="p-6 border-border/60 shadow-xl bg-card/80 backdrop-blur-md">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 pb-4 border-b border-border/50">
                                <Shield className="w-5 h-5 text-primary" />
                                Особенности класса
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Кость хитов</div>
                                    <div className="flex items-center gap-4 bg-muted/40 p-3 rounded-lg border border-border/40">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">d{selectedClass.hitDice.maxValue}</div>
                                        <span className="text-sm font-medium">Хиты за уровень</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Характеристика</div>
                                        <div className="font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/40 text-center capitalize text-sm">
                                            {(selectedClass.primaryCharacteristics || "").split(", ").map(s => translateAbility(s.trim())).join(", ")}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Спасброски</div>
                                        <div className="font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/40 text-center capitalize text-sm">
                                            {(selectedClass.savingThrows || "").split(", ").map(s => translateAbility(s.trim())).join(", ")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </Card>

                         <Card className="p-6 border-border/60 shadow-xl bg-card/80 backdrop-blur-md">
                             <h3 className="text-lg font-bold mb-6 flex items-center gap-3 pb-4 border-b border-border/50">
                                 <Swords className="w-5 h-5 text-primary" />
                                 Владения
                             </h3>
                             <div className="space-y-5 text-sm">
                                 <div className="space-y-2">
                                     <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                        <Shield className="w-4 h-4" /> Доспехи
                                     </div>
                                     <div className="pl-6 text-foreground/90 leading-relaxed">
                                         {selectedClass.proficiency.armor || "Нет"}
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                        <Swords className="w-4 h-4" /> Оружие
                                     </div>
                                     <div className="pl-6 text-foreground/90 leading-relaxed">
                                         {selectedClass.proficiency.weapon || "Нет"}
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                        <BookOpen className="w-4 h-4" /> Инструменты
                                     </div>
                                     <div className="pl-6 text-foreground/90 leading-relaxed">
                                         {selectedClass.proficiency.tool || "Нет"}
                                     </div>
                                 </div>
                             </div>
                         </Card>

                         <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20 text-center">
                            <h4 className="font-bold text-lg mb-2 text-primary">Готовы играть?</h4>
                            <p className="text-sm text-muted-foreground mb-4">Создайте персонажа этого класса прямо сейчас в нашем конструкторе.</p>
                            <Button className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                Создать {selectedClass.name.rus.slice(0, -1)}а
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                         </div>
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
