const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	spec: Schema.Types.Mixed
});

module.exports = mongoose.model('Product', productSchema);
