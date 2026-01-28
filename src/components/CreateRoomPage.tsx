import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Lock, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roomsApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";

export function CreateRoomPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    maxPlayers: 4,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await roomsApi.create(formData);
      navigate("/my-rooms");
    } catch (err: any) {
      setError(err.response?.data?.error || "Не удалось создать комнату");
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== "master") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Доступ запрещен
            </h2>
            <p className="text-muted-foreground mb-6">
              Только мастера могут создавать комнаты
            </p>
            <Button onClick={() => navigate("/")}>На главную</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Создание комнаты
                </h1>
                <p className="text-sm text-muted-foreground">
                  Настройте параметры игровой комнаты
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Название комнаты
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Моя игровая комната"
                required
                minLength={1}
                maxLength={100}
                className="bg-card/60 backdrop-blur-sm border-border/50"
              />
            </div>

            {/* Max Players */}
            <div className="space-y-2">
              <Label htmlFor="maxPlayers" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Максимум игроков
              </Label>
              <Input
                id="maxPlayers"
                type="number"
                value={formData.maxPlayers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxPlayers: parseInt(e.target.value) || 1,
                  })
                }
                min={1}
                max={20}
                required
                className="bg-card/60 backdrop-blur-sm border-border/50"
              />
              <p className="text-sm text-muted-foreground">
                От 1 до 20 игроков
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Пароль комнаты
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Введите пароль"
                required
                minLength={4}
                className="bg-card/60 backdrop-blur-sm border-border/50"
              />
              <p className="text-sm text-muted-foreground">Минимум 4 символа</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isLoading ? "Создание..." : "Создать комнату"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Отмена
              </Button>
            </div>
          </form>

          {/* Info Card */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">О комнатах</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Игроки смогут найти вашу комнату в списке активных</li>
              <li>• Для входа потребуется пароль</li>
              <li>• Вы сможете управлять комнатой в любое время</li>
              <li>• Комнату можно деактивировать или удалить</li>
            </ul>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <p className="text-sm text-muted-foreground text-center">
              D&D Generator — Инструменты для мастеров и игроков
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
