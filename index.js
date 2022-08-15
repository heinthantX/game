const coin = document.getElementById('coin');
const plusBtn = document.getElementsByClassName('plus-btn');
const myValueDiv = document.getElementsByClassName('myValue');
const reduceBtn = document.getElementsByClassName('reduceBtn');

const startBtn = document.getElementById('start-btn');

const clearBtn = document.getElementById('clear-btn');

const centerImg = document.getElementsByClassName('img');
const jackpot = document.getElementById('jackpot');
const reBet = document.getElementById('reBet');
const win = document.getElementById('win');
const countDown = document.getElementById('count-down');

const menuPlayBtn = document.getElementById('menuPlayBtn');
const menuQuitBtn = document.getElementById('menuQuitBtn');
const menuBoardContainer = document.querySelector('.menu-board__container');
const gameContainer = document.querySelector('.game__container');

const clickAudio = new Audio(
  './assets/audio/Jewel Button Click (mp3cut.net).wav'
);
const startAudio = new Audio('./assets/audio/children.wav');
const endAudio = new Audio('./assets/audio/Spell of Magic Potion 6.wav');
const clockAudio = new Audio('./assets/audio/ClockTick8CUSlow SDT2049003.wav');

let bet = {
  betList: [
    {
      name: 'dog',
      myValue: 0,
    },
    {
      name: 'elephant',
      myValue: 0,
    },
    {
      name: 'sheep',
      myValue: 0,
    },
    {
      name: 'monkey',
      myValue: 0,
    },
    {
      name: 'jellyfish',
      myValue: 0,
    },
    {
      name: 'shark',
      myValue: 0,
    },
    {
      name: 'seahorse',
      myValue: 0,
    },
    {
      name: 'dolphin',
      myValue: 0,
    },
    {
      name: 'tortoise',
      myValue: 0,
    },
    {
      name: 'whale',
      myValue: 0,
    },
    {
      name: 'land',
      myValue: 0,
    },
    {
      name: 'sea',
      myValue: 0,
    },
  ],
  total: function () {
    let total = 0;
    this.betList.forEach((v) => {
      total += v.myValue;
    });
    return total;
  },
};

const indexMap = {
  0: 8,
  8: 8,
  16: 8,
  24: 8,
  4: 9,
  12: 9,
  20: 9,
  28: 9,
  1: 0,
  2: 0,
  3: 0,
  5: 4,
  6: 4,
  7: 4,
  9: 5,
  10: 5,
  11: 5,
  13: 6,
  14: 6,
  15: 6,
  17: 7,
  18: 7,
  19: 7,
  21: 1,
  22: 1,
  23: 1,
  25: 2,
  26: 2,
  27: 2,
  29: 3,
  30: 3,
  31: 3,
};
Object.freeze(indexMap);

let gameState = 'a';
for (let i = 0; i < 12; i++) {
  plusBtn[i].addEventListener('click', () => {
    clickAudio.play();
    if (gameState) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue < 50 ? myValue + 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    coin.textContent--;
  });

  // reduceBtn[i].addEventListener('click', () => {
  //   clickAudio.play();
  //   if (gameState) return;
  //   const { myValue } = bet.betList[i];
  //   bet.betList[i].myValue = myValue > 0 ? myValue - 1 : myValue;
  //   myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  //   coin.textContent =
  //     myValue > 0 ? parseInt(jackpot.textContent) + 1 : jackpot.textContent;
  // });
}

let intervalId;
let interval2Id;
let i = 0;
let canStart;
startBtn.addEventListener('click', () => {
  clickAudio.play();
  if (intervalId || canStart) return;
  canStart = 'a';
  let random = Math.floor(Math.random() * centerImg.length - 1);
  gameState = null;
  let count = 30;
  startAudio.load();
  const circleEle = document.getElementById('circle');
  const secondSpan = document.querySelector('#count-down span');
  intervalId = setInterval(() => {
    countDown.style.display = 'block';
    secondSpan.textContent = count;
    let radius = circleEle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let barLength = (count * circumference) / 30;
    circleEle.setAttribute('stroke-dasharray', barLength + ' ' + circumference);
    startAudio.play();
    if (count == 0) {
      secondSpan.textContent = 'GO';
      clockAudio.pause();
      gameState = 'a';
    }
    if (count == 9) {
      clockAudio.load();
      clockAudio.play();
    }
    if (count < 0) {
      clearInterval(intervalId);
      intervalId = null;
      countDown.style.display = 'none';

      centerAnimation(100, null);
      setTimeout(() => {
        clearInterval(interval2Id);
        centerAnimation(200, null);
      }, 1000 * 7);
      setTimeout(() => {
        clearInterval(interval2Id);
        centerAnimation(400, random);
      }, 1000 * 10);
    }
    count--;
  }, 1000);
});

clearBtn.addEventListener('click', () => {
  clickAudio.play();
  if (gameState) return;
  coin.textContent = parseInt(coin.textContent) + bet.total();
  clearALlValue();
  stop();
});

function stop() {
  countDown.style.display = 'none';
  clockAudio.pause();
  startAudio.pause();
  clearInterval(intervalId);
  gameState = null;
  intervalId = null;
  canStart = null;
}

function centerAnimation(x, random) {
  interval2Id = setInterval(() => {
    centerImg[i].classList.add('animate');

    if (random && random + 5 > i && random - 5 < i) {
      clearInterval(interval2Id);
      endAudio.play();
      startAudio.pause();
      let animateId = setInterval(() => {
        if (centerImg[i - 1].className.includes('animate')) {
          centerImg[i - 1].classList.remove('animate');
        } else {
          centerImg[i - 1].classList.add('animate');
        }
      }, 150);
      setTimeout(() => {
        clearInterval(animateId);
        centerImg[i - 1].classList.remove('animate');
        calculateWinOrLose(i - 1);
      }, 3000);
    }
    if (i !== 0) {
      centerImg[i - 1].classList.remove('animate');
    } else {
      centerImg[31].classList.remove('animate');
    }
    i++;
    if (i == 32) {
      i = 0;
    }
  }, x);
}

let clonedBetList;
function calculateWinOrLose(i) {
  canStart = null;
  let totalBet = bet.total();
  let won = bet.betList[indexMap[i]].myValue * 5 - totalBet;
  clonedBetList = JSON.parse(JSON.stringify(bet.betList));
  win.textContent = 0;
  if (won == 0) {
    if (totalBet) {
      alert('deal');
    } else {
      return;
    }
  }
  if (won > 0) {
    alert(`Yay.., you win ${won}!`);
    win.textContent = won;
    coin.textContent = parseInt(coin.textContent) + won;
  } else {
    alert(`You lose ${Math.abs(won)}`);
  }
  clearALlValue();
}

function clearALlValue() {
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  }
}

reBet.addEventListener('click', () => {
  clickAudio.play();
  // if (gameState || !clonedBetList) return;
  // if (bet.betList.some((v) => v.myValue != 0)) return;
  // bet.betList = JSON.parse(JSON.stringify(clonedBetList));
  // for (let i in bet.betList) {
  //   myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  // }
  // coin.textContent -= bet.total();
  // jackpot.textContent -= bet.total();
  if (gameState) return;
  coin.textContent = parseInt(coin.textContent) + bet.total();
  clearALlValue();
});

menuPlayBtn.addEventListener('click', () => {
  clickAudio.play();
  const startLoading = document.querySelector('.start-loading');
  const loadingBar = document.querySelector('.loading');
  startLoading.style.visibility = 'visible';
  loadingBar.classList.add('loadingAnimation');
  setTimeout(() => {
    menuBoardContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    startLoading.style.visibility = 'hidden';
    loadingBar.classList.remove('loadingAnimation');
  }, 1000 * 12);
});

const volumeBtn = document.getElementById('volumeBtn');
const achievementBtn = document.getElementById('achievementBtn');
const settingBtn = document.getElementById('settingBtn');
volumeBtn.onclick = () => {
  clickAudio.play();
};
achievementBtn.onclick = () => {
  clickAudio.play();
};
settingBtn.onclick = () => {
  clickAudio.play();
};

menuQuitBtn.onclick = () => {
  clickAudio.play();
};
