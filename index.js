const { monsters, monsterGenerator } = require('./monsters');
const { maze } = require('./maze');
const { player, updatePlayerGoldAndXp } = require('./player');

let currentMonster = monsterGenerator();
console.log(currentMonster);
console.log(player);
updatePlayerGoldAndXp(player, currentMonster);
console.log(player);