export const player = {
  maxHealth: 100,
  health: 100,
  attack: 5,
  defense: 10,
  gold: 0,
  xp: 0,
  xpToNextLevel: 200,
  level: 1,
  currentRoomNumber: [0,0],
  items: [],
  potions: 1
}

export const levelUp = () => {
  player.level++;
  player.xp = player.xp - player.xpToNextLevel;
  player.xpToNextLevel = Math.floor(player.xpToNextLevel*1.25);
  console.log("Player health", player.maxHealth, "->", Math.floor(player.maxHealth*1.25));
  player.maxHealth = Math.floor(player.maxHealth*1.25);
  player.health = player.maxHealth;
  console.log("Player attack", player.attack, "->", Math.floor(player.attack*1.1));
  player.attack = Math.floor(player.attack*1.10);
  console.log("Player defense", player.defense, "->", Math.floor(player.defense*1.1));
  player.defense = Math.floor(player.defense*1.10);
  document.getElementById('experience').textContent = player.xp;
  document.getElementById('player-health').textContent = player.health;
  document.getElementById('player-attack').textContent = player.attack;
  document.getElementById('player-defense').textContent = player.defense;
  document.getElementById('player-health-bar').style.width = '100%';
  console.log('Level up! You are now level ' + player.level);
}
