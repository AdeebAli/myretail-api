const express = require('express');
const baseRouter = require('./base');
const productRouter = require('./products');

const router = express.Router();

router.use('/', baseRouter);
router.use('/products', productRouter);

module.exports = router;
