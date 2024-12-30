/*
  Warnings:

  - Added the required column `plan_id` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "plan_id" TEXT NOT NULL;
