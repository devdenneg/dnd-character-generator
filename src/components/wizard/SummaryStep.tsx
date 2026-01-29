import { useState } from "react";
import {
  RotateCcw,
  FileDown,
  FileText,
  Save,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { CharacterSheet } from "@/components/CharacterSheet";
import { generateCharacterPDF } from "@/utils/pdfGenerator";
import { useAuth } from "@/contexts/AuthContext";
import { charactersApi } from "@/api/client";

export function SummaryStep() {
  const {
    character,
    getStats,
    resetCharacter,
    getCharacterData,
    loadedCharacterId,
  } = useCharacterStore();
  const { isAuthenticated } = useAuth();
  const stats = getStats();

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Экспорт в PDF (открывает страницу для печати)
  const handleExportPdf = () => {
    generateCharacterPDF(character, stats);
  };

  // Экспорт в JSON
  const handleExportJson = () => {
    const data = {
      character,
      stats,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${character.name || "character"}_dnd2024.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Сохранение в облако
  const handleSaveToCloud = async () => {
    if (!isAuthenticated) {
      setSaveError("Войдите в аккаунт, чтобы сохранить персонажа");
      return;
    }

    // Предотвращаем повторное сохранение
    if (isSaving) {
      return;
    }

    // Если персонаж был загружен и не менялся - не сохраняем
    if (loadedCharacterId) {
      setSaveError("Персонаж уже сохранён. Внесите изменения для обновления.");
      return;
    }

    try {
      setIsSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const characterData = getCharacterData();

      const response = await charactersApi.create({
        name: character.name || "Безымянный герой",
        data: characterData,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.response?.data?.error || "Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Кнопки действий */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={handleSaveToCloud}
          disabled={isSaving || loadedCharacterId !== null}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saveSuccess ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saveSuccess
            ? "Сохранено!"
            : loadedCharacterId
              ? "Уже сохранён"
              : "Сохранить в облако"}
        </Button>
        <Button onClick={handleExportPdf} className="gap-2">
          <FileText className="w-4 h-4" />
          Скачать PDF
        </Button>
        <Button variant="outline" onClick={handleExportJson} className="gap-2">
          <FileDown className="w-4 h-4" />
          Экспорт JSON
        </Button>
        <Button variant="outline" onClick={resetCharacter} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Создать нового
        </Button>
      </div>

      {/* Сообщения */}
      {saveError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
          {saveError}
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-primary text-sm">
          💡 Войдите в аккаунт, чтобы сохранять персонажей в облаке
        </div>
      )}

      {/* Интерактивная карточка персонажа */}
      <CharacterSheet />
    </div>
  );
}
