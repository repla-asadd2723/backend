const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name'],
  },
  price: {
    type: Number,
    required: [true, 'You must provide a price'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  type: {
    type: String,
    enum: ['Electronics', 'Books', 'Clothes'],
    message: '{VALUE} is not supported',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);