const filerevisi = require('../services/file.revisi.service');

const create = async (req, res, next) => {
    try {
        const result = await filerevisi.create(req);
        res.status(201).json(result);
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await filerevisi.update(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await filerevisi.delete(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await filerevisi.findAll(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    destroy,
}