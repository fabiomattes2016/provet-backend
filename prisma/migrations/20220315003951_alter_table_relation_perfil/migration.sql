/*
  Warnings:

  - You are about to drop the `_PerfilToUsuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PerfilToUsuario" DROP CONSTRAINT "_PerfilToUsuario_A_fkey";

-- DropForeignKey
ALTER TABLE "_PerfilToUsuario" DROP CONSTRAINT "_PerfilToUsuario_B_fkey";

-- AlterTable
ALTER TABLE "perfis" ADD COLUMN     "usuarioId" INTEGER;

-- DropTable
DROP TABLE "_PerfilToUsuario";

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
