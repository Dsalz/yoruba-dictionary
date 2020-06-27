/* eslint-disable indent */
import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: localStorage.YDToken || "",
  email: localStorage.YDEmail || "",
  isLoggedIn: !!localStorage.YDToken
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      localStorage.YDEmail = payload.email;
      localStorage.YDToken = payload.token;
      return {
        ...state,
        isLoggedIn: true,
        email: payload.email,
        token: payload.refreshToken
      };
    case LOGOUT:
      localStorage.removeItem("YDEmail");
      localStorage.removeItem("YDToken");
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        token: ""
      };
    default:
      return state;
  }
};

export default authReducer;
