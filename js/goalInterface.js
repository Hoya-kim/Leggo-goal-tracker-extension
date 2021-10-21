import Goal from './Goal.js';
import state from './state.js';
import { getProgressPercent } from './utils/helper.js';

const $goalInputContainer = document.querySelector('.goal-input-container');
const $goalNameInput = document.getElementById('goal-name-input');
const $increase = document.querySelector('.increase');
const $goalDaysInput = document.getElementById('goal-days-input');
const $decrease = document.querySelector('.decrease');
const $goalListContainer = document.querySelector('.goal-list-container');
const $goalList = document.querySelector('.goal-list');

const render = goalDataList => {
  $goalListContainer.firstElementChild.classList.toggle('hidden', goalDataList.length);

  $goalList.innerHTML = goalDataList
    .map(
      ({ data: goal }) =>
        `<li class="goal-list-item" data-id="${goal.id}">
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
                    <div class="progress-indicator" style="width:${getProgressPercent(
                      goal.isAchieve,
                    )}%;"></div>
                    <span class="progress-label">${getProgressPercent(goal.isAchieve)}%</span>
                </div>
            </a>
        </li>`,
    )
    .join('');
};

const Counter = (() => {
  const $goalDaysInput = document.getElementById('goal-days-input');

  return {
    increase() {
      $goalDaysInput.value =
        $goalDaysInput.value < 99 ? +$goalDaysInput.value + 1 : $goalDaysInput.value;
    },
    decrease() {
      $goalDaysInput.value =
        $goalDaysInput.value > 3 ? $goalDaysInput.value - 1 : $goalDaysInput.value;
    },
  };
})();

const goalDaysInputValidation = () => {
  const { value } = $goalDaysInput;

  return /^\d+$/.test(value) && +value > 2 && +value < 366;
};

window.addEventListener('DOMContentLoaded', () => {
  state.fetchGoalList();
  render(state.getGoalListAll());
});

$goalInputContainer.onsubmit = e => {
  e.preventDefault();

  const goalName = $goalNameInput.value.trim();
  const goalDays = $goalDaysInput.value;

  if (goalName && goalDaysInputValidation()) {
    const newGoal = new Goal({ id: state.generateGoalId(), name: goalName, days: goalDays });
    state.addGoalToList(newGoal);
    render(state.getGoalListAll());
    $goalNameInput.value = '';
  } else {
    alert('올바른 입력값을 입력해주세요');
  }
};

$decrease.onclick = Counter.decrease;

$increase.onclick = Counter.increase;

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
  renderSelectedGoal();

  if (target.matches('.goal-delete > i')) {
    state.deleteGoal(+selected.dataset.id);
    render(state.getGoalListAll());
    renderGridItem(INITIAL_GOAL_OBJECT);
  }
};

// constant
const INITIAL_GOAL_OBJECT = new Goal({
  id: -1,
  name: '',
  days: 30, // num of challenge days
  isAchieve: Array.from({ length: 30 }, () => false),
  rewards: '',
});

// DOM Nodes
const $goalGrid = document.querySelector('.goal-grid');
const $goalRewards = document.querySelector('.goal-rewards');

/**
 * render HTML about goal grid
 * @param {Goal} - response from localStoarge
 */
const renderGridItem = ({ data }) => {
  const buttonsHTML = data.isAchieve
    .map(
      (achievement, idx) => `
    <button class="goal-grid-item day-button ${achievement ? 'checked' : ''}">
      ${idx + 1}
      <div class="day-button-checked"><i class='bx bx-badge-check' ></i></div>
    </button>`,
    )
    .join('');
  $goalGrid.innerHTML = `<div id="goal-grid-start" class="goal-grid-item end-point">Start</div>${buttonsHTML}<div class="goal-grid-item end-point">Finish</div>`;
  $goalRewards.lastElementChild.value = data.rewards;

  const $hoverLabel = document.querySelector('.hovered-info');
  data.id === -1 ? ($hoverLabel.style.display = 'flex') : ($hoverLabel.style.display = 'none');
};

/**
 * Get selected goal data from localStoarge
 */
const renderSelectedGoal = () => {
  $goalGrid.style.opacity = 0;
  const selected = state.getSelectedGoal();
  renderGridItem(!selected.id ? INITIAL_GOAL_OBJECT : selected);
  $goalGrid.style.opacity = 1;
};

/**
 * Update new rewards
 * @param {string} newRewards
 */
const updateRewards = newRewards => {
  const selected = state.getSelectedGoal();
  selected.rewards = newRewards;
  state.saveGoalList();
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

/**
 * when toggle event triggered, update achievement status
 * @param {number} dayNum - toggled day's number
 */
const toggleDay = dayNum => {
  const selected = state.getSelectedGoal();
  selected.toggleAchievementOfDay(dayNum);
  $goalGrid.children[dayNum + 1].classList.toggle('checked');
  state.saveGoalList();
  updateProgressBar(selected);
};

// Event Bindings
$goalRewards.onsubmit = e => {
  e.preventDefault();
  updateRewards(e.target.lastElementChild.value);
};

$goalGrid.onclick = e => {
  if (!e.target.classList.contains('day-button')) return;
  toggleDay(+e.target.textContent - 1);
};

window.addEventListener('DOMContentLoaded', () => {
  renderSelectedGoal();
});
