var express = require('express');
var router = express.Router();
var CookieController = require('../controllers/cookie');
const shopID = require('../config');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const moonwonCookie = await CookieController.cookieById(shopID.moonwon);
  const karibuCookie = await CookieController.cookieById(shopID.karibu);

  res.render('index', {
    moonwon: moonwonCookie[0],
    karibu: karibuCookie[0],
  });
});

module.exports = router;
