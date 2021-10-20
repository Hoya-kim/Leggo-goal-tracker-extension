import Goal from './Goal.js';
import { setDataToJSON, getParsedFromJSON } from './utils/helper.js';

const state = (() => {
  /** @type {Array<Goal>} */
  let goalDataList = [];

  /** @type {Goal} */
  let selectedGoal = {};

  /**
   * Replaced with newGaolList, update local storage
   * @param {Array<Goal>} newGoalList
   */
  const updateGoalList = newGoalList => {
    goalDataList = newGoalList;
    setDataToJSON('goal-list', goalDataList);
  };

  return {
    /**
     * Get all Goal objects from list
     * @returns {Array<Goal>}
     */
    getGoalListAll() {
      return goalDataList;
    },
    /**
     * Add new Goal to list
     * @param {Goal} goal
     */
    addGoalToList(newGoal) {
      updateGoalList([newGoal, ...goalDataList]);
    },
    /**
     * Get selected Goal Object
     * @returns {Goal}
     */
    getSelectedGoal() {
      return selectedGoal;
    },
    /**
     * Set selected Goal by goal ID
     * @param {number} goalId
     */
    setSelectedGoal(goalId) {
      [selectedGoal] = [...goalDataList.filter(goal => goal.id === goalId)];
    },
    generateGoalId() {
      return Math.max(...goalDataList.map(goal => goal.id), 0) + 1;
    },
    fetchGoalList() {
      updateGoalList([
        {
          id: 3,
          name: '하루에 알고리즘 한문제 풀기',
          days: '99',
          isAchieve: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          rewards: '',
        },
        {
          id: 2,
          name: '하루에 1만보 걷기',
          days: '99',
          isAchieve: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          rewards: '',
        },
        {
          id: 1,
          name: '하루에 물 2L 마시기',
          days: '14',
          isAchieve: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          rewards: '',
        },
      ]);
      // updateGoalList(getParsedFromJSON('goal-list') || []);
    },
    // deleteGoal(goalId) {},
  };
})();

export default state;
