const mongoose = require('../db/db').mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true, dropDups: true },
  storefarmChannelProductNo: String,
  salePrice: String,
  sellerImmediateDiscountAmount: String,
  statusType: String, //"SALE"
  sellerManagementCode: String,
  baseDeliveryFee: Number,
  productName: String,
  parsingUrl: String,
  targetUrl: [String],
  ikeaPrice: { type: Number, default: 0 },
  realDeliveryFee: { type: Number, default: 0 },
  stockQuantity: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  targetPrice: { type: Number, default: 0 },
  isAuto: { type: Boolean, default: false },
  isNormal: { type: Boolean, default: true },
  isTarget: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false },
  isOut: { type: Boolean, default: false },
  isPriceline: { type: Boolean, default: false },
  isSame: { type: Boolean, default: false },
  group: { type: Number, default: 0 },
  page: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  modifiedDate: { type: Date, default: Date.now },
  company: String,
});

ProductSchema.plugin(AutoIncrement, {inc_field: 'order'});

module.exports = mongoose.model('Product', ProductSchema);
