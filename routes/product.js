var express = require('express');
var router = express.Router();
var productController = require('../controllers/product');

/* GET users listing. */
router.get('/all', productController.getProductsAll);
router.get('/status/:shopId/:type', productController.getProductsByStatus);
router.get('/group/:shopId/:type/:group', productController.getProductsByGroup);
router.post('/init', productController.initProducts);
router.put('/:id', productController.updateById);
router.put('/:id/toggle', productController.statusToggleById);
router.delete('/:id/delete', productController.deleteById);


router.get('/backup', productController.backup);
module.exports = router;
