import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, updatePlayerGoldAndXp } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 5;

function initMonster(){
let currentMonster = monsterGenerator();
console.log(currentMonster);
console.log(player);
updatePlayerGoldAndXp(player, currentMonster);
console.log(player);

document.getElementById("monster-name").textContent = currentMonster.name;
document.getElementById("monster-health").textContent = currentMonster.health;
document.getElementById("monster-attack").textContent = currentMonster.attack;
document.getElementById("monster-defense").textContent = currentMonster.defense;
}

let maze = generateNewMaze(gridSize); // generate initial maze
console.log(maze);

let shop = shopGenerator(); // how to generate a shop
console.log(shop);

let gameNotBeaten = true, currentCommand, roomNumber;

document.onkeydown = (e) => {
  e.preventDefault();
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
  document.querySelector(".active-cell").classList.remove("active-cell");
  document.getElementById('cell-' + roomNumber).classList.add("active-cell");
  console.log(roomNumber);
  initRoom();
}

function battle(){
  //initiate Battle, hide map and show battle div
  initMonster();
  document.querySelector('.right-container-fight').classList.toggle('hidden');
  document.querySelector('.right-container-map').classList.toggle('hidden');
}

function chest(){

}

//Roll 1,2, or 3 (for now)
function rollDie(){
  let diceRoll = Math.floor(Math.random() * 3) + 1;
  return diceRoll;
}

//Initialize a room by checking state variable then rolling dice to pick what happens
function initRoom(){
if (gameNotBeaten = true){
  switch(rollDie()){
    case 1:
      battle();
    break;
    case 2:
    break;
    case 3:
      battle();
    break;
  }
}
}

/*
 * Order should be move -> update character location -> check if room has been visited -> execute event if room has not been visited -> update player and maze after event
 * Additionally, if on the exit room, must generate a new maze object to replace the old maze object
 */
