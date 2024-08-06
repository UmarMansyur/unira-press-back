/*
  Warnings:

  - You are about to alter the column `publish_date` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pengajuan` MODIFY `publish_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `tentang_kami` MODIFY `content` LONGTEXT NOT NULL;
