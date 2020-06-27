/* eslint-disable indent */
import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: localStorage.YDToken || "",
  email: localStorage.YDEmail || "",
  isLoggedIn: !!localStorage.YDToken,
  name: localStorage.YDName || ""
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      localStorage.YDEmail = payload.email;
      localStorage.YDName = payload.name;
      localStorage.YDToken = payload.token;
      return {
        ...state,
        isLoggedIn: true,
        email: payload.email,
        name: payload.name,
        token: payload.token
      };
    case LOGOUT:
      localStorage.removeItem("YDEmail");
      localStorage.removeItem("YDName");
      localStorage.removeItem("YDToken");
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        name: ""
      };
    default:
      return state;
  }
};

export default authReducer;
