const total = document.getElementById('total');
const plusBtn = document.getElementsByClassName('plus-btn');
const myValueDiv = document.getElementsByClassName('myValue');
const reduceBtn = document.getElementsByClassName('reduceBtn');

const startBtn = document.getElementById('start-btn');
const startAudio = document.getElementById('startAudio');
const endAudio = document.getElementById('endAudio');

const clearBtn = document.getElementById('clear-btn');

const centerImg = document.getElementsByClassName('img');
const jackpot = document.getElementById('jackpot');
const reBet = document.getElementById('reBet');
const win = document.getElementById('win');

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
    if (gameState) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue < 50 ? myValue + 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
    jackpot.textContent--;
  });

  reduceBtn[i].addEventListener('click', () => {
    if (gameState) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue > 0 ? myValue - 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
    jackpot.textContent =
      myValue > 0 ? parseInt(jackpot.textContent) + 1 : jackpot.textContent;
  });
}

let intervalId;
let interval2Id;
let i = 0;
startBtn.addEventListener('click', () => {
  if (intervalId) return;
  let random = Math.floor(Math.random() * centerImg.length);
  gameState = null;
  let count = 15;
  const countDown = document.querySelector('.count-down');
  startAudio.play();
  intervalId = setInterval(() => {
    countDown.textContent = count;
    countDown.style.display = 'block';
    if (count == 0) {
      startAudio.pause();
      countDown.textContent = 'GO';
      endAudio.play();
      gameState = 'a';
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
  if (gameState) return;
  jackpot.textContent = parseInt(jackpot.textContent) + bet.total();
  clearALlValue();
});

function centerAnimation(x, random) {
  interval2Id = setInterval(() => {
    centerImg[i].classList.add('animate');

    if (random && random + 5 > i && random - 5 < i) {
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
      clearInterval(interval2Id);
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
  } else {
    alert(`You lose ${Math.abs(won)}`);
  }
  clearALlValue();
}

function clearALlValue() {
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
  }
}

reBet.addEventListener('click', () => {
  if (gameState || !clonedBetList) return;
  if (bet.betList.some((v) => v.myValue != 0)) return;
  bet.betList = JSON.parse(JSON.stringify(clonedBetList));
  for (let i in bet.betList) {
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  }
  total.textContent = bet.total();
  jackpot.textContent -= bet.total();
});
