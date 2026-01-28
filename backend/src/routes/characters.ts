import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  create,
  list,
  getOne,
  update,
  remove,
} from "../controllers/characterController";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Character CRUD
router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
