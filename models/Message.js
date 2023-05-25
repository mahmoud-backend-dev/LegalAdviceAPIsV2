const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: [true, "Message must be longs to user"]
    },
    text: {
      type: String
    },
    image: String,
    file: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);