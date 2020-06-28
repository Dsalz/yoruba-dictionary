import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { func, bool } from "prop-types";

// CSS
import "../css/Navbar.css";

// Components
import ResponsiveNav from "./ResponsiveNav";

// Actions
import { LOGOUT } from "../store/actions/actionTypes";

const defaultImg = "https://placehold.it/100";

const Navbar = ({ isLoggedIn, logout }) => {
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
        <ResponsiveNav
          toggleResponsiveMenu={toggleResponsiveMenu}
          isLoggedIn={isLoggedIn}
          logout={logout}
        />
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
          <NavLink to="/add">Add Word</NavLink>
          <NavLink to="/request">Request Word</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {isLoggedIn && (
            <span role="presentation" onClick={logout}>
              Logout
            </span>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: func.isRequired,
  isLoggedIn: bool.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: () =>
    dispatch({
      type: LOGOUT
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
