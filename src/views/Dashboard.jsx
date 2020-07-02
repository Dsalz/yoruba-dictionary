/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardApproveWordPage from "../components/DashboardApproveWordPage";
import DashboardWordsRequestedPage from "../components/DashboardWordsRequestedPage";
import DashboardAddWordPage from "../components/DashboardAddWordPage";
import DashboardEditWordPage from "../components/DashboardEditWordPage";
import DashboardWordsListPage from "../components/DashboardWordsListPage";

// CSS
import "../css/Dashboard.css";

// Utils
import { extractFirebaseDataFromArrayResponse } from "../../utils";

/**
 * @class Dashboard
 */
class Dashboard extends Component {
  state = {
    activeTab: "approveEntries",
    error: "",
    pendingWords: [],
    requestedWords: [],
    approvedWords: [],
    loading: true,
    addFormLoading: false,
    editFormLoading: false,
    editWordId: "",
    marked: "",
    pos: "",
    exampleEng: "",
    exampleYor: "",
    meaningEng: "",
    meaningYor: "",
    formSubmitted: false
  };

  /**
   * @method componentDidMount
   * @description The componentDidMount lifecycle method
   * @returns {undefined}
   */
  async componentDidMount() {
    const [pendingWords, requestedWords, approvedWords] = await Promise.all([
      this.getWordsPendingApproval(),
      this.getWordsRequested(),
      this.getWordsApproved()
    ]);
    this.setState({
      pendingWords,
      requestedWords,
      approvedWords,
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
   * @method getWordsApproved
   * @description The function that fetches words that have been approved
   * @returns {undefined}
   */
  getWordsApproved = async () => {
    const response = await Promise.all([
      firestore()
        .collection("words")
        .where("approved", "==", true)
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
      error: "",
      formSubmitted: false
    });
  };

  /**
   * @method openRequestedWordForm
   * @description The function that loads the add word form with requested word
   * @param {string} word - requested word
   * @returns {undefined}
   */
  openRequestedWordForm = word => {
    this.setState({
      marked: word,
      pos: "",
      exampleEng: "",
      exampleYor: "",
      meaningEng: "",
      meaningYor: "",
      activeTab: "addWord",
      formSubmitted: false
    });
  };

  /**
   * @method openEditWordForm
   * @description The function that loads the edit word form with requested word
   * @param {string} id - id of word
   * @returns {undefined}
   */
  openEditWordForm = id => {
    const { approvedWords } = this.state;
    const {
      marked,
      pos,
      example_eng,
      example_yor,
      meaning_eng,
      meaning_yor
    } = approvedWords.find(word => word.id === id);
    this.setState({
      marked,
      pos,
      exampleEng: example_eng,
      exampleYor: example_yor,
      meaningEng: meaning_eng,
      meaningYor: meaning_yor,
      activeTab: "editWord",
      formSubmitted: false,
      editWordId: id
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
   * @method addWord
   * @description The function that handles word addition
   * @param {object} e - event object
   * @returns {undefined}
   */
  addWord = async e => {
    e.preventDefault();
    const {
      marked,
      pos,
      exampleEng,
      exampleYor,
      meaningEng,
      meaningYor
    } = this.state;
    // TODO attach user to approval
    // TODO confirm submission without tonal marks
    // const { user } = this.props;
    this.setState({
      addFormLoading: true
    });
    try {
      await firestore()
        .collection("words")
        .add({
          unmarked: marked.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          marked,
          pos,
          example_eng: exampleEng,
          example_yor: exampleYor,
          meaning_eng: meaningEng,
          meaning_yor: meaningYor,
          approved: true,
          random: Number.parseFloat(Math.random())
        });

      this.setState({
        addFormLoading: false,
        formSubmitted: true,
        marked: "",
        pos: "",
        exampleEng: "",
        exampleYor: "",
        meaningEng: "",
        meaningYor: "",
        error: ""
      });
    } catch (err) {
      this.setState({
        addFormLoading: false,
        formSubmitted: false,
        error: "Could not submit form"
      });
    }
  };

  /**
   * @method editWord
   * @description The function that handles word edit
   * @param {object} e - event object
   * @returns {undefined}
   */
  editWord = async e => {
    e.preventDefault();
    const {
      marked,
      pos,
      exampleEng,
      exampleYor,
      meaningEng,
      meaningYor,
      editWordId
    } = this.state;
    // TODO attach user to approval
    // TODO confirm submission without tonal marks
    // const { user } = this.props;
    this.setState({
      editFormLoading: true
    });
    try {
      await firestore()
        .ref(`words/${editWordId}`)
        .set(
          {
            unmarked: marked.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            marked,
            pos,
            example_eng: exampleEng,
            example_yor: exampleYor,
            meaning_eng: meaningEng,
            meaning_yor: meaningYor,
            random: Number.parseFloat(Math.random())
          },
          err => {
            if (err) {
              throw new Error(err);
            }
          }
        );

      this.setState({
        editFormLoading: false,
        formSubmitted: true,
        error: ""
      });
    } catch (err) {
      this.setState({
        editFormLoading: false,
        formSubmitted: false,
        error: "Could not submit form"
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
      error: "",
      marked: "",
      pos: "",
      exampleEng: "",
      exampleYor: "",
      meaningEng: "",
      meaningYor: "",
      formSubmitted: false
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
      requestedWords,
      pos,
      exampleEng,
      exampleYor,
      meaningEng,
      meaningYor,
      formSubmitted,
      addFormLoading,
      approvedWords,
      editFormLoading
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
              <li className={activeTab === "addWord" ? "active" : ""}>
                <a href="#" onClick={() => this.changeTab("addWord")}>
                  Add Word
                </a>
              </li>
              <li className={activeTab === "approvedWords" ? "active" : ""}>
                <a href="#" onClick={() => this.changeTab("approvedWords")}>
                  Approved Words
                </a>
              </li>
            </ul>
          </aside>
          {activeTab === "approveEntries" && (
            <DashboardApproveWordPage
              error={error}
              loading={loading}
              pendingWords={pendingWords}
              approveDefinition={this.approveDefinition}
            />
          )}
          {activeTab === "wordsRequested" && (
            <DashboardWordsRequestedPage
              error={error}
              loading={loading}
              requestedWords={requestedWords}
              openForm={this.openRequestedWordForm}
            />
          )}
          {activeTab === "addWord" && (
            <DashboardAddWordPage
              error={error}
              loading={addFormLoading}
              handleSubmit={this.addWord}
              handleChange={this.handleChange}
              pos={pos}
              exampleEng={exampleEng}
              exampleYor={exampleYor}
              meaningEng={meaningEng}
              meaningYor={meaningYor}
              formSubmitted={formSubmitted}
              // eslint-disable-next-line react/destructuring-assignment
              marked={this.state.marked}
            />
          )}
          {activeTab === "editWord" && (
            <DashboardEditWordPage
              error={error}
              loading={editFormLoading}
              handleSubmit={this.editWord}
              handleChange={this.handleChange}
              pos={pos}
              exampleEng={exampleEng}
              exampleYor={exampleYor}
              meaningEng={meaningEng}
              meaningYor={meaningYor}
              formSubmitted={formSubmitted}
              // eslint-disable-next-line react/destructuring-assignment
              marked={this.state.marked}
            />
          )}
          {activeTab === "approvedWords" && (
            <DashboardWordsListPage
              error={error}
              loading={loading}
              approvedWords={approvedWords}
              handleEdit={this.openEditWordForm}
            />
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
