/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { firestore } from "firebase";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

// CSS
import "../css/LandingPage.css";

/**
 * @class LandingPage
 */
class LandingPage extends Component {
  state = {
    query: "",
    answers: [],
    loading: false,
    formSubmitted: false
  };

  /**
   * @method componentDidMount
   * @description The componentDidMount lifecycle method
   * @returns {undefined}
   */
  componentDidMount() {
    const { location } = this.props;
    const query = location?.search?.split("query=")[1];
    if (query) {
      this.setState({
        query
      });
      this.search(query);
    }
  }

  /**
   * @method handleChange
   * @description The function that handles input change
   * @param {object} e - event object
   * @returns {undefined}
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * @method search
   * @description The function that handles searching
   * @param {object} searchParam - search parameter
   * @returns {undefined}
   */
  search = async searchParam => {
    const { query: stateQuery } = this.state;
    const query = (stateQuery || searchParam).toLowerCase();
    this.setState({
      loading: true,
      formSubmitted: true
    });
    window.history.pushState(null, null, `/?query=${query}`);
    const response = await Promise.all([
      firestore()
        .collection("words")
        .where("unmarked", "==", query)
        .get(),
      firestore()
        .collection("words")
        .where("marked", "==", query)
        .get()
    ]);

    this.setState({
      answers: response
        .reduce((acc, currVal) => acc.concat(currVal.docs), [])
        .map(doc => doc.data()),
      loading: false
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
    this.search();
  };

  /**
   * @method render
   * @returns {JSX} landing page
   */
  render() {
    const { query, loading, answers, formSubmitted } = this.state;
    return (
      <Fragment>
        <Navbar solid />
        <main>
          <section className="landing-page-hero d-flex justify-content-center align-items-center">
            <div className="landing-page-info">
              <h1>Welcome to the Yoruba Dictionary</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  placeholder="Enter word here"
                  onChange={this.handleChange}
                  required
                />
                <button type="submit" disabled={loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.38"
                    height="16.966"
                    viewBox="0 0 16.38 16.966"
                  >
                    <path
                      id="search"
                      d="M17.115,15.453l-4.038-4.2A6.847,6.847,0,1,0,7.834,13.7a6.777,6.777,0,0,0,3.924-1.24l4.069,4.232a.893.893,0,1,0,1.288-1.239ZM7.834,1.787A5.063,5.063,0,1,1,2.771,6.85,5.069,5.069,0,0,1,7.834,1.787Z"
                      transform="translate(-0.984)"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </section>
          {formSubmitted && (
            <section className="landing-page-answers">
              {loading && <Loader />}
              {!loading && answers.length === 0 && "No Matching Results"}
              {!loading &&
                answers.map(answer => (
                  <article key={`${answer.marked}-${answer.pos}`}>
                    <h2 className="d-flex align-items-center">
                      {answer.marked}
                      <span>{answer.pos}</span>
                    </h2>
                    <div>
                      <h4>Meaning</h4>
                      <p>{answer.meaning}</p>
                    </div>
                  </article>
                ))}
            </section>
          )}
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default LandingPage;
