// src/components/ProductCategories.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const categories = ['Electronics', 'Clothing', 'Furniture', 'Home Appliances', 'Books'];
  
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <Link key={index} to={`/category/${category}`} className="category-card">
          <h3>{category}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ProductCategories;
