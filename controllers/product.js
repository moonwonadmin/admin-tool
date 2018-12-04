const Promise = require('bluebird');
const CommonController = require('./common');
const ProductSchema = require('../models/product');
const messages = require('../config/message');
const moment = require('moment');

const updateById = function(req, res, next) {
  const id = +req.params.id;
  let newData = Object.assign(req.body);

  if (newData.isAuto) {
    newData.isAuto = newData.isAuto === 'true' ? true : false;
  }
  if (newData.isFavorite) {
    newData.isFavorite = newData.isFavorite === 'true' ? true : false;
  }

  if (newData.min){
    newData.min = +newData.min;
  }
  if (newData.max){
    newData.max = +newData.max;
  }
  if (newData.realDeliveryFee){
    newData.realDeliveryFee = +newData.realDeliveryFee;
  }

  ProductSchema.findOneAndUpdate(
    { id: id},
    newData
  ).exec((err, data) => {
    if (err) return res.status(500).json({message: messages.fails});

    res.status(200).send({
      message: messages.success
    });
  });
}

const deleteById = function(req, res, next) {
  const id = req.params.id;

  ProductSchema.remove(
    { id: id}
  ).exec((err, data) => {
    res.status(200).send({
      status: 200,
      message: messages.success
    });
  });
}

const statusToggleById = function(req, res, next) {
  const id = req.params.id;
  let newData = Object.assign(req.body);

  newData.isNormal = newData.isNormal === 'true' ? true : false;
  newData.isTarget = newData.isTarget === 'true' ? true : false;
  newData.isMobile = newData.isMobile === 'true' ? true : false;

  ProductSchema.findOneAndUpdate(
    { id: id},
    newData
  ).exec((err, data) => {
    if (err) return res.status(500).send({message: messages.fails});

    res.status(200).send({
      message: messages.success
    });
  });
}

const initProducts = function(req, res, next) {
  let itemList = req.body;
  CommonController.listUpdate(itemList).then((data) => {
    res.status(200).json({
      status: 200
    });
  });
}

const getProductById = function(params) {
  const { id, shopId } = params;

  return new Promise((resolve, reject) => {
    ProductSchema.find(
      {
        storefarmChannelProductNo: id,
        company: shopId
      }
    ).exec((err, data) => {
      resolve(data);
    })
  });
}

const updateUrlsById = function(id, data) {
  return new Promise((resolve, reject) => {
    ProductSchema.findOneAndUpdate(
      {id: +id},
      data,
      {
        upsert: true,
        new: true
      }
    ).exec((err, data) => {
      resolve('ok');
    });
  });
}

const getProductsByStatus = function(req, res, next) {
  const {type, shopId} = req.params;
  let query = {
    company: shopId,
  };

  if (type === 'target') {
    query['isAuto'] = true;
    query['isTarget'] = true;
  } else if (type === 'normal') {
    query['isAuto'] = true;
    query['isNormal'] = true;
  } else if (type === 'moblie') {
    query['isAuto'] = true;
    query['isMobile'] = true;
  }

  return ProductSchema.find(
    query
  ).exec((err, data) => {
    res.status(200).send({
      count: data.length,
      payload: data
    })
  });
}
const backup = function(req, res, next) {
  ProductSchema.find({}).exec((err, data) => {
    res.status(200).send({
      count: data.length,
      payload: data
    })
  });
}

const getProductsByGroup = function(req, res, next) {
  const {
    type,
    group,
    shopId
  } = req.params;

  let query = {
    isAuto: true,
    company: shopId,
    group,
  };

  if (type === 'target') {
    query['isNormal'] = false;
    query['isTarget'] = true;
  } else {
    query['isNormal'] = true;
    query['isTarget'] = false;
  }

  return ProductSchema.find(query).exec((err, data) => {
    res.status(200).send({
      count: data.length,
      payload: data
    })
  });
};

const getProductsAll = function(req, res, next) {
  return ProductSchema.find({}, {
    _id: 0,
    __v: 0,
  }).exec((err, data) => {
    res.status(200).send(data)
  });
}

module.exports = {
  updateById,
  deleteById,
  statusToggleById,
  initProducts,
  getProductById,
  updateUrlsById,
  getProductsByStatus,
  backup,
  getProductsByGroup,
  getProductsAll,
}
