const router = require('express').Router();
const commentController = require('../controllers/comment');


router.post('/', commentController.create);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.destroy);
router.get('/', commentController.getAll);


module.exports = router;