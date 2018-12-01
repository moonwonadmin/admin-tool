const CookieSchema = require('../models/cookie');

const cookieById = function(id) {
  return new Promise(function(resolve, reject) {
    return CookieSchema.find(
      { id: id}
    ).exec((err, data) => {
      resolve(data);
    })
  })
}

module.exports = {
  cookieById
};
