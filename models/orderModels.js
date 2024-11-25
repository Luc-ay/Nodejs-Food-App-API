const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foods',
      },
    ],
    payments: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

    status: {
      type: String,
      enum: ['Preparing', 'Ready', 'On the Way', 'Delivered'],
      default: 'Preparing',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.Model('orders', orderSchema)
