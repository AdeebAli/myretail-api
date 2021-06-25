const router = require('express').Router();

const getController = require('../../controllers/base/get');

router.get('/', getController);

module.exports = router;
