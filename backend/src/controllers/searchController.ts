import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { searchBackgrounds } from "../services/backgroundService";
import { searchClasses } from "../services/classService";
import { searchEquipment } from "../services/equipmentService";
import { searchGlossaryTerms } from "../services/glossaryService";
import { searchRaces } from "../services/raceService";
import { searchSpells } from "../services/spellService";

export async function search(req: AuthenticatedRequest, res: Response) {
  try {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      res.status(200).json({
        success: true,
        data: { results: [] },
      });
      return;
    }

    // Search in parallel across all types
    const [races, classes, backgrounds, spells, equipment, glossary] = await Promise.all([
      searchRaces(query),
      searchClasses(query),
      searchBackgrounds(query),
      searchSpells(query),
      searchEquipment(query),
      searchGlossaryTerms(query),
    ]);

    // Combine all results
    const results = [
      ...races,
      ...classes,
      ...backgrounds,
      ...spells,
      ...equipment,
      ...glossary,
    ];

    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
