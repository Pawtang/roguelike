const events = ["battle", "treasureRoom", "eventlessRoom"];
const chances = [2, 1, 10]

export const eventGenerator = () => {
  //const eventNumber = Math.floor(Math.random()*events.length);
  return chooseWeighted(events, chances)
}



function chooseWeighted(events, chances) {
    var sum = chances.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    chances = chances.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    return events[chances.filter(el => el <= rand).length];
}