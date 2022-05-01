const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: false
    },
    price: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    categories: {
      type: [String],
      required: false
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Favourites', FavouriteSchema);