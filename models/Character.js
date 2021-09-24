const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const characterSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  hairColor: {
    type: String
  },
  skinColor: {
    type: String
  },
  eyeColor: {
    type: String
  },
  gender: {
    type: String
  },
  birthYear: {
    type: String
  },
  referenceUrl: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

characterSchema.plugin(uniqueValidator);

module.exports = model('Character', characterSchema);
