import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Trash2,
  Eye,
  Plus,
  Users,
  Calendar,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { charactersApi } from "@/api/client";
import { useCharacterStore } from "@/store/characterStore";
import type { CharacterEntity } from "@/types/api";
import { getErrorMessage } from "@/utils/errorHandling";

export function MyCharactersPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { loadCharacter } = useCharacterStore();

  const [characters, setCharacters] = useState<CharacterEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchCharacters();
    } else if (!authLoading && !isAuthenticated) {
      setIsLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await charactersApi.list();
      if (response.success) {
        setCharacters(response.data.characters);
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Ошибка загрузки персонажей"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этого персонажа?")) return;

    try {
      setDeletingId(id);
      await charactersApi.delete(id);
      setCharacters((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Ошибка удаления"));
    } finally {
      setDeletingId(null);
    }
  };

  const handleLoad = (character: CharacterEntity) => {
    // Создаем полный объект Character из CharacterData
    const fullCharacter = {
      ...character.data,
      name: character.name,
    };
    loadCharacter(fullCharacter, character.id);
    navigate("/character");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 flex flex-col flex-1">
          <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-2xl font-bold text-gradient"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Мои персонажи
                  </h1>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  На главную
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-card/80 backdrop-blur-xl border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Войдите в аккаунт
                </h2>
                <p className="text-muted-foreground mb-6">
                  Чтобы сохранять и загружать персонажей, необходимо войти в
                  аккаунт
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate("/login")}>Войти</Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/register")}
                  >
                    Регистрация
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-2xl font-bold text-gradient"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Мои персонажи
                </h1>
                <p className="text-sm text-muted-foreground">
                  {characters.length > 0
                    ? `${characters.length} сохранённых персонажей`
                    : "Нет сохранённых персонажей"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/character")}
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Создать
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  На главную
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Нет персонажей</h2>
              <p className="text-muted-foreground mb-6">
                Создайте своего первого персонажа
              </p>
              <Button
                onClick={() => navigate("/character")}
                className="gap-2 bg-gradient-to-r from-primary to-accent"
              >
                <Plus className="w-4 h-4" />
                Создать персонажа
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                          {character.data?.race?.emoji || "🧙"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {character.name || "Безымянный"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {character.data?.race?.nameRu || "Неизвестный вид"}{" "}
                            •{" "}
                            {character.data?.class?.nameRu ||
                              "Неизвестный класс"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3 h-3" />
                      {formatDate(character.updatedAt)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleLoad(character)}
                        className="flex-1 gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Открыть
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(character.id)}
                        disabled={deletingId === character.id}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        {deletingId === character.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
