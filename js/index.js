import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 5;
player.currentRoomNumber[0] = gridSize - 1;
let maze = generateNewMaze(gridSize); // generate initial maze

let shop;
let monster;

// possible game states (exploration, battle, shop)

let roomNumber, gameState = 'exploration', goldInChest = 0;

const battleActions = ['attack', 'hp-potion', 'flee'];

let battleActionPointer = 0;
let shopItemPointer = 0;

//GameStates: exploration, battle, treasure, shop, win, lose;

//******************************************
// CONTROL HANDLERS
//******************************************

document.onkeydown = (e) => {
  e.preventDefault();
  switch(gameState) {
    case 'exploration':
      explorationControls(e);
      break;
    case 'battle':
      battleControls(e);
      break;
    case 'treasure':
      treasureControls(e);
      break;
    case 'shop':
      console.log('Shop Controls');
      shopControls(e);
      break;
    case 'passThrough':
      passControls(e);
      break;
  }
}

const shopControls = (e) => {
  let elem = document.querySelector('.shop-log')
  switch (e.keyCode) {
    case 13: //ENTER
      if(shop[shopItemPointer] === 'exit') {
        console.log('exiting shop');
        exitShop();
      } else if (shop[shopItemPointer] === 'bought') {
        console.log('this item has been bought');
          elem.innerHTML += 'This item has already been purchased</br>';
          elem.scrollTop = elem.scrollHeight;
      } else {
        if(player.gold >= shop[shopItemPointer].cost){
          buyItem(shop[shopItemPointer]);
          shop[shopItemPointer] = 'bought';
        } else {
          console.log('Not enough gold. You need', shop[shopItemPointer].cost,'but you have', player.gold);
          elem.innerHTML += 'Not enough gold! </br>';
          elem.scrollTop = elem.scrollHeight;
        }
      }
      break;
    case 38: //UP
      if(shopItemPointer > 0) shopItemPointer--;
      document.getElementById('s-' + (shopItemPointer + 1)).focus();
      console.log("Item", shopItemPointer);
      console.log(shop[shopItemPointer]);
      break;
    case 40: //DOWN
      if(shopItemPointer < 3) shopItemPointer++;
      document.getElementById('s-' + (shopItemPointer + 1)).focus();
      console.log("Item", shopItemPointer);
      console.log(shop[shopItemPointer]);
      break;
  }
}

const treasureControls = (e) => {
  if(e.keyCode === 13) {
    document.querySelector('#monster-statbox').classList.toggle('chest');
    document.querySelector('#monster-statbox').innerHTML = '';
    gameState = 'exploration';
  }
}

const battleControls = (e) => {
  //  document.getElementById('b-1').addEventListener("click", battleActionHandler('attack'));
  switch (e.keyCode) {
    case 13: //ENTER
      battleActionHandler(battleActions[battleActionPointer]);
      break;
    case 38: //UP
      if(battleActionPointer > 0) battleActionPointer--;
      console.log(battleActionPointer);
      document.getElementById('b-' + (battleActionPointer + 1)).focus();
      break;
    case 40: //DOWN
      if(battleActionPointer < 2) battleActionPointer++;
      console.log(battleActionPointer);
      document.getElementById('b-' + (battleActionPointer + 1)).focus();
      break;
  }
}

const passControls = (e) => {
  if (e.keyCode = 13) gameState = 'exploration';
}

const explorationControls = (e) => {
  switch (e.keyCode) {
    case 37:
      if(player.currentRoomNumber[1] === 0) {
        console.log('can\'t move left');
      } else {
        console.log('move left');
        player.currentRoomNumber[1]--;
        roomActions();
      }
      break;
    case 38:
      if(player.currentRoomNumber[0] === 0) {
        console.log('can\'t move up');
      } else {
        console.log('move up');
        player.currentRoomNumber[0]--;
        roomActions();
      }
      break;
    case 39:
      if(player.currentRoomNumber[1] === 4) {
        console.log('can\'t move right');
      } else {
        console.log('move right');
        player.currentRoomNumber[1]++;
        roomActions();
      }
      break;
    case 40:
      if(player.currentRoomNumber[0] === 4) {
        console.log('can\'t move down');
      } else {
        console.log('move down');
        player.currentRoomNumber[0]++;
        roomActions();
      }
      break;
  }
}

const roomActions = () => {
  roomNumber = maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].roomNumber;
  document.querySelector(".active-cell").classList.add("been-here");
  document.querySelector(".active-cell").classList.remove("active-cell");
  document.getElementById('cell-' + roomNumber).classList.add("active-cell");
  console.log(roomNumber);
  if(!maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled){
    maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled = true;
    maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event = eventGenerator();
    console.log(maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event)
    playEvent(maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event);

  } else {
    console.log('been here');
  }
}

const playEvent = (event) => {
  switch(event) {
    case 'battle':
      initializeBattle();
      break;
    case 'treasureRoom':
      initializeTreasureRoom();
      break;
    case 'shopRoom':
      initializeShop();
      break;
    case 'eventlessRoom':
      console.log('Nothing here! How boring.');
      break;
  }
}

//******************************************
// EVENT HANDLERS
//******************************************

const initializeShop = () => {
  gameState = 'shop';
  shop = shopGenerator();
  console.log(shop);
  console.log(shop[0]);
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('shop-screen').classList.toggle('hidden');
  document.getElementById('s-1').textContent = shop[0].name + ' - ' + shop[0].cost + ' gold';
  document.getElementById('s-2').textContent = shop[1].name + ' - ' + shop[1].cost + ' gold';
  document.getElementById('s-3').textContent = shop[2].name + ' - ' + shop[2].cost + ' gold';
  document.getElementById('s-4').textContent = 'Exit';
  document.getElementById('s-1').focus();
}

const buyItem = (item) => {
  let elem = document.querySelector('.shop-log')
  console.log("Current player gold", player.gold);
  player.items.push(item);
  console.log(player.items);
  player.gold = player.gold - item.cost;
  console.log("Item cost", item.cost, "Player now has", player.gold);
  elem.innerHTML += 'Purchased ' + shop[shopItemPointer].name + ' for ' + shop[shopItemPointer].cost + ' gold</br>';
  elem.scrollTop = elem.scrollHeight;
  document.getElementById('player-gold').innerHTML = player.gold;
}

const exitShop = () => {
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('shop-screen').classList.toggle('hidden');
  document.querySelector('.shop-log').innerHTML = '';
  gameState = 'exploration';
  shopItemPointer = 0;
}

const initializeTreasureRoom = () => {
  gameState = 'treasure';
  goldInChest = Math.floor(Math.random()*101) + 100 // between 100 and 200;
  player.gold = player.gold + goldInChest;
  document.querySelector('#monster-statbox').classList.toggle('chest');
  document.querySelector('#monster-statbox').innerHTML = '<p style = "color: black">You received ' + goldInChest + ' gold!</p>';
  document.getElementById("player-gold").textContent = player.gold;
  console.log(goldInChest, 'gold');
}

const initializeBattle = () => {
  gameState = 'battle';
  monster = monsterGenerator();
  console.log('battle start');
  document.getElementById("monster-name").textContent = monster.name;
  document.getElementById('monster-health').textContent = monster.health;
  document.getElementById('monster-health-bar').style.width = '100%';
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('battle-screen').classList.toggle('hidden');
  document.getElementById('b-1').focus();
}

const battleActionHandler = (battleAction) => {
  let elem = document.querySelector('.battle-log')
  switch (battleAction) {
    case 'attack':
      const damage = Math.floor((player.attack*10*Math.random())/(monster.defense*(0.8)));
      monster.health = monster.health - damage;
      if (monster.health > 0) {
        console.log('You attack for', damage);
        document.getElementById('monster-health-bar').style.width = monster.health + '%';
        elem.innerHTML += 'You attack ' + monster.name + ' for ' + damage + ' health! </br>';
        elem.scrollTop = elem.scrollHeight;
      } else {
        monster.health = 0;
        console.log(monster.name, 'is dead yo!');
        updateXPAndGoldAndEndBattle();
      }
      document.getElementById('monster-health').textContent = monster.health;
      break;
    case 'hp-potion': console.log('You use a potion and restore 20 HP');
      elem.innerHTML += 'You use a health potion, restoring 20 HP </br>' ;
      elem.scrollTop = elem.scrollHeight;
      break;
    case 'flee':
      const chance = Math.floor(Math.random()*10);
      if (chance > 2) {
        console.log('Successfully fled the battle');
        endBattle();
      } else {
        console.log('Failed to flee');
        elem.innerHTML = 'Failed to flee!'
        elem.scrollTop = elem.scrollHeight;
      }
      break;
  }
}

const endBattle = () => {
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('battle-screen').classList.toggle('hidden');
  document.querySelector('.battle-log').innerHTML = '';
  console.log('end battle');
  gameState = "exploration";
  battleActionPointer = 0;
}

const updateXPAndGoldAndEndBattle = () => {
  console.log("Gain", monster.goldGiven, "gold");
  player.gold = player.gold + monster.goldGiven; //Update gold
  document.getElementById("player-gold").textContent = player.gold;
  player.xp = player.xp + monster.xpGiven; //Update XP
  console.log("Gain", monster.xpGiven, "XP");
  if (player.xp >= player.xpToNextLevel) {
    levelUp();
  } else {
    document.getElementById('experience').textContent = player.xp;
  }
  endBattle();
}

const levelUp = () => {
    player.level++;
    player.xp = player.xp - player.xpToNextLevel;
    player.xpToNextLevel = Math.floor(player.xpToNextLevel*1.25);
    console.log("Player health", player.health, "->", player.health*1.25);
    player.health = Math.floor(player.health*1.25);
    console.log("Player attack", player.attack, "->", player.attack*1.1);
    player.attack = Math.floor(player.attack*1.10);
    console.log("Player defense", player.defense, "->", player.defense*1.1);
    player.defense = Math.floor(player.defense*1.10);
    document.getElementById('experience').textContent = player.xp;
    document.getElementById('player-health').textContent = player.health;
    document.getElementById('player-attack').textContent = player.attack;
    document.getElementById('player-defense').textContent = player.defense;
    console.log('Level up! You are now level ' + player.level);
}
