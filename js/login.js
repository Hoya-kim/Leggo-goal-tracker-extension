const $nickname = document.getElementById('nickname');
const $reroll = document.querySelector('.reroll');

let nicknameWords = {};
let avatarComponentInfo = {};

const userInfo = {
  color: 'yellow',
  eyes: 0,
  mouth: 0,
  nickname: '',
};

const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum);

const getRandomNickname = () => {
  const adjectiveOfNickname =
    nicknameWords.adjective[getRandomNumber(nicknameWords.adjective.length)];
  const nounOfNickname = nicknameWords.noun[getRandomNumber(nicknameWords.noun.length)];
  return adjectiveOfNickname + ' ' + nounOfNickname;
};

const setRandomNickname = () => {
  const nickname = getRandomNickname();
  $nickname.value = nickname;
  userInfo.nickname = nickname;
};

const setRandomAvatar = () => {
  const randColor = avatarComponentInfo.color[getRandomNumber(avatarComponentInfo.color.length)];
  const randEyes = avatarComponentInfo.eyes[getRandomNumber(avatarComponentInfo.eyes.length)];
  const randMouth = avatarComponentInfo.mouth[getRandomNumber(avatarComponentInfo.mouth.length)];

  document.documentElement.style.setProperty('--face-color', `var(${randColor.face})`);
  document.documentElement.style.setProperty('--face-border-color', `var(${randColor.border})`);
  document.querySelector('.avatar-eyes').style[
    'background-image'
  ] = `url(../images/avatar/${randEyes})`;
  document.querySelector('.avatar-mouth').style[
    'background-image'
  ] = `url(../images/avatar/${randMouth})`;

  [userInfo.color, userInfo.eyes, userInfo.mouth] = [randColor, randEyes, randMouth];
};

const fetchAndInitNickname = () => {
  fetch('../nickname.json')
    .then(response => response.json())
    .then(json => {
      nicknameWords = json;
      setRandomNickname();
    });
};

const fetchAndInitAvatarInfo = () => {
  fetch('../avatarComponentInfo.json')
    .then(response => response.json())
    .then(json => {
      avatarComponentInfo = json;
      setRandomAvatar();
    });
};

window.addEventListener('DOMContentLoaded', () => {
  fetchAndInitNickname();
  fetchAndInitAvatarInfo();
});

$reroll.onclick = () => {
  setRandomNickname();
  setRandomAvatar();
};
