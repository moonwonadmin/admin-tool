const Promise = require('bluebird');
const ProductSchema = require('../models/product');
const SHOP_NAME = require('../config').SHOP_NAME;

const getMobileProduct = (req, res, next) => {
  const { shopId } = req.params;

  return ProductSchema.find({
    isMobile: true,
    company: shopId
  })
    .sort({ isAuto: -1, isFavorite: -1, order: 1 })
    .exec((err, data) => {
      res.render('mobile/index', {
        payload: data,
        shopId,
        shopName: SHOP_NAME[shopId],
      });
    });
}

module.exports = {
  getMobileProduct
}