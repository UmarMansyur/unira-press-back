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

const cover = async (req, res, next) => {
    try {
        const result = await pengajuanService.cover(req);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await pengajuanService.update(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await pengajuanService.delete(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await pengajuanService.findAll(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}


const getOne = async (req, res, next) => {
    try {
        const result = await pengajuanService.findOne(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    destroy,
    cover,
    getAll,
    getOne
}