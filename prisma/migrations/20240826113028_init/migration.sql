/*
  Warnings:

  - You are about to drop the column `desainier` on the `buku` table. All the data in the column will be lost.
  - The values [fiksi,non_fiksi] on the enum `buku_tipe_kepenulisan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `buku` DROP COLUMN `desainier`,
    ADD COLUMN `desainer` VARCHAR(200) NULL,
    ADD COLUMN `nomor_hp_penanggung_jawab` VARCHAR(19) NULL,
    MODIFY `tipe_kepenulisan` ENUM('naskah_pribadi', 'lebih_dari_satu', 'naskah_umum') NOT NULL;
