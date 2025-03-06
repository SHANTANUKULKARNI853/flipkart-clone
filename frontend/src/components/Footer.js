import React from "react";
import "./Footer.css"; // Make sure to create this CSS file
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>GROUP COMPANIES</h4>
          <ul>
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>HELP</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>CONSUMER POLICY</h4>
          <ul>
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Mail Us:</h4>
          <p>
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
          </p>
        </div>

        <div className="footer-section">
          <h4>Registered Office Address:</h4>
          <p>
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
          </p>
          <p><strong>CIN:</strong> U51109KA2012PTC066107</p>
          <p><strong>Telephone:</strong> 044-45614700 / 044-67415800</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-links">
          <span>Become a Seller</span>
          <span>Advertise</span>
          <span>Gift Cards</span>
          <span>Help Center</span>
        </div>
        <p>© 2007-2025 DYAVOL'X.com</p>
        <div className="social-icons">
          <FaFacebook />
          <FaTwitter />
          <FaYoutube />
          <FaInstagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
