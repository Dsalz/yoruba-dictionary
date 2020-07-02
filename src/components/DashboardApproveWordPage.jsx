/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

// Components
import Alert from "./Alert";
import Loader from "./Loader";
import WordItem from "./WordItem";

// Utils
import { pronounceWord } from "../../utils";

const DashboardApproveWordPage = ({
  error,
  loading,
  pendingWords,
  approveDefinition
}) => (
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
                forEdit
                handleEdit={() => approveDefinition(word.id)}
                editText="Approve Word"
              />
            )
          )}
        </Fragment>
      )}
    </div>
  </section>
);

export default DashboardApproveWordPage;
