const logger = require('../../../logger');
const { getRedSkyProductData, getMongoProductPriceData } = require('../../../services/productService');

const controller = async (req, res) => {
  const { params: { id: productId } } = req;
  try {
    const redSkyProductData = await getRedSkyProductData({ productId });
    const mongoProductPriceData = await getMongoProductPriceData({ productId });
    if (!redSkyProductData) {
      logger.error('could not find RedSky product data');
      return res.status(404).send(`Product data for ID ${productId} not found`);
    }

    const { product_description: { title }, tcin } = redSkyProductData.product.item;
    const responseBody = {
      id: tcin,
      name: title,
      current_price: mongoProductPriceData
    };

    return res.status(200).send(responseBody);
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = controller;
