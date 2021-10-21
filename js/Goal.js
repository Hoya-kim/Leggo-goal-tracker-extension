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
  constructor({ id, name, days, isAchieve = [], rewards = '' }) {
    this.#id = +id;
    this.#name = name;
    this.#days = +days;
    this.#isAchieve = isAchieve.length ? isAchieve : Array(+days).fill(false);
    this.#rewards = rewards;
  }

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
// }
