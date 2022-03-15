/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `perfis` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "perfis" DROP CONSTRAINT "perfis_usuarioId_fkey";

-- AlterTable
ALTER TABLE "perfis" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "perfilId" INTEGER;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
