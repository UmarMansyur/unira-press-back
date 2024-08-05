/*
  Warnings:

  - You are about to alter the column `publish_date` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `name` to the `file_revisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `file_revisi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file_revisi` ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `size` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `pengajuan` MODIFY `publish_date` DATETIME NULL;
