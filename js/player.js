export const player = {
  health: 100,
  attack: 10,
  defense: 10,
  gold: 0,
  xp: 0,
  xpToNextLevel: 100,
  level: 1,
  currentRoomNumber: [0,0],
  items: []
}

export const levelUp = () => {
  player.level++;
  player.xp = player.xp - player.xpToNextLevel;
  player.xpToNextLevel = Math.floor(player.xpToNextLevel*1.25);
  console.log("Player health", player.health, "->", Math.floor(player.health*1.25));
  player.health = Math.floor(player.health*1.25);
  console.log("Player attack", player.attack, "->", Math.floor(player.attack*1.1));
  player.attack = Math.floor(player.attack*1.10);
  console.log("Player defense", player.defense, "->", Math.floor(player.defense*1.1));
  player.defense = Math.floor(player.defense*1.10);
  document.getElementById('experience').textContent = player.xp;
  document.getElementById('player-health').textContent = player.health;
  document.getElementById('player-attack').textContent = player.attack;
  document.getElementById('player-defense').textContent = player.defense;
  console.log('Level up! You are now level ' + player.level);
}