import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryPage.css";
import jwtDecode from "jwt-decode"; 

const CategoryPage = () => {
  const { category } = useParams();
  const API_URL = "https://flipkart-clone-iq8c.onrender.com";
 const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const endpoint = `${API_URL}/api/products?category=${category}`;
        console.log(`🔹 Fetching products from: ${endpoint}`);
        
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, API_URL]);

  const handleImageError = (e) => {
    if (!e.target.dataset.error) {
      e.target.dataset.error = true;
      e.target.src = "https://via.placeholder.com/150";
    }
  };

  const getDeliveryDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ User not logged in!");
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      if (!API_URL) {
        console.error("❌ API_URL is not defined. Check your environment variables.");
        alert("❌ Unable to add to cart. API URL is missing.");
        return;
      }
  
      const requestBody = {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
  
      const apiUrl = `${API_URL}/api/cart`;
      console.log(`🔹 Sending POST request to: ${apiUrl}`);
      console.log("📦 Request Body:", requestBody);
  
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ Server Response:", response.data);
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("❌ Error adding to cart:", error.response?.data || error);
  
      if (error.response) {
        if (error.response.status === 405) {
          alert("❌ Method Not Allowed: Make sure your backend supports POST requests to /api/cart.");
        } else if (error.response.status === 500) {
          alert("❌ Internal Server Error: Please try again later.");
        } else {
          alert(`❌ Failed to add product to cart. Server responded with status ${error.response.status}.`);
        }
      } else {
        alert("❌ Failed to add product to cart. Check your network connection.");
      }
    }
  };
  
  
  return (
    <div className="category-page">
      <div className="products">
        <h2>{category} Products</h2>
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => {
              const defaultMRP = product.mrp || Math.round(product.price * 1.5);
              const discount = defaultMRP > 0 ? Math.round((1 - product.price / defaultMRP) * 100) : 0;

              return (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    onError={handleImageError}
                  />

                  <div className="product-info">
                    <h3>
                      {product.name}
                      {product.storage ? ` (${product.storage} Storage)` : ""}
                      {product.ram ? ` (${product.ram} RAM)` : ""}
                    </h3>

                    <div className="rating">
                      <span className="stars">⭐ {product.rating || "4.5"}</span>
                      <span className="reviews">({product.reviews || "100"} reviews)</span>
                    </div>

                    <p className="bought-info">300+ bought in past month</p>

                    <p className="price">
                      ₹{product.price} <span className="mrp">M.R.P: ₹{defaultMRP}</span>{" "}
                      <span className="discount">({discount}% Off)</span>
                    </p>

                    <p className="delivery">FREE delivery <b>{getDeliveryDate(5)}</b></p>
                    <p className="delivery">Or fastest delivery <b>{getDeliveryDate(1)}</b></p>
                    <p className="service">Service: Installation</p>

                    <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                      Add to Cart
                    </button>

                    <p className="more-choices">
                      More Buying Choices ₹{product.price - 199} (5 new offers)
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
