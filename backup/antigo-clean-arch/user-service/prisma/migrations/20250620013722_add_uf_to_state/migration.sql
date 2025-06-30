/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `states` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uf]` on the table `states` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uf` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "cities_id_seq";

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "uf" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "states_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");
