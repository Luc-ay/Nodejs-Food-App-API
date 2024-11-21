const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Category Title is required'],
    },
    imageUrl: {
      type: String,
      default:
        'https://w1.pngwing.com/pngs/264/707/png-transparent-burger-logo-burger-king-hamburger-milkshake-fast-food-restaurant-yellow.png',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('category', categorySchema)
