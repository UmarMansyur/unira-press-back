/*
  Warnings:

  - The values [naskah_umum] on the enum `buku_tipe_kepenulisan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `buku` MODIFY `tipe_identifikasi` ENUM('ISBN', 'QRCBN', 'hanya_cetak', 'hanya_publish') NOT NULL,
    MODIFY `tipe_kepenulisan` ENUM('naskah_pribadi', 'lebih_dari_satu', 'naskah_komunitas') NOT NULL;
