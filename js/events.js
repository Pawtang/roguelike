const events = ["battle", "battle", "battle", "battle", "treasureRoom", "shopRoom", "eventlessRoom","eventlessRoom", "eventlessRoom"];

export const eventGenerator = () => {
  const eventNumber = Math.floor(Math.random()*events.length);
  return events[eventNumber];
}