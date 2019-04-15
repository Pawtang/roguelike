const itemGenerator = (name, cost, health, attack, defense, speed, bonus, itemType, description, sprite) => {
  return {
    name, cost, health, attack, defense, speed, bonus, itemType, description, sprite
  }
}

const items = [];
items.push(itemGenerator("Sword", 100, 0, 10, 0, 0, "None", 'sword', "A sword", 'sword-1'));
items.push(itemGenerator("Shield", 100, 0, 0, 10, 0, "None", 'shield', "A shield", 'shield-1'));
items.push(itemGenerator("Boots", 100, 0, 0, 0, 10, "None", 'boots', "A pair of boots", 'boots-1'));
items.push(itemGenerator("Helmet", 100, 10, 0, 0, 0, "None", 'helmet', "A helmet", 'helm-1'));
items.push(itemGenerator("Potion", 200, 0, 0, 0, 0, "None", 'potion', "Restore 50 HP", 'potion'));
items.push(itemGenerator("Sword of Intense Focus", 400, 0, 25, 0, 0, "None", 'sword', "A better sword", 'sword-2'));
items.push(itemGenerator("Shield of Blissful Ignorance", 400, 25, 0, 25, 0, "None", 'shield', "A better shield", 'shield-2'));
items.push(itemGenerator("Boots of Running Away", 400, 10, 0, 0, 10, "None", 'boots', "A better pair of boots", 'boots-2'));
items.push(itemGenerator("Helmet of Head Protection", 400, 20, 0, 10, 0, "None", 'helmet', "A better helmet", 'helm-2'));
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
