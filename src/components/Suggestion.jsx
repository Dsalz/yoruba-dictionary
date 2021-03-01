/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { firestore } from "firebase";
import Button from "./Button";
import Alert from "./Alert";

const Suggestion = ({ wordId, field }) => {
  const [userSuggestion, setUserSuggestion] = useState("");
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addedSuggestion, setAddedSuggestion] = useState(false);

  /**
   * @method resetFormAlert
   * @description The function that handles form alert messages reset
   * @returns {undefined}
   */
  const resetFormAlert = () => {
    setError("");
    setAddedSuggestion(false);
  };

  /**
   * @method handleChange
   * @description The function that handles input change
   * @param {object} e - event object
   * @returns {undefined}
   */
  const handleChange = e => {
    setUserSuggestion(e.target.value);
    resetFormAlert();
  };

  /**
   * @method handleSubmit
   * @description The function that handles form submission
   * @param {object} e - event object
   * @returns {undefined}
   */
  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await firestore()
        .collection("suggestions")
        .add({
          field_name: field,
          value: userSuggestion,
          word_id: wordId,
          created_at: firestore.FieldValue.serverTimestamp(),
          updated_at: firestore.FieldValue.serverTimestamp()
        });
      setAddedSuggestion(true);
      setShowSuggestionForm(false);
    } catch (err) {
      setError("Error adding suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suggestion-wrapper">
      {!showSuggestionForm && (
        <div>
          {!addedSuggestion && (
            <button
              onClick={() => setShowSuggestionForm(true)}
              type="button"
              className="icon-btn"
            >
              <i className="small fas fa-pen" />
            </button>
          )}

          {addedSuggestion && (
            <Alert type="success" message="Suggestion Added! Thanks :)" />
          )}
        </div>
      )}

      {showSuggestionForm && (
        <form className="suggestion-form" onSubmit={handleSubmit}>
          <div className="suggestion-form-input-wrapper">
            <input
              type="text"
              name="userSuggestion"
              value={userSuggestion}
              placeholder="Enter suggestion here"
              onChange={handleChange}
              required
              className="underlined-input"
              disabled={loading}
            />
            {error && (
              <span className="form-input-text error-text">{error}</span>
            )}
          </div>
          <Button
            type="submit"
            customClass="blue-btn submit-btn"
            loading={loading}
          >
            Submit
          </Button>
          <button
            onClick={() => {
              setShowSuggestionForm(false);
              setUserSuggestion("");
              resetFormAlert();
            }}
            type="button"
            className="icon-btn close-btn"
          >
            <i className="small fas fa-times" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Suggestion;
