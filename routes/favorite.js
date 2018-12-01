var express = require('express');
var router = express.Router();
var favoriteController = require('../controllers/favorite');

router.get('/:shopId', favoriteController.getFavoriteProduct);

module.exports = router;