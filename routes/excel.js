var express = require('express');
var router = express.Router();
var excelController = require('../controllers/excel');

router.get('/:type/:shopId', excelController.excelExport);
router.post('/', excelController.excelImport);

module.exports = router;