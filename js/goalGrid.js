import Goal from './Goal.js';
import { getParsedFromJSON } from './utils/helper.js';

// constant
const INITIAL_GOAL_OBJECT = {
  name: '',
  days: 30, // num of challenge days
  isAchieve: Array.from({ length: 30 }, () => false),
  rewards: '',
};

// DOM Nodes
const $goalGrid = document.querySelector('.goal-grid');
const $goalRewards = document.querySelector('.goal-rewards');

/**
 * render HTML about goal grid
 * @param {Goal} - response from localStoarge
 */
const renderGridItem = ({ isAchieve, rewards }) => {
  const buttonsHTML = isAchieve
    .map(
      (achievement, idx) => `
    <button class="goal-grid-item day-button">
      ${idx + 1}
      <div class="day-button-checked ${achievement ? 'checked' : ''}"></div>
    </button>`,
    )
    .join('');
  $goalGrid.innerHTML = `<div id="goal-grid-start" class="goal-grid-item end-point">Start</div>${buttonsHTML}<div class="goal-grid-item end-point">Finish</div>`;
  $goalRewards.lastElementChild.value = rewards;
};

/**
 * Get selected goal data from localStoarge
 * @param {string} goalId - goal-*
 */
const getGoalData = goalId => {
  $goalGrid.style.opacity = 0;
  renderGridItem(getParsedFromJSON(goalId) || INITIAL_GOAL_OBJECT);
  $goalGrid.style.opacity = 1;
};

/**
 * Update new rewards
 * @param {string} newRewards
 */
const updateRewards = newRewards => {
  console.warn('구현 필요');
};

/**
 * when toggle event triggered, update achievement status
 * @param {number} dayNum - toggled day's number
 */
const toggleDay = dayNum => {
  // 선택된 객체에, toggleAchievementOfDay(dayNum)
  console.warn('구현 필요 ', 'toggle ', dayNum);
};

// Event Bindings
$goalRewards.onsubmit = e => {
  e.preventDefault();
  updateRewards(e.target.lastElementChild.value);
  e.target.lastElementChild.value = '';
};

$goalGrid.onclick = e => {
  if (!e.target.classList.contains('day-button')) return;
  toggleDay(+e.target.textContent - 1);
};

window.addEventListener('DOMContentLoaded', () => {
  getGoalData();
});
