/*
  Warnings:

  - You are about to alter the column `is_simat` on the `pengguna` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `pengguna` MODIFY `thumbnail` VARCHAR(200) NULL,
    MODIFY `type` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    MODIFY `is_simat` BOOLEAN NOT NULL DEFAULT false;
