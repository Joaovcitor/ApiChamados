/*
  Warnings:

  - You are about to drop the column `assigneeId` on the `Chamado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chamado" DROP CONSTRAINT "Chamado_assigneeId_fkey";

-- DropIndex
DROP INDEX "public"."Chamado_assigneeId_idx";

-- AlterTable
ALTER TABLE "Chamado" DROP COLUMN "assigneeId";
