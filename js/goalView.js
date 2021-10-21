import Goal from './models/Goal.js';
import state from './models/state.js';
import Counter from './models/Counter.js';
import { getProgressPercent } from './utils/helper.js';
import {
  MILLISECOND_IN_A_DAY,
  MAX_COUNT_GOAL_DAYS,
  MIN_COUNT_GOAL_DAYS,
} from './utils/constants.js';

// constant
const SAMPLE_GOAL_OBJECT = new Goal({
  id: -1,
  name: '',
  days: 30, // num of challenge days
  isAchieve: Array.from({ length: 30 }, (_, idx) => !!(idx % 4) && idx < 11),
  rewards: '',
  startDate: new Date() - MILLISECOND_IN_A_DAY * 10,
});

// Closure
const goalView = (() => {
  // DOM Nodes for list
  const $goalDaysInput = document.getElementById('goal-days-input');
  const $goalListContainer = document.querySelector('.goal-list-container');
  const $goalList = document.querySelector('.goal-list');

  // DOM Nodes for grid
  const $goalGrid = document.querySelector('.goal-grid');
  const $goalRewards = document.querySelector('.goal-rewards');

  /**
   * Render functions
   *  @type {object}
   */
  const render = {
    /**
     * Render Goal List
     * @param {Array<Goal>} goalDataList
     */
    goalList(goalDataList) {
      $goalListContainer.firstElementChild.classList.toggle('hidden', goalDataList.length);

      $goalList.innerHTML = goalDataList
        .map(({ data: goal }) => {
          const progress = getProgressPercent(goal.isAchieve);
          return `<li class="goal-list-item" data-id="${goal.id}">
            <a href="#goal-grid-start">
                <div class="goal-info">
                    <span class="goal-name">
                        ${goal.name}
                    </span>
                    <span class="goal-days">${goal.days}일</span>
                    <button class="goal-delete">
                      <i class='bx bx-trash'></i>
                    </button>
                </div>
                <div class="progress-bar">
                    <div class="progress-indicator" style="width:${progress}%;"></div>
                    <span class="progress-label">${progress}%</span>
                </div>
            </a>
        </li>`;
        })
        .join('');
    },
    /**
     * render HTML about goal grid
     * @param {Goal} - response from localStoarge
     */
    goalGridItem({ data }) {
      const { rewards, isAchieve, startDate } = data;

      const today = Math.floor((new Date() - new Date(startDate)) / MILLISECOND_IN_A_DAY + 1);

      const buttonsHTML = isAchieve
        .map(
          (achievement, idx) =>
            `<button class="goal-grid-item day-button ${achievement ? 'checked' : ''}" ${
              idx + 1 >= today ? '' : 'disabled'
            }>
          ${idx + 1}
          <div class="day-button-checked"><i class='bx bx-badge-check' ></i></div>
        </button>`,
        )
        .join('');
      $goalGrid.innerHTML = `<div id="goal-grid-start" class="goal-grid-item end-point">Start</div>${buttonsHTML}<div class="goal-grid-item end-point">Finish</div>`;
      $goalRewards.lastElementChild.value = rewards;

      const $hoverLabel = document.querySelector('.hovered-info');
      data.id === -1 ? ($hoverLabel.style.display = 'flex') : ($hoverLabel.style.display = 'none');
    },
  };

  /**
   * Update progressbar UI indicator
   * @param {Goal}
   */
  const updateProgressBar = ({ data }) => {
    const progress = getProgressPercent(data.isAchieve);
    const $targetGoalItem = document.querySelector('.goal-list-item.active');
    $targetGoalItem.querySelector('.progress-indicator').style.width = `${progress}%`;
    $targetGoalItem.querySelector('.progress-label').textContent = `${progress}%`;
  };

  return {
    render,
    /**
     * Get selected goal data from localStoarge & Render it
     */
    showSelectedGoalGrid() {
      $goalGrid.style.opacity = 0;
      const selected = state.getSelectedGoal();
      render.goalGridItem(!selected.id ? SAMPLE_GOAL_OBJECT : selected);
      $goalGrid.style.opacity = 1;
    },
    /**
     * Get result of input's validation test
     * @returns {boolean}
     */
    validateGoalDaysInput() {
      const { value } = $goalDaysInput;
      return /^\d+$/.test(value) && +value > 2 && +value < 366;
    },
    /**
     * Update new rewards
     * @param {string} newRewards
     */
    updateRewards(newRewards) {
      const selected = state.getSelectedGoal();
      selected.rewards = newRewards;
      state.saveGoalList();
    },
    /**
     * when toggle event triggered, update achievement status
     * @param {number} dayNum - toggled day's number
     */
    toggleDay(dayNum) {
      const selected = state.getSelectedGoal();
      selected.toggleAchievementOfDay(dayNum);
      $goalGrid.children[dayNum + 1].classList.toggle('checked');
      state.saveGoalList();
      updateProgressBar(selected);
    },
  };
})();

// DOM Nodes
const $goalInputContainer = document.querySelector('.goal-input-container');
const $goalNameInput = document.getElementById('goal-name-input');
const $increase = document.querySelector('.increase');
const $decrease = document.querySelector('.decrease');
const $goalDaysInput = document.getElementById('goal-days-input');
const $goalList = document.querySelector('.goal-list');
const $goalGrid = document.querySelector('.goal-grid');
const $goalRewards = document.querySelector('.goal-rewards');

// Event Bindings
window.addEventListener('DOMContentLoaded', () => {
  state.fetchGoalList();
  goalView.render.goalList(state.getGoalListAll());
  goalView.showSelectedGoalGrid();
});

$goalInputContainer.onsubmit = e => {
  e.preventDefault();

  const goalName = $goalNameInput.value.trim();
  const goalDays = Counter.get();

  if (goalName && goalView.validateGoalDaysInput()) {
    const newGoal = new Goal({ id: state.generateGoalId(), name: goalName, days: goalDays });
    state.addGoalToList(newGoal);
    goalView.render.goalList(state.getGoalListAll());
    $goalNameInput.value = '';
  } else {
    alert('올바른 입력값을 입력해주세요');
  }
};

$goalDaysInput.onblur = () => {
  const inputCount = +$goalDaysInput.value;
  $goalDaysInput.value =
    inputCount > MAX_COUNT_GOAL_DAYS
      ? MAX_COUNT_GOAL_DAYS
      : inputCount < MIN_COUNT_GOAL_DAYS
      ? MIN_COUNT_GOAL_DAYS
      : inputCount;
  Counter.set(+$goalDaysInput.value);
};

$decrease.onclick = () => {
  $goalDaysInput.value = Counter.decrease();
};

$increase.onclick = () => {
  $goalDaysInput.value = Counter.increase();
};

$goalList.onclick = ({ target }) => {
  if (!target.closest('li')) return;

  const selected = target.closest('li');

  [...$goalList.children].forEach(goalListItem => {
    goalListItem.classList.toggle('active', selected.dataset.id === goalListItem.dataset.id);
  });

  const deletButton = selected.querySelector('.goal-delete');

  deletButton.classList.add('boing');

  setTimeout(() => {
    deletButton.classList.remove('boing');
  }, 1800);

  state.setSelectedGoal(+selected.dataset.id);
  goalView.showSelectedGoalGrid();

  if (target.matches('.goal-delete > i')) {
    state.deleteGoal(+selected.dataset.id);
    goalView.render.goalList(state.getGoalListAll());
    goalView.render.goalGridItem(SAMPLE_GOAL_OBJECT);
  }
};

$goalRewards.onsubmit = e => {
  e.preventDefault();
  goalView.updateRewards(e.target.lastElementChild.value);
};

$goalGrid.onclick = e => {
  if (!e.target.classList.contains('day-button')) return;
  goalView.toggleDay(+e.target.textContent - 1);
};
