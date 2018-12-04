const Promise = require('bluebird');
const ProductSchema = require('../models/product');
const SHOP_NAME = require('../config').SHOP_NAME;

const getFavoriteProduct = function(req, res, next) {
  const { shopId } = req.params;

  return ProductSchema.find({
    isFavorite: true,
    company: shopId
  })
    .sort({ isAuto: -1, isFavorite: -1, order: 1 })
    .exec((err, data) => {
      res.render('favorite/index', {
        payload: data,
        shopId,
        shopName: SHOP_NAME[shopId],
      });
    });
};

module.exports = {
  getFavoriteProduct
};