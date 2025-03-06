import React, { useState, useEffect } from "react";
import "./Banner.css";

const images = [
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740976458/f6c2fbe6b103cb71_dclbey.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740976494/bd58703899c70c72_kq5ous.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740976525/f957904d5145986d_a4cfjj.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740976549/b49b60bfeb09a830_m37hhj.jpg",
  "https://res.cloudinary.com/dz32serl9/image/upload/v1740976593/1c26da03bd93c9f5_ghrklm.jpg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <button className="left-btn" onClick={prevSlide}>❮</button>
      <div className="banner-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className={index === current ? "active" : ""}
          />
        ))}
      </div>
      <button className="right-btn" onClick={nextSlide}>❯</button>

      {/* Dots Navigation */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
