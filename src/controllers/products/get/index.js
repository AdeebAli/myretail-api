const logger = require('../../../logger');
const { getRedSkyProductData, getMongoProductPriceData } = require('../../../services/productService');

const controller = async (req, res) => {
  const { params: { id: productId } } = req;
  if (!productId) {
    res.status(400).send('Please include a valid product id in the request');
  }
  try {
    const redSkyProductData = await getRedSkyProductData({ productId });
    const mongoProductPriceData = await getMongoProductPriceData({ productId });
    if (!redSkyProductData) {
      res.status(404).send(`Product data for ID ${productId} not found`);
    }
    if (!mongoProductPriceData) {
      res.status(404).send(`Price data for ID ${productId} not found`);
    }
    const { product_description: { title }, tcin } = redSkyProductData.product.item;
    const responseBody = {
      id: tcin,
      name: title,
      current_price: mongoProductPriceData
    };

    res.status(200).send(responseBody);
  } catch (error) {
    res.status(500).send('Internal Server Error');
    logger.error(error);
  }
};

module.exports = controller;
