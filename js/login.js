let nicknameWords = {};
let avatarComponentInfo = {};

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

  const eyes = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).eyes
    : avatarComponentInfo.eyes[getRandomNumber(avatarComponentInfo.eyes.length)];

  const mouth = toChangeAvatar
    ? JSON.parse(localStorage.getItem('userInfo')).mouth
    : avatarComponentInfo.mouth[getRandomNumber(avatarComponentInfo.mouth.length)];

  document.documentElement.style.setProperty('--face-color', `var(${color.face})`);
  document.documentElement.style.setProperty('--face-border-color', `var(${color.border})`);
  document.querySelector('.avatar-eyes').style['background-image'] = 'url(../images/avatar/' + eyes;
  document.querySelector('.avatar-mouth').style['background-image'] =
    'url(../images/avatar/' + mouth;

  [userInfo.color, userInfo.eyes, userInfo.mouth] = [color, eyes, mouth];
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
