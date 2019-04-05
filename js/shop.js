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
items.push(itemGenerator("Sword of Intense Focus", 300, 0, 25, 0, 0, "None", "A better sword"));
items.push(itemGenerator("Shield of Blissful Ignorance", 100, 25, 0, 25, 0, "None", "A better shield"));
items.push(itemGenerator("Boots of Running Away", 100, 10, 0, 0, 10, "None", "A better pair of shoes"));
items.push(itemGenerator("Helmet of Head Protection", 100, 20, 0, 10, 0, "None", "A better helmet"));

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