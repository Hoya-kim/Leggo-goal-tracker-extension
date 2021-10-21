let nicknameWords = {};
let avatarComponentInfo = {};
const IMAGE_SPRITE_NUMBERS_OF_EYES = 6;
const IMAGE_SPRITE_NUMBERS_OF_MOUTH = 5;

const userInfo = {};

const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum);

const getRandomNickname = () => {
  const adjectiveOfNickname =
    nicknameWords.adjective[getRandomNumber(nicknameWords.adjective.length)];
  const nounOfNickname = nicknameWords.noun[getRandomNumber(nicknameWords.noun.length)];
  return adjectiveOfNickname + ' ' + nounOfNickname;
};

const setNickname = toChangeAvatar => {
  const nickname = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).nickname
    : getRandomNickname();

  document.getElementById('nickname').value = nickname;
  userInfo.nickname = nickname;
};

const setAvatar = toChangeAvatar => {
  const color = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).color
    : avatarComponentInfo.color[getRandomNumber(avatarComponentInfo.color.length)];

  const randEyesIndex = getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_EYES);
  const randMouthIndex = getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_MOUTH);

  const eyesIndex = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).eyes
    : getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_EYES);

  const mouthIndex = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).mouth
    : getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_MOUTH);

  document.documentElement.style.setProperty('--face-color', `var(${color.face})`);
  document.documentElement.style.setProperty('--face-border-color', `var(${color.border})`);

  document.documentElement.style.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
  document.documentElement.style.setProperty('--eyes-index', eyesIndex);
  document.documentElement.style.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);
  document.documentElement.style.setProperty('--mouth-index', mouthIndex);

  [userInfo.color, userInfo.eyes, userInfo.mouth] = [color, eyesIndex, mouthIndex];
};

const fetchAndInitNickname = () => {
  fetch('../db/nickname.json')
    .then(response => response.json())
    .then(json => {
      nicknameWords = json;
    })
    .then(() => {
      setNickname(localStorage.getItem('userInfo'));
    });
};

const fetchAndInitAvatarInfo = () => {
  fetch('../db/avatarComponentInfo.json')
    .then(response => response.json())
    .then(json => {
      avatarComponentInfo = json;
      setAvatar(localStorage.getItem('userInfo'));
    });
};

window.addEventListener('DOMContentLoaded', () => {
  fetchAndInitNickname();
  fetchAndInitAvatarInfo();
});

document.querySelector('.submit').onclick = () => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = './pages/main.html';
};

document.querySelector('.reroll').onclick = () => {
  setNickname(false);
  setAvatar(false);
};

window.onkeyup = e => {
  if (e.key !== 'Enter' && e.key !== 'r') return;
  if (e.key === 'r') {
    setNickname(false);
    setAvatar(false);
  }
  if (e.key === 'Enter') {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    window.location.href = './pages/main.html';
  }
};
