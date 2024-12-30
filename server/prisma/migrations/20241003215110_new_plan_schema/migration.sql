/*
  Warnings:

  - You are about to drop the column `billing_day` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_amount` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "billing_day",
DROP COLUMN "transaction_amount";

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "collector_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "frequency_type" TEXT NOT NULL,
    "transaction_amount" DECIMAL(65,30) NOT NULL,
    "currency_id" TEXT NOT NULL,
    "billing_day" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_key" ON "Plan"("id");
