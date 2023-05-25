const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    reason: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    date: Date,
  },
  { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);