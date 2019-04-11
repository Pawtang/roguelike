const generateNewMaze = (gridWidth, gridHeight, complexity, density) => {

  const layout = mazeWalls(gridWidth+2, gridHeight+2, complexity, density);

  let maze = [];

  for(let i = 0; i < gridHeight; i++) {
    maze[i] = [];
    for(let j = 0; j < gridWidth; j++) {
      maze[i][j] = {
        isWall: layout[i+1][j+1] ? 1 : 0,
        event: null,
        hasBeenTraveled: false,
        roomNumber: i*gridWidth+j,
      };
    }
  }

  // set entrance
  // maze[4][0].hasBeenTraveled = true;
  // maze[4][0].event = 'entrance';

  // // // set exit to always be boss room
  // maze[0][4].event = 'bossRoom';
  // maze[0][4].isExit = true;
  // maze[0][4].leftDoor = true;
  console.log(maze);

  return maze;
};

const mazeWalls = (width, height, complexity, density) => {
  // only odd shapes
  shape = [Math.floor(height/2)*2+1, Math.floor(width/2)*2+1];
  // Adjust complexity and density relative to maze size
  complexity = Math.floor(complexity * (5 * shape[0] + shape[1]));
  density = Math.floor(density * (Math.floor(shape[0]/2) * Math.floor(shape[1]/2)));
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
    let x = Math.floor(Math.random()*Math.floor(shape[1]/2))*2;
    let y = Math.floor(Math.random()*Math.floor(shape[0]/2))*2;
    z[y][x] = 1;
    for(let j = 0; j < complexity; j++) {
      let neighbors = [];
      if(x > 1) { neighbors.push([y,x-2]); }
      if(x < shape[1] - 2) { neighbors.push([y,x+2]); }
      if(y > 1) { neighbors.push([y-2,x]); }
      if(y < shape[0] - 2) { neighbors.push([y+2,x]); }
      if(neighbors.length) {
        let rando = Math.floor(Math.random()*(neighbors.length-1));
        let yprime = neighbors[rando][0];
        let xprime = neighbors[rando][1];
        if (z[yprime][xprime] == 0) {
          z[yprime][xprime] = 1;
          z[yprime+Math.floor((y-yprime)/2)][xprime+Math.floor((x-xprime)/2)] = 1;
          x = xprime;
          y = yprime;
        }
      }
    }
  }

  console.log(z);
  return z;
}

generateNewMaze(5, 5, 0.75, 0.75);