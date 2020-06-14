import React from "react";
import { Link } from "react-router-dom";

// CSS
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer d-flex">
      <section className="footer-section">
        <Link to="/about">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
        <div className="footer-socials d-flex">
          <button
            type="button"
            onClick={() => window.open("https://twitter.com/Dsalz")}
          >
            <i className="fab fa-twitter" />
          </button>
          <button
            type="button"
            onClick={() =>
              window.open("https://www.facebook.com/damola.salisu")
            }
          >
            <i className="fab fa-facebook-f" />
          </button>
        </div>
        <div className="footer-copyright">
          &copy;{new Date().getFullYear()} Yoruba Dictionary.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
