/*
  Warnings:

  - You are about to alter the column `page_count` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `height` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `status_publish` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - Added the required column `nomor_induk` to the `pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengajuan` ADD COLUMN `nomor_induk` VARCHAR(25) NOT NULL,
    ADD COLUMN `publish_date` DATETIME NULL,
    MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `author` VARCHAR(255) NOT NULL,
    MODIFY `sinopsis` TEXT NOT NULL,
    MODIFY `distribution` TEXT NOT NULL,
    MODIFY `link` VARCHAR(255) NOT NULL,
    MODIFY `edition` VARCHAR(255) NOT NULL,
    MODIFY `series` VARCHAR(255) NOT NULL,
    MODIFY `publish_year` VARCHAR(255) NOT NULL,
    MODIFY `page_count` VARCHAR(20) NOT NULL,
    MODIFY `height` VARCHAR(20) NOT NULL,
    MODIFY `status_publish` VARCHAR(100) NOT NULL;
