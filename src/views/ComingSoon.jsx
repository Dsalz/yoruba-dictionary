/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, Component } from "react";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * @class NotFoundPage
 */
class ComingSoonPage extends Component {
  state = {};

  /**
   * @method render
   * @returns {JSX} not found page
   */
  render() {
    return (
      <Fragment>
        <Navbar solid />
        <main>
          <div className="coming-soon-section">This page is coming soon</div>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default ComingSoonPage;
