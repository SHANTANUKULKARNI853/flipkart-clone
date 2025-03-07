
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";


const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Default for local dev
  console.log("🔍 ENV API URL:", API_URL);

  const fetchJSON = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return null; // If no JSON response
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await fetchJSON(response);

      if (!response.ok) {
        throw new Error(data?.error || "Login failed. Please try again.");
      }

      console.log("🔍 Login Response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await fetchJSON(response);

      if (!response.ok) {
        throw new Error(data?.error || "Signup failed. Please try again.");
      }

      console.log("📢 Signup Response:", data);

      if (!data?.user || !data.user._id) {
        throw new Error("User ID not found in response.");
      }

      console.log("✅ Signup Success - User ID:", data.user._id);
    } catch (error) {
      console.error("❌ Signup Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Info Section */}
        <div className="login-left">
          <h2>Welcome to Our Platform</h2>
          <p>Join us to explore amazing features. <br /> Login or sign up to get started!</p>
        </div>

        {/* Right Flipping Form Section */}
        <div className="login-right">
          <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
            {/* Login Form */}
            <div className="flip-card-front">
              <h2>User Login</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="login-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
              </form>
              <p className="switch-form" onClick={() => setIsFlipped(true)}>
                Don't have an account? Sign Up
              </p>
            </div>

            {/* Signup Form */}
            <div className="flip-card-back">
              <h2>Sign Up</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign Up</button>
              </form>
              <p className="switch-form" onClick={() => setIsFlipped(false)}>
                Already have an account? Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
