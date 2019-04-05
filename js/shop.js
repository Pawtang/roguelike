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
items.push(itemGenerator("Sword", 100, 0, 10, 0, 0, "None"));
items.push(itemGenerator("Shield", 100, 0, 0, 10, 0, "None"));
items.push(itemGenerator("Shoes", 100, 0, 0, 0, 10, "None"));
items.push(itemGenerator("Helmet", 100, 10, 0, 0, 0, "None"));

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