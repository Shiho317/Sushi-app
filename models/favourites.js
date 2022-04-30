const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    address : {
      type: String,
      required: true
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Favourites', FavouriteSchema);