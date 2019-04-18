const player = {
  maxHealth: 100,
  health: 100,
  attack: 5,
  attackBonus: 0,
  defense: 10,
  defenseBonus: 0,
  gold: 0,
  xp: 0,
  xpToNextLevel: 100,
  level: 1,
  currentRoomNumber: [0,0],
  items: {
    sword: '',
    shield: '',
    helmet: '',
    boots: '',
    potions: 2
  }
};

export const playerGenerator = () => {
  return {
    maxHealth: 100,
    health: 100,
    attack: 5,
    attackBonus: 0,
    defense: 10,
    defenseBonus: 0,
    gold: 0,
    xp: 0,
    xpToNextLevel: 100,
    level: 1,
    currentRoomNumber: [0,0],
    items: {
      sword: '',
      shield: '',
      helmet: '',
      boots: '',
      potions: 2
    }
  }
};