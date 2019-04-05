const itemGenerator = (name, cost, health, attack, defense, speed, bonus, description) => {
  return {
    name, cost, health, attack, defense, speed, bonus, description
  }
}

const items = [];
items.push(itemGenerator("Sword", 100, 0, 10, 0, 0, "None", "A sword"));
items.push(itemGenerator("Shield", 100, 0, 0, 10, 0, "None", "A shield"));
items.push(itemGenerator("Shoes", 100, 0, 0, 0, 10, "None", "A pair of shoes"));
items.push(itemGenerator("Helmet", 100, 10, 0, 0, 0, "None", "A helmet"));
items.push(itemGenerator("HealthPot", 50, 0, 0, 0, 0, "None", "Restore 20 HP"));

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