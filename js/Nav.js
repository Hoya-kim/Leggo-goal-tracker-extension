// TODO:
// - 순서 교정하기
const IMAGE_SPRITE_NUMBERS_OF_EYES = 6;
const IMAGE_SPRITE_NUMBERS_OF_MOUTH = 5;

let state = {
  isNavigationOpend: false,
  isInitRender: false,
};

const $toggleButton = document.querySelector('.toggle');
const $headerProfile = document.querySelector('.header-profile');
const $headerNickname = document.querySelector('.header-nickname');
const $navContainer = document.querySelector('.nav-container');
const $nav = document.querySelector('nav');
const $navNickname = document.querySelector('.nav-nickname');
const $goalContainer = document.querySelector('.goal-container');
const $navMenuList = document.querySelector('.nav-menu-list');

const render = () => {
  state.isNavigationOpend === true
    ? ($headerProfile.style.opacity = '0')
    : ($headerProfile.style.opacity = '1');
  $nav.classList.toggle('active', state.isNavigationOpend);
  [$navContainer, $headerProfile, $toggleButton, $goalContainer].forEach($el =>
    $el.classList.toggle('notransition', state.isInitRender),
  );

  // 아바타
  document.documentElement.style.setProperty(
    '--face-color',
    `var(${JSON.parse(localStorage.getItem('userInfo')).color.face})`,
  );
  document.documentElement.style.setProperty(
    '--face-border-color',
    `var(${JSON.parse(localStorage.getItem('userInfo')).color.border})`,
  );

  document.documentElement.style.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
  document.documentElement.style.setProperty(
    '--eyes-index',
    JSON.parse(localStorage.getItem('userInfo')).eyes,
  );
  document.documentElement.style.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);
  document.documentElement.style.setProperty(
    '--mouth-index',
    JSON.parse(localStorage.getItem('userInfo')).mouth,
  );

  // 닉네임
  $navNickname.innerHTML = JSON.parse(localStorage.getItem('userInfo')).nickname;
  $headerNickname.innerHTML = JSON.parse(localStorage.getItem('userInfo')).nickname;
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isNavigationOpend', state.isNavigationOpend);
  render();
};

$toggleButton.addEventListener('click', () => {
  setState({ isNavigationOpend: !state.isNavigationOpend, isInitRender: false });
});

window.addEventListener('keyup', e => {
  if (e.key === '`') {
    setState({ isNavigationOpend: !state.isNavigationOpend, isInitRender: false });
  }
});

$navMenuList.addEventListener('click', e => {
  if (!e.target.classList.contains('nav-menu')) return;
  [...document.querySelectorAll('.nav-menu')].forEach($menu => {
    $menu.classList.toggle('nav-menu-select', $menu === e.target);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
  const isNavigationOpend = JSON.parse(sessionStorage.getItem('isNavigationOpend')) || false;
  setState({ isNavigationOpend, isInitRender: true });
});
