const Promise = require('bluebird');
const ProductSchema = require('../models/product');
const ProductController = require('./product');
const messages = require('../config/message');
const moment = require('moment');
const SHOP_NAME = require('../config').SHOP_NAME;

const getProducts = function(req, res, next) {
  const { shopId } = req.params;
  // const { group } = req.query;

  const findQuery = {
    isNormal: true,
    company: shopId,
  };

  // if (group) {
  //   Object.assign(findQuery, {
  //     group
  //   });
  // } else {
  //   Object.assign(findQuery, {
  //     group: 1,
  //   });
  // }

  return ProductSchema.find(findQuery)
  .sort({ isAuto: -1, isFavorite: -1, page: 1, group: 1 })
  .exec((err, data) => {
    res.render('normal/index', {
      payload: data,
      shopId,
      shopName: SHOP_NAME[shopId],
    });
  });
};

const getProductById = function(req, res, next) {
  const { id, shopId } = req.params;
  const { origin } = req.query;

  console.log(origin)

  return ProductController.getProductById({
    id,
    shopId,
  }).then((data) => {
    let returnData = null;

    if (data.length > 0) returnData = data[0];

    res.render('normal/detail', {
      id: id,
      payload: returnData,
      shopId,
      origin,
    });
  })
};

const modifyUrlsById = function(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  
  return ProductController.updateUrlsById(id, data).then((data) => {
    res.status(200).send({
      message: messages.success
    })
  });
}

module.exports = {
  getProducts,
  getProductById,
  modifyUrlsById
}
