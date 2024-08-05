-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_pembaca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_pustaka` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_jenis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengajuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_induk` VARCHAR(25) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `sinopsis` TEXT NOT NULL,
    `distribution` TEXT NOT NULL,
    `link` VARCHAR(255) NULL,
    `edition` VARCHAR(255) NOT NULL,
    `series` VARCHAR(255) NOT NULL,
    `publish_year` VARCHAR(255) NOT NULL,
    `page_count` VARCHAR(20) NOT NULL,
    `height` VARCHAR(20) NOT NULL,
    `width` VARCHAR(20) NOT NULL,
    `weight` VARCHAR(20) NOT NULL,
    `status_publish` VARCHAR(100) NOT NULL,
    `publish_date` DATETIME NULL,
    `cover` VARCHAR(255) NULL,
    `mediaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `readerCategoryId` INTEGER NOT NULL,
    `referenceTypeId` INTEGER NOT NULL,
    `typeCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_revisi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file` VARCHAR(255) NOT NULL,
    `pengajuan_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_induk` VARCHAR(25) NOT NULL,
    `isClient` BOOLEAN NOT NULL,
    `comment` TEXT NOT NULL,
    `pengajuan_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pengajuan` ADD CONSTRAINT `pengajuan_readerCategoryId_fkey` FOREIGN KEY (`readerCategoryId`) REFERENCES `kategori_pembaca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan` ADD CONSTRAINT `pengajuan_referenceTypeId_fkey` FOREIGN KEY (`referenceTypeId`) REFERENCES `jenis_pustaka`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan` ADD CONSTRAINT `pengajuan_typeCategoryId_fkey` FOREIGN KEY (`typeCategoryId`) REFERENCES `kategori_jenis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan` ADD CONSTRAINT `pengajuan_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_revisi` ADD CONSTRAINT `file_revisi_pengajuan_id_fkey` FOREIGN KEY (`pengajuan_id`) REFERENCES `pengajuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_pengajuan_id_fkey` FOREIGN KEY (`pengajuan_id`) REFERENCES `pengajuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
