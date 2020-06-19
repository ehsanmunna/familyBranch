var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FamilyPerson = new Schema({
  person: { type: Schema.Types.ObjectId, ref: 'person' },
  spouse: { type: Schema.Types.ObjectId, ref: 'person' },
  children: [{ type: Schema.Types.ObjectId, ref: 'person' }],
})

  module.exports = mongoose.model('PersonRelation', FamilyPerson);