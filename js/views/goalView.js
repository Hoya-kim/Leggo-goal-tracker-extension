import Goal from '../models/Goal.js';
import state from '../models/state.js';
import Counter from '../models/Counter.js';
import { getProgressPercent } from '../utils/helper.js';
import {
  MILLISECOND_IN_A_DAY,
  MAX_COUNT_GOAL_DAYS,
  MIN_COUNT_GOAL_DAYS,
} from '../utils/constants.js';
import explode from '../utils/explosion.js';

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
  const $goalNameInput = document.getElementById('goal-name-input');

  // DOM Nodes for grid
  const $goalGrid = document.querySelector('.goal-grid');
  const $goalRewardsInput = document.querySelector('.goal-rewards > input');

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
                    <div class="progress-indicator" style="opacity: ${progress/100}; width:${progress}%;"></div>
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
      $goalRewardsInput.value = rewards;

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
    $targetGoalItem.querySelector('.progress-indicator').style.opacity = `${progress / 100}`;
    $targetGoalItem.querySelector('.progress-label').textContent = `${progress}%`;
  };

  /**
   * Get selected goal data from localStoarge & Render it
   */
  const showSelectedGoalGrid = () => {
    $goalGrid.style.opacity = 0;
    const selected = state.getSelectedGoal();
    render.goalGridItem(!selected.id ? SAMPLE_GOAL_OBJECT : selected);
    $goalGrid.style.opacity = 1;
  };
  /**
   * Get result of input's validation test
   * @returns {boolean}
   */
  const validateGoalDaysInput = () => {
    const { value } = $goalDaysInput;
    return /^\d+$/.test(value) && +value > 2 && +value < 366;
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

  const initializeGoalView = () => {
    state.fetchGoalList();
    render.goalList(state.getGoalListAll());
    showSelectedGoalGrid();
  };

  // Export ------------------------------------------------------------------------------------
  /**
   * Initailize goal view
   * @type {() => {}}
   */
  return () => {
    initializeGoalView();

    // Event Bindings --------------------------------------------------------------------------
    // Input Goal text event
    document.querySelector('.goal-input-container').onsubmit = e => {
      e.preventDefault();

      const goalName = $goalNameInput.value.trim();
      const goalDays = Counter.get();

      if (goalName && validateGoalDaysInput()) {
        const newGoal = new Goal({ id: state.generateGoalId(), name: goalName, days: goalDays });
        state.addGoalToList(newGoal);
        render.goalList(state.getGoalListAll());
        $goalNameInput.value = '';
      } else {
        alert('올바른 입력값을 입력해주세요');
      }
    };

    // Input counters events
    $goalDaysInput.onblur = () => {
      const inputCount = +$goalDaysInput.value || 7;
      $goalDaysInput.value =
        inputCount > MAX_COUNT_GOAL_DAYS
          ? MAX_COUNT_GOAL_DAYS
          : inputCount < MIN_COUNT_GOAL_DAYS
          ? MIN_COUNT_GOAL_DAYS
          : inputCount;
      Counter.set(+$goalDaysInput.value);
    };

    document.querySelector('.increase').onclick = () => {
      $goalDaysInput.value = Counter.increase();
    };

    document.querySelector('.decrease').onclick = () => {
      $goalDaysInput.value = Counter.decrease();
    };

    // Goal List event
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
      showSelectedGoalGrid();

      if (target.matches('.goal-delete > i')) {
        state.deleteGoal(+selected.dataset.id);
        render.goalList(state.getGoalListAll());
        render.goalGridItem(SAMPLE_GOAL_OBJECT);
      }
    };

    // Goal Grid event
    $goalGrid.onclick = e => {
      if (!e.target.classList.contains('day-button')) return;
      toggleDay(+e.target.textContent - 1);

      // explode animation
      const primary = getComputedStyle(document.documentElement).getPropertyValue(
        '--primary-color',
      );
      const secondary = getComputedStyle(document.documentElement).getPropertyValue(
        '--secondary-color',
      );
      explode(e.pageX, e.pageY, [primary, secondary]);
    };

    // Goal Rewards event
    document.querySelector('.goal-rewards').onsubmit = e => {
      e.preventDefault();
      updateRewards(e.target.lastElementChild.value);
    };

    $goalRewardsInput.onblur = e => {
      updateRewards(e.target.value);
    };
  };
})();

export default goalView;
