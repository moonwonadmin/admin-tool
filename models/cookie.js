const mongoose = require('../db/db').mongoose;
const Schema = mongoose.Schema;

const CookieSchema = new Schema({
  id: { type: String, required: true, unique: true, dropDups: true },
  cookie: String,
  modifiedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cookie', CookieSchema);
