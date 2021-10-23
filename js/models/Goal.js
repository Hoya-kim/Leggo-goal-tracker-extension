/**
 * @typedef {object} Goal
 * @property {number} id - Goal's ID (auto-increase)
 * @property {string} name - Goal's name
 * @property {number} days - Goal's number of due days
 * @property {Array<boolean>} [isAchieve=[]] - Achieved or not on each of days
 * @property {string} [rewards=''] - Goal's rewards
 * @property {Date} [startDate=new Date()] - Goal's enroll(start) date
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

  /** @type {Date} */
  #startDate;

  /**
   * @param {Goal} goalObject
   */
  constructor({ id, name, days, isAchieve = [], rewards = '', startDate = new Date() }) {
    this.#id = +id;
    this.#name = name;
    this.#days = +days;
    this.#isAchieve = isAchieve.length ? isAchieve : Array(+days).fill(false);
    this.#rewards = rewards;
    this.#startDate = startDate;
  }

  /**
   * @returns {number}
   */
  get id() {
    return this.#id;
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
      startDate: this.#startDate,
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
    this.#isAchieve[dayNum] = !this.#isAchieve[dayNum];
  }
}

// Goal object
// {
//   id: 1,
// 	name: '다이어트',
// 	days: 7,  // num of challenge days
// 	isAchieve: [false, false, false, true, false, false, false],
//   rewards: '야식으로 치킨 조지기',
//  startDate: new Date()
// }
