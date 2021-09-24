const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new Schema({
  comment: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
}, {
  timestamps: true
});

commentSchema.plugin(uniqueValidator);

module.exports = model('Comment', commentSchema);
