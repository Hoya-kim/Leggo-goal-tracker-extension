import Goal from './Goal.js';
import state from './state.js';

const $goalInputContainer = document.querySelector('.goal-input-container');
const $goalNameInput = document.getElementById('goal-name-input');
const $increase = document.querySelector('.increase');
const $goalDaysInput = document.getElementById('goal-days-input');
const $decrease = document.querySelector('.decrease');
const $goalListContainer = document.querySelector('.goal-list-container');
const $goalList = document.querySelector('.goal-list');

const render = goalDataList => {
  if (goalDataList.length) $goalListContainer.firstElementChild.classList.add('hidden');

  $goalList.innerHTML = goalDataList
    .map(
      goal =>
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
                    <div class="progress-indicator"></div>
                    <span class="progress-label">0%</span>
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

  return /^\d+$/.test(value) && +value > 2 && +value < 100;
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
    const newGoal = new Goal(state.generateGoalId(), goalName, goalDays);
    state.addGoalToList(newGoal.data);
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

  [...$goalList.children].forEach(goalListItem => {
    goalListItem.classList.toggle(
      'active',
      target.closest('li').dataset.id === goalListItem.dataset.id,
    );
  });

  // 선택된 골 그리드 갱신
  console.warn('선택된 골 그리드 갱신');
};
