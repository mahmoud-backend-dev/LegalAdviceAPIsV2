const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true,'Sender Key Required'],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true,'Recipient Key Required'],
  },
  message: {
    type: String,
    required: [true,'Message Key Required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
);

module.exports = mongoose.model('Chat', chatSchema);