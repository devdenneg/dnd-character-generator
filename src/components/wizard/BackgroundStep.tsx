import { useState, useMemo } from "react";
import {
  Search,
  Check,
  Info,
  Star,
  Package,
  Wrench,
  Languages,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { useCharacterStore } from "@/store/characterStore";
import { useBackendBackgrounds } from "@/api/hooks";
import { getFeatByName } from "@/data/phb2024/feats";
import type { Background } from "@/types/character";
import { t, getSkillNameRu } from "@/data/translations/ru";

// Заглушки для описания предыстории персонажа
const BACKGROUND_ROLEPLAY_HOOKS: Record<
  string,
  { questions: string[]; suggestions: string[] }
> = {
  acolyte: {
    questions: [
      "Какому богу или пантеону вы служили?",
      "Почему вы покинули храм и отправились в приключения?",
      "Какой священный обряд вы проводили чаще всего?",
    ],
    suggestions: [
      "Я служил в храме Латандера, бога рассвета, но видение привело меня в путь",
      "Мой храм был разрушен культистами, и я ищу способ его восстановить",
      "Я совершил грех и должен искупить его деяниями в миру",
    ],
  },
  criminal: {
    questions: [
      "Каким преступным ремеслом вы занимались?",
      "Были ли вы частью гильдии или одиночкой?",
      "Что заставило вас изменить путь?",
    ],
    suggestions: [
      "Я был карманником в трущобах, пока не украл у не того человека",
      "Гильдия воров считает меня предателем после того, как я отказался убивать",
      "Я грабил только богачей, но однажды мой поступок привёл к трагедии",
    ],
  },
  soldier: {
    questions: [
      "В какой армии или отряде вы служили?",
      "Какое звание вы имели?",
      "Что привело вас к жизни авантюриста?",
    ],
    suggestions: [
      "Я был сержантом королевской гвардии, но война закончилась",
      "Мой отряд погиб в засаде, и я единственный выживший",
      "Меня несправедливо обвинили в дезертирстве, теперь я ищу правду",
    ],
  },
  noble: {
    questions: [
      "К какому дому принадлежит ваша семья?",
      "Какие привилегии и обязанности давал вам титул?",
      "Почему вы отказались от комфортной жизни?",
    ],
    suggestions: [
      "Младший сын/дочь без права наследования — мне нужно добиться всего самому",
      "Семья потеряла состояние, и я ищу способ восстановить её честь",
      "Интриги двора едва не стоили мне жизни, я бежал",
    ],
  },
  sage: {
    questions: [
      "Какую область знаний вы изучали?",
      "Где вы проводили свои исследования?",
      "Какую тайну вы стремитесь раскрыть?",
    ],
    suggestions: [
      "Я посвятил жизнь изучению древних цивилизаций",
      "В библиотеке я нашёл упоминание о забытом артефакте",
      "Мой наставник исчез, оставив загадочные записи",
    ],
  },
  entertainer: {
    questions: [
      "Каким искусством вы владеете?",
      "Где вы обычно выступали?",
      "Что привело вас на дорогу приключений?",
    ],
    suggestions: [
      "Я был придворным музыкантом, пока не влюбился в принцессу",
      "Моя труппа распалась, и я ищу новых товарищей",
      "Говорят, величайшая песня скрыта в древних руинах",
    ],
  },
};

// Получить заглушку или дефолтную
function getRoleplayHooks(backgroundId: string) {
  return (
    BACKGROUND_ROLEPLAY_HOOKS[backgroundId] || {
      questions: [
        "Как ваше прошлое повлияло на вас?",
        "Что толкнуло вас на путь приключений?",
        "Какие цели вы преследуете?",
      ],
      suggestions: [
        "Обстоятельства заставили меня покинуть привычную жизнь",
        "Я ищу ответы на вопросы, которые не дают мне покоя",
        "Судьба свела меня с группой искателей приключений",
      ],
    }
  );
}

export function BackgroundStep() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState<Background | null>(null);
  const { character, setBackground } = useCharacterStore();
  const { data, isLoading } = useBackendBackgrounds("phb2024");

  // Transform backend data to Background type
  const backgrounds = useMemo(() => {
    if (!data?.data?.backgrounds) return [];
    return data.data.backgrounds.map((bg: any) => ({
      id: bg.externalId,
      name: bg.name,
      nameRu: bg.nameRu,
      description: bg.description,
      skillProficiencies: bg.skillProficiencies,
      toolProficiencies: bg.toolProficiencies,
      languages: bg.languages,
      equipment: bg.equipment,
      startingGold: bg.startingGold,
      originFeat: bg.originFeat,
      abilityScoreIncrease: {
        options: bg.abilityScoreIncrease.options,
        // Ensure amount is a tuple of 3 numbers
        amount: [
          bg.abilityScoreIncrease.amount[0] || 0,
          bg.abilityScoreIncrease.amount[1] || 0,
          bg.abilityScoreIncrease.amount[2] || 0,
        ] as [number, number, number],
      },
      source: bg.source,
    }));
  }, [data]);

  const filteredBackgrounds = backgrounds.filter(
    (bg) =>
      bg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bg.nameRu.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">Загрузка предысторий...</div>
      </div>
    );
  }

  const handleSelectBackground = (background: Background) => {
    setBackground(background);
  };

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("app.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Инфо-блок */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Предыстория в PHB 2024</p>
              <p className="text-sm text-muted-foreground">
                Предыстория определяет ваше прошлое и даёт:
                <br />• <strong>2 навыка</strong> •{" "}
                <strong>1 инструмент</strong> • <strong>Языки</strong>
                <br />• <strong>Снаряжение</strong> •{" "}
                <strong>Черту происхождения</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Сетка предысторий */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBackgrounds.map((bg: Background) => {
          const isSelected = character.background?.id === bg.id;
          const feat = getFeatByName(bg.originFeat || "");

          return (
            <Card
              key={bg.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                isSelected ? "border-primary ring-2 ring-primary/20" : ""
              }`}
              onClick={() => handleSelectBackground(bg)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {bg.nameRu}
                      {isSelected && <Check className="w-5 h-5 text-primary" />}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {bg.name}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(bg);
                    }}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {bg.description}
                </p>

                {/* Навыки */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {bg.skillProficiencies.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {getSkillNameRu(skill)}
                    </Badge>
                  ))}
                </div>

                {/* Черта */}
                {bg.originFeat && feat && (
                  <Tooltip
                    content={
                      <div className="space-y-2">
                        <p className="font-semibold text-amber-500 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          {bg.originFeat}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {feat.description}
                        </p>
                        <div className="space-y-1">
                          {feat.benefits.map((benefit, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-amber-500 mt-0.5">•</span>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                    position="top"
                    maxWidth="max-w-md"
                  >
                    <div className="mt-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 cursor-help hidden md:block">
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <Star className="w-3 h-3" />
                        <span className="font-medium">{bg.originFeat}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {feat.benefits[0]}
                      </p>
                    </div>
                  </Tooltip>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Выбранная предыстория — подробности */}
      {character.background && (
        <Card className="bg-card/50 border-primary/30">
          <CardHeader>
            <CardTitle className="text-xl">
              {character.background.nameRu}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({character.background.name})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {character.background.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Навыки */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Владение навыками
                </h4>
                <div className="flex flex-wrap gap-1">
                  {character.background.skillProficiencies.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {getSkillNameRu(skill)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Инструменты */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> Владение инструментами
                </h4>
                <div className="flex flex-wrap gap-1">
                  {character.background.toolProficiencies.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Языки */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Languages className="w-4 h-4" /> {t("character.languages")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  +{character.background.languages} язык(а) на выбор
                </p>
              </div>

              {/* Снаряжение */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" /> {t("character.equipment")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {character.background.equipment.join(", ")}
                </p>
              </div>
            </div>

            {/* Черта происхождения — подробно */}
            {character.background.originFeat && (
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                <h4 className="font-medium flex items-center gap-2 text-amber-600">
                  <Star className="w-4 h-4" /> Черта происхождения
                </h4>
                <p className="text-lg font-bold mt-1">
                  {character.background.originFeat}
                </p>

                {(() => {
                  const feat = getFeatByName(
                    character.background.originFeat || "",
                  );
                  if (!feat) return null;
                  return (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {feat.description}
                      </p>
                      <ul className="text-sm space-y-1">
                        {feat.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Заглушка для ролеплея */}
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <h4 className="font-medium text-purple-600 mb-3">
                Вопросы для создания истории
              </h4>
              {(() => {
                const hooks = getRoleplayHooks(character.background.id);
                return (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Подумайте о следующем:
                      </p>
                      <ul className="text-sm space-y-1">
                        {hooks.questions.map((q, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-400">?</span>
                            <span className="italic">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Примеры предысторий:
                      </p>
                      <ul className="text-sm space-y-1">
                        {hooks.suggestions.map((s, i) => (
                          <li key={i} className="text-muted-foreground">
                            "{s}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Увеличение характеристик */}
            <div className="bg-muted/30 p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-2">
                Увеличение характеристик (PHB 2024)
              </h4>
              <p className="text-sm text-muted-foreground">
                Распределите <strong>+2 и +1</strong> между любыми
                характеристиками. Рекомендуемые:{" "}
                <span className="font-medium text-foreground">
                  {character.background.abilityScoreIncrease.options
                    .map((opt) => t(`abilities.${opt}`))
                    .join(", ")}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Модалка с полным описанием */}
      <Modal
        isOpen={!!showModal}
        onClose={() => setShowModal(null)}
        title={showModal?.nameRu}
        subtitle={showModal?.name}
        maxWidth="max-w-2xl"
      >
        {showModal && (
          <>
            <ModalContent>
              <p className="text-sm text-muted-foreground mb-4">
                {showModal.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Владение навыками
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {showModal.skillProficiencies.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {getSkillNameRu(skill)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Инструменты</h4>
                  <div className="flex flex-wrap gap-1">
                    {showModal.toolProficiencies.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">Снаряжение</h4>
                <p className="text-sm">{showModal.equipment.join(", ")}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">Языки</h4>
                <p className="text-sm">
                  +{showModal.languages} язык(а) на выбор
                </p>
              </div>

              {showModal.originFeat && (
                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="font-medium text-amber-600 flex items-center gap-2">
                    <Star className="w-4 h-4" /> Черта происхождения:{" "}
                    {showModal.originFeat}
                  </h4>
                  {(() => {
                    const feat = getFeatByName(showModal.originFeat || "");
                    if (!feat) return null;
                    return (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          {feat.description}
                        </p>
                        <ul className="text-sm space-y-1">
                          {feat.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              )}
            </ModalContent>

            <ModalFooter>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(null)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  handleSelectBackground(showModal);
                  setShowModal(null);
                }}
              >
                <Check className="w-4 h-4 mr-2" />
                Выбрать
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
}
