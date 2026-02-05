import { Router } from "express";
import { deleteFile, listFiles, upload, uploadFile } from "../controllers/uploadController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Protect all upload routes with auth
router.use(authMiddleware);

// List files
router.get("/", listFiles);

// Upload endpoint
router.post("/", upload.single("file"), uploadFile);

// Delete endpoint
router.delete("/:filename", deleteFile);

export default router;
