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
    setDataToJSON(
      'goal-list',
      goalDataList.map(goal => goal.data),
    );
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
     * save Goal list to local storage
     */
    saveGoalList() {
      setDataToJSON(
        'goal-list',
        goalDataList.map(goal => goal.data),
      );
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
      updateGoalList(
        getParsedFromJSON('goal-list').map(goalObject => new Goal({ ...goalObject })) || [],
      );
    },
    // deleteGoal(goalId) {},
  };
})();

export default state;
