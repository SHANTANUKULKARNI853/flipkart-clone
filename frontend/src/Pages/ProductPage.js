// src/pages/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  // Hardcoded product for now, but can be fetched from API later
  const product = {
    id,
    name: `Product ${id}`,
    price: 999 * id,
    description: `This is the description for product ${id}.`,
    imageUrl: `/product${id}.jpg`,
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
