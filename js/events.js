<<<<<<< HEAD
const battle = {
  eventName: "Battle"
}
const treasureRoom = {
  eventName: "TreasureRoom"
}
const shopRoom = {
  eventName: "ShopRoom"
}
const eventlessRoom = {
  eventName: "EventlessRoom"
}
const BossRoom = {
  eventName: "BossRoom"
}

const events = ["battle", "battle", "battle", "battle", "treasureRoom", "shopRoom", "eventlessRoom"];
=======
const events = ["battle", "battle", "battle", "battle", "treasureRoom", "shopRoom", "eventlessRoom","eventlessRoom", "eventlessRoom"];
>>>>>>> ef1b4bf77ea45cad2bcf09d5bac306f657e87953

export const eventGenerator = () => {
  const eventNumber = Math.floor(Math.random()*events.length);
  return events[eventNumber];
}