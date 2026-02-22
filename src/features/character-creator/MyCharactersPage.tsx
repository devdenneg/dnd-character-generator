import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCharacterMutation,
  useSetCharacterPrivacyMutation,
} from "./api/mutations";
import { useMyCharactersQuery } from "./api/queries";

export function MyCharactersPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMyCharactersQuery(true);
  const deleteMutation = useDeleteCharacterMutation();
  const privacyMutation = useSetCharacterPrivacyMutation();

  const characters = data?.data?.characters ?? [];

  if (isLoading) {
    return <div className="container mx-auto p-6">Загрузка персонажей...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-6 text-destructive">Не удалось загрузить персонажей.</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-display font-bold">Мои персонажи</h1>
        <Button onClick={() => navigate("/character")}>Создать персонажа</Button>
      </div>

      {characters.length === 0 ? (
        <div className="rounded-lg border border-border/60 p-6 text-muted-foreground">
          У вас пока нет персонажей.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {characters.map((character) => (
            <div key={character.id} className="rounded-lg border border-border/60 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{character.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {character.data.race?.nameRu ?? "—"} / {character.data.class?.nameRu ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">ID: {character.shortId}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    character.isPublic
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {character.isPublic ? "Публичный" : "Приватный"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    privacyMutation.mutate({
                      id: character.id,
                      isPublic: !character.isPublic,
                    })
                  }
                >
                  {character.isPublic ? "Сделать приватным" : "Сделать публичным"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/my-characters/${character.id}/edit`)}
                >
                  Редактировать
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/my-characters/${character.id}/level-up`)}
                >
                  Прокачать
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/character/${character.shortId}`
                    )
                  }
                >
                  Копировать ссылку
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(character.id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
