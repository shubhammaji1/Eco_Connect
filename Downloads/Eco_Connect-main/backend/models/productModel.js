const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sales: { type: Number, default: 0 },
  image: { type: String },
});
module.exports = mongoose.model('Product', productSchema);
