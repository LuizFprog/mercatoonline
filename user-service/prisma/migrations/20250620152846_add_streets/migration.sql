/*
  Warnings:

  - Added the required column `street` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "states_name_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "street" TEXT NOT NULL;
