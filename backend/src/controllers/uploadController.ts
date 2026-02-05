import { Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (_req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `file-${uniqueSuffix}${ext}`);
  },
});

// File filter - only allow images
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (JPEG, PNG, GIF, WebP)"));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

// Upload controller
export async function uploadFile(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.file) {
      console.error("[Upload] No file in request");
      res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
      return;
    }

    // Get base URL from environment or use protocol + host from request
    const getBaseUrl = () => {
      if (process.env.API_URL) {
        return process.env.API_URL.replace(/\/api$/, "");
      }
      // Fallback to request protocol + host
      const protocol = req.protocol;
      const host = req.get("host");
      return `${protocol}://${host}`;
    };

    const baseUrl = getBaseUrl();
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    const filePath = path.join(uploadDir, req.file.filename);

    // Log upload details
    console.log("[Upload] File uploaded successfully:", {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: filePath,
      url: fileUrl,
      baseUrl: baseUrl,
    });

    // Verify file exists on disk
    try {
      await fs.access(filePath);
      console.log("[Upload] File verified on disk:", filePath);
    } catch (err) {
      console.error("[Upload] File NOT found on disk:", filePath);
    }

    res.status(200).json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error("[Upload] Upload failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload file",
    });
  }
}

// Delete file controller
export async function deleteFile(req: AuthenticatedRequest, res: Response) {
  try {
    const { filename } = req.params;

    if (!filename || Array.isArray(filename)) {
      res.status(400).json({
        success: false,
        error: "Filename is required",
      });
      return;
    }

    const filePath = path.join(uploadDir, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
      return;
    }

    // Delete file
    await fs.unlink(filePath);

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete file",
    });
  }
}
