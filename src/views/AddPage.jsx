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
 * @class AddPage
 */
class AddPage extends Component {
  state = {
    marked: "",
    pos: "",
    example_eng: "",
    example_yor: "",
    meaning_eng: "",
    meaning_yor: "",
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

    const {
      marked,
      pos,
      example_eng,
      example_yor,
      meaning_eng,
      meaning_yor
    } = this.state;

    try {
      firestore()
        .collection("words")
        .add({
          unmarked: marked.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          marked,
          pos,
          example_eng,
          example_yor,
          meaning_eng,
          meaning_yor,
          approved: false,
          random: Number.parseFloat(Math.random()),
          created_at: firestore.FieldValue.serverTimestamp(),
          updated_at: firestore.FieldValue.serverTimestamp()
        });

      this.setState({
        loading: false,
        formSubmitted: true,
        marked: "",
        pos: "",
        example_eng: "",
        example_yor: "",
        meaning_eng: "",
        meaning_yor: "",
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
    const {
      loading,
      marked,
      pos,
      example_eng,
      example_yor,
      meaning_eng,
      meaning_yor,
      error,
      formSubmitted
    } = this.state;
    return (
      <Fragment>
        <Navbar solid />
        <main>
          <section className="add-words-section page-margin">
            <form onSubmit={this.handleSubmit}>
              <h1 className="page-header">
                Contribute to the Yoruba Dictionary
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
              <input
                type="text"
                name="pos"
                value={pos}
                placeholder="Enter part of speech here (e.g Noun, Adjective)"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="meaning_eng"
                value={meaning_eng}
                placeholder="Enter meaning in english"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="meaning_yor"
                value={meaning_yor}
                placeholder="Enter meaning in yorùbá"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="example_yor"
                value={example_yor}
                placeholder="Enter example usage in yorùbá"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="example_eng"
                value={example_eng}
                placeholder="Enter english translation of example usage in yorùbá"
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

export default AddPage;
