export const generateNewMaze = (gridSize, complexity, density) => {

  const layout = mazeWalls(gridSize+2, complexity, density);

  let maze = [];

  for(let i = 0; i < gridSize; i++) {
    maze[i] = [];
    for(let j = 0; j < gridSize; j++) {
      maze[i][j] = {
        event: layout[i+1][j+1] ? 'wall' : null,
        eventHelper: null,
        hasBeenTraveled: false,
        roomNumber: i*gridSize+j,
      };
    }
  }
     
      for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            document.querySelector(".map-grid").insertAdjacentHTML('beforeend','<div class="griditem"></div>');
          };
        }
    
  console.log(maze);

  return maze;
};

const mazeWalls = (size, complexity, density) => {
  // only odd shapes
  const shape = Math.floor(size/2)*2+1;
  // Adjust complexity and density relative to maze size
  complexity = Math.floor(complexity * (5 * shape + shape));
  density = Math.floor(density * (Math.floor(shape/2) * Math.floor(shape/2)));
  // Build actual maze
  let z = []
  for (let h = 0; h < shape; h++){ 
    z[h] = [];
  }
  for (let h = 0; h < shape; h++) {
    for (let w = 0; w < shape; w++) {
      z[h][w] = 0;
    }
  }
  // Fill borders
  for (let w = 0; w < shape; w++) {
    z[0][w] = 1;
    z[shape-1][w] = 1;
  }
  for (let h = 1; h < shape-1; h++) {
    z[h][0] = 1;
    z[h][shape-1] = 1;
  }
  // Make aisles
  for(let i = 0; i < density; i++) {
    let x = Math.floor(Math.random()*Math.floor(shape/2))*2;
    let y = Math.floor(Math.random()*Math.floor(shape/2))*2;
    z[y][x] = 1;
    for(let j = 0; j < complexity; j++) {
      let neighbors = [];
      if(x > 1) { neighbors.push([y,x-2]); }
      if(x < shape - 2) { neighbors.push([y,x+2]); }
      if(y > 1) { neighbors.push([y-2,x]); }
      if(y < shape - 2) { neighbors.push([y+2,x]); }
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
