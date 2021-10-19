// fetch('../nickname.json')
//   .then(response => response.json())
//   .then(json => console.log(json.adjective[3], json.noun[3]));

const $btn = document.querySelector('.reroll');
const $nickname = document.getElementById('nickname');

let nicknameJson = {};

const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum);

const getRandomNickName = () => {
  const adjectiveOfNickname = nicknameJson.adjective[getRandomNumber(50)];
  const nounOfNickname = nicknameJson.noun[getRandomNumber(50)];

  return adjectiveOfNickname + ' ' + nounOfNickname;
};

window.addEventListener('DOMContentLoaded', () => {
  fetch('../nickname.json')
    .then(response => response.json())
    .then(json => {
      nicknameJson = json;
    });
});

$btn.onclick = () => {
  $nickname.value = getRandomNickName();
};
