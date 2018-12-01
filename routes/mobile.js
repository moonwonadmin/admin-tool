var express = require('express');
var router = express.Router();
var mobileController = require('../controllers/mobile');

router.get('/:shopId', mobileController.getMobileProduct);

module.exports = router;