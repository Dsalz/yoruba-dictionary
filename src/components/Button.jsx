/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from "react";
import Loader from "./Loader";

const Button = ({ children, onClick, type, customClass, loading }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`site-btn ${customClass}`}
    >
      {!loading && children}
      {loading && <Loader stroke="#fff" height="24px" width="24px" />}
    </button>
  );
};

export default Button;
