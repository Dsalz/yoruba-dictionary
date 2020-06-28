/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import WordItem from "../components/WordItem";

// CSS
import "../css/Dashboard.css";

// Utils
import {
  extractFirebaseDataFromArrayResponse,
  pronounceWord
} from "../../utils";

/**
 * @class Dashboard
 */
class Dashboard extends Component {
  state = {
    activeTab: "approveEntries",
    error: "",
    pendingWords: [],
    requestedWords: [],
    loading: true
  };

  /**
   * @method componentDidMount
   * @description The componentDidMount lifecycle method
   * @returns {undefined}
   */
  async componentDidMount() {
    const [pendingWords, requestedWords] = await Promise.all([
      this.getWordsPendingApproval(),
      this.getWordsRequested()
    ]);
    this.setState({
      pendingWords,
      requestedWords,
      loading: false
    });
  }

  /**
   * @method getWordsPendingApproval
   * @description The function that fetches words pending approval
   * @returns {undefined}
   */
  getWordsPendingApproval = async () => {
    const response = await Promise.all([
      firestore()
        .collection("words")
        .where("approved", "==", false)
        .get()
    ]);

    return extractFirebaseDataFromArrayResponse(response, false);
  };

  /**
   * @method getWordsRequested
   * @description The function that fetches words requested
   * @returns {undefined}
   */
  getWordsRequested = async () => {
    const response = await Promise.all([
      firestore()
        .collection("requests")
        .get()
    ]);

    return extractFirebaseDataFromArrayResponse(response, false);
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
      error: ""
    });
  };

  /**
   * @method approveDefinition
   * @description The function that handles definition approval
   * @param {object} id - definition id
   * @returns {undefined}
   */
  approveDefinition = async id => {
    const { pendingWords } = this.state;
    // TODO attach user to approval
    // const { user } = this.props;
    this.setState({
      loading: true
    });
    try {
      await firestore()
        .ref(`words/${id}`)
        .set(
          {
            approved: true
          },
          err => {
            if (err) {
              throw new Error(err);
            }
          }
        );

      this.setState({
        loading: false,
        pendingWords: pendingWords.filter(word => word.id !== id)
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: err?.message || "Could not approve word"
      });
    }
  };

  /**
   * @method changeTab
   * @description The function that handles tab change
   * @param {string} tab - tab to change to
   * @returns {undefined}
   */
  changeTab = tab => {
    this.setState({
      activeTab: tab,
      error: ""
    });
  };

  /**
   * @method render
   * @returns {JSX} landing page
   */
  render() {
    const {
      activeTab,
      error,
      loading,
      pendingWords,
      requestedWords
    } = this.state;
    const { isLoggedIn } = this.props;
    return !isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <Navbar solid />
        <main className="dashboard page-margin d-flex">
          <aside>
            <ul>
              <li className={activeTab === "approveEntries" ? "active" : ""}>
                <a href="#" onClick={() => this.changeTab("approveEntries")}>
                  Approve Entries
                </a>
              </li>
              <li className={activeTab === "wordsRequested" ? "active" : ""}>
                <a href="#" onClick={() => this.changeTab("wordsRequested")}>
                  Words Requested
                </a>
              </li>
            </ul>
          </aside>
          {activeTab === "approveEntries" && (
            <section>
              <h1 className="page-header">Words Pending Approval</h1>
              {error && <Alert type="error" message={error} />}
              <div className="dashboard-data">
                {loading && <Loader />}
                {!loading && (
                  <Fragment>
                    {pendingWords.length === 0 && (
                      <p>There are currently no words pending approval</p>
                    )}
                    {pendingWords.map(
                      ({
                        example_eng,
                        example_yor,
                        meaning_eng,
                        meaning_yor,
                        ...word
                      }) => (
                        <WordItem
                          key={`${word.marked}-${word.id}`}
                          {...word}
                          exampleEng={example_eng}
                          exampleYor={example_yor}
                          meaningEng={meaning_eng}
                          meaningYor={meaning_yor}
                          pronounceWord={pronounceWord}
                          pendingApproval
                          approveDefinition={() =>
                            this.approveDefinition(word.id)
                          }
                        />
                      )
                    )}
                  </Fragment>
                )}
              </div>
            </section>
          )}
          {activeTab === "wordsRequested" && (
            <section>
              <h1 className="page-header">Words Requested</h1>
              {error && <Alert type="error" message={error} />}
              <div className="dashboard-data">
                {loading && <Loader />}
                {!loading && (
                  <Fragment>
                    {pendingWords.length === 0 && (
                      <p>There are currently no requested words</p>
                    )}
                    {requestedWords.map(({ marked, id }) => (
                      <p key={id}>{marked}</p>
                    ))}
                  </Fragment>
                )}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  user: {
    email: auth.email,
    name: auth.name
  }
});

export default connect(mapStateToProps)(Dashboard);
