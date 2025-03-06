import React, { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleWishlist = async () => {
    if (!userId) {
      alert("Please login to use Wishlist");
      return;
    }

    try {
      const endpoint = wishlist ? "/remove" : "/add";
      await axios.post(`http://localhost:5000/api/wishlist${endpoint}`, { userId, productId: product._id });
      setWishlist(!wishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <FaHeart className={`wishlist-icon ${wishlist ? "active" : ""}`} onClick={handleWishlist} />
    </div>
  );
};

export default ProductCard;
