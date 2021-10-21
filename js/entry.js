import { getParsedFromJSON, setDataToJSON, getRandomNumber } from './utils/helper.js';
import { IMAGE_SPRITE_NUMBERS_OF_EYES, IMAGE_SPRITE_NUMBERS_OF_MOUTH } from './utils/constants.js';

const userEntry = (() => {
  let nicknameWords = {};
  let avatarComponentInfo = {};

  const currentUserInfo = {};

  const getRandomNickname = () => {
    const adjectiveOfNickname =
      nicknameWords.adjective[getRandomNumber(nicknameWords.adjective.length)];
    const nounOfNickname = nicknameWords.noun[getRandomNumber(nicknameWords.noun.length)];
    return adjectiveOfNickname + ' ' + nounOfNickname;
  };

  const setNickname = toChangeAvatar => {
    const nickname = toChangeAvatar ? getParsedFromJSON('userInfo').nickname : getRandomNickname();

    document.getElementById('nickname').value = nickname;
    currentUserInfo.nickname = nickname;
  };

  /**
   * Set new Avartar or Get Avartar infomation from local stoage
   * @param {boolean} toChangeAvatar
   * @todo parameter 이름 변경
   */
  const setAvatar = toChangeAvatar => {
    const { color, eyes, mouth } = getParsedFromJSON('userInfo');
    const newColor = toChangeAvatar
      ? color
      : avatarComponentInfo.color[getRandomNumber(avatarComponentInfo.color.length)];
    const eyesIndex = toChangeAvatar ? eyes : getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_EYES);
    const mouthIndex = toChangeAvatar ? mouth : getRandomNumber(IMAGE_SPRITE_NUMBERS_OF_MOUTH);

    const rootStyle = document.documentElement.style;
    // 아바타
    rootStyle.setProperty('--face-color', `var(${newColor.face})`);
    rootStyle.setProperty('--face-border-color', `var(${newColor.border})`);
    rootStyle.setProperty('--eyes-index', eyesIndex);
    rootStyle.setProperty('--mouth-index', mouthIndex);
    rootStyle.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
    rootStyle.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);

    [currentUserInfo.color, currentUserInfo.eyes, currentUserInfo.mouth] = [
      newColor,
      eyesIndex,
      mouthIndex,
    ];
  };

  return {
    fetchAndInitNickname() {
      fetch('../db/nickname.json')
        .then(response => response.json())
        .then(json => {
          nicknameWords = json;
        })
        .then(() => {
          setNickname(!!getParsedFromJSON('userInfo'));
        });
    },
    fetchAndInitAvatarInfo() {
      fetch('../db/avatarComponentInfo.json')
        .then(response => response.json())
        .then(json => {
          avatarComponentInfo = json;
        })
        .then(() => {
          setAvatar(!!getParsedFromJSON('userInfo'));
        });
    },
    submitUserInfo() {
      setDataToJSON('userInfo', currentUserInfo);
      window.location.href = './pages/main.html';
    },
    rerollUserInfo() {
      setNickname(false);
      setAvatar(false);
    },
  };
})();

// Event Bindings
window.addEventListener('DOMContentLoaded', () => {
  userEntry.fetchAndInitNickname();
  userEntry.fetchAndInitAvatarInfo();
});

window.onkeyup = ({ key }) => {
  if (key === 'r' || key === 'R' || key === 'ㄱ') userEntry.rerollUserInfo();
  if (key === 'Enter') userEntry.submitUserInfo();
};

document.querySelector('.submit').onclick = userEntry.submitUserInfo;
document.querySelector('.reroll').onclick = userEntry.rerollUserInfo;
