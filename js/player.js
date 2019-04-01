export const player = {
  health: 100,
  attack: 100,
  defense: 100,
  gold: 0,
  xp: 0,
  xpToNextLevel: 0,
  level: 0,
  currentRoomNumber: 20,
  items: []
}

export const updatePlayerGoldAndXp = (player, monster) => {
  player.gold = player.gold + monster.goldGiven;
  player.xp = player.xp + monster.xpGiven;
}

// module.exports = {
//   player,
//   updatePlayerGoldAndXp,
// };