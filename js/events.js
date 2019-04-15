const events = ["battle", "battle", "treasureRoom", "eventlessRoom"];

export const eventGenerator = () => {
  const eventNumber = Math.floor(Math.random()*events.length);
  return events[eventNumber];
}
