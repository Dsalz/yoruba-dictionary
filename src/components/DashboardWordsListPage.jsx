/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

// Components
import Alert from "./Alert";
import Loader from "./Loader";
import WordItem from "./WordItem";

// Utils
import { pronounceWord } from "../../utils";

const DashboardWordsListPage = ({
  error,
  loading,
  approvedWords,
  handleEdit
}) => (
  <section>
    <h1 className="page-header">Approved Words</h1>
    {error && <Alert type="error" message={error} />}
    <div className="dashboard-data">
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          {approvedWords.length === 0 && (
            <p>There are currently no approved words</p>
          )}
          {approvedWords.map(
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
                handleEdit={() => handleEdit(word.id)}
                editText="Edit Word"
              />
            )
          )}
        </Fragment>
      )}
    </div>
  </section>
);

export default DashboardWordsListPage;
