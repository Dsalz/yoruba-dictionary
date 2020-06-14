import { combineReducers } from "redux";

// Reducers
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  firebase: firebaseReducer,
});
