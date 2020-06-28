import React from "react";
import { NavLink } from "react-router-dom";
import { func, bool } from "prop-types";

const defaultImg = "https://placehold.it/100";

const ResponsiveNav = ({ toggleResponsiveMenu, isLoggedIn, logout }) => {
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
        <NavLink to="/request">Request Word</NavLink>
        <NavLink to="/add">Add Word</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {isLoggedIn && (
          <span role="presentation" onClick={logout}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

ResponsiveNav.propTypes = {
  toggleResponsiveMenu: func.isRequired,
  logout: func.isRequired,
  isLoggedIn: bool.isRequired
};

export default ResponsiveNav;
