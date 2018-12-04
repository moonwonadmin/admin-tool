const ProductSchema = require('../models/product');
const SHOP_NAME = require('../config').SHOP_NAME;

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
      shopName: SHOP_NAME[shopId],
    });
  });
};

module.exports = {
  getProducts
}
