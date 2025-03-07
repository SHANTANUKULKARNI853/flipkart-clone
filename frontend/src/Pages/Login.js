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

  // 🚀 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login Failed: ${errorText}`);
      }

      const data = await response.json();
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

  // 🚀 Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Signup Failed: ${errorText}`);
      }

      const data = await response.json();
      console.log("📢 Signup Response:", data);

      alert("✅ Signup successful! Please login.");
      setIsFlipped(false); // Flip back to login form
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
          <p>
            Join us to explore amazing features. <br />
            Login or sign up to get started!
          </p>
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
