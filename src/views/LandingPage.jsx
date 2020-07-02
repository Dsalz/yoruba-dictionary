/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { firestore } from "firebase";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import WordItem from "../components/WordItem";

// CSS
import "../css/LandingPage.css";

// Utils
import {
  extractFirebaseDataFromArrayResponse,
  pronounceWord
} from "../../utils";

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
      this.setState(
        {
          query
        },
        this.search
      );
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
   * @param {boolean} random - whether to find a random word or not
   * @returns {undefined}
   */
  search = async random => {
    const { query: stateQuery } = this.state;

    this.setState({
      loading: true,
      formSubmitted: true
    });

    let response, query;

    if (random) {
      const randomNo = Number.parseFloat(Math.random());
      response = await Promise.all([
        firestore()
          .collection("words")
          .orderBy("random")
          .startAt(randomNo)
          .limit(1)
          .get()
      ]);
      console.log(randomNo);
      console.log(response);
    } else {
      query = stateQuery.toLowerCase().trim();
      response = await Promise.all([
        firestore()
          .collection("words")
          .where("unmarked", "==", query)
          .where("approved", "==", true)
          .get(),
        firestore()
          .collection("words")
          .where("marked", "==", query)
          .where("approved", "==", true)
          .get()
      ]);
    }

    const answers = extractFirebaseDataFromArrayResponse(response, true);

    if (answers.length === 0) {
      firestore()
        .collection("requests")
        .add({
          marked: query,
          source: "UNDEFINED_WORD"
        });
    }

    if (random && answers.length) {
      query = answers[0].unmarked.toLowerCase();
    }

    const newState = {
      answers,
      loading: false
    };

    if (query) {
      window.history.pushState(null, null, `/?query=${query}`);
      newState.query = query;
    }

    this.setState(newState);
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
   * @method handleRandom
   * @description The function that handles a request for a random word
   * @param {object} e - event object
   * @returns {undefined}
   */
  handleRandom = async e => {
    e.preventDefault();
    this.search(true);
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
          <section className="page-margin landing-page-hero d-flex justify-content-center align-items-center">
            <div className="landing-page-info">
              <h1 className="page-header">Welcome to the Yoruba Dictionary</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  placeholder="Enter word here"
                  onChange={this.handleChange}
                  required
                  className="underlined-input"
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
              <button
                className="blue-btn random-btn"
                type="button"
                onClick={this.handleRandom}
              >
                Get Random Word
              </button>
            </div>
          </section>
          {formSubmitted && (
            <section className="landing-page-answers">
              {loading && <Loader />}
              {!loading && answers.length === 0 && "We didn't find " + query + " but we are doing all we can to get and publish the meaning of "+ query+ ". Please consider contributing the meaning if you know it"}
              {!loading &&
                answers.map(
                  ({
                    example_eng,
                    example_yor,
                    meaning_eng,
                    meaning_yor,
                    ...answer
                  }) => (
                    <WordItem
                      key={`${answer.marked}-${answer.pos}`}
                      {...answer}
                      exampleEng={example_eng}
                      exampleYor={example_yor}
                      meaningEng={meaning_eng}
                      meaningYor={meaning_yor}
                      pronounceWord={pronounceWord}
                    />
                  )
                )}
            </section>
          )}
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default LandingPage;
