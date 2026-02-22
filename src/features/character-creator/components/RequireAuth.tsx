import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  if (isLoading) {
    return <div className="container mx-auto p-6">Проверка авторизации...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-xl p-6">
        <div className="rounded-xl border border-border/60 bg-card/70 p-6 space-y-4">
          <h2 className="text-2xl font-display font-bold">Требуется вход</h2>
          <p className="text-muted-foreground">
            Создание и управление персонажами доступны только авторизованным пользователям.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openLogin}>Войти</Button>
            <Button variant="outline" onClick={openRegister}>
              Регистрация
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              На главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
