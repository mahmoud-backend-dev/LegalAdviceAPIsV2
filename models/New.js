const mongoose = require('mongoose');

const newSchame = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('New', newSchame);