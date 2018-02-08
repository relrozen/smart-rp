const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rawMaterialSchema = new Schema({
  _id: String,
  name: String,
  manufacturer: String,
  ingredients: [Schema.Types.Mixed]
});

module.exports = mongoose.model('RawMaterial', rawMaterialSchema);
