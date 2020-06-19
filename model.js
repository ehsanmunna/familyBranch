var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Person = new Schema({
  name: { type: String, required: true },
  parent_name: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

  module.exports = mongoose.model('FamilyPerson', Person);