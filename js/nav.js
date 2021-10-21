import { getParsedFromJSON } from './utils/helper.js';

// Constants
const IMAGE_SPRITE_NUMBERS_OF_EYES = 6;
const IMAGE_SPRITE_NUMBERS_OF_MOUTH = 5;

let state = {
  isNavigationOpened: false,
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
const $navMenuCommingsoon = document.querySelector('.nav-menu-commingsoon');

const render = () => {
  $headerProfile.style.opacity = +!state.isNavigationOpened;
  $nav.classList.toggle('active', state.isNavigationOpened);

  [$navContainer, $headerProfile, $toggleButton, $goalContainer].forEach($el =>
    $el.classList.toggle('notransition', state.isInitRender),
  );

  const $root = document.documentElement;
  const { color, eyes, mouth, nickname } = getParsedFromJSON('userInfo');
  // 아바타
  $root.style.setProperty('--face-color', `var(${color.face})`);
  $root.style.setProperty('--face-border-color', `var(${color.border})`);
  $root.style.setProperty('--eyes-index', eyes);
  $root.style.setProperty('--mouth-index', mouth);
  $root.style.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
  $root.style.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);
  // 닉네임
  [$navNickname.textContent, $headerNickname.textContent] = [nickname, nickname];
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isNavigationOpened', state.isNavigationOpened);
  render();
};

// Event bindings
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
  const isNavigationOpened = JSON.parse(sessionStorage.getItem('isNavigationOpened')) || false;
  setState({ isNavigationOpened, isInitRender: true });
});

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
