import { RotateCcw, FileDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCharacterStore } from "@/store/characterStore";
import { CharacterSheet } from "@/components/CharacterSheet";
import { generateCharacterPDF } from "@/utils/pdfGenerator";

export function SummaryStep() {
  const { character, getStats, resetCharacter } = useCharacterStore();
  const stats = getStats();

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

  return (
    <div className="space-y-6">
      {/* Кнопки действий */}
      <div className="flex gap-3 flex-wrap">
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

      {/* Интерактивная карточка персонажа */}
      <CharacterSheet />
    </div>
  );
}
