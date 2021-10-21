// helper, pure functions
/**
 * Get parsed JSON value from local storage
 * @param {string} key - for find value
 * @returns {any}
 */
export const getParsedFromJSON = key => JSON.parse(localStorage.getItem(key));

/**
 * Set value of data with key to local storage
 * @param {string} key - for set value
 * @param {string} value - be setted with key
 */
export const setDataToJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

/**
 * Get percent of Goal's progress
 * @param {Array<boolean>} isAchieve
 * @returns {number}
 */
export const getProgressPercent = isAchieve =>
  Math.floor((isAchieve.filter(isTrue => isTrue).length / isAchieve.length) * 100);

/**
 * Get random Interger within {0 ~ maxNum - 1}
 * @param {number} maxNum
 * @returns {number}
 */
export const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum);
