// export const generateNewMaze = (gridSize) => {

//   let maze = [];

//   for(let i = 0; i < gridSize; i++) {
//     maze[i] = [];
//     for(let j = 0; j < gridSize; j++) {
//       maze[i][j] = {
//         leftDoor: false,
//         rightDoor: false,
//         upDoor: false,
//         downDoor: false,
//         event: null,
//         hasBeenTraveled: false,
//         roomNumber: i*5+j,
//       };
//     }
//   }

//   // Generate path through maze
//   // Generate secondary paths

//   // set entrance
//   maze[4][0].hasBeenTraveled = true;
//   maze[4][0].event = 'entrance';

//   // // set exit to always be boss room
//   maze[0][4].event = 'bossRoom';
//   // maze[0][4].isExit = true;
//   // maze[0][4].leftDoor = true;

//   return maze;
// };

const mazeWalls = (width, height, complexity, density) => {
  // only odd shapes
  shape = [Math.floor(height/2)*2+1, Math.floor(width/2)*2+1];
  // Adjust complexity and density relative to maze size
  complexity = Math.floor(complexity * (5 * shape[0] + shape[1]));
  density = Math.floor(density * (Math.floor(shape[0]/2) * Math.floor(shape[1]/2)));
  console.log(shape, complexity, density);
  // Build actual maze
  z = []
  for (let h = 0; h < shape[0]; h++){ 
    z[h] = [];
  }
  for (let h = 0; h < shape[0]; h++) {
    for (let w = 0; w < shape[1]; w++) {
      z[h][w] = 0;
    }
  }
  // Fill borders
  for (let w = 0; w < shape[1]; w++) {
    z[0][w] = 1;
    z[shape[0]-1][w] = 1;
  }
  for (let h = 1; h < shape[0]-1; h++) {
    z[h][0] = 1;
    z[h][shape[1]-1] = 1;
  }
  // Make aisles
  for(let i = 0; i < density; i++) {
    
  }
  console.log(z);
}

mazeWalls(20, 21, 0.75, 0.75);