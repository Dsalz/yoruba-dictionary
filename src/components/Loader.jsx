/* eslint-disable react/prop-types */
import React from "react";

const Loader = ({ stroke = "#0066f5", width = "50px", height = "50px" }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="lds-rolling"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      ng-attr-stroke="{{config.color}}"
      ng-attr-stroke-width="{{config.width}}"
      ng-attr-r="{{config.radius}}"
      ng-attr-stroke-dasharray="{{config.dasharray}}"
      stroke={stroke}
      strokeWidth="6"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
      transform="rotate(7.32375 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="0.8s"
        begin="0s"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
  </svg>
);

export default Loader;
