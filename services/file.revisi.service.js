const prisma = require('../utils/client');
const errorHandler = require('../utils/error');
const path = require('path');
const fs = require('fs');

class FileRevisi {
    constructor() {
        this.prisma = prisma;
    }

    async findOne(req) {
        try {
            return await this.prisma.fileRevisi.findUnique({
                include: {
                    pengajuan: true
                },
                where: {
                    id: Number(req.params.id)
                }
            })
        } catch (e) {
            throw e;
        }
    }

    async findAll(req) {
        try {
            const { pengajuan_id } = req.query;
            return await this.prisma.fileRevisi.findMany({
                where: {
                    pengajuan_id: Number(pengajuan_id)
                }
            })

        } catch (e) {
            throw e;
        }
    }

    async create(req) {
        try {
            return await this.prisma.fileRevisi.create({
                data: {
                    ...req.body,
                }
            })
        } catch (e) {
            throw e;
        }
    }

    async update(req) {
        try {
            const exist = await this.findOne(req);
            if (!exist) {
                return errorHandler.notFound('Data not found');
            }
            return await this.prisma.fileRevisi.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    ...req.body,
                }
            })
        } catch (e) {
            throw e;
        }
    }

    deleteFile(file) {
        if (fs.existsSync(path.join(__dirname, '../../uploads/' + file))) {
            fs.unlinkSync(path.join(__dirname, '../../uploads/' + file));
        }
    }

    async uploadFile(req) {
        try {
            const exist = await this.findOne(req);
            if (!exist) {
                return errorHandler.notFound('Data not found');
            }

            if (exist.file) {
                this.deleteFile(exist.file);
            }


            return await this.prisma.fileRevisi.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    file: req.file.fileName,
                }
            })
        } catch (e) {
            throw e;
        }
    }

    async delete(req) {
        try {
            const exist = await this.findOne(req);
            if (!exist) {
                return errorHandler.notFound('Data not found');
            }
            return await this.prisma.fileRevisi.delete({
                where: {
                    id: Number(req.params.id),
                }
            })
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new FileRevisi();