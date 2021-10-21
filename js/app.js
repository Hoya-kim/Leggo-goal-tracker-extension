import { getParsedFromJSON } from './utils/helper.js';

const userInfo = getParsedFromJSON('userInfo');
// Set :root variables
document.documentElement.style.setProperty('--primary-color', `var(${userInfo.color.border})`);
document.documentElement.style.setProperty('--secondary-color', `var(${userInfo.color.face})`);
