const ryan = {
  name: "Ryan",
  health: 100,
  attack: 100,
  defense: 100,
  level: 100,
  xpGiven: 50,
  goldGiven: 10000
};

const ben = {
  name: "Ben",
  health: 100,
  attack: 100,
  defense: 100,
  level: 100,
  xpGiven: 100,
  goldGiven: 7500
}

const monsters = [];
monsters.push(ryan);
monsters.push(ben);

const monsterGenerator = () => {
  return monsters[Math.floor(Math.random())*monsters.length];
}

module.exports = { 
  monsters,
  monsterGenerator,
};