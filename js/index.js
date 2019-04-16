import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, levelUp } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 15;
let numShops = 2;
player.currentRoomNumber[0] = gridSize - 1;
let maze = generateNewMaze(gridSize, 0.75, 0.75); // generate initial maze
player.currentRoomNumber = mazeSetup(gridSize, numShops);
console.log(maze);
const boughtItem = 'this item has been bought';

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
  let elem = document.querySelector('.shop-log');
  switch (e.keyCode) {
    case 13: //ENTER
      if(shop[shopItemPointer] === 'exit') {
        console.log('exiting shop');
        exitShop();
      } else if (shop[shopItemPointer]  === 'bought') {
        console.log('this item has been bought');
          elem.innerHTML += 'This item has already been purchased</br>';
          scrollLog(elem);
      } else {
        if(player.gold >= shop[shopItemPointer].cost){
          buyItem(shop[shopItemPointer]);
          shop[shopItemPointer] = 'bought';
          document.getElementById('s-' + (shopItemPointer+1)).textContent = 'this item has been bought';
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
      } else if (maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]-1].event === 'wall') {
        console.log('can\'t move left due to wall');
        document.querySelector('.map-grid').childNodes[maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]-1].roomNumber].classList.add('wall');  
      } else {
        console.log('move left');
        player.currentRoomNumber[1]--;
        roomActions();
      }
      break;
    case 38: // UP
      if(player.currentRoomNumber[0] === 0) {
        console.log('can\'t move up');
      } else if (maze[player.currentRoomNumber[0]-1][player.currentRoomNumber[1]].event === 'wall') {
        console.log('can\'t move up due to wall');
        document.querySelector('.map-grid').childNodes[maze[player.currentRoomNumber[0]-1][player.currentRoomNumber[1]].roomNumber].classList.add('wall');
      } else {
        console.log('move up');
        player.currentRoomNumber[0]--;
        roomActions();
      }
      break;
    case 39: // RIGHT
      if(player.currentRoomNumber[1] === gridSize - 1) {
        console.log('can\'t move right');
      } else if (maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]+1].event === 'wall') {
        console.log('can\'t move right due to wall');
        document.querySelector('.map-grid').childNodes[maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]+1].roomNumber].classList.add('wall');
      } else {
        console.log('move right');
        player.currentRoomNumber[1]++;
        roomActions();
      }
      break;
    case 40: // DOWN
      if(player.currentRoomNumber[0] === gridSize - 1) {
        console.log('can\'t move down');
      } else if (maze[player.currentRoomNumber[0]+1][player.currentRoomNumber[1]].event === 'wall') {
        console.log('can\'t move down due to wall');
        document.querySelector('.map-grid').childNodes[maze[player.currentRoomNumber[0]+1][player.currentRoomNumber[1]].roomNumber].classList.add('wall');
      } else {
        console.log('move down');
        player.currentRoomNumber[0]++;
        roomActions();
      }
      break;
  }
    console.log('Player coord: (' + player.currentRoomNumber[0] + ',' +player.currentRoomNumber[1] + ')');
}

const roomActions = () => {
  roomNumber = maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].roomNumber;
  if (document.querySelector(".active-cell")) { //Check if a div with class 'active cell' exists
      document.querySelector(".active-cell").classList.add("been-here"); //If it does, mark it 'been-here'
      document.querySelector(".active-cell").classList.remove("active-cell"); //And then remove active class
    }
  document.querySelector('.map-grid').childNodes[roomNumber].classList.add('active-cell');      
  console.log(roomNumber);//Add active cell on player location
  if (maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event === 'exit') {
    console.log('found exit');
    maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled = true;
  } else if(!maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled){
    if(maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event !== 'shopRoom'){
      maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled = true;
    }
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
      console.log('initialize a shop');
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
  shop = maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].eventHelper;
  console.log(shop);
  console.log(shop[0]);
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('shop-screen').classList.toggle('hidden');
  document.getElementById('s-1').textContent = shop[0] === 'bought' ? boughtItem : shop[0].name + ' - ' + shop[0].cost + ' gold';
  document.getElementById('s-2').textContent = shop[1] === 'bought' ? boughtItem : shop[1].name + ' - ' + shop[1].cost + ' gold';
  document.getElementById('s-3').textContent = shop[2] === 'bought' ? boughtItem : shop[2].name + ' - ' + shop[2].cost + ' gold';
  document.getElementById('s-4').textContent = 'Exit';
  document.getElementById('s-1').focus();
}

const buyItem = (item) => {
  let elem = document.querySelector('.shop-log'); // refers to the shop log
  let imageSource = '/images/sprites/';
  console.log("Current player gold", player.gold);
  //Some of these items should be changed to give health, not just defense.
  //also should DRY this out by making a function to do all 3 things, just pass arguments in
  switch(item.sprite){ //sprite is a more consise identifier than the name
    case 'sword-1':
      player.items.sword = 'sword-1';
      player.attackBonus = 2;
      document.getElementById('sword-text').textContent = 2;
      document.getElementById('sword-img').src = imageSource + player.items.sword + '.png';
      break;
    case 'sword-2':
      player.items.sword = 'sword-2';
      player.attackBonus = 5;
      document.getElementById('sword-text').textContent = 5;
      document.getElementById('sword-img').src = imageSource + player.items.sword + '.png';
      break;
    case 'shield-1':
      player.items.shield = 'shield-1';
      player.defenseBonus = 2;
      document.getElementById('shield-text').textContent = 2;
      document.getElementById('shield-img').src = imageSource + player.items.shield + '.png';
      break;
    case 'shield-2':
      player.items.shield = 'shield-2';
      player.defenseBonus = 5;
      document.getElementById('shield-text').textContent = 5;
      document.getElementById('shield-img').src = imageSource + player.items.shield + '.png';
      break;
    case 'helm-1':
      player.items.helmet = 'helm-1';
      player.defenseBonus = 2;
      document.getElementById('helmet-text').textContent = 2;
      document.getElementById('helmet-img').src = imageSource + player.items.helmet + '.png';
      break;
    case 'helm-2':
      player.items.helmet = 'helm-2';
      player.defenseBonus = 5;
      document.getElementById('helmet-text').textContent = 5;
      document.getElementById('helmet-img').src = imageSource + player.items.helmet + '.png';
      break;
    case 'boots-1':
      player.items.boots = 'boots-1';
      player.defenseBonus = 2;
      document.getElementById('boots-text').textContent = 2;
      document.getElementById('boots-img').src = imageSource + player.items.boots + '.png';
      break;
    case 'boots-2':
      player.items.boots = 'boots-2';
      player.defenseBonus = 5;
      document.getElementById('boots-text').textContent = 5;
      document.getElementById('boots-img').src = imageSource + player.items.boots + '.png';
      break;
    case 'potion':
      player.items.potions++;
      document.getElementById('potion-text').innerHTML = player.items.potions;
      break;
  }

  document.getElementById('player-attack').textContent = player.attack + player.attackBonus;
  document.getElementById('player-defense').textContent = player.defense + player.defenseBonus;


  console.log(player.items);
  player.gold = player.gold - item.cost;
  console.log("Item cost", item.cost, "Player now has", player.gold);
  elem.innerHTML += 'Purchased ' + item.name + ' for ' + item.cost + ' gold<br>';
  document.getElementById('player-gold').innerHTML = player.gold;
  scrollLog(elem);

}

const exitShop = () => {
  document.getElementById('main').classList.toggle('hidden');
  document.getElementById('shop-screen').classList.toggle('hidden');
  document.querySelector('.shop-log').innerHTML = '';
  shop = null;
  gameState = 'exploration';
  shopItemPointer = 0;
}

const initializeTreasureRoom = () => {
  gameState = 'treasure';
  goldInChest = Math.floor(Math.random()*100) + 1 // between 1 and 100 >>> updated to balance difficulty
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
      let attackPower = player.attack+player.attackBonus;
      let damage = Math.floor((attackPower*10*Math.random())/(monster.defense*(0.8)));
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
      if (player.items.potions > 0 && player.health < player.maxHealth) {
        console.log('You use a potion and restore 50 HP');
        player.health += 50;
        player.items.potions = player.items.potions - 1;
        document.getElementById('potion-text').innerHTML = player.items.potions;
        elem.innerHTML += 'You use a health potion, restoring 50 HP </br>' ;
        scrollLog(elem);
        if (player.health > player.maxHealth) player.health = player.maxHealth;
        updateHealth();
        monsterAttack();
      } else if (player.health === player.maxHealth) {
        elem.innerHTML += 'You\'re at full health <br>';
        scrollLog(elem);
      } else {
        elem.innerHTML += 'You\'re all out of potions, mate <br>';
        scrollLog(elem);
      }
      break;

    case 'flee':
      const chance = Math.floor(Math.random()*10);
      if (chance > 2) {
        console.log('Successfully fled the battle');
        endBattle();
      } else {
        console.log('Failed to flee');
        elem.innerHTML += 'Failed to flee!</br>';
        scrollLog(elem);
        monsterAttack();
      }
      break;
  }
}


const monsterAttack = () => {
  let elem = document.querySelector('.battle-log');
  let defensePower = player.defense + player.defenseBonus;
  gameState = 'wait';
  if (player.health > 0) { //Monster attacks you
    setTimeout(function(){ //Wait 0.5 sec
      console.log('Monster attacks you');
      let damage = Math.floor((monster.attack*10*Math.random())/(defensePower*(0.8)));
      player.health = player.health - damage;
      updateHealth();
      elem.innerHTML += 'Monster attacks you for ' + damage + ' health!</br>';
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
    document.getElementById('player-xp-bar').style.width = Math.floor((player.xp/player.xpToNextLevel)*100) + '%';
  }
  endBattle();
}

function mazeSetup (gridSize, numShops) {
  let exitGenerated = false, entranceGenerated = false, shopsGenerated = 0;
  let exitCoords = [], entranceCoords = [], shopCoords = [];

  while(!exitGenerated) {
    exitCoords[0] = Math.floor(Math.random()*gridSize);
    exitCoords[1] = Math.floor(Math.random()*gridSize);
    if(!maze[exitCoords[0]][exitCoords[1]].event) {
      maze[exitCoords[0]][exitCoords[1]].event = "exit";
      console.log(exitCoords[0], exitCoords[1], maze[exitCoords[0]][exitCoords[1]]);
      exitGenerated = true;
    }
  }

  while(!entranceGenerated) {
    entranceCoords[0] = Math.floor(Math.random()*gridSize);
    entranceCoords[1] = Math.floor(Math.random()*gridSize);
    if(!maze[entranceCoords[0]][entranceCoords[1]].event) { //Should also check to make sure that entrance != exit
      maze[entranceCoords[0]][entranceCoords[1]].event = "entrance";
      maze[entranceCoords[0]][entranceCoords[1]].hasBeenTraveled = true;
      //document.getElementById('cell-' + maze[entranceCoords[0]][entranceCoords[1]].roomNumber).classList.add('active-cell');
      document.querySelector('.map-grid').childNodes[maze[entranceCoords[0]][entranceCoords[1]].roomNumber].classList.add('active-cell');  
      console.log(entranceCoords[0], entranceCoords[1], maze[entranceCoords[0]][entranceCoords[1]]);
      entranceGenerated = true;
    }
  }

  while(shopsGenerated < numShops) {
    shopCoords[0] = Math.floor(Math.random()*gridSize);
    shopCoords[1] = Math.floor(Math.random()*gridSize);
    if(!maze[shopCoords[0]][shopCoords[1]].event) {
      maze[shopCoords[0]][shopCoords[1]].event = "shopRoom";
      maze[shopCoords[0]][shopCoords[1]].eventHelper = shopGenerator();
      //document.querySelector('cell-' + maze[shopCoords[0]][shopCoords[1]].roomNumber).classList.add('shop');
      document.querySelector('.map-grid').childNodes[maze[shopCoords[0]][shopCoords[1]].roomNumber].classList.add('shop');
      console.log(shopCoords[0], shopCoords[1], maze[shopCoords[0]][shopCoords[1]]);
      shopsGenerated++;
    }
  }

  for(let h = 0; h < gridSize; h++) {
    for(let w = 0; w < gridSize; w++) {
      if(!maze[h][w].event) {
        maze[h][w].event = eventGenerator();
      }
    }
  }

  return entranceCoords;

}

// UI Updates
const updateHealth = () => {
  document.getElementById('player-health').textContent = player.health;
  document.getElementById('player-health-bar').style.width = Math.floor((player.health/player.maxHealth)*100) + '%';
}

const scrollLog = (elem) => {
  elem.scrollTop = elem.scrollHeight;
}
