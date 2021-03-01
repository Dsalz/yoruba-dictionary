/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import Suggestion from "./Suggestion";

const getShareData = (url, word) => {
  return `Checkout this word ${word} at ${url}`;
};

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
  forEdit,
  handleEdit,
  editText,
  id
}) => (
  <article className="word-item">
    <h2 className="d-flex align-items-center">
      {marked || unmarked}
      {pos && <span className="word-pos">{pos}</span>}
    </h2>
    <div className="pronounciation-div d-flex align-items-center">
      Pronunciation:
      <button
        className="pronounce-btn icon-btn"
        type="button"
        onClick={() => pronounceWord(marked)}
      >
        <i className="fas fa-volume-up" />
      </button>
    </div>
    <div className="answer-section">
      <p>
        <b>Meaning:</b>
        {meaningEng || meaning}
        {!meaning && !meaningEng && (
          <Suggestion wordId={id} field="meaning_eng" />
        )}
      </p>
      <p>
        <Fragment>
          <b>{meaningYor ? "Ìtumọ̀" : "Yoruba Meaning"}:</b> {meaningYor}
          {!meaningYor && <Suggestion wordId={id} field="meaning_yor" />}
        </Fragment>
      </p>
    </div>
    <div className="answer-section">
      <p>
        <Fragment>
          <b>Example:</b> {exampleEng}
          {!exampleEng && <Suggestion wordId={id} field="example_eng" />}
        </Fragment>
      </p>
      <p>
        <Fragment>
          <b>{exampleYor ? "Àpẹrẹ" : "Yoruba Example"}:</b> {exampleYor}
          {!exampleYor && <Suggestion wordId={id} field="example_yor" />}
        </Fragment>
      </p>
    </div>
    {!forEdit && (
      <div className="answer-section">
        <p>Share Via:</p>
        <div className="socials-wrapper d-flex">
          <button
            type="button"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${getShareData(
                  window.location.href,
                  marked || unmarked
                )}&hashtags=yoruba,yorubawords`
              )
            }
          >
            <i className="fab fa-twitter" />
          </button>
          <button
            type="button"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer.php?u=${window.location.href}`
              )
            }
          >
            <i className="fab fa-facebook-f" />
          </button>
        </div>
      </div>
    )}
    {forEdit && (
      <button
        type="button"
        className="blue-btn approve-btn"
        onClick={handleEdit}
      >
        {editText}
      </button>
    )}
  </article>
);

export default WordItem;
