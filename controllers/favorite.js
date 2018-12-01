const Promise = require('bluebird');
const ProductSchema = require('../models/product');
const BG_COLOR = require('../config').BG_COLOR;

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
        bg: BG_COLOR[shopId]
      });
    });
};

module.exports = {
  getFavoriteProduct
};