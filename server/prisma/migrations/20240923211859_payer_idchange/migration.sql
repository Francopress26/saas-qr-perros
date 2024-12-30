/*
  Warnings:

  - The `payer_id` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "payer_id",
ADD COLUMN     "payer_id" INTEGER;
