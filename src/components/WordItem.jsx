/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

const WordItem = ({
  marked,
  unmarked,
  pos,
  meaning,
  exampleEng,
  exampleYor,
  meaningEng,
  meaningYor,
  pronounceWord,
  pendingApproval,
  approveDefinition
}) => (
  <article className="word-item">
    <h2 className="d-flex align-items-center">
      {marked || unmarked}
      {pos && <span>{pos}</span>}
    </h2>
    <div className="pronounciation-div d-flex align-items-center">
      Pronunciation:
      <button
        className="pronounce-btn"
        type="button"
        onClick={() => pronounceWord(marked)}
      >
        <i className="fas fa-volume-up" />
      </button>
    </div>
    <div className="answer-section">
      {meaning && !meaningEng && (
        <p>
          <b>Meaning:</b> {meaning}
        </p>
      )}
      {meaningEng && (
        <p>
          <Fragment>
            <b>Meaning:</b> {meaningEng}
          </Fragment>
        </p>
      )}
      {meaningYor && meaningEng && (
        <p>
          <Fragment>
            <b>Ìtumọ̀:</b> {meaningYor}
          </Fragment>
        </p>
      )}
    </div>
    <div className="answer-section">
      {exampleEng && (
        <p>
          <Fragment>
            <b>Example:</b> {exampleEng}
          </Fragment>
        </p>
      )}
      {exampleYor && exampleEng && (
        <p>
          <Fragment>
            <b>Àpẹrẹ:</b> {exampleYor}
          </Fragment>
        </p>
      )}
    </div>
    {pendingApproval && (
      <button
        type="button"
        className="blue-btn approve-btn"
        onClick={approveDefinition}
      >
        Approve Definition
      </button>
    )}
  </article>
);

export default WordItem;
