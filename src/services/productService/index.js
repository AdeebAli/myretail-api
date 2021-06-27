const axios = require('axios');
const { redSkyApi: { url } } = require('../../config');
const logger = require('../../logger');
const ProductModel = require('../../models/product');

const getRedSkyProductData = async ({ productId }) => {
  const response = await axios.get(`${url}/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&amp;key=candidate`);
  return response.data;
};

const getMongoProductPriceData = async ({ productId }) => {
  try {
    const productPriceData = await ProductModel.findOne({ id: productId });
    /* eslint-disable camelcase */
    const { value, currency_code } = productPriceData.current_price;
    /* eslint-enable camelcase */
    return { value, currency_code };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const updateMongoProductPrice = async ({ productId, priceData }) => {
  /* eslint-disable camelcase */
  const { value, currency_code } = priceData;
  /* eslint-enable camelcase */

  const productPrice = await ProductModel.findOneAndUpdate(
    { id: productId },
    {
      current_price: {
        value,
        currency_code
      }
    },
    {
      returnOriginal: false,
      upsert: true,
      useFindAndModify: false
    }
  );

  return productPrice;
};

module.exports = {
  getRedSkyProductData,
  getMongoProductPriceData,
  updateMongoProductPrice
};
