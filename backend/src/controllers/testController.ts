import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error("Deployment status error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch deployment logs",
    });
  }
};

export const createDeploymentLog = async (req: Request, res: Response) => {
  try {
    const { message, version, commitSha } = req.body;

    const log = await prisma.deploymentLog.create({
      data: {
        message: message || "Test deployment",
        version: version || "1.0.0",
        commitSha: commitSha || "unknown",
      },
    });

    res.json({
      success: true,
      message: "Deployment log created successfully!",
      log,
    });
  } catch (error) {
    console.error("Create deployment log error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create deployment log",
    });
  }
};
