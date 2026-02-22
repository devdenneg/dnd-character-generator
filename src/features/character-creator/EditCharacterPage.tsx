import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSetCharacterPrivacyMutation,
  useUpdateCharacterMutation,
} from "./api/mutations";
import { useCharacterByIdQuery } from "./api/queries";

interface EditableDetails {
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
}

const initialDetails: EditableDetails = {
  alignment: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  backstory: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
};

export function EditCharacterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useCharacterByIdQuery(id ?? "", Boolean(id));
  const updateMutation = useUpdateCharacterMutation();
  const privacyMutation = useSetCharacterPrivacyMutation();

  const [name, setName] = useState("");
  const [details, setDetails] = useState<EditableDetails>(initialDetails);
  const [isPublic, setIsPublic] = useState(false);

  const character = data?.data?.character;

  useEffect(() => {
    if (!character) return;

    setName(character.name);
    setIsPublic(character.isPublic);

    const raw = character.data as unknown as { details?: Partial<EditableDetails> };
    setDetails({ ...initialDetails, ...(raw.details ?? {}) });
  }, [character]);

  const isDirty = useMemo(() => {
    if (!character) return false;

    const raw = character.data as unknown as { details?: Partial<EditableDetails> };
    const sourceDetails = { ...initialDetails, ...(raw.details ?? {}) };

    return (
      name !== character.name ||
      isPublic !== character.isPublic ||
      JSON.stringify(details) !== JSON.stringify(sourceDetails)
    );
  }, [character, details, isPublic, name]);

  const onSave = async () => {
    if (!id || !character) return;

    await updateMutation.mutateAsync({
      id,
      payload: {
        name,
        details,
      },
    });

    if (isPublic !== character.isPublic) {
      await privacyMutation.mutateAsync({ id, isPublic });
    }

    navigate("/my-characters");
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Загрузка персонажа...</div>;
  }

  if (isError || !character) {
    return (
      <div className="container mx-auto p-6 text-destructive">
        Не удалось загрузить персонажа.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-display font-bold">Редактирование персонажа</h1>
        <Button variant="outline" onClick={() => navigate("/my-characters")}>
          Назад
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Имя</Label>
          <Input value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Мировоззрение</Label>
          <Input
            value={details.alignment}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, alignment: event.target.value }))
            }
          />
        </div>

        <label className="flex items-end gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
          Публичный доступ по short-link
        </label>

        <div className="space-y-2 md:col-span-2">
          <Label>Черты характера</Label>
          <Textarea
            value={details.personalityTraits}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, personalityTraits: event.target.value }))
            }
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Предыстория</Label>
          <Textarea
            value={details.backstory}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, backstory: event.target.value }))
            }
            rows={7}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={!isDirty || updateMutation.isPending}>
          {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  );
}
