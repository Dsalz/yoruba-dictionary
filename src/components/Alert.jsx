/* eslint-disable react/prop-types */
import React from "react";

const Alert = ({ message, type, customClass }) => (
  <span className={`alert alert-${type} ${customClass}`}>{message}</span>
);

export default Alert;
