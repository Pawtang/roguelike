const monsterCreator = (monsterDetails) => {
  return {
    name: monsterDetails[0],
    health: monsterDetails[1],
    attack: monsterDetails[2],
    defense: monsterDetails[3],
    level: monsterDetails[4],
    xpGiven: monsterDetails[5],
    goldGiven: monsterDetails[6],
    description: monsterDetails[7],
  }
};

const monsters = [];
monsters.push(['Ryan', 100, 2, 2, 1, 10, 500, 'A dangerous man wearing basketball shorts.']);
monsters.push(['Ben', 100, 3, 1, 1, 10, 500, 'A confused man wielding an IPA.']);
monsters.push(['Math Homework', 100, 5, 1, 2, 30, 100, 'You struggle to understand the Gauss-Green theorem.']);
monsters.push(['All Your Exes', 100, 5, 1, 2, 30, 100, 'Each more evil than the last.']);
monsters.push(['Looming Deadline', 100, 5, 1, 2, 30, 100, 'Procrastinator\'s wake-up call.']);
monsters.push(['High Cost of Living', 100, 5, 1, 2, 30, 100, 'Gonna need to find another room mate.']);
monsters.push(['Medical Debt', 100, 5, 1, 2, 30, 100, 'From that time you got suplexed.']);
monsters.push(['Dissapointed Father', 100, 5, 1, 3, 50, 10, 'He\'s not mad, just dissapointed.']);



export const monsterGenerator = () => {
  const monsterNumber = Math.floor(Math.random()*monsters.length);
  return monsterCreator(monsters[monsterNumber]);
}

const bossMonsters = [];

export const bossMonsterGenerator = (level) => {
  return bossMonsters[level];
}
