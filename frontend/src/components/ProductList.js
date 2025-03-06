import React from "react";
import "./ProductList.css";

const products = [
  { name: "Denim Shirt", price: "₹499", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740988022/-473Wx593H-464491993-blue-MODEL_yzl1br.jpg" },
  { name: "Nailpolish", price: "₹699", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740988148/442b3c17ea6a97289dca8d308fc0ff11_uh7brk.jpg" },
  { name: "Redmi A4", price: "₹87898", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740905840/mobile4_qeyzso.webp" },
  { name: "Redmi 12", price: "₹67898", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740905840/mobile3_rcvblb.webp" },
  { name: "HomeTheatre", price: "₹67898", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740905840/electronics3_ii5dgy.webp" },
  { name: "Jackets", price: "₹1799", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740987956/M1-1A-22-BL_50496_hub4op.jpg" },
];

const offers = [
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740914569/07f7e63f353e1f60_bqhtk1.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740914602/d734ed32ac49cf20_pb7g3p.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740914618/9e5e7b3ae184f4c1_doolhn.jpg",
];

const ProductList = () => {
  return (
    <div className="shop-product-list-container">
      <h2>SHOP NOW</h2>
      
      {/* Horizontal Scrollable Product List */}
      <div className="shop-product-list">
        {products.map((product, index) => (
          <div key={index} className="shop-product-card">
            <img src={product.img} alt={product.name} />
            <p>{product.name}</p>
            <p className="shop-price">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Offers Section */}
      <div className="offers-container">
        {offers.map((offer, index) => (
          <img key={index} src={offer} alt={`Offer ${index + 1}`} className="offer-image" />
        ))}
      </div>

      {/* Flipkart Info Section */}
      <div className="flipkart-info">
        <h2>DYAVOL'X: The One-stop Shopping Destination</h2>
        <p>
          E-commerce is revolutionizing the way we shop in India. DYAVOL'X offers everything from mobiles, laptops, clothing, home essentials, furniture, and much more.
          No need to step out – shop at your convenience with DYAVOL'X’s 24/7 services.
        </p>

        <h3>DYAVOL'X Plus Membership</h3>
        <p>
          A world of limitless possibilities awaits you. DYAVOL'x Plus is a free loyalty reward program where members earn <strong>SuperCoins</strong> for every purchase. 
          Enjoy benefits like free delivery, early access to sales, and exclusive discounts.
        </p>

        <h3>No Cost EMI & Exchange Offers</h3>
        <ul>
          <li>Shop on EMI without paying extra interest.</li>
          <li>Exchange your old mobile for an instant discount on a new one.</li>
          <li>Debit card EMI options available with leading banks.</li>
        </ul>

        <h3>Hassle-free Returns & Customer Support</h3>
        <p>
          DYAVOL'x offers a <strong>7-day easy return policy</strong> on most products. If you're unsatisfied with your purchase, return it for a <strong>full refund or exchange</strong>.
        </p>
        <p>For any queries, DYAVOL'X’s <strong>24/7 customer support</strong> is always ready to assist you.</p>

        <h3>Categories You Can Explore</h3>
        <ul>
          <li><strong>Electronics:</strong> Laptops, Mobile Phones, Headphones, Smartwatches</li>
          <li><strong>Fashion:</strong> Clothing, Footwear, Accessories</li>
          <li><strong>Home & Furniture:</strong> Beds, Sofas, Kitchen Appliances</li>
          <li><strong>Grocery & Essentials:</strong> Daily needs at best prices</li>
        </ul>

        <h3>Why Shop on DYAVOL'X?</h3>
        <ul>
          <li>⚡ <strong>Best deals</strong> on top brands</li>
          <li>🚚 <strong>Fast & secure delivery</strong></li>
          <li>✅ <strong>Easy returns & replacements</strong></li>
          <li>💳 <strong>Multiple payment options</strong> including UPI, Credit/Debit cards, and EMI</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
