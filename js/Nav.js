let state = {
  isNavigationOpended: true,
  isInitRender: false,
};

const $toggleButton = document.querySelector('.toggle');
const $headerProfile = document.querySelector('.header-profile');
const $navContainer = document.querySelector('.nav-container');
const $nav = document.querySelector('nav');

const render = () => {
  state.isNavigationOpended === true
    ? ($headerProfile.style.opacity = '0')
    : ($headerProfile.style.opacity = '1');
  $nav.classList.toggle('active', state.isNavigationOpended);
  // $navContainer.classList.toggle('active', state.isInitRender);
};

const setState = newState => {
  state = newState;
  localStorage.setItem('isNavigationOpended', state.isNavigationOpended);
  render();
};

$toggleButton.addEventListener('click', () => {
  setState({ isNavigationOpended: !state.isNavigationOpended, isInitRender: false });
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isNavigationOpended')) {
    const isNavigationOpended = JSON.parse(localStorage.getItem('isNavigationOpended')) || false;
    setState({ isNavigationOpended, isInitRender: true });
  } else {
    setState({ isNavigationOpended: true, isInitRender: true });
  }
});
