# 🛒 Flipkart Clone

This project is a full-stack clone of the popular e-commerce platform Flipkart, built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a seamless and responsive user experience similar to the original Flipkart website.

## 🌐 Live Demo

Check out the live version of the Flipkart Clone: [Live Demo](https://flipkart-clone-git-main-shantanukulkarni853-gmailcoms-projects.vercel.app/)

## ✨ Features

- 🔐 User Authentication (Sign Up & Login)
- 🛒 Add to Cart functionality
- 🗑️ Remove from Cart and Update Quantity
- 📂 Dynamic Product Listing by Category
- 🔎 Product Search Functionality
- 📱 Responsive UI/UX similar to Flipkart
- 🚀 Hosted on Render (backend) and Vercel (frontend)

## 🛠️ Tech Stack

### 💻 Frontend:

- ⚛️ ReactJS
- 🎨 CSS for styling
- 🖌️ React Icons for UI elements
- 🌐 Axios for API calls
- 🔑 JWT for authentication

### 🗄️ Backend:

- 🟢 Node.js
- 🚧 Express.js
- 🗃️ MongoDB Atlas for the database
- 🔗 Mongoose for ORM
- 🔑 JWT for user authentication
- ☁️ Cloudinary for image hosting

## 📝 API Endpoints

### 🔑 User Authentication:

- `POST /api/auth/signup` - User Registration
- `POST /api/auth/login` - User Login

### 🛍️ Product Management:

- `GET /api/products` - Get all products
- `GET /api/products?category=<category>` - Get products by category
- `POST /api/products` - Add a new product

### 🛒 Cart Management:

- `GET /api/cart/:userId` - Get user cart items
- `POST /api/cart` - Add product to cart
- `PUT /api/cart/update` - Update cart item quantity
- `POST /api/cart/remove` - Remove product from cart

## 📝 Getting Started

### 📋 Prerequisites

- 🌐 Node.js
- ☁️ MongoDB Atlas Account
- ☁️ Cloudinary Account

### ⚙️ Installation

1. 🚀 Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flipkart-clone.git
   ```
2. 📦 Install dependencies for both frontend and backend:
   ```bash
   cd flipkart-clone
   npm install
   cd frontend
   npm install
   ```
3. 📝 Create a `.env` file in the root and frontend directories:
   ```bash
   REACT_APP_API_URL=https://flipkart-clone-iq8c.onrender.com
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### ▶️ Running the Application

#### 💻 Backend:

```bash
npm start
```

#### 💻 Frontend:

```bash
cd frontend
npm start
```

## 🌍 Deployment

### 🎯 Frontend:

- Deployed on Vercel

### 🗃️ Backend:

- Hosted on Render

## 🗂️ Project Structure

```
flipkart-clone/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🛠️ Troubleshooting

1. 📝 Ensure your `.env` file has the correct configuration.
2. 🔍 Check API URLs and backend logs for any issues.
3. 🔁 Restart backend and frontend after making changes.

## 📄 License

This project is licensed under the MIT License.

👨‍💻 **SHANTANU KULKARNI**

