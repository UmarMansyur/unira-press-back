/*
  Warnings:

  - You are about to alter the column `size` on the `file_revisi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Double`.
  - You are about to alter the column `publish_date` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `file_revisi` MODIFY `size` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `pengajuan` MODIFY `publish_date` DATETIME NULL;
