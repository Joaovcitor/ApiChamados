-- AlterTable
ALTER TABLE "Chamado" ADD COLUMN     "onlyOneAssignee" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserManyAssignees" (
    "userId" INTEGER NOT NULL,
    "chamadoId" INTEGER NOT NULL,

    CONSTRAINT "UserManyAssignees_pkey" PRIMARY KEY ("userId","chamadoId")
);

-- AddForeignKey
ALTER TABLE "UserManyAssignees" ADD CONSTRAINT "UserManyAssignees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserManyAssignees" ADD CONSTRAINT "UserManyAssignees_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
