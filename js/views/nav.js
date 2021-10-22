import { getParsedFromJSON, setDataToJSON, getDiffNumOfDays } from '../utils/helper.js';
import { IMAGE_SPRITE_NUMBERS_OF_EYES, IMAGE_SPRITE_NUMBERS_OF_MOUTH } from '../utils/constants.js';

const navView = (() => {
  let state = {
    isNavigationOpened: false,
    isInitRender: false,
  };

  const $mobileNavButton = document.querySelector('.mobile-nav-button');
  $mobileNavButton.addEventListener('click', e => {
    e.target.closest('.mobile-nav-button').classList.toggle('active');
  });

  const $visitedPopup = document.querySelector('.visited-popup');
  const $headerProfile = document.querySelector('.header-profile');
  const $headerNickname = document.querySelector('.header-nickname');
  const $toggleButton = document.querySelector('.toggle');
  const $navContainer = document.querySelector('.nav-container');
  const $nav = document.querySelector('nav');
  const $navMenu = document.querySelectorAll('.nav-menu');
  const $navMenuList = document.querySelector('.nav-menu-list');
  const $navNickname = document.querySelector('.nav-nickname');
  const $navMenuCommingsoon = document.querySelector('.nav-menu-commingsoon');
  const $goalContainer = document.querySelector('.goal-container');

  const { color, eyes, mouth, nickname } = getParsedFromJSON('userInfo');

  const render = () => {
    $headerProfile.style.opacity = +!state.isNavigationOpened;
    $nav.classList.toggle('active', state.isNavigationOpened);

    [$headerProfile, $toggleButton, $navContainer, ...$navMenu, $goalContainer].forEach($el =>
      $el.classList.toggle('notransition', state.isInitRender),
    );

    const rootStyle = document.documentElement.style;
    // 아바타
    rootStyle.setProperty('--face-color', `var(${color.face})`);
    rootStyle.setProperty('--face-border-color', `var(${color.border})`);
    rootStyle.setProperty('--eyes-index', eyes);
    rootStyle.setProperty('--mouth-index', mouth);
    rootStyle.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
    rootStyle.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);
    // 닉네임
    [$navNickname.textContent, $headerNickname.textContent] = [nickname, nickname];
  };

  const renderVisitedPopup = () => {
    const visitedDate = getParsedFromJSON('saveDate');
    const diffDate = getDiffNumOfDays(new Date('2021 / 10 / 10'), new Date()); // 시연용 지난 날짜
    // const diffDate = getDiffNumOfDays(new Date(visitedDate), new Date());

    const renderEmoji = emotion => `<i class='visited-popup-highlight bx bxs-${emotion}'></i>`;

    const firstVisit = `<p class="last-day">첫 방문을 환영합니다! <span class="visited-popup-highlight">${nickname}</span>님! ${renderEmoji(
      'graduation',
    )}</p>`;
    const FixedComment = `<p class="last-day">마지막 방문일로부터 <span class="visited-popup-highlight">${diffDate}일</span> 지났습니다. <span class="visited-popup-highlight">${nickname}</span>님 `;

    const addComment =
      diffDate > 7
        ? `너무 오랜만이네요! 좀 더 자주 만나요! ${renderEmoji('sad')}</p>`
        : diffDate > 1
        ? `또 오셨네요! 환영합니다! ${renderEmoji('happy-heart-eyes')}</p>`
        : `<p>또 방문해주셨군요! ${renderEmoji('happy-heart-eyes')}</p>`;

    const againVisit = diffDate === 0 ? addComment : FixedComment + addComment;

    $visitedPopup.innerHTML = visitedDate ? againVisit : firstVisit;

    setDataToJSON('saveDate', new Date());

    // 1초뒤 나오게
    setTimeout(() => {
      $visitedPopup.classList.add('visited-popup-slide');
    }, 1000);

    // 3초뒤 사라지게
    setTimeout(() => {
      $visitedPopup.classList.remove('visited-popup-slide');
    }, 5000);
  };

  const setState = newState => {
    state = newState;
    sessionStorage.setItem('isNavigationOpened', state.isNavigationOpened);
    render();
  };

  const initializeNavView = () => {
    const isNavigationOpened = !!JSON.parse(sessionStorage.getItem('isNavigationOpened'));
    setState({ isNavigationOpened, isInitRender: true });
    renderVisitedPopup();
  };

  // Export ------------------------------------------------------------------------------------
  /**
   * Initailize nav view
   * @type {() => {}}
   */
  return () => {
    initializeNavView();

    // Event bindings --------------------------------------------------------------------------
    $toggleButton.addEventListener('click', () => {
      setState({ isNavigationOpened: !state.isNavigationOpened, isInitRender: false });
    });

    window.addEventListener('keyup', ({ target, key }) => {
      if (target.matches('input')) return;
      if (key !== '`' && key !== '₩') return;
      setState({ isNavigationOpened: !state.isNavigationOpened, isInitRender: false });
    });

    $navMenuList.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('nav-menu')) return;
      if (target.classList.contains('nav-menu-commingsoon')) return;

      [...$navMenuList.querySelectorAll('.nav-menu')].forEach($menu => {
        $menu.classList.toggle('nav-menu-select', $menu === target);
      });
    });

    $navMenuCommingsoon.addEventListener('click', () => {
      alert('comming soon..');
    });
  };
})();

export default navView;
