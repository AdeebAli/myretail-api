const logger = require('../../../logger');
const { updateMongoProductPrice } = require('../../../services/productService');

const controller = async (req, res) => {
  /* eslint-disable camelcase */
  const {
    params: { id: productId },
    body: {
      current_price: {
        value,
        currency_code
      }
    }
  } = req;
  /* eslint-enable camelcase */

  if (!productId) {
    res.status(400).send('Please include a valid product id in the request');
  }
  try {
    await updateMongoProductPrice({ productId, priceData: { value, currency_code } });
  } catch (error) {
    res.status(500).send('Internal Server Error');
    logger.error(error);
  }
  res.status(200).send(`Succesfully updated price date for Product ${productId}`);
};

module.exports = controller;
