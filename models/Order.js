const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, default: 0 },
    status: { type: String, enum: ["cart", "placed"], default: "cart" }, // "cart" for unplaced orders
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
