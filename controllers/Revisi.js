const filerevisi = require('../services/file.revisi.service');

const create = async (req, res) => {
    try {
        const result = await filerevisi.create(req);
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}

const update = async (req, res) => {
    try {
        const result = await filerevisi.update(req);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}

const destroy = async (req, res) => {
    try {
        const result = await filerevisi.delete(req);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}

const getAll = async (req, res) => {
    try {
        const result = await filerevisi.findAll(req);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = {
    create,
    update,
    destroy,
}