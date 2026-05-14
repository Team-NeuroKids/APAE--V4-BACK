/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `children` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "children_cpf_key" ON "children"("cpf");
