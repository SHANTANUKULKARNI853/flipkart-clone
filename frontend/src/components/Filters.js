// src/components/Filters.js
import React from 'react';

const Filters = ({ categories, onFilterChange }) => {
  return (
    <div className="filters">
      <h3>Filters</h3>
      <div className="filter-category">
        <h4>Categories</h4>
        {categories.map((category, index) => (
          <label key={index}>
            <input type="checkbox" value={category} onChange={(e) => onFilterChange(e)} />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
