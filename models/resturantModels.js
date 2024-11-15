const mongoose = require('mongoose')

// Create Resturant Schema\
const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resturant Title is Required'],
    },
    imageUrl: {
      type: String,
      default:
        'https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg',
    },
    foods: {
      type: Array,
      required: [true, 'Food is required'],
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
      Default:
        'https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg',
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('resturant', resturantSchema)
