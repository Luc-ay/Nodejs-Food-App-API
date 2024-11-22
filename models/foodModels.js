const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Food Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Food Price is Required'],
    },
    imageUrl: {
      type: String,
      default:
        'https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jp',
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resturant',
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Foods', foodSchema)