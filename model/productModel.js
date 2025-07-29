const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pName: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  populatity: {
    type: Number,
  },
  image: {
    type: String,
  },
  features: {
    type: [String],
  },
  category: {
    type: String,
  },
  mealtype: {
    type: String,
  },
  cookTimeMinutes: {
    type: Number,
  },
  tags: {
    type: [String],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
