const ProductSchema = require('../models/product');
const CommonController = require('./common');
const Patch = require('./patch');
const excel = require('node-excel-export');
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellNormal: {},
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
const specification = {
  isAuto: {
    displayName: 'isAuto',
    headerStyle: styles.headerDark,
    width: 50,
  },
  isFavorite: {
    displayName: 'isFavorite',
    headerStyle: styles.headerDark,
    width: 50,
  },
  id: {
    displayName: 'id',
    headerStyle: styles.headerDark,
    cellStyle: function(value, row) {
      let _style = styles.cellNormal;
      if (row.isPriceline) _style = styles.cellPink
      if (row.isOut)  _style = styles.cellGreen
      return _style;
    },
    width: 100,
  },
  storefarmChannelProductNo: {
    displayName: 'storefarmChannelProductNo',
    headerStyle: styles.headerDark,
    width: 100,
  },
  productName: {
    displayName: 'productName',
    headerStyle: styles.headerDark,
    width: 500,
  },
  parsingUrl: {
    displayName: 'parsingUrl',
    headerStyle: styles.headerDark,
    width: 200,
  },
  salePrice: {
    displayName: 'salePrice',
    headerStyle: styles.headerDark,
    width: 100,
  },
  min: {
    displayName: 'min',
    headerStyle: styles.headerDark,
    width: 100,
  },
  max: {
    displayName: 'max',
    headerStyle: styles.headerDark,
    width: 100,
  },
  sellerImmediateDiscountAmount: {
    displayName: 'sellerImmediateDiscountAmount',
    headerStyle: styles.headerDark,
    width: 100,
  },
  ikeaPrice: {
    displayName: 'ikeaPrice',
    headerStyle: styles.headerDark,
    width: 100,
  },
  baseDeliveryFee: {
    displayName: 'baseDeliveryFee',
    headerStyle: styles.headerDark,
    width: 100,
  },
  realDeliveryFee: {
    displayName: 'realDeliveryFee',
    headerStyle: styles.headerDark,
    width: 100,
  },
  isNormal: {
    displayName: 'isNormal',
    headerStyle: styles.headerDark,
    width: 50,
  },
  isTarget: {
    displayName: 'isTarget',
    headerStyle: styles.headerDark,
    width: 50,
  }
}

const excelExport = function(req, res, next) {
  const { type, shopId } = req.params;

  const query = {
    isNormal: type === 'normal',
    isTarget: type === 'target',
    isDeleted: false,
    company: shopId,
  };
  const fileName = `${type}_${Date.now()}.xlsx`;

  return ProductSchema.find(query)
  .sort({ isAuto: -1, isFavorite: -1, order: 1 })
  .exec((err, data) => {
    const report = excel.buildExport([
      {
        specification: specification,
        data: data
      }
    ]);
    res.attachment(fileName);
    return res.send(report);
  });
};

const excelImport = function(req, res, next) {
  let itemList = req.body.data;

  CommonController.listUpdateExcel(itemList).then((data) => {
    res.status(200).json({
      status: 200
    });
  });
}

module.exports = {
  excelExport,
  excelImport
};
