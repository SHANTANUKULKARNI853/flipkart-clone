import React, { useState } from "react";
// import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Category from "../components/Categories"; // Import Category Component

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelection = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="home">
      {/* <Navbar /> */}
      <Category onSelectCategory={handleCategorySelection} />
      <Banner />
      
      <div className="home-content">
        <ProductList selectedCategories={selectedCategories} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
