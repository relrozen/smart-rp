const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  _id: Number,
  inci_name: String,
  cas_number: String,
  ec_number: String,
  description: String,
  restrictions: String,
  error: String,
  color_index_number: String,
  color: String,
  product_type_body_parts: String,
  max_concentration: String,
  other: String,
  warning: String,
  identified_substances: String,
  func: String,
  update_date: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
