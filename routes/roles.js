const router = require('express').Router();
const RoleController = require('../controllers/role');
const auth = require('../middlewares/authorization');

const roleController = new RoleController();

router.post('/', auth('Administrator'), roleController.create.bind(roleController));
router.put('/:id', auth('Administrator'), roleController.update.bind(roleController));
router.delete('/:id', auth('Administrator'), roleController.delete.bind(roleController));
router.get('/', roleController.findAll.bind(roleController));
router.get('/:id', roleController.findById.bind(roleController));


module.exports = router;