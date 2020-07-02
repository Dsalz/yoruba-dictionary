/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

// Components
import Alert from "./Alert";
import Loader from "./Loader";

const DashboardWordsRequestedPage = ({
  error,
  loading,
  requestedWords,
  openForm
}) => (
  <section>
    <h1 className="page-header">Words Requested</h1>
    {error && <Alert type="error" message={error} />}
    <div className="dashboard-data">
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          {requestedWords.length === 0 && (
            <p>There are currently no requested words</p>
          )}
          <div className="requested-item-wrapper">
            {requestedWords.map(({ marked, id }) => (
              <article className="requested-item" key={id}>
                <h6>{marked}</h6>
                <button
                  className="blue-btn"
                  type="button"
                  onClick={() => openForm(marked)}
                >
                  Add Word
                </button>
              </article>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  </section>
);

export default DashboardWordsRequestedPage;
