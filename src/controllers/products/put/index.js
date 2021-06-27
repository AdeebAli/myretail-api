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

  try {
    const mongoProductPrice = await updateMongoProductPrice({
      productId, priceData: { value, currency_code }
    });
    /* eslint-disable camelcase */
    const { id, current_price } = mongoProductPrice;
    /* eslint-enable camelcase */
    return res.status(201).send({ id, current_price });
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = controller;
