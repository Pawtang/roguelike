

const n = 5;

let maze = [];
// Track the room we're in
// Track what type of rooms we've hit
const roomPercentages = [0.3, 0.3, 0.1, 0.1, 0.2];

for(let i = 0; i < n; i++) {
    maze[i] = [];
    for(let j = 0; j < n; j++) {
        maze[i][j] = {
            leftDoor: false,
            rightDoor: false,
            upDoor: false,
            downDoor: false,
            event: null
        };
    }
}

module.exports = { maze };
