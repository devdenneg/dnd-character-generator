import { useParams } from "react-router-dom";
import { useCharacterByShortIdQuery } from "./api/queries";

export function PublicCharacterPage() {
  const { shortId } = useParams<{ shortId: string }>();
  const { data, isLoading, isError } = useCharacterByShortIdQuery(shortId ?? "");

  if (isLoading) {
    return <div className="container mx-auto p-6">Загрузка персонажа...</div>;
  }

  if (isError || !data?.data?.character) {
    return <div className="container mx-auto p-6 text-destructive">Персонаж не найден или приватный.</div>;
  }

  const character = data.data.character;
  const maybeDetails = character.data as unknown as { details?: { backstory?: string } };

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-3xl font-display font-bold">{character.name}</h1>
      <p className="text-muted-foreground">
        {character.data.race?.nameRu ?? "—"} / {character.data.class?.nameRu ?? "—"}
      </p>
      <div className="rounded-lg border border-border/60 p-4">
        <p className="text-sm text-muted-foreground">Короткий ID</p>
        <p className="font-mono text-lg">{character.shortId}</p>
      </div>
      <div className="rounded-lg border border-border/60 p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Предыстория</p>
        <p>{maybeDetails.details?.backstory || "Не указана"}</p>
      </div>
    </div>
  );
}
