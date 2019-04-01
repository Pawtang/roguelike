import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, updatePlayerGoldAndXp } from './player.js';

let currentMonster = monsterGenerator();
console.log(currentMonster);
console.log(player);
updatePlayerGoldAndXp(player, currentMonster);
console.log(player);

let maze = generateNewMaze(); // generate initial maze
console.log(maze);

let gameNotBeaten = true, currentCommand;

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 37:
        console.log('left');
        break;
    case 38:
        console.log('up');
        break;
    case 39:
        console.log('right');
        break;
    case 40:
        console.log('down');
        break;
  }
}

// while(gameNotBeaten) {
//   currentCommand = Document.get
// }