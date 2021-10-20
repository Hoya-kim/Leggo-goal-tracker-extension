let state = {
  isNavigationOpend: false,
  isInitRender: false,
};

const $toggleButton = document.querySelector('.toggle');
const $headerProfile = document.querySelector('.header-profile');
const $navContainer = document.querySelector('.nav-container');
const $nav = document.querySelector('nav');
const $goalContainer = document.querySelector('.goal-container');

const render = () => {
  state.isNavigationOpend === true
    ? ($headerProfile.style.opacity = '0')
    : ($headerProfile.style.opacity = '1');
  $nav.classList.toggle('active', state.isNavigationOpend);
  [$navContainer, $headerProfile, $toggleButton, $goalContainer].forEach($el =>
    $el.classList.toggle('notransition', state.isInitRender),
  );
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isNavigationOpend', state.isNavigationOpend);
  render();
};

$toggleButton.addEventListener('click', () => {
  setState({ isNavigationOpend: !state.isNavigationOpend, isInitRender: false });
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
  const isNavigationOpend = JSON.parse(sessionStorage.getItem('isNavigationOpend')) || false;
  setState({ isNavigationOpend, isInitRender: true });
});
