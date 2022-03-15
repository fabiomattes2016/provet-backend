/*
  Warnings:

  - A unique constraint covering the columns `[razaoSocial]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpnj]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefoneComercial]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[celular]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpfResponsavel]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clientes_razaoSocial_key" ON "clientes"("razaoSocial");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpnj_key" ON "clientes"("cpnj");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_telefoneComercial_key" ON "clientes"("telefoneComercial");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_celular_key" ON "clientes"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpfResponsavel_key" ON "clientes"("cpfResponsavel");
