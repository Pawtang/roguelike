const itemGenerator = (name, cost, health, attack, defense, speed, bonus, description, sprite) => {
  return {
    name, cost, health, attack, defense, speed, bonus, description, sprite
  }
}

const items = [];
items.push(itemGenerator("Sword", 100, 0, 10, 0, 0, "None", "A sword", 'sword-1'));
items.push(itemGenerator("Shield", 100, 0, 0, 10, 0, "None", "A shield", 'shield-1'));
items.push(itemGenerator("Boots", 100, 0, 0, 0, 10, "None", "A pair of shoes", 'boots-1'));
items.push(itemGenerator("Helmet", 100, 10, 0, 0, 0, "None", "A helmet", 'helm-1'));
items.push(itemGenerator("Potion", 200, 0, 0, 0, 0, "None", "Restore 50 HP", 'potion'));
items.push(itemGenerator("Sword of Intense Focus", 400, 0, 25, 0, 0, "None", "A better sword", 'sword-2'));
items.push(itemGenerator("Shield of Blissful Ignorance", 400, 25, 0, 25, 0, "None", "A better shield", 'shield-2'));
items.push(itemGenerator("Boots of Running Away", 400, 10, 0, 0, 10, "None", "A better pair of boots", 'boots-2'));
items.push(itemGenerator("Helmet of Head Protection", 400, 20, 0, 10, 0, "None", "A better helmet", 'helm-2'));
//Some of these items should give health
const itemSelector = () => {
  const itemNumber = Math.floor(Math.random()*items.length);
  return items[itemNumber];
}

export const shopGenerator = () => {
  return [
    itemSelector(),
    itemSelector(),
    itemSelector(),
    'exit'
  ]
}
