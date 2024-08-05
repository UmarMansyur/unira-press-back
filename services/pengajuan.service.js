const prisma = require('../utils/client');
const errorHandler = require('../utils/error');
const path = require('path');
const fs = require('fs');

class PengajuanService {
    constructor() {
        this.prisma = prisma;
    }

    async findOne(req) {
        try {
            const result = await this.prisma.submission.findUnique({
                include: {
                    category_reader: true,
                    category_type: true,
                    type_reference: true,
                    FileRevisi: true,
                    Comment: true,
                    media: true,
                },
                where: {
                    id: Number(req.params.id)
                }
            });
            if(!result) {
                return errorHandler.notFound('Data not found');
            }
            result.cover = result.cover ? process.env.BASE_URL + '/uploads/' + result.cover : null;
            return result;
        } catch (e) {
            throw e;
        }
    }

    async findAll(req) {
        try {

            const { page = 1, limit = 10, search = "" } = req.query;
            const offset = page * limit - limit;

            const where = {};

            const { role } = req.user;

            if (role === 'client') {
                where.nomor_induk = req.user.id;
            }

            if (search !== "") {
                where.nomor_induk = {
                    contains: search
                };
            }


            const data = await this.prisma.submission.findMany({
                skip: Number(offset),
                take: Number(limit),
                where
            });
            const total = await this.prisma.submission.count({
                where
            });

            return {
                data,
                total,
                total_page: Math.ceil(total / limit),
                current_page: page,
            };
        } catch (e) {
            throw e;
        }
    }

    async create(req) {
        const file = req.file ? req.file.fileName : null;
        if (file) {
            req.body.file = file;
        }
        req.body.readerCategoryId = Number(req.body.readerCategoryId);
        req.body.referenceTypeId = Number(req.body.referenceTypeId);
        req.body.typeCategoryId = Number(req.body.typeCategoryId);
        req.body.mediaId = Number(req.body.mediaId);
        return await this.prisma.submission.create({
            data: {
                ...req.body,
            }
        });
    }

    async update(req) {
        try {
            const exist = await this.findOne(req);
            if (!exist) {
                return errorHandler.notFound('Data not found');
            }
            if (req.file) {
                this.deleteFile(exist.file);
                req.body.file = req.file.fileName;
            }
            return await this.prisma.submission.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    ...req.body,
                }
            });
        } catch (e) {
            throw e;
        }
    }

    deleteFile(file) {
        if (fs.existsSync(path.join(__dirname, '../uploads/' + file))) {
            fs.unlinkSync(path.join(__dirname, '../uploads/' + file));
        }
    }

    async cover(req) {
        const file = req.file ? req.file.fileName : null;
        if (file) {
            req.body.cover = file;
        }
        const exist = await this.findOne(req);
        if (exist.cover) {
            this.deleteFile(exist.cover);
        }
        await this.prisma.submission.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                cover: req.file.filename,
            }
        });
    }



    async delete(req) {
        try {
            const exist = await this.findOne(req);
            if (!exist) {
                return errorHandler.notFound('Data not found');
            }
            return await this.prisma.submission.delete({
                where: {
                    id: Number(req.params.id),
                }
            });
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new PengajuanService();