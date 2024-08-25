/*
  Warnings:

  - Added the required column `komentar` to the `revisi_naskah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buku` MODIFY `jumlah_halaman` INTEGER NULL;

-- AlterTable
ALTER TABLE `revisi_naskah` ADD COLUMN `komentar` TEXT NOT NULL;
