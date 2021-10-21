import { MIN_COUNT_GOAL_DAYS, MAX_COUNT_GOAL_DAYS } from '../utils/constants.js';

const Counter = (() => {
  let counts = MIN_COUNT_GOAL_DAYS;

  return {
    /**
     * Get counts
     * @returns {number}
     */
    get() {
      return counts;
    },
    /**
     * Set counts
     * @param {number} newCount
     * @returns {number}
     */
    set(newCount = MIN_COUNT_GOAL_DAYS) {
      counts = +newCount;
      return counts;
    },
    /**
     * Increase number within lower than MAX_COUNT_GOAL_DAYS
     * @returns counts
     */
    increase() {
      counts = counts < MAX_COUNT_GOAL_DAYS ? counts + 1 : counts;
      return counts;
    },
    /**
     * Decrease number within higher than MIN_COUNT_GOAL_DAYS
     * @returns counts
     */
    decrease() {
      counts = counts > 3 ? counts - 1 : counts;
      return counts;
    },
  };
})();

export default Counter;
