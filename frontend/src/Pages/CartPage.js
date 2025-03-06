import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./CartPage.css";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 🔄 Fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found!");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
      if (!userId) {
        console.error("❌ No userId found in token!");
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);

      console.log("🛒 API Response:", response.data);

      // ✅ Handle different response formats
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else if (response.data.cart && Array.isArray(response.data.cart.products)) {
        setCartItems(response.data.cart.products);
      } else {
        console.warn("⚠️ Unexpected response format:", response.data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("❌ Error fetching cart items:", error.response?.data || error.message);
    }
  };

  // 📌 Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // 🔄 Update total price when cartItems change
  useEffect(() => {
    console.log("🔄 cartItems Updated:", cartItems);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // ❌ Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found!");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
      if (!userId) {
        console.error("❌ No userId found in token!");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { userId, productId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Item removed:", response.data);

      // 🔄 Fetch updated cart data
      fetchCartItems();
    } catch (error) {
      console.error("❌ Error removing item:", error.response?.data || error.message);
    }
  };

  // 🔄 Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return handleRemoveFromCart(productId);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { userId } = jwtDecode(token);

      const response = await axios.put("http://localhost:5000/api/cart/update", {
        userId,
        productId,
        quantity: newQuantity,
      });

      console.log("✅ Quantity Updated Response:", response.data);

      fetchCartItems();
    } catch (error) {
      console.error("❌ Error updating quantity:", error.response?.data || error.message);
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name || "Unknown Product"}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.name || "Unknown"}</h3>
                  <p className="price">Price: ₹{item.price || "N/A"}</p>

                  {/* Quantity Controls */}
                  {/* <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                      <FaPlus />
                    </button>
                  </div> */}

                  <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId)}>
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
