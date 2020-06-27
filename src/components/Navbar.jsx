import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

// CSS
import "../css/Navbar.css";

// Components
import ResponsiveNav from "./ResponsiveNav";

const defaultImg = "https://placehold.it/100";

const Navbar = () => {
  const [state, setState] = useState({
    showResponsiveMenu: false
  });
  const toggleResponsiveMenu = () => {
    const { showResponsiveMenu } = state;
    setState({
      ...state,
      showResponsiveMenu: !showResponsiveMenu
    });
  };
  const { showResponsiveMenu } = state;
  return (
    <Fragment>
      {showResponsiveMenu && (
        <ResponsiveNav toggleResponsiveMenu={toggleResponsiveMenu} />
      )}
      <nav className="index-navbar solid">
        <div
          className="index-navbar-toggle"
          onClick={toggleResponsiveMenu}
          role="presentation"
        >
          <span />
          <span />
          <span />
        </div>
        <div className="index-navbar-logo">
          <NavLink to="/" className="index-navbar-logo-link red-cl">
            <img
              src={defaultImg}
              alt="yoruba dictionary logo"
              className="index-navbar-logo-img"
            />
            <img
              src={defaultImg}
              alt="yoruba dictionary logo"
              className="index-navbar-logo-resp-img"
            />
          </NavLink>
        </div>

        <div className="index-navbar-links">
          <NavLink to="/request" id="retailerlink">
            Request Word
          </NavLink>
          <NavLink to="/add" id="retailerlink">
            Add Word
          </NavLink>
          <NavLink to="/about" id="retailerlink">
            About
          </NavLink>
          <NavLink to="/contact-us" id="retailerlink">
            Contact Us
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
