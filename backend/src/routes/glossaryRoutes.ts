
import { Router } from "express";
import * as glossaryController from "../controllers/glossaryController";

const router = Router();

router.get("/meta", glossaryController.getTermsMeta); // Lightweight list
router.get("/categories", glossaryController.getCategories);
router.get("/:id", glossaryController.getTermById);
router.get("/", glossaryController.getTerms); // Full data

export default router;
