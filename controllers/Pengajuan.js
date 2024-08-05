const pengajuanService = require('../services/pengajuan.service');

const create = async (req, res, next) => {
    try {
        const result = await pengajuanService.create(req);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res) => {
    try {
        const result = await pengajuanService.update(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        res.status(400).json(e);
    }
}

const destroy = async (req, res) => {
    try {
        const result = await pengajuanService.delete(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        res.status(400).json(e);
    }
}

const getAll = async (req, res) => {
    try {
        const result = await pengajuanService.findAll(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        res.status(400).json(e);
    }
}

const uploadFile = async (req, res) => {
    try {
        const result = await pengajuanService.uploadFile(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = {
    create,
    update,
    destroy,
    uploadFile
}