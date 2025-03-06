import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 Track search input
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId || userId === "undefined") {
        console.error("User ID is undefined. Cannot fetch cart count.");
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Get the backend URL from .env
        const response = await axios.get(`${apiUrl}/api/cart/${userId}`);
        setCartCount(response.data.length || 0); // Fix: Access `response.data.length`
      } catch (error) {
        console.error("❌ Error fetching cart count:", error.response?.data || error.message);
      }
    };

    if (token) {
      fetchCartCount();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
    window.location.reload();
  };

  // 🔹 Handle Search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const apiUrl = process.env.REACT_APP_API_URL; // Get the backend URL from .env
    axios.get(`${apiUrl}/api/products?name=${searchQuery}`)
      .then((response) => {
        const products = response.data;

        if (products.length > 0) {
          navigate(`/category/${products[0].category}`);
        } else {
          alert("Couldn't find product!");
        }
      })
      .catch((error) => console.error("❌ Error fetching products:", error));
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <h2 className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit", fontSize: "30px" }}>
            DYAVOL'X <span className="explore-plus">Explore <span className="plus">Plus</span></span>
          </Link>
        </h2>
      </div>

      {/* Center: Search Bar */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="search-icon" onClick={handleSearch} />
      </div>

      {/* Right: User Options */}
      <div className="navbar-right">
        {token ? (
          <button onClick={handleLogout} className="nav-item logout-btn">
            <FaUser /> <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="nav-item">
            <FaUser /> <span>Login</span>
          </Link>
        )}

        <Link to="/cart" className="nav-item">
          <FaShoppingCart /> <span>Cart</span>
          {/* {cartCount > 0 && <span className="cart-count">{cartCount}</span>} */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
