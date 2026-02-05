import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 max-w-2xl w-full mx-auto px-4 text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-display font-bold text-gradient leading-none opacity-90 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-float">
          <Ghost className="w-12 h-12 text-white" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
          Ой! Страница не найдена
        </h2>
        <p
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Кажется, эта страница улетела в другое измерение или никогда не
          существовала.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8 py-3 text-lg gap-2"
          >
            <Home className="w-5 h-5" />
            На главную
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="px-8 py-3 text-lg gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </Button>
        </div>

        {/* Fun Text */}
        <div
          className="mt-12 text-sm text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="italic">
            "Хватай свои d20 и найдём правильный путь!" 🎲
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
