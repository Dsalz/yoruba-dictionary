/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";

// Components
import Alert from "./Alert";

const DashboardAddWordPage = ({
  error,
  loading,
  handleSubmit,
  handleChange,
  pos,
  exampleEng,
  exampleYor,
  meaningEng,
  meaningYor,
  formSubmitted,
  marked
}) => (
  <section className="add-words-section page-margin">
    <form onSubmit={handleSubmit}>
      <h1 className="page-header">Add Word</h1>
      <input
        type="text"
        name="marked"
        value={marked}
        placeholder="Enter marked word here"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      <input
        type="text"
        name="pos"
        value={pos}
        placeholder="Enter part of speech here (e.g Noun, Adjective)"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      <input
        type="text"
        name="meaningEng"
        value={meaningEng}
        placeholder="Enter meaning in english"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      <input
        type="text"
        name="meaningYor"
        value={meaningYor}
        placeholder="Enter meaning in yorùbá"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      <input
        type="text"
        name="exampleYor"
        value={exampleYor}
        placeholder="Enter example usage in yorùbá"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      <input
        type="text"
        name="exampleEng"
        value={exampleEng}
        placeholder="Enter english translation of example usage in yorùbá"
        onChange={handleChange}
        required
        className="underlined-input"
      />
      {error && <Alert type="error" message={error} />}
      {formSubmitted && (
        <Alert type="success" message="Successfully added word" />
      )}
      <button className="blue-btn" type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  </section>
);

export default DashboardAddWordPage;
