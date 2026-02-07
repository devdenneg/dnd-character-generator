import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { searchBackgrounds } from "../services/backgroundService";
import { searchClasses } from "../services/classService";
import { searchEquipment } from "../services/equipmentService";
import { getGlobalSearchFeats } from "../services/featService";
import { searchGlossaryTerms } from "../services/glossaryService";
import { searchMonsters } from "../services/monsterService";
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
    const [races, classes, backgrounds, spells, equipment, glossary, feats, monsters] = await Promise.all([
      searchRaces(query),
      searchClasses(query),
      searchBackgrounds(query),
      searchSpells(query),
      searchEquipment(query),
      searchGlossaryTerms(query),
      getGlobalSearchFeats(query),
      searchMonsters(query),
    ]);

    // Combine all results
    const results = [
      ...races,
      ...classes,
      ...backgrounds,
      ...spells,
      ...equipment,
      ...glossary,
      ...feats,
      ...monsters,
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

export async function getRandomContent(req: AuthenticatedRequest, res: Response) {
  try {
    const limit = 10;

    // We'll search for a common letter "a" to get a broad range of results.
    // This is a temporary solution until we add dedicated random methods to services.

    const queries = ["а", "о", "е", "и", " "];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    const [races, classes, backgrounds, spells, equipment, glossary, feats, monsters] = await Promise.all([
      searchRaces(randomQuery),
      searchClasses(randomQuery),
      searchBackgrounds(randomQuery),
      searchSpells(randomQuery),
      searchEquipment(randomQuery),
      searchGlossaryTerms(randomQuery),
      getGlobalSearchFeats(randomQuery),
      searchMonsters(randomQuery),
    ]);

    const allResults = [
      ...races,
      ...classes,
      ...backgrounds,
      ...spells,
      ...equipment,
      ...glossary,
      ...feats,
      ...monsters,
    ];

    // Shuffle and slice
    const shuffled = allResults.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, limit);

    res.status(200).json({
      success: true,
      data: { results: selected },
    });
  } catch (error) {
    console.error("Random content error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
