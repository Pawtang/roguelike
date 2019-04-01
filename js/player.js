export const player = {
  health: 100,
  attack: 100,
  defense: 100,
  gold: 0,
  xp: 0,
  xpToNextLevel: 0,
  level: 0,
  currentRoomNumber: [4,0],
  items: []
}

export const updatePlayerGoldAndXp = (player, monster) => {
  player.gold = player.gold + monster.goldGiven;
  player.xp = player.xp + monster.xpGiven;
    if (player.xp >= player.xpToNextLevel){
        player.xp = 0;
        player.level++;
        player.xpToNextLevel = player.xpToNextLevel*1.2;
        player.health = player.health*1.2;
        player.attack = player.attack*1.2;
        player.defense = player.defense*1.2;
    }
}

// module.exports = {
//   player,
//   updatePlayerGoldAndXp,
// };