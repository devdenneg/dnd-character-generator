import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
    getAllMonstersMeta,
    getMonsterByExternalId,
    getMonsterById,
    searchMonsters,
} from "../services/monsterService";

export async function listMeta(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const monsters = await getAllMonstersMeta(source);
    res.status(200).json({ success: true, data: { monsters } });
  } catch (error) {
    console.error("List monsters meta error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;
    // Try externalId first (as used in frontend navigation), then internal ID if not found?
    // User requested: "URL like spells", usually using externalId.
    let monster = await getMonsterByExternalId(id);

    if (!monster) {
        monster = await getMonsterById(id);
    }

    if (!monster) {
      res.status(404).json({ success: false, error: "Monster not found" });
      return;
    }
    res.status(200).json({ success: true, data: { monster } });
  } catch (error) {
    console.error("Get monster error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export async function search(req: AuthenticatedRequest, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query || query.trim().length === 0) {
      res.status(200).json({ success: true, data: { results: [] } });
      return;
    }
    const results = await searchMonsters(query);
    res.status(200).json({ success: true, data: { results } });
  } catch (error) {
    console.error("Search monsters error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
