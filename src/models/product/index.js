const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  id: String,
  name: String,
  current_price: {
    value: Number,
    currency_code: String,
  },
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
