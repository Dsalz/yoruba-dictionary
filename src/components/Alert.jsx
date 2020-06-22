/* eslint-disable react/prop-types */
import React from "react";

const Alert = ({ message, type }) => (
  <span className={`alert alert-${type}`}>{message}</span>
);

export default Alert;
