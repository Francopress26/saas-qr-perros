/*
  Warnings:

  - You are about to drop the column `status` on the `Mascota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mascota" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN;
