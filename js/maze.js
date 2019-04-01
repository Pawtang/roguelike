const generateNewMaze = () => {
  const gridSize = 5;

  let maze = [];
  // Track the room we're in
  // Track what type of rooms we've hit
  const roomPercentages = [0.3, 0.3, 0.1, 0.1, 0.2];

  for(let i = 0; i < gridSize; i++) {
    maze[i] = [];
    for(let j = 0; j < gridSize; j++) {
      maze[i][j] = {
        // leftDoor: false,
        // rightDoor: false,
        // upDoor: false,
        // downDoor: false,
        // event: null,
        // hasBeenTraveled: false,
      };
    }
  }

  // set entrance
  maze[4][0].isEntrance = true;
  maze[4][0].rightDoor = true;

  // set exit
  maze[0][4].isExit = true;
  maze[0][4].leftDoor = true;

  // console.log(maze)
  return maze;
}

module.exports = {
  generateNewMaze
};
