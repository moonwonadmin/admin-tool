const Promise = require('bluebird');
const ProductSchema = require('../models/product');
const BG_COLOR = require('../config').BG_COLOR;

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
        bg: BG_COLOR[shopId]
      });
    });
}

module.exports = {
  getMobileProduct
}