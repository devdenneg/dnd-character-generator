import { Router } from "express";
import { getDeploymentStatus, createDeploymentLog } from "../controllers/testController";

const router = Router();

router.get("/deployment", getDeploymentStatus);
router.post("/deployment", createDeploymentLog);

export default router;
