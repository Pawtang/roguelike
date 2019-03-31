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
            event: "idk"
        };
    }
}

for(let i = 0; i < n; i++) {
    console.log(maze[i]);
}

const player = {
    health: 100,
    attack: 100,
    defense: 100,
    gold: 0,
    xp: 0,
    xpToNextLevel: 0,
    level: 0,
    currentRoomNumber: 20,
    xpToNextLevelGenerator: function (level) {
        return 0;
    }
}

const monsters = [];
monsters.push({
    name: "Ryan",
    health: 100,
    attack: 100,
    defense: 100,
    level: 100,
    xpGiven: 0,
    goldGiven: 10000
});

function monster_generator() {

}
