const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { auth, isAdmin } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://flipkart-clone.vercel.app",
    "https://flipkart-clone-git-main-shantanukulkarni853-gmailcoms-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle Preflight Requests
app.options("*", cors());




const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => res.send("✅ API is running..."));

// 🚀 Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: { _id: newUser._id, name, email } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🚀 Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🚀 Fetch Products
app.get('/api/products', async (req, res) => {
  try {
    const { category, name, page = 1, limit = 10, sortBy = "name" } = req.query;
    let filter = {};
    if (category) filter.category = new RegExp(category, "i");
    if (name) filter.name = new RegExp(name, "i");

    const products = await Product.find(filter)
      .select("name price category rating image")
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 🚀 Add Product (Admin Only)
app.post('/api/products', auth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// 🚀 Add to Cart
// 🚀 Add to Cart (Fix: Ensure cart creation)
app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId, name, price, image, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) return res.status(400).json({ error: "Invalid cart data" });

    let cart = await Cart.findOne({ userId });

    // 🔹 If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, products: [], totalAmount: 0 });
    }

    // 🔹 Check if the product already exists in the cart
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, name, price, image, quantity });
    }

    // 🔹 Update total price
    cart.totalAmount = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    
    await cart.save();
    res.json({ message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// 🚀 Checkout
app.post('/api/cart/checkout', async (req, res) => {
  try {
    const { userId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const order = new Order({ userId, products: cart.products, totalAmount: cart.totalAmount, status: "placed" });
    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 🚀 Get Cart (Fetch User's Cart)
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart.products); // Send only the products array
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/cart/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "Missing userId or productId" });
    }

    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // 🛠 Remove product from cart's products array
    userCart.products = userCart.products.filter(item => item.productId.toString() !== productId);

    // 🛠 Update total amount after removing item
    userCart.totalAmount = userCart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await userCart.save();  // ✅ Save updated cart in MongoDB

    res.status(200).json({ message: "Item removed successfully", cart: userCart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
