/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cliente` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_clienteId_fkey";

-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "clienteId",
ADD COLUMN     "cliente" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cliente";
