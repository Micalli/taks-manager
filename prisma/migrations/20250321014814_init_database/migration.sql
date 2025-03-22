-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('done', 'active');

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
