import { Request, Response } from "express";
import prisma from "../db";

export const getDeploymentStatus = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.deploymentLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    res.json({
      success: true,
      message: "Deployment API is working!",
      logs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Deployment status error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch deployment logs",
      details: error?.message || "Unknown error",
    });
  }
};

export const createDeploymentLog = async (req: Request, res: Response) => {
  try {
    const { message, version, commitSha } = req.body;

    console.log("Creating deployment log with data:", { message, version, commitSha });

    const log = await prisma.deploymentLog.create({
      data: {
        message: message || "Test deployment",
        version: version || "1.0.0",
        commitSha: commitSha || "unknown",
      },
    });

    console.log("Deployment log created:", log);

    res.json({
      success: true,
      message: "Deployment log created successfully!",
      log,
    });
  } catch (error: any) {
    console.error("Create deployment log error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create deployment log",
      details: error?.message || "Unknown error",
    });
  }
};
