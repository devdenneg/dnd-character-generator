import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload, uploadFile, deleteFile } from "../controllers/uploadController";

const router = Router();

// Upload endpoint - requires authentication (no master check for testing)
router.post("/", authMiddleware, upload.single("file"), uploadFile);

// Delete endpoint - requires authentication (no master check for testing)
router.delete("/:filename", authMiddleware, deleteFile);

export default router;
