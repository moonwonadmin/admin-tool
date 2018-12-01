var express = require('express');
var router = express.Router();
var normalController = require('../controllers/normal');

/* GET home page. */
router.get('/:shopId', normalController.getProducts);
router.get('/:shopId/detail/:id', normalController.getProductById);
router.put('/:shopId/detail/:id/url', normalController.modifyUrlsById);

module.exports = router;
