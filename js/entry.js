import { getParsedFromJSON, setDataToJSON, getRandomNumber } from './utils/helper.js';
import { IMAGE_SPRITE_NUMBERS_OF_EYES, IMAGE_SPRITE_NUMBERS_OF_MOUTH } from './utils/constants.js';

const userEntry = (() => {
  let nicknameWords = {
    adjective: null,
    noun: null,
  };

  let avatarComponentInfo = {
    color: null,
    eyes: null,
    mouth: null,
  };

  let currentUserInfo = {
    color: null,
    eyes: null,
    mouth: null,
    nickname: null,
  };

  let isMoving = false;

  const getRandomNickname = () => {
    const adjectiveOfNickname =
      nicknameWords.adjective[getRandomNumber(nicknameWords.adjective.length)];
    const nounOfNickname = nicknameWords.noun[getRandomNumber(nicknameWords.noun.length)];
    return adjectiveOfNickname + ' ' + nounOfNickname;
  };

  const setNickname = isRequestedToChangeUserInfo => {
    const nickname = isRequestedToChangeUserInfo
      ? getRandomNickname()
      : getParsedFromJSON('userInfo').nickname;

    document.getElementById('nickname').value = nickname;
    currentUserInfo.nickname = nickname;
  };

  const getDifferentNumber = (num = 0, maxNum) => {
    let differentNumber = num;

    while (num === differentNumber) {
      differentNumber = getRandomNumber(maxNum);
    }

    return differentNumber;
  };

  /**
   * Set new Avartar or Get Avartar infomation from local stoage
   * @param {boolean} isRequestedToChangeUserInfo
   * @todo parameter 이름 변경
   */
  const setAvatar = isRequestedToChangeUserInfo => {
    const { color, eyes, mouth } = currentUserInfo;
    const newColor = isRequestedToChangeUserInfo
      ? avatarComponentInfo.color[getRandomNumber(avatarComponentInfo.color.length)]
      : color;
    const eyesIndex = isRequestedToChangeUserInfo
      ? getDifferentNumber(eyes, IMAGE_SPRITE_NUMBERS_OF_EYES)
      : eyes;
    const mouthIndex = isRequestedToChangeUserInfo
      ? getDifferentNumber(mouth, IMAGE_SPRITE_NUMBERS_OF_MOUTH)
      : mouth;

    const rootStyle = document.documentElement.style;
    // 아바타
    rootStyle.setProperty('--face-color', `var(${newColor.face})`);
    rootStyle.setProperty('--face-border-color', `var(${newColor.border})`);
    rootStyle.setProperty('--eyes-index', eyesIndex);
    rootStyle.setProperty('--mouth-index', mouthIndex);
    rootStyle.setProperty('--eyes-number', IMAGE_SPRITE_NUMBERS_OF_EYES - 1);
    rootStyle.setProperty('--mouth-number', IMAGE_SPRITE_NUMBERS_OF_MOUTH - 1);

    currentUserInfo = { ...currentUserInfo, color: newColor, eyes: eyesIndex, mouth: mouthIndex };
  };

  return {
    fetchAndInitNickname() {
      fetch('../db/nickname.json')
        .then(response => response.json())
        .then(json => {
          nicknameWords = json;
        })
        .then(() => {
          currentUserInfo = getParsedFromJSON('userInfo')
            ? getParsedFromJSON('userInfo')
            : { ...currentUserInfo, nickname: '' };
          setNickname(!getParsedFromJSON('userInfo'));
        });
    },
    fetchAndInitAvatarInfo() {
      fetch('../db/avatarComponentInfo.json')
        .then(response => response.json())
        .then(json => {
          avatarComponentInfo = json;
        })
        .then(() => {
          currentUserInfo = getParsedFromJSON('userInfo')
            ? getParsedFromJSON('userInfo')
            : { ...currentUserInfo, color: {}, eyes: 0, mouth: 0 };
          setAvatar(!getParsedFromJSON('userInfo'));
        });
    },
    submitUserInfo() {
      setDataToJSON('userInfo', currentUserInfo);
      window.location.href = './pages/main.html';
    },
    rerollUserInfo() {
      if (isMoving) return;
      setNickname(true);
      setAvatar(true);
    },
    setMovingStatus(newMovingStatus) {
      isMoving = newMovingStatus;
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
document.querySelector('.avatar-eyes').ontransitionrun = () => {
  userEntry.setMovingStatus(true);
};
document.querySelector('.avatar-mouth').ontransitionend = () => {
  userEntry.setMovingStatus(false);
};
