var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost:27017/newmoonwon';

mongoose.Promise = require('bluebird');
mongoose.connect(dbPath ,{
  useMongoClient: true
});
mongoose.connection.on('connected', function() {
  console.log('Mongodb connection open to ' + dbPath);
});
mongoose.connection.on('error', function(err) {
  console.log('MOngodb connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('MOngodb connection disconnected');
});
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongodb connection disconnected through app termination');
    process.exit(0);
  });
});


exports.mongoose = mongoose;
