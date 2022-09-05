const coin = document.querySelectorAll('.coin');
const plusBtn = document.getElementsByClassName('plus-btn');
const myValueDiv = document.getElementsByClassName('myValue');
const reduceBtn = document.getElementsByClassName('reduceBtn');

const startBtn = document.getElementById('start-btn');

const clearBtn = document.getElementById('clear-btn');

const centerImg = document.getElementsByClassName('img');
const betCoins = document.getElementById('bet-coins');
// const reBet = document.getElementById('reBet');
const win = document.getElementById('win');
const countDown = document.getElementById('count-down');

const menuPlayBtn = document.getElementById('menuPlayBtn');
// const menuQuitBtn = document.getElementById('menuQuitBtn');
const menuBoardContainer = document.querySelector('.menu-board__container');
const gameContainer = document.querySelector('.game__container');
const quitBtn = document.getElementById('quitBtn');
// const winLoseContainer = document.querySelector('.win-lose-container');
const profile = document.querySelector('.profile');
const coinCon = document.querySelectorAll('.coin-con');
const getCoin = document.querySelector('.get-coin');
const winText = document.getElementById('win-text');
const loseAnimationGif = document.getElementById('loseAnimationGif');
const volumeBtn = document.getElementById('volumeBtn');
const achievementBtn = document.getElementById('achievementBtn');
const settingBtn = document.getElementById('settingBtn');
const historyCon = document.getElementById('historyCon');
const wonAnimal = document.getElementById('wonAnimal');
const loadingScreen = document.querySelector('.loading-screen');
const profileContainer = document.querySelector('.profileContainer');
const profileBackBtn = document.querySelector('.profileBackBtn');
const quitConfirm = document.querySelector('.quitConfirm');
const yesBtn = document.querySelector('.yesBtn');
const noBtn = document.querySelector('.noBtn');
const volumeControl = document.querySelector('.volumeControl');
const settingContainer = document.querySelector('.settingContainer');
const settingBackBtn = document.querySelector('.settingBackBtn');
const musicBtn = document.querySelector('.musicBtn');
const privacy = document.querySelector('.privacy');
const userAgreement = document.querySelector('.userAgreement');
const aboutBettingSlots = document.querySelector('.aboutBettingSlots');
const aboutContainer = document.querySelector('.aboutContainer');
const aboutBackBtn = document.querySelector('.aboutBackBtn');
const achievementContainer = document.querySelector('.achievementContainer');
const achievementBackBtn = document.querySelector('.achievementBackBtn');
const gameStop = document.querySelector('.gameStop');
const bettingTime = document.querySelector('.bettingTime');
const bettingTimePlusBtn = document.querySelector('.bettingTimePlusBtn');
const bettingTimeMinusBtn = document.querySelector('.bettingTimeMinusBtn');

const clickAudio = new Audio(
  './assets/audio/Jewel Button Click (mp3cut.net).wav'
);
const startAudio = new Audio('./assets/audio/children.wav');
startAudio.loop = true;
startAudio.autoplay = true;

const endAudio = new Audio('./assets/audio/Spell of Magic Potion 6.wav');
const clockAudio = new Audio('./assets/audio/Timer 01.wav');
clockAudio.loop = true;

const centerAnimationAudio = new Audio(
  './assets/audio/Bubble 01 (mp3cut.net).wav'
);
const coinDropAudio = new Audio('./assets/audio/CoinGold AMA01_88_1.wav');
const lossAudio = new Audio('./assets/audio/Stage Failed.wav');
const winAudio = new Audio('./assets/audio/Happy Win Game.wav');

let setting = JSON.parse(localStorage.getItem('setting')) || {
  isMusicOff: false,
  volume: 50,
  bettingTime: 30,
};

let isMuted = false;
const setSetting = () => {
  musicBtn.checked = setting.isMusicOff;
  musicControlFunction();
  // volumeBar
  volumeControl.value = setting.volume;
  volumeBarFunction(volumeControl.value);
  bettingTime.textContent = setting.bettingTime;
};
let played = false;
document.addEventListener('click', () => {
  if (!played) {
    startAudio.play();
    played = true;
    setSetting();
  }
});
setSetting();

function musicControlFunction() {
  if (musicBtn.checked) {
    volumeBtn.firstElementChild.classList = 'fa-solid fa-volume-xmark';
    musicVolume = startAudio.volume;
    startAudio.pause();
    isMuted = true;
  } else {
    volumeBtn.firstElementChild.classList = 'fa-solid fa-volume-high';
    startAudio.play();
    isMuted = false;
  }
  setting.isMusicOff = musicBtn.checked;
  localStorage.setItem('setting', JSON.stringify(setting));
}

function volumeBarFunction(value) {
  volumeControl.style.backgroundSize = value + '% 100%';
  startAudio.volume = value / 100;
  // centerAnimationAudio.volume = value / 100;
  clockAudio.volume = value / 100;
  // clickAudio.volume = value / 100;
  // lossAudio.volume = value / 100;
  // winAudio.volume = value / 100;
  // endAudio.volume = value / 100;
  // coinDropAudio.volume = value / 100;
  setting.volume = value;
  localStorage.setItem('setting', JSON.stringify(setting));
  if (isMuted) {
    startAudio.pause();
  }
}

// volumeControl.value = setting.volume;
// volumeControl.style.backgroundSize = setting.volume + '% 100%';

function getImage(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      resolve(url);
    };
    img.onerror = function () {
      reject(url);
    };
    img.src = url;
  });
}

function menuBoardPreloader() {
  Promise.all([
    getImage(
      './assets/images/menu-board/processed-057daf40-fd87-4482-8246-f6a08de38dd7_9pNX3tMT.jpeg'
    ),
    getImage('./assets/images/btn/coin1.png'),
    getImage('./assets/images/menu-board/person icon.png'),
    getImage('./assets/images/menu-board/play.png'),
    getImage('./assets/images/menu-board/victory.png'),
    getImage('./assets/images/menu-board/setting.png'),
    getImage('./assets/images/gameicon copy 2.png'),
  ])
    .then(() => {
      loadingScreen.style.display = 'none';
      menuBoardContainer.style.display = 'flex';
    })
    .catch((e) => console.log(e));
}
menuBoardPreloader();

function gameContainerPreloader() {
  return Promise.all([
    getImage('./assets/images/square-buttons/sea-bg.png'),
    getImage('./assets/images/btn/play.png'),
    getImage('./assets/images/btn/cross.png'),
    getImage('./assets/images/round-buttons/dog.png'),
    getImage('./assets/images/round-buttons/monkey.png'),
    getImage('./assets/images/round-buttons/sheep.png'),
    getImage('./assets/images/round-buttons/elephant.png'),
    getImage('./assets/images/round-buttons/seahorse.png'),
    getImage('./assets/images/round-buttons/jellyfish.png'),
    getImage('./assets/images/round-buttons/dolphin.png'),
    getImage('./assets/images/round-buttons/shark.png'),
    getImage('./assets/images/square-buttons/bird.png'),
    getImage('./assets/images/round-buttons/whale.png'),
    getImage('./assets/images/round-buttons/sea.png'),
    getImage('./assets/images/round-buttons/land.png'),
    getImage('./assets/images/square-buttons/dog(top corner).png'),
    getImage('./assets/images/square-buttons/whale(top corner).png'),
    getImage('./assets/images/square-buttons/seahorse(right side).png'),
    getImage('./assets/images/square-buttons/jellyfish(top corner).png'),
    getImage('./assets/images/square-buttons/whale(right side).png'),
    getImage('./assets/images/square-buttons/dolphin(bottom).png'),
    getImage('./assets/images/square-buttons/shark(right side).png'),
    getImage('./assets/images/square-buttons/elephant(bottom).png'),
    getImage('./assets/images/round-buttons/bird.png'),
    getImage('./assets/images/square-buttons/sheep(left side).png'),
    getImage('./assets/images/square-buttons/monkey(left side).png'),
    getImage('./assets/images/animation-gif/dog.gif'),
    getImage('./assets/images/animation-gif/sheep.gif'),
    getImage('./assets/images/animation-gif/elephant.gif'),
    getImage('./assets/images/animation-gif/seahorse.gif'),
    getImage('./assets/images/animation-gif/jellyfish.gif'),
    getImage('./assets/images/animation-gif/dolphin.gif'),
    getImage('./assets/images/animation-gif/shark.gif'),
    getImage('./assets/images/animation-gif/whale.gif'),
    getImage('./assets/images/animation-gif/monkey.gif'),
    getImage('./assets/images/24265652.jpg'),
    getImage('./assets/images/animation-gif/loseAnimation.gif'),
  ]);
}

const leftAndRightCircle = document.querySelectorAll(
  '.left__circle i,.right__circle i'
);
const addCircleAnimation = (aniClass) => {
  leftAndRightCircle.forEach((i) => {
    i.style.animation = 'none';
    i.classList.add(aniClass);
  });
};

const removeCircleAnimation = (...aniClass) => {
  let delay = 0;
  leftAndRightCircle.forEach((i) => {
    i.classList.remove(...aniClass);
    i.style.animation = 'animate 4s ease infinite';
    i.style.animationDelay = delay + 's';
    delay += 0.3;
    if (delay === 2.1) {
      delay = 0;
    }
  });
};

// setTimeout(() => {
//   leftAndRightCircle = null;
// }, 1000 * 10);
// let toAnimateCircle = false;
// setInterval(() => {
//   leftAndRightCircle.forEach((i) => {
//     if (toAnimateCircle) {
//       i.style.color = 'rgb(105, 4, 4)';
//       // toAnimateCircle = false;
//     } else {
//       i.style.color = 'rgb(253, 38, 38)';
//       // toAnimateCircle = true;
//     }
//   });
//   if (toAnimateCircle) {
//     toAnimateCircle = false;
//   } else {
//     toAnimateCircle = true;
//   }
// }, 500);

// party.resolvableShapes['myNewShape'] =
//   '<img src="./assets/images/pngwing.com.png" alt="">';
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
      name: 'bird',
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

// ./assets/images/round-buttons/dog.png
// ./assets/images/round-buttons/monkey.png
// ./assets/images/round-buttons/sheep.png
// ./assets/images/round-buttons/elephant.png
// ./assets/images/round-buttons/seahorse.png
// ./assets/images/round-buttons/jellyfish.png
// ./assets/images/round-buttons/dolphin.png
// ./assets/images/round-buttons/shark.png
// ./assets/images/round-buttons/whale.png
// ./assets/images/round-buttons/sea.png
// ./assets/images/round-buttons/land.png
// ./assets/images/round-buttons/bird.png

const winAnimalSrc = {
  0: {
    gif: './assets/images/animation-gif/dog.gif',
    srcForWin: './assets/images/round-buttons/dog.png',
  },
  1: {
    gif: './assets/images/animation-gif/monkey.gif',
    srcForWin: ' ./assets/images/round-buttons/monkey.png',
  },
  2: {
    gif: './assets/images/animation-gif/sheep.gif',
    srcForWin: './assets/images/round-buttons/sheep.png',
  },

  3: {
    gif: './assets/images/animation-gif/elephant.gif',
    srcForWin: './assets/images/round-buttons/elephant.png',
  },
  4: {
    gif: './assets/images/animation-gif/seahorse.gif',
    srcForWin: './assets/images/round-buttons/seahorse.png',
  },

  5: {
    gif: './assets/images/animation-gif/jellyfish.gif',
    srcForWin: './assets/images/round-buttons/jellyfish.png',
  },
  6: {
    gif: './assets/images/animation-gif/dolphin.gif',
    srcForWin: './assets/images/round-buttons/dolphin.png',
  },
  7: {
    gif: './assets/images/animation-gif/shark.gif',
    srcForWin: './assets/images/round-buttons/shark.png',
  },
  8: {
    gif: './assets/images/square-buttons/bird.png',
    srcForWin: './assets/images/round-buttons/bird.png',
  },
  9: {
    gif: './assets/images/animation-gif/whale.gif',
    srcForWin: './assets/images/round-buttons/whale.png',
  },
};
Object.freeze(winAnimalSrc);

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
bettingTimePlusBtn.onclick = () => {
  clickAudio.play();
  bettingTimePlusBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    bettingTimePlusBtn.classList.remove('buttonAnimate');
  }, 310);
  setting.bettingTime += 5;
  bettingTime.textContent = setting.bettingTime;
  localStorage.setItem('setting', JSON.stringify(setting));
};

bettingTimeMinusBtn.onclick = () => {
  clickAudio.play();
  if (setting.bettingTime == 5) {
    bettingTimeMinusBtn.classList.add('shake');
  } else {
    bettingTimeMinusBtn.classList.add('buttonAnimate');
  }
  setTimeout(() => {
    bettingTimeMinusBtn.classList.remove('buttonAnimate', 'shake');
  }, 310);
  setting.bettingTime -= setting.bettingTime > 5 ? 5 : 0;
  bettingTime.textContent = setting.bettingTime;
  localStorage.setItem('setting', JSON.stringify(setting));
};

let intervalId;
let interval2Id;
let i = 0;
let canStart = true;
let userCoinBeforeBet;
startBtn.addEventListener('click', () => {
  clickAudio.play();
  if (canStart) {
    startBtn.classList.add('buttonAnimate');
  } else {
    startBtn.classList.add('shake');
  }
  setTimeout(() => {
    startBtn.classList.remove('buttonAnimate', 'shake');
  }, 310);
  if (intervalId || !canStart) return;
  canStart = false;
  quitConfirm.style.display = 'none';
  let random = Math.floor(Math.random() * centerImg.length - 1);
  userCoinBeforeBet = userCoin;
  canBet = true;
  let count = setting.bettingTime;
  const circleEle = document.getElementById('circle');
  const secondSpan = document.querySelector('#count-down span');

  circleEle.style.stroke = '#ff7b01';
  secondSpan.style.color = '#ffe600';

  intervalId = setInterval(() => {
    secondSpan.textContent = count;
    countDown.style.display = 'block';
    let radius = circleEle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let barLength = (count * circumference) / setting.bettingTime;
    circleEle.setAttribute('stroke-dasharray', barLength + ' ' + circumference);
    if (count == setting.bettingTime) {
      clockAudio.load();
      clockAudio.play();
      if (!isMuted) {
        startAudio.pause();
      }
    }
    if (count == Math.floor(setting.bettingTime / 3)) {
      circleEle.style.stroke = 'red';
      secondSpan.style.color = 'red';
    }
    if (!bet.total() && count == 0) {
      clockAudio.pause();
      clearInterval(intervalId);
      intervalId = null;
      countDown.style.display = 'none';
      gameStop.style.display = 'flex';
      canBet = false;

      const okBtn = document.querySelector('.okBtn');
      okBtn.onclick = () => {
        gameStop.style.display = 'none';
        if (!isMuted) {
          startAudio.play();
        }
        canStart = true;
      };
      return;
    } else if (count == 0) {
      secondSpan.textContent = 'GO';
      clockAudio.pause();
      canBet = false;
    }
    if (count < 0) {
      clearInterval(intervalId);
      intervalId = null;
      countDown.style.display = 'none';

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
  // updateQuitConBtn();
});

function stop() {
  countDown.style.display = 'none';
  clockAudio.pause();
  clearInterval(intervalId);
  canBet = false;
  intervalId = null;
  canStart = true;
}

const addWinAnimal = (src, i) => {
  const img = document.createElement('img');
  img.src = src;
  if (i == 8) {
    img.classList.add('bird');
  } else if (i == 9) {
    img.classList.add('whale');
  }
  return img;
};
let winHistory = [];

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
    if (typeof random == 'number' && random + 4 > i && random - 4 < i) {
      clearInterval(interval2Id);
      let animateId = setInterval(() => {
        if (centerImg[i].className.includes('animate')) {
          centerImg[i].classList.remove('animate');
        } else {
          centerImg[i].classList.add('animate');
        }
      }, 150);
      if (winHistory.length >= 7) {
        winHistory.shift();
        historyCon.removeChild(historyCon.firstElementChild);
      }
      winHistory.push(winAnimalSrc[indexMap[i]].srcForWin);

      historyCon.style.display = 'flex';
      historyCon.append(
        addWinAnimal(winHistory[winHistory.length - 1], indexMap[i])
      );
      wonAnimal.src = winAnimalSrc[indexMap[i]].gif;
      wonAnimal.style.display = 'block';
      calculateWinOrLose(i);

      setTimeout(() => {
        clearInterval(animateId);
        clearALlValue();
        updateCoinTextContent();
        if (!isMuted) {
          startAudio.play();
        }
        centerImg[i].classList.remove('animate');
        // winLoseContainer.style.display = 'none';
        // winLoseContainer.classList.remove('fadeIn');
        wonAnimal.style.display = 'none';
        wonAnimal.src = '';
        coinDropAudio.play();
        // updateQuitConBtn();
        loseAnimationGif.style.display = 'none';
        removeCircleAnimation('win', 'lose', 'draw');
        canStart = true;
      }, 1000 * 7);
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
function calculateWinOrLose(i) {
  let totalBet = bet.total();
  if (!totalBet) {
    endAudio.play();
    return;
  }
  userCoin +=
    bet.betList[indexMap[i]].myValue * bet.betList[indexMap[i]].multiple;
  if (land.includes(indexMap[i])) {
    userCoin += bet.betList[10].myValue * bet.betList[10].multiple;
  } else if (aqua.includes(indexMap[i])) {
    userCoin += bet.betList[11].myValue * bet.betList[11].multiple;
  }
  let won = userCoin - userCoinBeforeBet;
  wonAnimal.style.bottom = 'initial';
  // clonedBetList = JSON.parse(JSON.stringify(bet.betList));
  if (won == 0) {
    winText.textContent = 'Win';
    winText.style.color = '#3fff00';
    win.textContent = 0;
    addCircleAnimation('draw');
    // winLoseContainer.firstElementChild.textContent = 'Draw game! Try again.';
  } else if (won > 0) {
    // winLoseContainer.firstElementChild.textContent = `Congratulations! You win ${won} coin.`;

    winText.textContent = 'Win';
    winText.style.color = '#9efd10';
    win.textContent = won;
    addCircleAnimation('win');
  } else {
    // winLoseContainer.firstElementChild.textContent = `Sorry! You lose ${Math.abs(
    //   won
    // )} coin.`;
    wonAnimal.style.bottom = '10%';
    loseAnimationGif.style.display = 'block';
    winText.textContent = 'Lose';
    winText.style.color = '#FF2400';
    win.textContent = Math.abs(won);
    addCircleAnimation('lose');
  }
  setTimeout(() => {
    if (won > 0) {
      winAudio.play();
      partyAnimation();
    } else {
      lossAudio.play();
    }
  }, 300);
  // winLoseContainer.style.display = 'flex';
  // winLoseContainer.classList.add('fadeIn');
}

function clearALlValue() {
  for (let i in bet.betList) {
    bet.betList[i].myValue = 0;
    myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
  }
  betCoins.textContent = 0;
}

// reBet.addEventListener('click', () => {
//   clickAudio.play();
//   reBet.classList.add('buttonAnimate');
//   setTimeout(() => {
//     reBet.classList.remove('buttonAnimate');
//   }, 310);
//   // if (!canBet || !clonedBetList) return;
//   // if (bet.betList.some((v) => v.myValue != 0)) return;
//   // bet.betList = JSON.parse(JSON.stringify(clonedBetList));
//   // for (let i in bet.betList) {
//   //   myValueDiv[i].firstElementChild.textContent = bet.betList[i].myValue;
//   // }
//   // coin.textContent -= bet.total();
//   // jackpot.textContent -= bet.total();
//   if (!canBet) return;
//   userCoin += bet.total();
//   updateCoinTextContent();
//   clearALlValue();
// });

let firstStart = true;
let playBtnClicked = false;
menuPlayBtn.addEventListener('click', () => {
  clickAudio.play();
  menuPlayBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    menuPlayBtn.classList.remove('buttonAnimate');
    if (playBtnClicked) return;
    playBtnClicked = true;
    if (firstStart) {
      const loadingBar = document.querySelector('.loading');
      const startLoading = document.querySelector('.start-loading');
      startLoading.style.visibility = 'visible';
      loadingBar.classList.add('loadingAnimation');
      // const root = document.documentElement;
      setTimeout(() => {
        gameContainerPreloader()
          .then(() => {
            loadingBar.classList.add('loadingAfterDoneDownload');
            loadingBar.classList.remove('loadingAnimation');

            setTimeout(() => {
              menuBoardContainer.style.display = 'none';
              startLoading.style.visibility = 'hidden';
              achievementContainer.style.display = 'none';
              settingContainer.style.display = 'none';
              profileContainer.style.display = 'none';
              loadingBar.classList.remove('loadingAfterDoneDownload');
              gameContainer.style.display = 'flex';
              // if (historyCon.firstElementChild) {
              //   console.log('hello');
              // }
              firstStart = false;
              setTimeout(() => {
                playBtnClicked = false;
              }, 1000);
            }, 600);
          })
          .catch((e) => console.log(e));
      }, 1000);
    } else {
      menuBoardContainer.style.display = 'none';
      achievementContainer.style.display = 'none';
      settingContainer.style.display = 'none';
      profileContainer.style.display = 'none';
      gameContainer.style.display = 'flex';
      playBtnClicked = false;
    }
    if (historyCon.firstElementChild) {
      historyCon.style.display = 'flex';
    }
  }, 310);
});

volumeBtn.onclick = (e) => {
  clickAudio.play();
  volumeBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    volumeBtn.classList.remove('buttonAnimate');
  }, 310);
  musicBtn.checked = !musicBtn.checked;
  musicControlFunction();
};

profile.onclick = (e) => {
  clickAudio.play();
  if (playBtnClicked) {
    profile.classList.add('shake');
  } else {
    profile.classList.add('buttonAnimate');
  }
  setTimeout(() => {
    profile.classList.remove('buttonAnimate', 'shake');
    if (playBtnClicked) return;
    menuBoardContainer.style.display = 'none';
    profileContainer.style.display = 'flex';
  }, 310);
};

profileBackBtn.onclick = () => {
  clickAudio.play();
  profileBackBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    profileBackBtn.classList.remove('buttonAnimate');
    menuBoardContainer.style.display = 'flex';
    profileContainer.style.display = 'none';
  }, 310);
};

coinCon.forEach((con) => {
  con.onclick = (e) => {
    clickAudio.play();
    if (playBtnClicked) {
      con.classList.add('shake');
    } else {
      con.classList.add('buttonAnimate');
    }
    setTimeout(() => {
      con.classList.remove('buttonAnimate', 'shake');
    }, 310);
  };
});

getCoin.onclick = (e) => {
  clickAudio.play();
  getCoin.classList.add('buttonAnimate');
  setTimeout(() => {
    getCoin.classList.remove('buttonAnimate');
  }, 310);
};

// const updateQuitConBtn = () => {
//   if (!canStart) {
//     quitConfirm.firstElementChild.textContent = "You can't quit in the game!";
//     yesBtn.style.display = 'none';
//     noBtn.textContent = 'OK';
//   } else {
//     quitConfirm.firstElementChild.textContent = 'Do you want to quit?';
//     yesBtn.style.display = 'block';
//     noBtn.textContent = 'NO';
//   }
// };

quitBtn.addEventListener('click', (e) => {
  clickAudio.play();
  if (canStart) {
    quitBtn.classList.add('buttonAnimate');
  } else {
    quitBtn.classList.add('shake');
  }
  setTimeout(() => {
    quitBtn.classList.remove('buttonAnimate', 'shake');
  }, 310);
  // updateQuitConBtn();
  if (!canStart) return;
  quitConfirm.style.display = 'flex';
  yesBtn.onclick = () => {
    gameContainer.style.display = 'none';
    menuBoardContainer.style.display = 'flex';
    quitConfirm.style.display = 'none';
    historyCon.style.display = 'none';
  };
  noBtn.onclick = () => {
    quitConfirm.style.display = 'none';
  };
});

settingBtn.onclick = (e) => {
  clickAudio.play();
  if (playBtnClicked) {
    settingBtn.classList.add('shake');
  } else {
    settingBtn.classList.add('buttonAnimate');
  }
  setTimeout(() => {
    settingBtn.classList.remove('buttonAnimate', 'shake');
    if (playBtnClicked) return;
    menuBoardContainer.style.display = 'none';
    settingContainer.style.display = 'flex';
  }, 310);
};

settingBackBtn.onclick = () => {
  clickAudio.play();

  settingBackBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    settingBackBtn.classList.remove('buttonAnimate');
    settingContainer.style.display = 'none';
    menuBoardContainer.style.display = 'flex';
  }, 310);
};

musicBtn.addEventListener('input', () => {
  clickAudio.play();
  musicControlFunction();
});

volumeControl.addEventListener('input', () => {
  let { value } = volumeControl;
  volumeBarFunction(value);
});

privacy.onclick = () => {
  clickAudio.play();
  privacy.classList.add('buttonAnimate');
  setTimeout(() => {
    privacy.classList.remove('buttonAnimate');
  }, 310);
};

userAgreement.onclick = () => {
  clickAudio.play();
  userAgreement.classList.add('buttonAnimate');
  setTimeout(() => {
    userAgreement.classList.remove('buttonAnimate');
  }, 310);
};

aboutBettingSlots.onclick = () => {
  clickAudio.play();
  aboutBettingSlots.classList.add('buttonAnimate');
  setTimeout(() => {
    aboutBettingSlots.classList.remove('buttonAnimate');
    settingContainer.style.display = 'none';
    aboutContainer.style.display = 'flex';
  }, 310);
};

aboutBackBtn.onclick = () => {
  clickAudio.play();
  aboutBackBtn.classList.add('buttonAnimate');
  setTimeout(() => {
    aboutBackBtn.classList.remove('buttonAnimate');
    aboutContainer.style.display = 'none';
    settingContainer.style.display = 'flex';
  }, 310);
};

achievementBtn.onclick = (e) => {
  clickAudio.play();
  const { target } = e;
  if (playBtnClicked) {
    target.classList.add('shake');
  } else {
    target.classList.add('buttonAnimate');
  }
  setTimeout(() => {
    target.classList.remove('buttonAnimate', 'shake');
    if (playBtnClicked) return;
    menuBoardContainer.style.display = 'none';
    achievementContainer.style.display = 'flex';
  }, 310);
};

achievementBackBtn.onclick = (e) => {
  clickAudio.play();
  const { target } = e;
  target.classList.add('buttonAnimate');
  setTimeout(() => {
    target.classList.remove('buttonAnimate');
    achievementContainer.style.display = 'none';
    menuBoardContainer.style.display = 'flex';
  }, 310);
};
