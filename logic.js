let img = document.getElementById('bitcoin');
let counter = document.getElementById('btn-counter');
counter.innerText = 0;
let cps = 0;
let clickCounter = 0;
img.onclick = function() {
  if (cps === 0) {
    counter.innerText = Number(counter.innerText) + 1 + cps;
    countCheck();
  } else {
    counter.innerText = Number(counter.innerText) + cps;
    countCheck();
  }
  clickCounter++;
};
img.addEventListener('click', () => {
  let coinAudio = document.createElement('AUDIO');
  coinAudio.src = './sounds/coin.mp3';
  coinAudio.play();
});
function counterUpdate() {
  counter.innerText = Number(counter.innerText) + cps;
  countCheck();
  if (cps >= 1000) {
    document.getElementById('coinsContainer').style =
      "background-image: URL('./imgs/fallingcoins0.gif')";
  }
  if (cps >= 100000) {
    document.getElementById('coinsContainer').style =
      "background-image: URL('./imgs/fallingcoins1.gif')";
  }
  if (cps >= 1000000) {
    document.getElementById('coinsContainer').style =
      "background-image: URL('./imgs/fallingcoins2.gif')";
  }
}

setInterval(counterUpdate, 100);

let miner = {
  name: 'Miner',
  owned: 0,
  cps: 1,
  cost: 50,
  img: './imgs/miner.jpeg',
  id: 'miner',
  imgid: 'minimg',
  ownid: 'ownMin',
};
let computer = {
  name: 'Computer',
  owned: 0,
  cps: 10,
  cost: 500,
  img: './imgs/computer.png',
  id: 'computer',
  imgid: 'compimg',
  ownid: 'ownComp',
};
let datacenter = {
  name: 'Data center',
  owned: 0,
  cps: 100,
  cost: 2000,
  img: './imgs/datacenter.png',
  id: 'datacenter',
  imgid: 'dataimg',
  ownid: 'ownData',
};
let supercomputer = {
  name: 'Super computer',
  owned: 0,
  cps: 1000,
  cost: 50000,
  img: './imgs/supercomputer.jpg',
  id: 'supercomputer',
  imgid: 'superimg',
  ownid: 'ownSup',
};
let quantumcomputer = {
  name: 'Quantum computer',
  owned: 0,
  cps: 10000,
  cost: 200000,
  img: './imgs/quantumcomputer.jpg',
  id: 'quantumcomputer',
  imgid: 'quantimg',
  ownid: 'ownQuan',
};
let ai = {
  name: 'AI',
  owned: 0,
  cps: 100000,
  cost: 5000000,
  img: './imgs/AI.png',
  id: 'ai',
  imgid: 'aiimg',
  ownid: 'ownAi',
};
let matrioshka = {
  name: 'Matrioshka brain',
  owned: 0,
  cps: 1000000,
  cost: 20000000,
  img: './imgs/matrioshka.jpg',
  id: 'matrioshka',
  imgid: 'matimg',
  ownid: 'ownMat',
};
let simulation = {
  name: 'Simulation',
  owned: 0,
  cps: 0,
  cost: 1000000000,
  img: './imgs/simulation.jpg',
  id: 'simulation',
  imgid: 'simimg',
  ownid: 'ownSim',
};
const resources = [
  miner,
  computer,
  datacenter,
  supercomputer,
  quantumcomputer,
  ai,
  matrioshka,
  simulation,
];

function createResourceElement(resourceName) {
  let node = document.getElementById('resources');
  let itm = document.getElementById('itemid');
  let cln = itm.cloneNode(true);
  cln.childNodes[1].id = resourceName.imgid;
  cln.childNodes[1].src = resourceName.img;
  cln.childNodes[3].childNodes[0].textContent = resourceName.name;
  cln.childNodes[3].childNodes[4].textContent = resourceName.cost;
  cln.childNodes[5].childNodes[1].childNodes[0].textContent =
    resourceName.owned;
  cln.childNodes[5].childNodes[1].id = resourceName.ownid;
  cln.id = resourceName.id;
  cln.style = 'display: flex; opacity: 0.5';
  cln.addEventListener('click', () => {
    let buyAudio = document.createElement('AUDIO');
    buyAudio.src = './sounds/buy.mp3';
    buyAudio.id = 'buyAudio';
    cln.appendChild(buyAudio);
  });

  console.log(cln.childNodes);
  node.appendChild(cln);
}

function buyItem(item) {
  if (item === simulation) {
    return location.reload(true);
  }
  if (document.getElementById(item.id + 'Inventory').childNodes.length >= 10) {
    counter.innerText = Number(counter.innerText) - item.cost;
    document.getElementById(item.ownid).innerText++;
    item.owned++;
    cps += item.cps;
    document.getElementById('buyAudio').play();
    document.getElementById('buyAudio').currentTime() = 0;
  } else {
    document.getElementById(item.id + 'Inventory').style = 'display: flex';
    let image = document.getElementById('resourceImage');
    let clnimg = image.cloneNode(true);
    clnimg.src = item.img;
    clnimg.id = undefined;
    document.getElementById(item.id + 'Inventory').appendChild(clnimg);
    console.log(Number(counter.innerText), item.cost);
    counter.innerText = Number(counter.innerText) - item.cost;
    document.getElementById(item.ownid).innerText++;
    item.owned++;
    cps += item.cps;
    document.getElementById('buyAudio').play();
  }
  if (counter.innerText < item.cost) {
    document.getElementById(item.id).style = 'opacity: 0.5';
  }
}

function createResourceIfPossible(currentCoins, resource) {
  const minNeededToShow = Math.floor(resource.cost / 2);
  const minNeededToBuy = resource.cost;
  const numOfResourceNodes =
    document.getElementById('resources').childNodes.length - 4;
  const resourceIndex = resources.indexOf(resource);
  if (currentCoins >= minNeededToShow && numOfResourceNodes < resourceIndex) {
    createResourceElement(resource);
    let event = document.getElementById(resource.id);
    event.addEventListener('click', () => {
      console.log(counter.innerText, minNeededToBuy);
      if (counter.innerText >= minNeededToBuy) {
        buyItem(resource);
      }
    });
  }
  if (currentCoins >= minNeededToBuy) {
    let event = document.getElementById(resource.id);
    event.style = 'display:flex';
  }
}

function countCheck() {
  let currentCoins = Number(counter.innerText);
  resources.forEach(resource => {
    createResourceIfPossible(currentCoins, resource);
  });
  isComplete(achievements);
}
// function prettifyNumber(value) {
//   var thousand = 1000;
//   var million = 1000000;
//   var billion = 1000000000;
//   if (value < thousand) {
//     return value;
//   }

//   if (value >= thousand && value <= 1000000) {
//     return value / thousand + 'k';
//   }

//   if (value >= million && value <= billion) {
//     return Math.round(value / million) + 'M';
//   }

//   if (value >= billion && value <= trillion) {
//     return Math.round(value / billion) + 'B';
//   }
// }

//Achievements:

let entrepreneur = {
  message: 'Entrepreneur',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};
let rags2riches = {
  message: 'From rags to riches',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};
let clickMadness = {
  message: 'Click Madness',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};
let moneyRocket = {
  message: 'Money Rocket',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};
let singularity = {
  message: 'Singularity',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};
let ready4simulation = {
  message: 'Ready for Simulation',
  isComplete: () => {
    isComplete(this);
  },
  seen: false,
};

const achievements = [
  entrepreneur,
  rags2riches,
  clickMadness,
  moneyRocket,
  singularity,
  ready4simulation,
];

function isComplete(achievement) {
  if (miner.owned >= 5 && entrepreneur.seen === false) {
    entrepreneur.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = entrepreneur.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }

  if (counter.innerText >= 1000 && rags2riches.seen === false) {
    rags2riches.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = rags2riches.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }

  if (clickCounter >= 100 && clickMadness.seen === false) {
    clickMadness.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = clickMadness.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }

  if (cps >= 10000 && moneyRocket.seen === false) {
    moneyRocket.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = moneyRocket.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }

  if (ai.owned === 1) {
    singularity.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = singularity.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }

  if (counter.innerText >= simulation.cost && ready4simulation.seen === false) {
    ready4simulation.seen = true;
    document.getElementById(
      'achievementId'
    ).childNodes[1].childNodes[2].textContent = ready4simulation.message;
    document.getElementById('achievementId').style =
      'transform: translate(0px, 0px); -webkit-transform: translate(0px, 0px);';
    setTimeout(() => {
      document.getElementById('achievementId').style =
        'transform: translate(0px, -100px); -webkit-transform: translate(0px, -100px);';
    }, 3000);
  }
}

setInterval(createCoin, 40000);

function createCoin() {
  setTimeout(function() {
    let body = document.getElementById('body');
    let newCoin = document.createElement('img');
    newCoin.src = './imgs/coin.png';
    newCoin.id = 'bonusCoin';
    newCoin.class = 'bigCoin';
    newCoin.style = 'top: ' + Math.random() * 680 + 0 + 'px; left:' + Math.random() * 680 + 0 + 'px';
    body.appendChild(newCoin);
  }, Math.random() * 6000 + 1000);
}

document.getElementById('bonusCoin').onclick = function() {
  counter.innerText = Number(counter.innerText) + Math.random(cps)*10 + 2;
  countCheck();
}
