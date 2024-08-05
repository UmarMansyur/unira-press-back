const comment = require('../services/comment.service');

const create = async (req, res, next) => {
    try {
        const result = await comment.create(req);
        res.status(201).json(result);
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await comment.update(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await comment.delete(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await comment.findAll(req);
        res.status(200).json(result);
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    destroy,
    getAll
}