var express = require('express');
var router = express.Router();
var targetController = require('../controllers/target');

/* GET home page. */
router.get('/:shopId', targetController.getProducts);

module.exports = router;
