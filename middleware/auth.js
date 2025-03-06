const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // ✅ Added bcrypt import
const User = require("../models/User");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access denied. No valid token provided." });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        if (!decoded || !decoded._id) { // ✅ Ensure token structure matches signup
            return res.status(401).json({ error: "Invalid token structure." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);
        res.status(400).json({ error: "Invalid or expired token." });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(403).json({ error: "Unauthorized request." });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        console.error("❌ isAdmin Middleware Error:", error.message);
        res.status(500).json({ error: "Server error." });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user", // ✅ Ensure role exists (default to "user")
        });

        await newUser.save(); // Save user to DB

        // Generate JWT Token
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // ✅ Return full user object + token
        res.status(201).json({
            message: "User registered successfully",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email },
            token: token,
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

module.exports = { auth, isAdmin, signup };
