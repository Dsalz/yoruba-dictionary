/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { firestore } from "firebase";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../components/Alert";

// CSS
import "../css/AddPage.css";

/**
 * @class RequestPage
 */
class RequestPage extends Component {
  state = {
    marked: "",
    formSubmitted: false,
    error: ""
  };

  /**
   * @method handleChange
   * @description The function that handles input change
   * @param {object} e - event object
   * @returns {undefined}
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false,
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

    const { marked } = this.state;

    try {
      firestore()
        .collection("requests")
        .add({
          marked,
          approved: false
        });

      this.setState({
        loading: false,
        formSubmitted: true,
        marked: "",
        error: ""
      });
    } catch (err) {
      this.setState({
        loading: false,
        formSubmitted: false,
        error: "Could not submit form"
      });
    }
  };

  /**
   * @method render
   * @returns {JSX} landing page
   */
  render() {
    const { loading, marked, error, formSubmitted } = this.state;
    return (
      <Fragment>
        <Navbar solid />
        <main>
          <section className="add-words-section page-margin">
            <form onSubmit={this.handleSubmit}>
              <h1 className="page-header">
                Request a word you want us to define and add to the Yorùbá
                Dictionary
              </h1>
              <input
                type="text"
                name="marked"
                value={marked}
                placeholder="Enter marked word here"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              {error && <Alert type="error" message={error} />}
              {formSubmitted && (
                <Alert type="success" message="Successfully submitted word" />
              )}
              <button className="blue-btn" type="submit" disabled={loading}>
                Submit
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default RequestPage;
