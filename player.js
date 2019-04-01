const player = {
  health: 100,
  attack: 100,
  defense: 100,
  gold: 0,
  xp: 0,
  xpToNextLevel: 0,
  level: 0,
  currentRoomNumber: 20,
  xpToNextLevelGenerator: function (level) {
      return 0;
  }
}

module.exports = { player };