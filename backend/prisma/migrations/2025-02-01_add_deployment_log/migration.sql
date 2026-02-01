-- Drop existing table with cascade
DROP TABLE IF EXISTS "DeploymentLog" CASCADE;

-- CreateTable
CREATE TABLE "DeploymentLog" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "commitSha" TEXT,
    "status" TEXT NOT NULL DEFAULT 'success',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeploymentLog_pkey" PRIMARY KEY ("id")
);

-- Grant permissions to database user
GRANT ALL PRIVILEGES ON TABLE "DeploymentLog" TO dnduser;
