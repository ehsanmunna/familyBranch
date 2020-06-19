var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Person = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, unique : true, required: true },
  phone: { type: String, unique : true, required: true }
});

  module.exports = mongoose.model('person', Person);