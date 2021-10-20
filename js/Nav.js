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
const $avatarFace = document.querySelector('.avatar-face');
const $avatarEyes = document.querySelector('.avatar-eyes');
const $avatarMouth = document.querySelector('.avatar-mouth');
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

  // 아바타
  document.documentElement.style.setProperty(
    '--face-color',
    `var(${JSON.parse(localStorage.getItem('userInfo')).color.face})`,
  );
  document.documentElement.style.setProperty(
    '--face-border-color',
    `var(${JSON.parse(localStorage.getItem('userInfo')).color.border})`,
  );

  const { eyes } = JSON.parse(localStorage.getItem('userInfo'));
  $avatarEyes.style['background-image'] = 'url(../images/avatar/' + eyes;

  const { mouth } = JSON.parse(localStorage.getItem('userInfo'));
  $avatarMouth.style['background-image'] = 'url(../images/avatar/' + mouth;

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
