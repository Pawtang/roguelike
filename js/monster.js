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
    icon: monsterDetails[8]
  }
};

const monsters = [];
monsters.push(['Ryan', 100, 20, 2, 1, 10, 500, 'A dangerous man wearing basketball shorts.', 1]);
monsters.push(['Ben', 100, 15, 1, 1, 10, 500, 'A confused man wielding an IPA.', 2]);
monsters.push(['Math Homework', 100, 12, 1, 2, 10, 100, 'You struggle to understand the Gauss-Green theorem.', 3]);
monsters.push(['All Your Exes', 100, 8, 1, 2, 10, 100, 'Each more evil than the last.', 4]);
monsters.push(['Looming Deadline', 100, 7, 1, 2, 10, 100, 'Procrastinator\'s wake-up call.', 5]);
monsters.push(['High Cost of Living', 100, 5, 1, 2, 20, 500, 'Gonna need to find another room mate.', 6]);
monsters.push(['Medical Debt', 100, 15, 1, 2, 20, 100, 'From that time you got suplexed.', 7]);
monsters.push(['Dissapointed Father', 100, 20, 1, 3, 30, 10, 'He\'s not mad, just dissapointed.', 8]);



export const monsterGenerator = () => {
  const monsterNumber = Math.floor(Math.random()*monsters.length);
  return monsterCreator(monsters[monsterNumber]);
}

const bossMonsters = [];

export const bossMonsterGenerator = (level) => {
  return bossMonsters[level];
}
