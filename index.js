const total = document.getElementById('total');
const plusBtn = document.getElementsByClassName('plus-btn');
const myValueDiv = document.getElementsByClassName('myValue');
const reduceBtn = document.getElementsByClassName('reduceBtn');

const startBtn = document.getElementById('start-btn');
const startAudio = document.getElementById('startAudio');
const endAudio = document.getElementById('endAudio');

const clearBtn = document.getElementById('clear-btn');

const bet = {
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

let gameState = 'a';
for (let i = 0; i < 12; i++) {
  plusBtn[i].addEventListener('click', () => {
    if (gameState) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue < 50 ? myValue + 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
  });

  reduceBtn[i].addEventListener('click', () => {
    if (gameState) return;
    const { myValue } = bet.betList[i];
    bet.betList[i].myValue = myValue > 0 ? myValue - 1 : myValue;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
  });
}

let intervalId;
startBtn.addEventListener('click', () => {
  if (intervalId) return;
  gameState = null;
  let count = 30;
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
    }
    count--;
  }, 1000);
});

clearBtn.addEventListener('click', () => {
  if (gameState) return;
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
    total.textContent = bet.total();
  }
});
