const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  link: {
    type:String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
}, { timestamps: true });


module.exports = mongoose.model('Video', videoSchema);