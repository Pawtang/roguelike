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

const events = [battle, treasureRoom, shopRoom, eventlessRoom];

export const eventGenerator = () => {
  const eventNumber = Math.floor(Math.random()*events.length);
  return events[eventNumber];
}