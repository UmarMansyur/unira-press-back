-- CreateTable
CREATE TABLE `pengguna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `nama` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `thumbnail` VARCHAR(200) NULL,
    `type` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `phone` VARCHAR(13) NULL,
    `is_simat` BOOLEAN NOT NULL DEFAULT false,
    `has_verified_email` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pengguna_username_key`(`username`),
    UNIQUE INDEX `pengguna_email_key`(`email`),
    UNIQUE INDEX `pengguna_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hak_akses_pengguna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_berita` VARCHAR(200) NOT NULL,
    `isi` TEXT NOT NULL,
    `cover` VARCHAR(200) NOT NULL,
    `dilihat` INTEGER NOT NULL DEFAULT 0,
    `penulis_id` INTEGER NOT NULL,
    `tanggal_publish` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_buku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kategori_buku_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori_buku_id` INTEGER NOT NULL,
    `layouter_id` INTEGER NOT NULL,
    `proofreader_id` INTEGER NOT NULL,
    `editor_id` INTEGER NOT NULL,
    `desainer_id` INTEGER NOT NULL,
    `pengarang` VARCHAR(200) NOT NULL,
    `judul` VARCHAR(200) NOT NULL,
    `sinopsis` TEXT NOT NULL,
    `file_cover` VARCHAR(200) NULL,
    `tipe_identifikasi` ENUM('ISBN', 'QRCBN', 'hanya_cetak') NOT NULL,
    `isbn` VARCHAR(200) NULL,
    `jumlah_halaman` INTEGER NOT NULL,
    `ukuran` VARCHAR(200) NOT NULL,
    `tanggal_pengajuan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_publish` DATETIME(3) NOT NULL,
    `harga` INTEGER NULL,
    `tipe_kepenulisan` ENUM('fiksi', 'non_fiksi') NOT NULL,
    `penanggung_jawab` VARCHAR(200) NOT NULL,
    `tahun_terbit` INTEGER NOT NULL,
    `dilihat` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Book_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanISBN` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `status` ENUM('proses', 'permohonan_revisi', 'ditolak', 'isbn_diterbitkan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanBuku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `pengguna_id` INTEGER NOT NULL,
    `status_pengajuan` ENUM('ditolak', 'diterima_untuk_ditinjau', 'revisi', 'proses_cetak', 'diterbitkan') NOT NULL,
    `alasan_penolakan` TEXT NULL,
    `tanggal_ditolak` DATETIME(3) NULL,
    `tanggal_diterima` DATETIME(3) NULL,
    `tanggal_revisi` DATETIME(3) NULL,
    `tanggal_proses` DATETIME(3) NULL,
    `tanggal_cetak` DATETIME(3) NULL,
    `tanggal_terbit` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FileNaskah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `file_naskah` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RevisiNaskah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengajuan_buku_id` INTEGER NOT NULL,
    `pengguna_id` INTEGER NOT NULL,
    `is_editor` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengguna_id` INTEGER NOT NULL,
    `buku_id` INTEGER NOT NULL,
    `total_pembayaran` INTEGER NOT NULL,
    `status` ENUM('belum_dibayar', 'sudah_dibayar', 'gagal') NOT NULL,
    `tanggal_bayar` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hak_akses_pengguna` ADD CONSTRAINT `hak_akses_pengguna_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hak_akses_pengguna` ADD CONSTRAINT `hak_akses_pengguna_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_penulis_id_fkey` FOREIGN KEY (`penulis_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_kategori_buku_id_fkey` FOREIGN KEY (`kategori_buku_id`) REFERENCES `kategori_buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_layouter_id_fkey` FOREIGN KEY (`layouter_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_proofreader_id_fkey` FOREIGN KEY (`proofreader_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_editor_id_fkey` FOREIGN KEY (`editor_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_desainer_id_fkey` FOREIGN KEY (`desainer_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanISBN` ADD CONSTRAINT `PengajuanISBN_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanBuku` ADD CONSTRAINT `PengajuanBuku_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanBuku` ADD CONSTRAINT `PengajuanBuku_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileNaskah` ADD CONSTRAINT `FileNaskah_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RevisiNaskah` ADD CONSTRAINT `RevisiNaskah_pengajuan_buku_id_fkey` FOREIGN KEY (`pengajuan_buku_id`) REFERENCES `PengajuanBuku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RevisiNaskah` ADD CONSTRAINT `RevisiNaskah_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
