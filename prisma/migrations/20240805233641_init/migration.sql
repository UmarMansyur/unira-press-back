/*
  Warnings:

  - You are about to alter the column `publish_date` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pengajuan` ADD COLUMN `view_count` INTEGER NOT NULL DEFAULT 0,
    MODIFY `publish_date` DATETIME NULL;

-- CreateTable
CREATE TABLE `tentang_kami` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
