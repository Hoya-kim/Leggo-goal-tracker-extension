// TODO:
// - 순서 교정하기

let state = {
  isNavigationOpend: false,
  isInitRender: false,
};

const $toggleButton = document.querySelector('.toggle');
const $headerProfile = document.querySelector('.header-profile');
const $navContainer = document.querySelector('.nav-container');
const $nav = document.querySelector('nav');
const $navNickname = document.querySelector('.nav-nickname');
const $goalContainer = document.querySelector('.goal-container');

const render = () => {
  state.isNavigationOpend === true
    ? ($headerProfile.style.opacity = '0')
    : ($headerProfile.style.opacity = '1');
  $nav.classList.toggle('active', state.isNavigationOpend);
  [$navContainer, $headerProfile, $toggleButton, $goalContainer].forEach($el =>
    $el.classList.toggle('notransition', state.isInitRender),
  );

  // 닉네임
  $navNickname.innerHTML = JSON.parse(localStorage.getItem('userInfo')).nickname;
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isNavigationOpend', state.isNavigationOpend);
  render();
};

$toggleButton.addEventListener('click', () => {
  setState({ isNavigationOpend: !state.isNavigationOpend, isInitRender: false });
});

window.addEventListener('click', e => {
  if (e.key === '2') {
    console.log('tset');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
  const isNavigationOpend = JSON.parse(sessionStorage.getItem('isNavigationOpend')) || false;
  setState({ isNavigationOpend, isInitRender: true });
});
