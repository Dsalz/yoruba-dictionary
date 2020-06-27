/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { auth } from "firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../components/Alert";

// CSS
import "../css/AddPage.css";
import { LOGIN } from "../store/actions/actionTypes";

/**
 * @class LoginPage
 */
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { login } = this.props;
    auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logging here cause i have no idea how the response is structured
        console.log(userAuth);
        login(userAuth);
        this.setState({
          loading: false,
          error: ""
        });
      }
    });
  }

  /**
   * @method handleChange
   * @description The function that handles input change
   * @param {object} e - event object
   * @returns {undefined}
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ""
    });
  };

  /**
   * @method handleSubmit
   * @description The function that handles form submit
   * @param {object} e - event object
   * @returns {undefined}
   */
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const { email, password } = this.state;

    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          throw new Error(err);
        });
    } catch (err) {
      this.setState({
        loading: false,
        error: err?.message || "Error logging in"
      });
    }
  };

  /**
   * @method render
   * @returns {JSX} landing page
   */
  render() {
    const { loading, email, password, error } = this.state;
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <Navbar solid />
        <main>
          <section className="add-words-section page-margin">
            <form onSubmit={this.handleSubmit}>
              <h1 className="page-header">Login to the Yoruba Dictionary</h1>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              {error && <Alert type="error" message={error} />}
              <button className="blue-btn" type="submit" disabled={loading}>
                Login
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth: storeAuth }) => ({
  isLoggedIn: storeAuth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  login: data =>
    dispatch({
      type: LOGIN,
      payload: data
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
