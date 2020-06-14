import React from "react";
import { NavLink } from "react-router-dom";
import { func } from "prop-types";

const defaultImg = "https://placehold.it/100";

const ResponsiveNav = ({ toggleResponsiveMenu }) => {
  return (
    <div className="index-responsive-menu">
      <div
        className="index-navbar-toggle close"
        onClick={toggleResponsiveMenu}
        role="presentation"
      >
        &times;
      </div>
      <img src={defaultImg} alt="yoruba dictionary logo" />
      <div
        className="index-responsive-menu-links"
        onClickCapture={toggleResponsiveMenu}
        role="presentation"
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </div>
    </div>
  );
};

ResponsiveNav.propTypes = {
  toggleResponsiveMenu: func.isRequired
};

export default ResponsiveNav;
