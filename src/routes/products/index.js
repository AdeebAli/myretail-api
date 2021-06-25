const router = require('express').Router();

const getController = require('../../controllers/products/get');
const putController = require('../../controllers/products/put');

router.get('/:id', getController);
router.put('/:id', putController);

module.exports = router;
