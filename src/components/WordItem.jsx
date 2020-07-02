/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

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
  editText
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
