const coin = document.querySelectorAll('.coin');
const plusBtn = document.getElementsByClassName('plus-btn');
const myValueDiv = document.getElementsByClassName('myValue');
const reduceBtn = document.getElementsByClassName('reduceBtn');

const startBtn = document.getElementById('start-btn');

const clearBtn = document.getElementById('clear-btn');

const centerImg = document.getElementsByClassName('img');
const betCoins = document.getElementById('bet-coins');
const reBet = document.getElementById('reBet');
const win = document.getElementById('win');
const countDown = document.getElementById('count-down');

const menuPlayBtn = document.getElementById('menuPlayBtn');
const menuQuitBtn = document.getElementById('menuQuitBtn');
const menuBoardContainer = document.querySelector('.menu-board__container');
const gameContainer = document.querySelector('.game__container');
const backToMenuBtn = document.querySelector('.backToMenuBtn');
const winLoseContainer = document.querySelector('.win-lose-container');
const profile = document.querySelector('.profile');
const coinCon = document.querySelector('.coin-con');
const getCoin = document.querySelector('.get-coin');
const winText = document.getElementById('win-text');

const clickAudio = new Audio(
  './assets/audio/Jewel Button Click (mp3cut.net).wav'
);
const startAudio = new Audio('./assets/audio/children.wav');
const endAudio = new Audio('./assets/audio/Spell of Magic Potion 6.wav');
const clockAudio = new Audio('./assets/audio/Timer 01.wav');
const centerAnimationAudio = new Audio(
  './assets/audio/Bubble 01 (mp3cut.net).wav'
);
const coinDropAudio = new Audio('./assets/audio/CoinGold AMA01_88_1.wav');
const lossAudio = new Audio('./assets/audio/Stage Failed.wav');
const winAudio = new Audio('./assets/audio/Happy Win Game.wav');

function partyAnimation() {
  party.confetti(document.body, {
    count: party.variation.range(200, 400),
    size: party.variation.range(0.8, 1.5),
  });
}

let bet = {
  betList: [
    {
      name: 'dog',
      myValue: 0,
      multiple: 4,
    },
    {
      name: 'monkey',
      myValue: 0,
      multiple: 6,
    },
    {
      name: 'sheep',
      myValue: 0,
      multiple: 12,
    },
    {
      name: 'elephant',
      myValue: 0,
      multiple: 24,
    },
    {
      name: 'seahorse',
      myValue: 0,
      multiple: 4,
    },
    {
      name: 'jellyfish',
      myValue: 0,
      multiple: 6,
    },
    {
      name: 'dolphin',
      myValue: 0,
      multiple: 12,
    },
    {
      name: 'shark',
      myValue: 0,
      multiple: 24,
    },
    {
      name: 'tortoise',
      myValue: 0,
      multiple: 24,
    },
    {
      name: 'whale',
      myValue: 0,
      multiple: 48,
    },
    {
      name: 'land',
      myValue: 0,
      multiple: 2,
    },
    {
      name: 'sea',
      myValue: 0,
      multiple: 2,
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
let userCoin = 600;
const updateCoinTextContent = () => {
  coin.forEach((coin) => (coin.textContent = userCoin.toLocaleString()));
};
updateCoinTextContent();

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
  21: 3,
  22: 3,
  23: 3,
  25: 2,
  26: 2,
  27: 2,
  29: 1,
  30: 1,
  31: 1,
};
Object.freeze(indexMap);

// const land = [1, 2, 3, 21, 22, 23, 25, 26, 27, 29, 30, 31];
// const aqua = [4, 12, 20, 28, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19];
const land = [0, 1, 2, 3];
const aqua = [4, 5, 6, 7];

let canBet = false;
for (let i = 0; i < 12; i++) {
  plusBtn[i].addEventListener('click', () => {
    clickAudio.play();
    plusBtn[i].classList.add('buttonAnimate');
    setTimeout(() => {
      plusBtn[i].classList.remove('buttonAnimate');
    }, 310);
    if (!canBet) return;
    bet.betList[i].myValue += 1;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    userCoin -= userCoin ? 1 : 0;
    console.log(userCoin);
    updateCoinTextContent();
    betCoins.textContent = bet.total();
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

  intervalId = setInterval(() => {
    secondSpan.textContent = count;
    countDown.style.display = 'block';
    countDown.classList.add('fadeIn');
    let radius = circleEle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let barLength = (count * circumference) / 30;
    circleEle.setAttribute('stroke-dasharray', barLength + ' ' + circumference);
    if (count == 30) {
      clockAudio.load();
      clockAudio.play();
      clockAudio.addEventListener('ended', () => {
        clockAudio.play();
      });
      startAudio.volume = 0.5;
    }
    if (count == 0) {
      secondSpan.textContent = 'GO';
      clockAudio.pause();
      canBet = false;
      startAudio.volume = 0;
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
  userCoin += bet.total();
  updateCoinTextContent();
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
    if (i !== 0) {
      centerImg[i - 1].classList.remove('animate');
    } else {
      centerImg[31].classList.remove('animate');
    }
    if (random && random + 7 > i && random - 7 < i) {
      clearInterval(interval2Id);
      endAudio.play();
      let animateId = setInterval(() => {
        if (centerImg[i].className.includes('animate')) {
          centerImg[i].classList.remove('animate');
        } else {
          centerImg[i].classList.add('animate');
        }
      }, 150);
      calculateWinOrLose(i);
      if (!isWon) {
        lossAudio.play();
      } else {
        winAudio.play();
      }
      setTimeout(() => {
        clearInterval(animateId);
        clearALlValue();
        updateCoinTextContent();
        if (isWon) {
          coinDropAudio.play();
        }
        setTimeout(() => {
          startAudio.volume = 1;
        }, 1000 * 2);
        centerImg[i].classList.remove('animate');
        winLoseContainer.style.display = 'none';
        winLoseContainer.classList.remove('fadeIn');
        canStart = true;
      }, 1000 * 10);
    } else {
      if (i < 31) {
        i++;
      } else {
        i = 0;
      }
    }
  }, x);
}

// let clonedBetList;
let isWon = false;
function calculateWinOrLose(i) {
  let totalBet = bet.total();
  let won =
    bet.betList[indexMap[i]].myValue * (bet.betList[indexMap[i]].multiple + 1) -
    totalBet;
  if (land.includes(indexMap[i])) {
    won += bet.betList[10].myValue * (bet.betList[11].multiple + 1);
  } else if (aqua.includes(indexMap[i])) {
    won += bet.betList[11].myValue * (bet.betList[11].multiple + 1);
  }
  // clonedBetList = JSON.parse(JSON.stringify(bet.betList));
  win.textContent = 0;
  if (won == 0) {
    isWon = false;
    winText.textContent = 'Win';
    winText.style.color = '#fff';
    win.textContent = won;
    if (totalBet) {
      winLoseContainer.firstElementChild.textContent = 'Draw game! Try again.';
    } else {
      return;
    }
  }
  if (won > 0) {
    isWon = true;
    partyAnimation();
    winLoseContainer.firstElementChild.textContent = `Congratulations! You win ${won} coin.`;
    winText.textContent = 'Win';
    winText.style.color = '#3fff00';
    win.textContent = won;
    userCoin += won;
  } else {
    isWon = false;
    winLoseContainer.firstElementChild.textContent = `Sorry! You lose ${Math.abs(
      won
    )} coin.`;
    winText.textContent = 'Lose';
    winText.style.color = '#FF2400';
    win.textContent = Math.abs(won);
  }
  winLoseContainer.style.display = 'flex';
  winLoseContainer.classList.add('fadeIn');
}

function clearALlValue() {
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  }
  betCoins.textContent = 0;
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
  userCoin += bet.total();
  updateCoinTextContent();
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
  }, 1000 * 3.3);
});

const volumeBtn = document.getElementById('volumeBtn');
const achievementBtn = document.getElementById('achievementBtn');
const settingBtn = document.getElementById('settingBtn');
volumeBtn.onclick = (e) => {
  clickAudio.play();
  volumeBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    volumeBtn.classList.remove('buttonAnimate');
  }, 310);
  if (startAudio.volume != 0) {
    volumeBtn.firstElementChild.classList = 'fa-solid fa-volume-xmark';
    startAudio.volume = 0;
  } else {
    volumeBtn.firstElementChild.classList = 'fa-solid fa-volume-high';
    startAudio.volume = 1;
  }
};
achievementBtn.onclick = (e) => {
  clickAudio.play();
  const { target } = e;
  target.classList.add('buttonAnimate');
  setTimeout(() => {
    target.classList.remove('buttonAnimate');
  }, 310);
};
settingBtn.onclick = (e) => {
  clickAudio.play();
  const { target } = e;
  target.classList.add('buttonAnimate');
  setTimeout(() => {
    target.classList.remove('buttonAnimate');
  }, 310);
};

menuQuitBtn.onclick = (e) => {
  clickAudio.play();
  const { target } = e;
  target.classList.add('buttonAnimate');
  setTimeout(() => {
    target.classList.remove('buttonAnimate');
  }, 310);
};

profile.onclick = (e) => {
  clickAudio.play();
  profile.classList.add('buttonAnimate');
  setTimeout(() => {
    profile.classList.remove('buttonAnimate');
  }, 310);
};

coinCon.onclick = (e) => {
  clickAudio.play();
  coinCon.classList.add('buttonAnimate');
  setTimeout(() => {
    coinCon.classList.remove('buttonAnimate');
  }, 310);
};

getCoin.onclick = (e) => {
  clickAudio.play();
  getCoin.classList.add('buttonAnimate');
  setTimeout(() => {
    getCoin.classList.remove('buttonAnimate');
  }, 310);
};

backToMenuBtn.addEventListener('click', (e) => {
  backToMenuBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    backToMenuBtn.classList.remove('buttonAnimate');
    if (!canStart) return;
    gameContainer.style.display = 'none';
    backToMenuBtn.style.display = 'none';
    menuBoardContainer.style.display = 'flex';
  }, 310);
});
