-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `lakereport` DROP FOREIGN KEY `LakeReport_uploadedById_fkey`;

-- DropForeignKey
ALTER TABLE `lakereport` DROP FOREIGN KEY `LakeReport_verifiedById_fkey`;

-- DropForeignKey
ALTER TABLE `official` DROP FOREIGN KEY `Official_verifiedById_fkey`;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `official` ADD CONSTRAINT `official_verifiedById_fkey` FOREIGN KEY (`verifiedById`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lakereport` ADD CONSTRAINT `lakereport_uploadedById_fkey` FOREIGN KEY (`uploadedById`) REFERENCES `official`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lakereport` ADD CONSTRAINT `lakereport_verifiedById_fkey` FOREIGN KEY (`verifiedById`) REFERENCES `official`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `admin` RENAME INDEX `Admin_email_key` TO `admin_email_key`;

-- RenameIndex
ALTER TABLE `official` RENAME INDEX `Official_email_key` TO `official_email_key`;
