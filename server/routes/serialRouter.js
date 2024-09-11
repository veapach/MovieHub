const Router = require('express');
const router = new Router();
const serialController = require('../controller/serialController');
const checkRole = require('../middleware/checkRoleMiddleware');

//checkRole('ADMIN')

router.post('/', serialController.createSerial);
router.get('/', serialController.getSerials);
router.get('/:id', serialController.getSerialById);
router.put('/:id', serialController.editSerial);
router.delete('/:id', serialController.deleteSerial);

module.exports = router;
