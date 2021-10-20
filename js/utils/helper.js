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
