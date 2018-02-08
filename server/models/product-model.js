const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  spec: Schema.Types.Mixed,
  formula: Schema.Types.Mixed,
  packaging: Schema.Types.Mixed,
  lab: Schema.Types.Mixed,
  label: Schema.Types.Mixed,
  marketing: Schema.Types.Mixed,
  safety: Schema.Types.Mixed,
  consumers: Schema.Types.Mixed,
  misc: Schema.Types.Mixed
});

module.exports = mongoose.model('Product', productSchema);
