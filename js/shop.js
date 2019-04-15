const itemGenerator = (name, cost, health, attack, defense, speed, bonus, itemType, itemTier, description, sprite) => {
  return {
    name, cost, health, attack, defense, speed, bonus, itemType, itemTier, description, sprite
  }
}

const items = [];
items.push(itemGenerator("Sword", 100, 0, 2, 0, 0, "None", 'sword', 1, "A sword", 'sword-1'));
items.push(itemGenerator("Shield", 100, 0, 0, 2, 0, "None", 'shield', 1, "A shield", 'shield-1'));
items.push(itemGenerator("Boots", 100, 0, 0, 0, 2, "None", 'boots', 1, "A pair of boots", 'boots-1'));
items.push(itemGenerator("Helmet", 100, 2, 0, 0, 0, "None", 'helmet', 1, "A helmet", 'helm-1'));
items.push(itemGenerator("Potion", 200, 0, 0, 0, 0, "None", 'potion', 1, "Restore 50 HP", 'potion'));
items.push(itemGenerator("Sword of Intense Focus", 400, 0, 5, 0, 0, "None", 'sword', 2, "A better sword", 'sword-2'));
items.push(itemGenerator("Shield of Blissful Ignorance", 400, 5, 0, 5, 0, "None", 'shield', 2, "A better shield", 'shield-2'));
items.push(itemGenerator("Boots of Running Away", 400, 5, 0, 0, 5, "None", 'boots', 2, "A better pair of boots", 'boots-2'));
items.push(itemGenerator("Helmet of Head Protection", 400, 10, 0, 5, 0, "None", 'helmet', 2, "A better helmet", 'helm-2'));
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
