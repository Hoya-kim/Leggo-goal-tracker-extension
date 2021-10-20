/**
 * @typedef {object} Goal
 * @property {number} id
 * @property {string} name
 * @property {number} days
 * @property {Array} isAchieve
 * @property {string} rewards
 */

export default class Goal {
  /** @type {number} */
  #id;

  /** @type {string} */
  #name;

  /** @type {number} */
  #days;

  /** @type {Array} */
  #isAchieve;

  /** @type {string} */
  #rewards;

  /** @type {(id: number, name: string, days: number) => Goal}} */
  constructor(id, name, days) {
    this.#id = id;
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
      id: this.#id,
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
//   id: 1,
// 	name: '다이어트',
// 	days: 7,  // num of challenge days
// 	isAchieve: [false, false, false, true, false, false, false],
//   rewards: '야식으로 치킨 조지기',
// }
