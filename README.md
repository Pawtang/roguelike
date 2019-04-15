# roguelike

Arrow keys to move around
Press Enter to execute selected option

Now hosted at https://musing-bell-a11d8f.netlify.com/

Maze Generation:

index:10
go to generateNewMaze in maze.js. First, a layout is generated with the algorithm in mazeWalls. The layout is then converted to our maze grid, and event, eventHelper, hasBeenTraveled, and roomNumber are added as object properties to the room.

index:11
mazeSetup is on index:468
it randomly picks coordinates and checks to see if there's an event there yet for the entrance, exit, and shops. Then, it iterates through the whole maze and randomly generates events for all of them.