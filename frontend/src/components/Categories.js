import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  { name: "Mobiles", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740913581/M1_cikzf7.avif", link: "/category/mobiles" },
  { name: "Fashion", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740913581/F1_bccblv.webp", link: "/category/fashion" },
  { name: "Electronics", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740913581/E1_gtg6gq.jpg", link: "/category/electronics" },
  { name: "Beauty", img: "https://res.cloudinary.com/dz32serl9/image/upload/v1740913581/B1_epljxd.jpg", link: "/category/beauty" },
];

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((cat, index) => (
        <Link key={index} to={cat.link} className="category-item">
          <img src={cat.img} alt={cat.name} />
          <p>{cat.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
