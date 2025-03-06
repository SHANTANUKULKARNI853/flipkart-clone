const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    }
  ],
  totalAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cart", CartSchema);
