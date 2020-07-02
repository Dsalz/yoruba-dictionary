/**
 * @method extractFirebaseDataFromArrayResponse
 * @description The function that extracts data from firebase array response
 * @param {string} response - firebase response
 * @param {boolean} unique - whether to return only items with unique meanings
 * @returns {undefined}
 */
export const extractFirebaseDataFromArrayResponse = (
  response,
  unique = false
) => {
  const meanings = [];
  const answers = [];

  response
    .reduce((acc, currVal) => acc.concat(currVal.docs), [])
    .forEach(doc => {
      const data = doc.data();
      if (meanings.includes(data.meaning) && unique) {
        return;
      }
      const { id } = doc.ref;
      answers.push({ ...data, id });
      meanings.push(data.meaning);
    });

  return answers;
};

/**
 * @method pronounceWord
 * @description The function that pronounces words
 * @param {object} word - word
 * @returns {undefined}
 */
export const pronounceWord = word => {
  sessionStorage.removeItem("YDPronounceError");
  if (sessionStorage.getItem("YDPronounceLoading")) {
    return;
  }
  sessionStorage.setItem("YDPronounceLoading", "true");
  const audioTrack = new Audio(
    `https://gentle-falls-68008.herokuapp.com/api/v1/names/${word}`
  );

  audioTrack.play().catch(() => {
    sessionStorage.removeItem("YDPronounceLoading");
    sessionStorage.setItem("YDPronounceError", "true");
  });

  audioTrack.onended = () => {
    sessionStorage.removeItem("YDPronounceLoading");
    sessionStorage.setItem("YDPronounceError", "true");
  };
};
