import { Router } from "express";
import { getOne, listMeta, search } from "../controllers/monsterController";

const router = Router();

// Public endpoints
router.get("/meta", listMeta);
router.get("/search", search);
router.get("/:id", getOne);

export default router;
