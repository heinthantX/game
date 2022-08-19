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
const backToMenuBtn = document.querySelector('.backToMenuBtn');
const winLoseContainer = document.querySelector('.win-lose-container');

const clickAudio = new Audio(
  './assets/audio/Jewel Button Click (mp3cut.net).wav'
);
const startAudio = new Audio('./assets/audio/children.wav');
const endAudio = new Audio('./assets/audio/Spell of Magic Potion 6.wav');
const clockAudio = new Audio('./assets/audio/ClockTick8CUSlow SDT2049003.wav');
const centerAnimationAudio = new Audio(
  './assets/audio/Bubble 01 (mp3cut.net).wav'
);

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

let canBet = false;
for (let i = 0; i < 12; i++) {
  plusBtn[i].addEventListener('click', () => {
    clickAudio.play();
    plusBtn[i].classList.add('buttonAnimate');
    setTimeout(() => {
      plusBtn[i].classList.remove('buttonAnimate');
    }, 310);
    if (!canBet) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue < 50 ? myValue + 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    coin.textContent -= myValue < 50 ? 1 : 0;
  });

  // reduceBtn[i].addEventListener('click', () => {
  //   clickAudio.play();
  //   if (!canBet) return;
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
let canStart = true;
startBtn.addEventListener('click', () => {
  clickAudio.play();
  startBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    startBtn.classList.remove('buttonAnimate');
  }, 310);

  if (intervalId || !canStart) return;
  canStart = false;
  let random = Math.floor(Math.random() * centerImg.length - 1);
  canBet = true;
  let count = 30;
  const circleEle = document.getElementById('circle');
  const secondSpan = document.querySelector('#count-down span');
  clockAudio.load();
  clockAudio.play();
  clockAudio.addEventListener('ended', () => {
    clockAudio.play();
  });
  intervalId = setInterval(() => {
    secondSpan.textContent = count;
    countDown.style.display = 'block';
    countDown.classList.add('fadeIn');
    let radius = circleEle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let barLength = (count * circumference) / 30;
    circleEle.setAttribute('stroke-dasharray', barLength + ' ' + circumference);
    if (count == 0) {
      secondSpan.textContent = 'GO';
      clockAudio.pause();
      canBet = false;
    }
    if (count < 0) {
      clearInterval(intervalId);
      intervalId = null;
      countDown.style.display = 'none';
      countDown.classList.remove('fadeIn');

      centerAnimation(110, null);
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
  clearBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    clearBtn.classList.remove('buttonAnimate');
  }, 310);
  if (!canBet) return;
  coin.textContent = parseInt(coin.textContent) + bet.total();
  clearALlValue();
  stop();
});

function stop() {
  countDown.style.display = 'none';
  countDown.classList.remove('fadeIn');
  clockAudio.pause();
  clearInterval(intervalId);
  canBet = false;
  intervalId = null;
  canStart = true;
}

function centerAnimation(x, random) {
  interval2Id = setInterval(() => {
    centerAnimationAudio.load();
    centerAnimationAudio.play();
    centerImg[i].classList.add('animate');

    if (random && random + 5 > i && random - 5 < i) {
      clearInterval(interval2Id);
      endAudio.play();
      let animateId = setInterval(() => {
        if (centerImg[i - 1].className.includes('animate')) {
          centerImg[i - 1].classList.remove('animate');
        } else {
          centerImg[i - 1].classList.add('animate');
        }
      }, 150);
      calculateWinOrLose(i - 1);
      setTimeout(() => {
        clearInterval(animateId);
        clearALlValue();
        centerImg[i - 1].classList.remove('animate');
        winLoseContainer.style.display = 'none';
        winLoseContainer.classList.remove('fadeIn');
        canStart = true;
      }, 1000 * 7);
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

// let clonedBetList;
function calculateWinOrLose(i) {
  let totalBet = bet.total();
  let won = bet.betList[indexMap[i]].myValue * 5 - totalBet;
  // clonedBetList = JSON.parse(JSON.stringify(bet.betList));
  win.textContent = 0;
  if (won == 0) {
    if (totalBet) {
      winLoseContainer.firstElementChild.textContent = 'Draw game! Try again.';
    } else {
      return;
    }
  }
  if (won > 0) {
    winLoseContainer.firstElementChild.textContent = `Congratulations! You win ${won} coin.`;
    win.textContent = won;
    coin.textContent = parseInt(coin.textContent) + won;
  } else {
    winLoseContainer.firstElementChild.textContent = `Sorry! You lose ${Math.abs(
      won
    )}`;
  }
  winLoseContainer.style.display = 'flex';
  winLoseContainer.classList.add('fadeIn');
}

function clearALlValue() {
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  }
}

reBet.addEventListener('click', () => {
  clickAudio.play();
  reBet.classList.add('buttonAnimate');
  setTimeout(() => {
    reBet.classList.remove('buttonAnimate');
  }, 310);
  // if (!canBet || !clonedBetList) return;
  // if (bet.betList.some((v) => v.myValue != 0)) return;
  // bet.betList = JSON.parse(JSON.stringify(clonedBetList));
  // for (let i in bet.betList) {
  //   myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  // }
  // coin.textContent -= bet.total();
  // jackpot.textContent -= bet.total();
  if (!canBet) return;
  coin.textContent = parseInt(coin.textContent) + bet.total();
  clearALlValue();
});

menuPlayBtn.addEventListener('click', () => {
  clickAudio.play();
  menuPlayBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    menuPlayBtn.classList.remove('buttonAnimate');
  }, 310);
  const startLoading = document.querySelector('.start-loading');
  const loadingBar = document.querySelector('.loading');
  startLoading.style.visibility = 'visible';
  loadingBar.classList.add('loadingAnimation');
  setTimeout(() => {
    menuBoardContainer.style.display = 'none';
    backToMenuBtn.style.display = 'flex';
    gameContainer.style.display = 'flex';
    startLoading.style.visibility = 'hidden';
    loadingBar.classList.remove('loadingAnimation');
    startAudio.play();
    startAudio.addEventListener('ended', () => {
      startAudio.play();
    });
  }, 1000 * 12);
});

const volumeBtn = document.getElementById('volumeBtn');
const achievementBtn = document.getElementById('achievementBtn');
const settingBtn = document.getElementById('settingBtn');
volumeBtn.onclick = () => {
  clickAudio.play();
  volumeBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    volumeBtn.classList.remove('buttonAnimate');
  }, 310);
};
achievementBtn.onclick = () => {
  clickAudio.play();
  achievementBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    achievementBtn.classList.remove('buttonAnimate');
  }, 310);
};
settingBtn.onclick = () => {
  clickAudio.play();
  settingBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    settingBtn.classList.remove('buttonAnimate');
  }, 310);
};

menuQuitBtn.onclick = () => {
  clickAudio.play();
  menuQuitBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    menuQuitBtn.classList.remove('buttonAnimate');
  }, 310);
};

backToMenuBtn.addEventListener('click', (e) => {
  const { target } = e;
  target.classList.add('buttonAnimate');
  setTimeout(() => {
    target.classList.remove('buttonAnimate');
    if (!canStart) return;
    gameContainer.style.display = 'none';
    backToMenuBtn.style.display = 'none';
    menuBoardContainer.style.display = 'flex';
  }, 310);
});
