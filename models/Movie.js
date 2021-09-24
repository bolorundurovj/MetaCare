const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: {
    type: String,
    unique: false,
    trim: true,
    required: true
  },
  episodeId: {
    type: Number,
  },
  openingCrawl: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  producers: {
    type: String
  },
  releaseDate: {
    type: Date,
    required: true
  },
  referenceUrl: {
    type: String,
    required: true
  },
  characters: [{
    type: String,
    ref: 'Character'
  }],
  comments: [{
    type: String,
    ref: 'Comment'
  }],
}, {
  timestamps: true
});

movieSchema.plugin(uniqueValidator);

module.exports = model('Movie', movieSchema);
