import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, updatePlayerGoldAndXp } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 5;

let maze = generateNewMaze(gridSize); // generate initial maze

let shop = shopGenerator(); // how to generate a shop
let monster;

// possible game states (exploration, battle, shop)

let gameNotBeaten = true, roomNumber, gameState = 'exploration', goldInChest = 0;

const battleActions = ['attack', 'hp-potion', 'flee'];

let battleActionPointer = 0;

//GameStates: exploration, battle, chest, shop, win, lose;

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
  if(e.keyCode === 13) {
    gameState = 'exploration';
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
  switch (e.keyCode) {
    case 13: //ENTER
      battleActionHandler(battleActions[battleActionPointer]);
      break;
    case 38: //UP
      if(battleActionPointer > 0) battleActionPointer--;
      console.log(battleActionPointer);
      break;
    case 40: //DOWN
      if(battleActionPointer < 2) battleActionPointer++;
      console.log(battleActionPointer);
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
      }
      break;
    case 38:
      if(player.currentRoomNumber[0] === 0) {
        console.log('can\'t move up');
      } else {
        console.log('move up');
        player.currentRoomNumber[0]--;
      }
      break;
    case 39:
      if(player.currentRoomNumber[1] === 4) {
        console.log('can\'t move right');
      } else {
        console.log('move right');
        player.currentRoomNumber[1]++;
      }
      break;
    case 40:
      if(player.currentRoomNumber[0] === 4) {
        console.log('can\'t move down');
      } else {
        console.log('move down');
        player.currentRoomNumber[0]++;
      }
      break;
  }
  roomNumber = maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].roomNumber;
  // check to see if the room has been visited or not
  // if it has not -> change room's style to "visited" style
  // else, leave it as is, continue
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
      // initialize shop room here
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
  console.log('shopping spree');
}

const initializeTreasureRoom = () => {
  gameState = 'treasure';
  goldInChest = Math.floor(Math.random()*101) + 100 // between 100 and 200;
  player.gold = player.gold + goldInChest;
  document.querySelector('#monster-statbox').classList.toggle('chest');
  document.querySelector('#monster-statbox').innerHTML = '<p style = "color: black">You received ' + goldInChest + ' gold!</p>';
  document.getElementById("player-gold").textContent = player.gold;
  console.log(goldInChest + " gold");
  // TODO: Remove all treasure styling and add back all map styling
}

const initializeBattle = () => {
  gameState = 'battle';
  monster = monsterGenerator();
  console.log('battle start');
  document.getElementById("monster-name").textContent = monster.name;
  document.getElementById('monster-health').textContent = monster.health;
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
}

const battleActionHandler = (battleAction) => {
  switch (battleAction) {
    case 'attack':
      const damage = Math.floor((player.attack*Math.random())/(monster.defense*(0.8)));
      monster.health = monster.health - damage;
      if (monster.health > 0) {
        console.log('You attack for ' + damage);
      } else {
        monster.health = 0;
        console.log(monster.name + 'is dead yo!');
        addXPAndEndBattle();
      }
      document.getElementById('monster-health').textContent = monster.health;
      break;
    case 'hp-potion': console.log('You use a potion and restore 20 HP');
      break;
    case 'flee':
      const chance = Math.floor(Math.random()*10);
      if (chance > 4) {
        console.log('Successfully fleed the battle');
        endBattle();
      } else {
        console.log('Failed to flee');
      }
      break;
  }
}

const endBattle = () => {
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
  console.log('end battle');
  gameState = "exploration";
  battleActionPointer = 0;
}

const addXPAndEndBattle = () => {
  player.xp = player.xp + monster.xpGiven;
  document.getElementById('experience').textContent = player.xp;
  endBattle();
}
