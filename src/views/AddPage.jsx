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
// import { firestore } from "firebase";

/**
 * @class AddPage
 */
class AddPage extends Component {
  state = {
    unmarked: "",
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

    try {
      // eslint-disable-next-line no-empty-patter  
      
      firestore()
        .collection("words")
        .add({
          unmarked: this.state.unmarked,
          marked: this.state.marked,
          pos: this.state.pos,
          example_eng: this.state.example_eng,
          example_yor: this.state.example_yor,
          meaning_eng: this.state.meaning_eng,
          meaning_yor: this.state.meaning_yor,
          approved: false
        });

      // Code to update collection with data (Uncomment code above and save to database)

      this.setState({
        loading: false,
        formSubmitted: true,
        unmarked: "",
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
      unmarked,
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
                name="unmarked"
                value={unmarked}
                placeholder="Enter unmarked word here"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
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
                placeholder="Enter type of word here (e.g Noun, Adjective)"
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
                placeholder="Enter meaning in yoruba"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="example_eng"
                value={example_eng}
                placeholder="Enter example usage in english"
                onChange={this.handleChange}
                required
                className="underlined-input"
              />
              <input
                type="text"
                name="example_yor"
                value={example_yor}
                placeholder="Enter example usage in yoruba"
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
