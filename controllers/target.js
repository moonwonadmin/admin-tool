const ProductSchema = require('../models/product');
const BG_COLOR = require('../config').BG_COLOR;

const getProducts = function(req, res, next) {
  const { shopId } = req.params;

  return ProductSchema.find({
    isTarget: true,
    company: shopId,
  })
  .sort({ isAuto: -1, isFavorite: -1, order: 1 })
  .exec((err, data) => {
    res.render('target/index', {
      payload: data,
      shopId,
      bg: BG_COLOR[shopId]
    });
  });
};

module.exports = {
  getProducts
}
