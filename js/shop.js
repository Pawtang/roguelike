const itemGenerator = (name, cost, health, attack, defense, speed, bonus) => {
  return {
    name: name,
    cost: cost,
    health: health,
    attack: attack,
    defense: defense,
    speed: speed,
    bonus: bonus
  }
}

const items = [];
items.push(itemGenerator("Sword of Intense Focus", 300, 0, 25, 0, 0, "None"));
items.push(itemGenerator("Shield of Blissful Ignorance", 100, 25, 0, 25, 0, "None"));
items.push(itemGenerator("Boots of Running Away", 100, 10, 0, 0, 10, "None"));
items.push(itemGenerator("Helmet of Head Protection", 100, 20, 0, 10, 0, "None"));

const itemSelector = () => {
  const itemNumber = Math.floor(Math.random()*items.length);
  return items[itemNumber];
}

export const shopGenerator = () => {
  return [
    itemSelector(),
    itemSelector(),
    itemSelector(),
  ]
}