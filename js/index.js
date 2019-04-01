const { monsters, monsterGenerator } = require('./monster');
const { generateNewMaze } = require('./maze');
const { player, updatePlayerGoldAndXp } = require('./player');

let currentMonster = monsterGenerator();
console.log(currentMonster);
console.log(player);
updatePlayerGoldAndXp(player, currentMonster);
console.log(player);

let maze = generateNewMaze(); // generate initial maze
console.log(maze);

let gameNotBeaten = true, currentCommand;

// document.onkeydown = (e) => {
//   switch (e.keyCode) {
//     case 37:
//         alert('left');
//         break;
//     case 38:
//         alert('up');
//         break;
//     case 39:
//         alert('right');
//         break;
//     case 40:
//         alert('down');
//         break;
//   }
// }

// while(gameNotBeaten) {
//   currentCommand = Document.get
// }