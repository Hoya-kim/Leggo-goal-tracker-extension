import goalView from './views/goalView.js';
import navView from './views/nav.js';
import { getParsedFromJSON } from './utils/helper.js';

const setThemes = () => {
  const userInfo = getParsedFromJSON('userInfo');
  // Set :root variables
  document.documentElement.style.setProperty('--primary-color', `var(${userInfo.color.border})`);
  document.documentElement.style.setProperty('--secondary-color', `var(${userInfo.color.face})`);
};

window.addEventListener('DOMContentLoaded', () => {
  setThemes();
  goalView();
  navView();

  setTimeout(() => {
    document.querySelector('.spinner-container').style.display = 'none';
  }, 800);
});
