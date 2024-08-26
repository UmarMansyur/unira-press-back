/*
  Warnings:

  - You are about to drop the column `desainer_id` on the `buku` table. All the data in the column will be lost.
  - You are about to drop the column `editor_id` on the `buku` table. All the data in the column will be lost.
  - You are about to drop the column `layouter_id` on the `buku` table. All the data in the column will be lost.
  - You are about to drop the column `proofreader_id` on the `buku` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `buku` DROP FOREIGN KEY `buku_desainer_id_fkey`;

-- DropForeignKey
ALTER TABLE `buku` DROP FOREIGN KEY `buku_editor_id_fkey`;

-- DropForeignKey
ALTER TABLE `buku` DROP FOREIGN KEY `buku_layouter_id_fkey`;

-- DropForeignKey
ALTER TABLE `buku` DROP FOREIGN KEY `buku_proofreader_id_fkey`;

-- AlterTable
ALTER TABLE `buku` DROP COLUMN `desainer_id`,
    DROP COLUMN `editor_id`,
    DROP COLUMN `layouter_id`,
    DROP COLUMN `proofreader_id`,
    ADD COLUMN `desainier` VARCHAR(200) NULL,
    ADD COLUMN `editor` VARCHAR(200) NULL,
    ADD COLUMN `layouter` VARCHAR(200) NULL,
    ADD COLUMN `proofreader` VARCHAR(200) NULL;
