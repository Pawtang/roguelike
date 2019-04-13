import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, levelUp } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 5;
player.currentRoomNumber[0] = gridSize - 1;
let maze = generateNewMaze(gridSize); // generate initial maze
let shop, monster, roomNumber;
let gameState = 'exploration', goldInChest = 0, battleActionPointer = 0, shopItemPointer = 0; // possible game states (exploration, battle, shop)

const battleActions = ['attack', 'hp-potion', 'flee'];

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
    case 'wait':
      console.log('Fucking wait');
      break;
    case 'gameOver':
          //what happens here?
      break;
  }
}

const shopControls = (e) => {
  let elem = document.querySelector('.shop-log')
  let item = shop[shopItemPointer];
  switch (e.keyCode) {
    case 13: //ENTER
      if(item === 'exit') {
        console.log('exiting shop');
        exitShop();
      } else if (item === 'bought') {
        console.log('this item has been bought');
          elem.innerHTML += 'This item has already been purchased</br>';
          scrollLog(elem);
      } else {
        if(player.gold >= shop[shopItemPointer].cost){
          buyItem(item);
          item = 'bought';
        } else {
          console.log('Not enough gold. You need', shop[shopItemPointer].cost,'but you have', player.gold);
          elem.innerHTML += 'Not enough gold! </br>';
          scrollLog(elem);
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
    case 37: // LEFT
      if(player.currentRoomNumber[1] === 0) {
        console.log('can\'t move left');
      } else {
        console.log('move left');
        player.currentRoomNumber[1]--;
        roomActions();
      }
      break;
    case 38: // UP
      if(player.currentRoomNumber[0] === 0) {
        console.log('can\'t move up');
      } else {
        console.log('move up');
        player.currentRoomNumber[0]--;
        roomActions();
      }
      break;
    case 39: // RIGHT
      if(player.currentRoomNumber[1] === 4) {
        console.log('can\'t move right');
      } else {
        console.log('move right');
        player.currentRoomNumber[1]++;
        roomActions();
      }
      break;
    case 40: // DOWN
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
  let elem = document.querySelector('.shop-log');
  console.log("Current player gold", player.gold);
  player.items.push(item);
  //This is a temporary bandaid
    if (item.name == 'Potion') {
     player.potions = player.potions + 1;
    document.getElementById('potion-text').innerHTML = player.potions;
    }
  //need a better solution that involves looping through array when using potion and deleting first potion that appears in array
  console.log(player.items);
  player.gold = player.gold - item.cost;
  console.log("Item cost", item.cost, "Player now has", player.gold);
  elem.innerHTML += 'Purchased ' + item.name + ' for ' + item.cost + ' gold<br>';
  scrollLog(elem);
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
  document.querySelector('#monster-statbox').innerHTML = '<p style = "color: black">You received ' + goldInChest + ' gold!</p> <h3>Press Enter</h3>';
  document.getElementById("player-gold").textContent = player.gold;
  console.log(goldInChest, 'gold');
}

const initializeBattle = () => {
  gameState = 'battle';
  monster = monsterGenerator();
  console.log('battle start');
  document.getElementById('monster-icon').style.background = 'url("/images/monsters/monster-' + monster.icon + '.gif")';
  document.getElementById('monster-name').textContent = monster.name;
  document.getElementById('monster-health').textContent = monster.health;
  document.getElementById('monster-health-bar').style.width = '100%';
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('battle-screen').classList.toggle('hidden');
  document.querySelector('.battle-log').innerHTML += monster.name + ' approaches! ' + monster.description + '</br>';
  document.getElementById('b-1').focus();
}

const battleActionHandler = (battleAction) => {
  let elem = document.querySelector('.battle-log')
  switch (battleAction) {

    case 'attack':
      let damage = Math.floor((player.attack*10*Math.random())/(monster.defense*(0.8)));
      monster.health = monster.health - damage;
      if (monster.health > 0) {
        console.log('You attack for', damage);
        document.getElementById('monster-health-bar').style.width = Math.floor((monster.health/monster.maxHealth*100)) + '%';
        elem.innerHTML += 'You attack ' + monster.name + ' for ' + damage + ' health! </br>';
        scrollLog(elem);
        monsterAttack();
      } else {
        monster.health = 0;
        console.log(monster.name, 'is dead yo!');
        updateXPAndGoldAndEndBattle();
      }
      document.getElementById('monster-health').textContent = monster.health;
      break;

    case 'hp-potion':
      console.log('You use a potion and restore 50 HP');
      if (player.potions > 0 && player.health < player.maxHealth) {
        player.health += 50;
        player.potions = player.potions - 1;
        document.getElementById('potion-text').innerHTML = player.potions;
        if (player.health > player.maxHealth) player.health = player.maxHealth;
        updateHealth();
      }
      elem.innerHTML += 'You use a health potion, restoring 50 HP </br>' ;
      scrollLog(elem);
      monsterAttack();
      break;

    case 'flee':
      const chance = Math.floor(Math.random()*10);
      if (chance > 2) {
        console.log('Successfully fled the battle');
        endBattle();
      } else {
        console.log('Failed to flee');
        elem.innerHTML = 'Failed to flee!'
        scrollLog(elem);
        monsterAttack();
      }
      break;
  }
}


const monsterAttack = () => {
  let elem = document.querySelector('.battle-log');
  gameState = 'wait';
  if (player.health > 0) { //Monster attacks you
    setTimeout(function(){ //Wait 0.5 sec
      console.log('Monster attacks you');
      let damage = Math.floor((monster.attack*10*Math.random())/(player.defense*(0.8)));
      player.health = player.health - damage;
      updateHealth();
      elem.innerHTML += 'Monster attacks you for ' + damage + ' health!</br>' ;
      scrollLog(elem);
      gameState = 'battle';
      if (player.health <= 0){
        console.log('you are dead!');
        document.getElementById('player-health').textContent = 0;
        // Add Game Over
      }
    }, 500);
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


// UI Updates
const updateHealth = () => {
  document.getElementById('player-health').textContent = player.health;
  document.getElementById('player-health-bar').style.width = Math.floor((player.health/player.maxHealth)*100) + '%';
}

const scrollLog = (elem) => {
elem.scrollTop = elem.scrollHeight;
}
