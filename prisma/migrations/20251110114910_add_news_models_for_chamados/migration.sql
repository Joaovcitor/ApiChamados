/*
  Warnings:

  - A unique constraint covering the columns `[departmentId,userId]` on the table `ListDepartmentUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SlaStatus" AS ENUM ('OK', 'IMMINENT', 'BREACHED');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('CHAMADO', 'USER', 'CATEGORY', 'DEPARTMENT', 'SLA', 'WORKFLOW');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RolesUser" ADD VALUE 'COORDENADOR';
ALTER TYPE "RolesUser" ADD VALUE 'SUPERVISOR';

-- CreateTable
CREATE TABLE "TicketWatcher" (
    "userId" INTEGER NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketWatcher_pkey" PRIMARY KEY ("userId","chamadoId")
);

-- CreateTable
CREATE TABLE "TicketAssignmentHistory" (
    "id" SERIAL NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "fromUserId" INTEGER,
    "toUserId" INTEGER,
    "reason" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketAssignmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlaPolicy" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER,
    "categoryId" INTEGER,
    "responseTimeMinutes" INTEGER NOT NULL,
    "resolutionTimeMinutes" INTEGER NOT NULL,
    "workingWindow" TEXT,
    "pauseOnStatuses" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlaPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlaState" (
    "id" SERIAL NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "policyId" INTEGER NOT NULL,
    "responseDueAt" TIMESTAMP(3) NOT NULL,
    "resolutionDueAt" TIMESTAMP(3) NOT NULL,
    "paused" BOOLEAN NOT NULL DEFAULT false,
    "status" "SlaStatus" NOT NULL DEFAULT 'OK',
    "lastTickAt" TIMESTAMP(3),

    CONSTRAINT "SlaState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowDefinition" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "definition" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowInstance" (
    "id" SERIAL NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "currentState" TEXT NOT NULL,
    "data" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "entityType" "AuditEntity" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "actorId" INTEGER,
    "action" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationEvent" (
    "id" SERIAL NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextTryAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TicketWatcher_chamadoId_idx" ON "TicketWatcher"("chamadoId");

-- CreateIndex
CREATE INDEX "TicketAssignmentHistory_chamadoId_idx" ON "TicketAssignmentHistory"("chamadoId");

-- CreateIndex
CREATE INDEX "TicketAssignmentHistory_createdAt_idx" ON "TicketAssignmentHistory"("createdAt");

-- CreateIndex
CREATE INDEX "SlaPolicy_departmentId_categoryId_idx" ON "SlaPolicy"("departmentId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "SlaState_chamadoId_key" ON "SlaState"("chamadoId");

-- CreateIndex
CREATE INDEX "SlaState_status_idx" ON "SlaState"("status");

-- CreateIndex
CREATE INDEX "SlaState_responseDueAt_idx" ON "SlaState"("responseDueAt");

-- CreateIndex
CREATE INDEX "SlaState_resolutionDueAt_idx" ON "SlaState"("resolutionDueAt");

-- CreateIndex
CREATE INDEX "WorkflowDefinition_categoryId_active_idx" ON "WorkflowDefinition"("categoryId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowDefinition_categoryId_version_key" ON "WorkflowDefinition"("categoryId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowInstance_chamadoId_key" ON "WorkflowInstance"("chamadoId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_currentState_idx" ON "WorkflowInstance"("currentState");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "NotificationEvent_status_nextTryAt_idx" ON "NotificationEvent"("status", "nextTryAt");

-- CreateIndex
CREATE UNIQUE INDEX "ListDepartmentUser_departmentId_userId_key" ON "ListDepartmentUser"("departmentId", "userId");

-- AddForeignKey
ALTER TABLE "TicketWatcher" ADD CONSTRAINT "TicketWatcher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketWatcher" ADD CONSTRAINT "TicketWatcher_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketAssignmentHistory" ADD CONSTRAINT "TicketAssignmentHistory_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketAssignmentHistory" ADD CONSTRAINT "TicketAssignmentHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlaPolicy" ADD CONSTRAINT "SlaPolicy_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlaPolicy" ADD CONSTRAINT "SlaPolicy_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlaState" ADD CONSTRAINT "SlaState_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlaState" ADD CONSTRAINT "SlaState_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "SlaPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
