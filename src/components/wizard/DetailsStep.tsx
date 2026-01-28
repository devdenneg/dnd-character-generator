import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useCharacterStore } from "@/store/characterStore";
import { t } from "@/data/translations/ru";

const ALIGNMENTS = [
  { value: "lawful-good", label: "Законно-добрый" },
  { value: "neutral-good", label: "Нейтрально-добрый" },
  { value: "chaotic-good", label: "Хаотично-добрый" },
  { value: "lawful-neutral", label: "Законно-нейтральный" },
  { value: "true-neutral", label: "Истинно нейтральный" },
  { value: "chaotic-neutral", label: "Хаотично-нейтральный" },
  { value: "lawful-evil", label: "Законно-злой" },
  { value: "neutral-evil", label: "Нейтрально-злой" },
  { value: "chaotic-evil", label: "Хаотично-злой" },
];

export function DetailsStep() {
  const { character, setCharacterDetails, setName } = useCharacterStore();

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("character.name")} *</Label>
              <Input
                id="name"
                placeholder="Введите имя персонажа"
                value={character.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alignment">{t("character.alignment")}</Label>
              <Select
                id="alignment"
                options={ALIGNMENTS}
                placeholder="Выберите мировоззрение"
                value={character.alignment}
                onChange={(e) =>
                  setCharacterDetails({ alignment: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>{t("details.appearance")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="age">{t("details.age")}</Label>
              <Input
                id="age"
                placeholder="25 лет"
                value={character.age}
                onChange={(e) => setCharacterDetails({ age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t("details.height")}</Label>
              <Input
                id="height"
                placeholder="180 см"
                value={character.height}
                onChange={(e) =>
                  setCharacterDetails({ height: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{t("details.weight")}</Label>
              <Input
                id="weight"
                placeholder="75 кг"
                value={character.weight}
                onChange={(e) =>
                  setCharacterDetails({ weight: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eyes">{t("details.eyes")}</Label>
              <Input
                id="eyes"
                placeholder="Карие"
                value={character.eyes}
                onChange={(e) => setCharacterDetails({ eyes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skin">{t("details.skin")}</Label>
              <Input
                id="skin"
                placeholder="Смуглая"
                value={character.skin}
                onChange={(e) => setCharacterDetails({ skin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hair">{t("details.hair")}</Label>
              <Input
                id="hair"
                placeholder="Чёрные, короткие"
                value={character.hair}
                onChange={(e) => setCharacterDetails({ hair: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appearance">Описание внешности</Label>
            <Textarea
              id="appearance"
              placeholder="Опишите внешность вашего персонажа..."
              value={character.appearance}
              onChange={(e) =>
                setCharacterDetails({ appearance: e.target.value })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Personality */}
      <Card>
        <CardHeader>
          <CardTitle>Характер</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personalityTraits">
                {t("details.personalityTraits")}
              </Label>
              <Textarea
                id="personalityTraits"
                placeholder="Я всегда помогаю тем, кто в беде..."
                value={character.personalityTraits}
                onChange={(e) =>
                  setCharacterDetails({ personalityTraits: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideals">{t("details.ideals")}</Label>
              <Textarea
                id="ideals"
                placeholder="Справедливость. Закон един для всех..."
                value={character.ideals}
                onChange={(e) =>
                  setCharacterDetails({ ideals: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonds">{t("details.bonds")}</Label>
              <Textarea
                id="bonds"
                placeholder="Я защищаю тех, кто не может защитить себя..."
                value={character.bonds}
                onChange={(e) => setCharacterDetails({ bonds: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flaws">{t("details.flaws")}</Label>
              <Textarea
                id="flaws"
                placeholder="Я слишком доверчив..."
                value={character.flaws}
                onChange={(e) => setCharacterDetails({ flaws: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backstory */}
      <Card>
        <CardHeader>
          <CardTitle>{t("details.backstory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="backstory"
            placeholder="Расскажите историю вашего персонажа..."
            value={character.backstory}
            onChange={(e) => setCharacterDetails({ backstory: e.target.value })}
            rows={6}
          />
        </CardContent>
      </Card>
    </div>
  );
}
