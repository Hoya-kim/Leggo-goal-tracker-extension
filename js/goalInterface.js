import Goal from './Goal.js';
import state from './state.js';

const $goalForm = document.querySelector('.goal-form');
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

const goalDaysInputValidation = () =>
  /^\d+$/.test($goalDaysInput.value) && $goalDaysInput.value > 2 && $goalDaysInput.value < 100;

window.addEventListener('DOMContentLoaded', () => {
  state.fetchGoalList();
  render(state.getGoalListAll());
});

$goalForm.onkeyup = e => {
  if (e.key !== 'Enter') return;
  if (!e.target.matches('.goal-form input')) return;

  const goalName = $goalNameInput.value.trim();
  const goalDays = $goalDaysInput.value;

  if (goalName && goalDaysInputValidation()) {
    const newGoal = new Goal(state.generateGoalId(), goalName, goalDays);
    state.addGoalToList(newGoal.data);
    render(state.getGoalListAll());
    $goalNameInput.value = '';
    $goalDaysInput.value = 30;
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
