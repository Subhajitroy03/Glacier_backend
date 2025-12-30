-- DropForeignKey
ALTER TABLE `lakereport` DROP FOREIGN KEY `LakeReport_verifiedById_fkey`;

-- DropIndex
DROP INDEX `LakeReport_verifiedById_fkey` ON `lakereport`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `lakereport` MODIFY `verificationStatus` ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'VERIFIED';

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LakeReport` ADD CONSTRAINT `LakeReport_verifiedById_fkey` FOREIGN KEY (`verifiedById`) REFERENCES `Official`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
