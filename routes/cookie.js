var express = require('express');
var router = express.Router();
const CookieSchema = require('../models/cookie');

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  
  return CookieSchema.find(
    {id: id}
  ).exec((err, data) => {
    let cookie = '';

    if (data.length) {
      cookie = data[0]['cookie'];
    }
    res.status(200).send({
      cookie: cookie
    });
  })
})

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  const cookie = req.body;

  return CookieSchema.findOneAndUpdate(
    { id: id},
    cookie,
    {
      upsert: true,
      new: true
    }
  ).exec((err, data) => {
    res.status(200).send({
      status: 200,
      payload: data
    })
  })
});

module.exports = router;
