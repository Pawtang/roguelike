export const generateNewMaze = (gridSize) => {

  let maze = [];

  for(let i = 0; i < gridSize; i++) {
    maze[i] = [];
    for(let j = 0; j < gridSize; j++) {
      maze[i][j] = {
        leftDoor: false,
        rightDoor: false,
        upDoor: false,
        downDoor: false,
        event: null,
        hasBeenTraveled: false,
        roomNumber: i*5+j,
      };
    }
  }

  // Generate path through maze
  // Generate secondary paths

  // set entrance
  maze[4][0].hasBeenTraveled = true;
  maze[4][0].event = 'entrance';

  // // set exit to always be boss room
  maze[0][4].event = 'bossRoom';
  // maze[0][4].isExit = true;
  // maze[0][4].leftDoor = true;

  return maze;
};