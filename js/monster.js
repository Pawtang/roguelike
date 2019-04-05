const monsterCreator = (monsterDetails) => {
  return {
    name: monsterDetails[0],
    health: monsterDetails[1],
    attack: monsterDetails[2],
    defense: monsterDetails[3],
    level: monsterDetails[4],
    xpGiven: monsterDetails[5],
    goldGiven: monsterDetails[6],
  }
};

const monsters = [];
monsters.push(['Ryan', 100, 2, 2, 1, 10, 500]);
monsters.push(['Ben', 100, 3, 1, 1, 10, 500]);
monsters.push(['Math Homework', 100, 5, 1, 2, 30, 100]);
monsters.push(['All Your Exes', 100, 5, 1, 2, 30, 100]);
monsters.push(['Looming Deadline', 100, 5, 1, 2, 30, 100]);
monsters.push(['High Cost of Living', 100, 5, 1, 2, 30, 100]);
monsters.push(['Medical Debt', 100, 5, 1, 2, 30, 100]);
monsters.push(['Dissapointed Father', 100, 5, 1, 3, 50, 10]);


export const monsterGenerator = () => {
  const monsterNumber = Math.floor(Math.random()*monsters.length);
  return monsterCreator(monsters[monsterNumber]);
}
