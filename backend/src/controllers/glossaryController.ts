
import { Request, Response } from "express";
import * as glossaryService from "../services/glossaryService";

// Get lightweight metadata (for list view)
export const getTermsMeta = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const terms = await glossaryService.getTermsMeta(
      category ? String(category) : undefined,
      search ? String(search) : undefined
    );
    res.json({ success: true, data: { terms } });
  } catch (error) {
    console.error("Error getting glossary terms meta:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get full terms data (with descriptions)
export const getTerms = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const terms = await glossaryService.getTerms(
      category ? String(category) : undefined,
      search ? String(search) : undefined
    );
    res.json({ success: true, data: terms });
  } catch (error) {
    console.error("Error getting glossary terms:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getTermById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const term = await glossaryService.getTermById(String(id));
    if (!term) {
      return res.status(404).json({ success: false, error: "Term not found" });
    }
    res.json({ success: true, data: { term } });
  } catch (error) {
    console.error("Error getting glossary term:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await glossaryService.getCategories();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error("Error getting glossary categories:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
