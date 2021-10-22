import Goal from './Goal.js';
import { setDataToJSON, getParsedFromJSON } from '../utils/helper.js';

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
    /**
     * Get generated new Goal's ID
     * @returns {number}
     */
    generateGoalId() {
      return Math.max(...goalDataList.map(goal => goal.id), 0) + 1;
    },
    /**
     * Parse Object list to Goal Object list
     */
    fetchGoalList() {
      const parsed = getParsedFromJSON('goal-list');
      updateGoalList(parsed ? parsed.map(goalObject => new Goal({ ...goalObject })) : []);
    },
    /**
     * Delete Goal object matched to ID
     * @param {number} goalId - Target Goal ID
     */
    deleteGoal(goalId) {
      updateGoalList([...goalDataList.filter(goal => goal.id !== goalId)]);
    },
  };
})();

export default state;
