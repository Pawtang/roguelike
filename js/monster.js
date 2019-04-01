const monsterCreator = (name, health, attack, defense, level, xpGiven, goldGiven) => {
  return {
    name: name,
    health: health,
    attack: attack,
    defense: defense,
    level: level,
    xpGiven: xpGiven,
    goldGiven: goldGiven
  }
};

const monsters = [];
monsters.push(monsterCreator('Ryan', 100, 2, 2, 1, 10, 500));
monsters.push(monsterCreator('Ben', 100, 3, 1, 1, 10, 500));
monsters.push(monsterCreator('Math Homework', 100, 5, 1, 2, 30, 1000));
monsters.push(monsterCreator('All Your Exes', 100, 5, 1, 2, 30, 1000));
monsters.push(monsterCreator('Looming Deadline', 100, 5, 1, 2, 30, 1000));
monsters.push(monsterCreator('High Cost of Living', 100, 5, 1, 2, 30, 1000));
monsters.push(monsterCreator('Medical Debt', 100, 5, 1, 2, 30, 1000));

export const monsterGenerator = () => {
  const monsterNumber = Math.floor(Math.random()*monsters.length);
  return monsters[monsterNumber];
}
