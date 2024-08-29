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
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_berita` VARCHAR(200) NOT NULL,
    `isi` TEXT NOT NULL,
    `cover` VARCHAR(200) NULL,
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
CREATE TABLE `buku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori_buku_id` INTEGER NOT NULL,
    `layouter` VARCHAR(200) NULL,
    `proofreader` VARCHAR(200) NULL,
    `editor` VARCHAR(200) NULL,
    `desainer` VARCHAR(200) NULL,
    `pengarang` VARCHAR(200) NOT NULL,
    `judul` VARCHAR(200) NOT NULL,
    `sinopsis` TEXT NOT NULL,
    `file_cover` VARCHAR(200) NULL,
    `tipe_identifikasi` ENUM('ISBN', 'QRCBN', 'hanya_cetak', 'hanya_publish') NOT NULL,
    `isbn` VARCHAR(200) NULL,
    `jumlah_halaman` INTEGER NULL,
    `ukuran` VARCHAR(200) NULL,
    `tanggal_pengajuan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_publish` DATETIME(3) NULL,
    `harga` INTEGER NULL,
    `tipe_kepenulisan` ENUM('naskah_pribadi', 'lebih_dari_satu', 'naskah_komunitas') NOT NULL,
    `penanggung_jawab` VARCHAR(200) NULL,
    `nomor_hp_penanggung_jawab` VARCHAR(19) NULL,
    `tahun_terbit` INTEGER NULL,
    `dilihat` INTEGER NOT NULL DEFAULT 0,
    `surat_pernyataan` VARCHAR(200) NULL,

    UNIQUE INDEX `buku_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengajuan_isbn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `status` ENUM('proses', 'permohonan_revisi', 'ditolak', 'isbn_diterbitkan') NOT NULL DEFAULT 'proses',
    `alasan_penolakan` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengajuan_buku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `pengguna_id` INTEGER NOT NULL,
    `status_pengajuan` ENUM('ditolak', 'diproses', 'diterima_untuk_ditinjau', 'revisi', 'proses_cetak', 'diterbitkan') NOT NULL DEFAULT 'diproses',
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
CREATE TABLE `file_naskah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buku_id` INTEGER NOT NULL,
    `file_naskah` VARCHAR(200) NOT NULL,
    `keterangan` VARCHAR(200) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revisi_naskah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengajuan_buku_id` INTEGER NOT NULL,
    `pengguna_id` INTEGER NOT NULL,
    `is_editor` BOOLEAN NOT NULL DEFAULT false,
    `komentar` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengguna_id` INTEGER NOT NULL,
    `buku_id` INTEGER NOT NULL,
    `total_pembayaran` DOUBLE NOT NULL DEFAULT 0,
    `keterangan` TEXT NOT NULL,
    `status` ENUM('belum_dibayar', 'sudah_dibayar', 'gagal') NOT NULL DEFAULT 'belum_dibayar',
    `tanggal_bayar` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tentang_kami` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hak_akses_pengguna` ADD CONSTRAINT `hak_akses_pengguna_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `pengguna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hak_akses_pengguna` ADD CONSTRAINT `hak_akses_pengguna_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_penulis_id_fkey` FOREIGN KEY (`penulis_id`) REFERENCES `pengguna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_kategori_buku_id_fkey` FOREIGN KEY (`kategori_buku_id`) REFERENCES `kategori_buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan_isbn` ADD CONSTRAINT `pengajuan_isbn_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan_buku` ADD CONSTRAINT `pengajuan_buku_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengajuan_buku` ADD CONSTRAINT `pengajuan_buku_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_naskah` ADD CONSTRAINT `file_naskah_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revisi_naskah` ADD CONSTRAINT `revisi_naskah_pengajuan_buku_id_fkey` FOREIGN KEY (`pengajuan_buku_id`) REFERENCES `pengajuan_buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revisi_naskah` ADD CONSTRAINT `revisi_naskah_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_pengguna_id_fkey` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
