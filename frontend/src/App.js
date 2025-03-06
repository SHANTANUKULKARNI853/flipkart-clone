import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import Layout from "./components/Layout"; // Import the Layout component
import Login from "./Pages/Login";
import CartPage from "./Pages/CartPage";
import WishlistPage from "./Pages/WishlistPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* All routes wrapped inside Layout will have the Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
