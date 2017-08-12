const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	filename: String,
	uploadDate: Date,
	path: String,
	size: Number
});

const productSchema = new mongoose.Schema({
	spec: {
		type: String,
		hebName: String,
		engName: String,
		formulaIdNumber: Number,
		category1: String,
		category2: String,
		category3: String,
    formulaUsedSince: Date,
    physicalForm: String,
		physicalFormOther: String,
		physicalFormFiles: [fileSchema],
		siteOfApplication: String,
		userSex: String,
		consumerAgeRange: String,
		maxFrequencyOfUse: String,
		amountPerApplication: String,
		leaveOrRinse: String,
		shelfLife: String,
		shelfLifeExpiration: String,
		shelfLifePoa: String,
		oneTimeUse: Boolean,
		airTight: Boolean,
		shelfLifeOther: Boolean,
    shelfLifeOtherText: String,
		shelfLifeFiles: [fileSchema],
    batchCodeMethodFiles: [fileSchema],
		country: String,
    certOfFreeSaleFiles: [fileSchema],
		gmpFiles: [fileSchema]
 	}
});

module.exports = mongoose.model('Product', productSchema);
