const mongoose = require('mongoose');

const dictionarySchame = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
}, { timestamps: true });


module.exports = mongoose.model('criminal-dictionary', dictionarySchame);