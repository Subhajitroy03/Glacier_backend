/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `lakereport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lakereport` DROP COLUMN `imageUrl`,
    ADD COLUMN `palit` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `subhajit` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `sukalpo` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `sukrit` DOUBLE NOT NULL DEFAULT 0.0;
