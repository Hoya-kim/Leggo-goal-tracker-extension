/**
 * @typedef {object} Goal
 * @property {string} name
 * @property {number} days
 * @property {Array} isAchieve
 * @property {string} rewards
 */

export default class Goal {
  /** @type {string} */
  #name;

  /** @type {number} */
  #days;

  /** @type {Array} */
  #isAchieve;

  /** @type {string} */
  #rewards;

  /** @type {(name: string, days: number) => Goal}} */
  constructor(name, days) {
    this.#name = name;
    this.#days = days;
    this.#isAchieve = Array.from({ length: days }, () => false);
    this.#rewards = '';
  }

  /**
   * Return deep copy of instance
   * @returns {Goal}
   */
  get data() {
    return {
      name: this.#name,
      days: this.#days,
      isAchieve: [...this.#isAchieve],
      rewards: this.#rewards,
    };
  }

  /**
   * Setter for rewards string
   * @param {string} newRewards - new Rewards for replaced
   */
  set rewards(newRewards) {
    this.#rewards = newRewards;
  }

  /**
   * Toggle achievement of day
   * @param {number} dayNum
   */
  toggleAchievementOfDay(dayNum) {
    this.#isAchieve[dayNum - 1] = !this.#isAchieve[dayNum - 1];
  }
}

// Goal object
// {
// 	name: '다이어트',
// 	days: 7,  // num of challenge days
// 	isSuccess: [false, false, false, true, false, false, false],
// }
