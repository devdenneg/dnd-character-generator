import { useState } from "react";
import {
  Search,
  Sword,
  Shield,
  Heart,
  HelpCircle,
  Skull,
  BookOpen,
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
import {
  weapons,
  armor,
  conditions,
  faq,
  creatureTypes,
} from "@/data/glossary";

type TabType = "weapons" | "armor" | "conditions" | "faq" | "creatures";

export function Glossary() {
  const [activeTab, setActiveTab] = useState<TabType>("weapons");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "weapons" as TabType, label: "Оружие", icon: Sword },
    { id: "armor" as TabType, label: "Доспехи", icon: Shield },
    { id: "conditions" as TabType, label: "Состояния", icon: Heart },
    { id: "creatures" as TabType, label: "Существа", icon: Skull },
    { id: "faq" as TabType, label: "FAQ", icon: HelpCircle },
  ];

  const renderWeapons = () => {
    const allWeapons = [
      ...weapons.simple.melee,
      ...weapons.simple.ranged,
      ...weapons.martial.melee,
      ...weapons.martial.ranged,
    ].filter(
      (w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allWeapons.map((weapon) => (
            <Card key={weapon.nameEn} className="bg-card/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{weapon.name}</CardTitle>
                  <Badge variant="secondary">{weapon.damage}</Badge>
                </div>
                <CardDescription className="text-xs">
                  {weapon.nameEn} • {weapon.damageType}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-2">
                  {weapon.properties.map((prop) => (
                    <Badge key={prop} variant="outline" className="text-xs">
                      {prop}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {weapon.cost} • {weapon.weight} фунт.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderArmor = () => {
    const allArmor = [
      ...armor.light.map((a) => ({ ...a, type: "Лёгкий" })),
      ...armor.medium.map((a) => ({ ...a, type: "Средний" })),
      ...armor.heavy.map((a) => ({ ...a, type: "Тяжёлый" })),
    ].filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-4">
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Щит:</span>
              <span>
                +2 к КД, {armor.shield.cost}, {armor.shield.weight} фунтов
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allArmor.map((a) => (
            <Card key={a.nameEn} className="bg-card/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{a.name}</CardTitle>
                  <Badge variant="default">
                    КД {a.ac}
                    {a.maxDex !== 0 && a.maxDex !== null
                      ? ` + ЛОВ (макс ${a.maxDex})`
                      : a.maxDex === null
                        ? " + ЛОВ"
                        : ""}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {a.nameEn} • {a.type} доспех
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{a.cost}</span>
                  <span>•</span>
                  <span>{a.weight} фунт.</span>
                  {a.stealthDisadvantage && (
                    <>
                      <span>•</span>
                      <span className="text-destructive">
                        Помеха Скрытности
                      </span>
                    </>
                  )}
                  {"strRequired" in a &&
                    (a as { strRequired: number }).strRequired > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          Требуется СИЛ{" "}
                          {(a as { strRequired: number }).strRequired}
                        </span>
                      </>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderConditions = () => {
    const filteredConditions = conditions.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-3">
        {filteredConditions.map((condition) => (
          <Card key={condition.nameEn} className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" />
                {condition.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {condition.nameEn}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {condition.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderCreatures = () => {
    const filteredTypes = creatureTypes.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTypes.map((type) => (
          <Card key={type.nameEn} className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{type.name}</CardTitle>
              <CardDescription className="text-xs">
                {type.nameEn}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {type.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderFaq = () => {
    const filteredFaq = faq.filter(
      (f) =>
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-3">
        {filteredFaq.map((item, index) => (
          <Card key={index} className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Глоссарий</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="gap-2"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      {activeTab === "weapons" && renderWeapons()}
      {activeTab === "armor" && renderArmor()}
      {activeTab === "conditions" && renderConditions()}
      {activeTab === "creatures" && renderCreatures()}
      {activeTab === "faq" && renderFaq()}
    </div>
  );
}
