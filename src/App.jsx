import "babel-polyfill";
import firebase from "firebase";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import dotenv from "dotenv";

// Views
import LandingPage from "./views/LandingPage";
import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import AddPage from "./views/AddPage";
import ComingSoonPage from "./views/ComingSoon";
import RequestPage from "./views/RequestPage";

// Components
import ScrollToTop from "./ScrollToTop";

// CSS
import "./css/App.css";

// Reducer
import rootReducer from "./store/reducers/rootReducer";

dotenv.config();

const config = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  databaseURL: process.env.FIREBASEDATABASEURL,
  projectId: process.env.FIREBASEPROJECTID,
  storageBucket: process.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.FIREBASEMESSAGINGID,
  appId: process.env.FIREBASEAPPID,
  measurementId: process.env.FIREBASEMEASUREMENTID
};

firebase.initializeApp(config);
firebase.analytics();
firebase.performance();

const store = createStore(rootReducer);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/about" component={ComingSoonPage} />
          <Route exact path="/contact-us" component={ComingSoonPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/add" component={AddPage} />
          <Route path="/request" component={RequestPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={LandingPage} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
};

const appDiv = document.getElementById("app");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  appDiv
);
