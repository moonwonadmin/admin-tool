const Promise = require('bluebird');
const moment = require('moment');
const ProductSchema = require('../models/product');

const listUpdate = function(list) {
  return upsertList(list);
};

const listUpdateExcel = function(list) {
  return upsertListExcel(list);
};

const upsertList = function(list) {
  const chain = Promise.resolve();

  list.map((item) => {
    chain.then(upsertItem(item))
  });

  return chain.then(() => {
    return Promise.resolve('ok');
  })
}

const upsertListExcel = function(list) {
  const chain = Promise.resolve();

  list.map((item) => {
    chain.then(upsertItemExcel(item))
  });

  return chain.then(() => {
    return Promise.resolve('ok');
  })
}

const upsertItem = function(item) {
  var productID = +item.id;
  var modifiedItem = {
    id: productID,
    modifiedDate: moment()
  }

  if (item.storefarmChannelProductNo) modifiedItem['storefarmChannelProductNo'] = item.storefarmChannelProductNo;
  if (item.sellerImmediateDiscountAmount || item.sellerImmediateDiscountAmount == 0) {
    modifiedItem['sellerImmediateDiscountAmount'] = item.sellerImmediateDiscountAmount;
  }
  if (item.salePrice) modifiedItem['salePrice'] = item.salePrice;
  if (item.min) modifiedItem['min'] = +item.min;
  if (item.max) modifiedItem['max'] = +item.max;

  if (item.baseDeliveryFee || item.baseDeliveryFee == 0) {
    modifiedItem['baseDeliveryFee'] = item.baseDeliveryFee;
  }

  if (item.stockQuantity || item.stockQuantity == 0) {
    modifiedItem['stockQuantity'] = item.stockQuantity;
  }
  if (item.productName) modifiedItem['productName'] = item.productName;
  if (item.sellerManagementCode) modifiedItem['sellerManagementCode'] = item.sellerManagementCode;
  if (item.parsingUrl) modifiedItem['parsingUrl'] = item.parsingUrl;
  if (item.realDeliveryFee) modifiedItem['realDeliveryFee'] = item.realDeliveryFee;
  if (item.ikeaPrice) modifiedItem['ikeaPrice'] = item.ikeaPrice;
  if (item.company) modifiedItem['company'] = item.company;
  if (item.group) modifiedItem['group'] = item.group;
  if (item.page) modifiedItem['page'] = item.page;

  if (typeof item.isOut === 'boolean') {
    modifiedItem['isOut'] = item.isOut
  }
  if (typeof item.isPriceline === 'boolean') {
    modifiedItem['isPriceline'] = item.isPriceline
  }
  if (typeof item.isAuto === 'boolean') {
    modifiedItem['isAuto'] = item.isAuto;
  }
  if (typeof item.isFavorite === 'boolean') {
    modifiedItem['isFavorite'] = item.isFavorite;
  }
  if (typeof item.isActive === 'boolean') {
    modifiedItem['isActive'] = item.isActive;
  }


  modifiedItem['isDeleted'] = false;
  modifiedItem['statusType'] = 'SALE';

  return new Promise((resolve, reject) => {
    return ProductSchema.find({ id: productID }).exec((err, data) => {
      if (data && data.length) {
        ProductSchema.findOneAndUpdate(
          { id: productID },
          modifiedItem,
          {
            upsert: true,
            new: true
          }).exec(() => {
            resolve();
          });
      } else {
        const product = new ProductSchema(modifiedItem);
        product.save(function() {
          resolve();
        })
      }
    })

  })
}

const upsertItemExcel = function(item) {
  var productID = +item.id;
  var modifiedItem = {
    id: productID,
    modifiedDate: moment()
  }

  if (item.min) modifiedItem['min'] = +item.min;
  if (item.max) modifiedItem['max'] = +item.max;
  if (item.parsingUrl) modifiedItem['parsingUrl'] = item.parsingUrl;
  if (item.isAuto) modifiedItem['isAuto'] = item.isAuto;
  if (item.isFavorite) modifiedItem['isFavorite'] = item.isFavorite;
  if (item.isActive) modifiedItem['isActive'] = item.isActive;
  if (item.realDeliveryFee) modifiedItem['realDeliveryFee'] = item.realDeliveryFee;
  if (item.ikeaPrice) modifiedItem['ikeaPrice'] = item.ikeaPrice;
  if (item.isNormal) modifiedItem['isNormal'] = item.isNormal;
  if (item.isTarget) modifiedItem['isTarget'] = item.isTarget;

  if (item.isOut) {
    modifiedItem['isOut'] = true;
  } else {
    modifiedItem['isOut'] = false;
  }

  if (item.isPriceline) {
    modifiedItem['isPriceline'] = true;
  } else {
    modifiedItem['isPriceline'] = false;
  }

  modifiedItem['isDeleted'] = false;
  modifiedItem['statusType'] = 'SALE';

  return new Promise((resolve, reject) => {
    return ProductSchema.find({ id: productID }).exec((err, data) => {
      if (data && data.length) {
        ProductSchema.findOneAndUpdate(
          { id: productID },
          modifiedItem,
          {
            upsert: true,
            new: true
          }).exec(() => {
            resolve();
          });
      } else {
        const product = new ProductSchema(modifiedItem);
        product.save(function() {
          resolve();
        })
      }
    })

  })
}

module.exports = {
  listUpdate,
  listUpdateExcel,
}