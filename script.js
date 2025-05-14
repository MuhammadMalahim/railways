const difficultyButtons = document.querySelectorAll('.difficulty');
const rulesButton = document.querySelector("#rules-button");
const backButton = document.querySelector("#back-button");
const backButton2 = document.querySelector("#back-button-2");
const gameButton = document.querySelector("#game-button");
const mainMenu = document.querySelector("#main-menu");
const rulesSection = document.querySelector("#rules");
const gameSection = document.querySelector("#start-game");
const gameBoard = document.querySelector("#game-table")
const nameInput = document.querySelector("#menu-name-input");
const messageDiv = document.querySelector("#message");
const playerName = document.querySelector('#player-name');
const timeCounter = document.querySelector('#time-counter');
const winMessage = document.querySelector('#win-message');
const leaderButton = document.querySelector('#leader-board-button');
const backButton3 = document.querySelector('#back-button-3');
const leaderDiv = document.querySelector('#leader-board-div');
const leaderReset = document.querySelector('#reset-leader-board');
const leaderDiv2 = document.querySelector('#leader-board-button-2-div');
const leaderButton2 = document.querySelector('#leader-board-button-2');

let selectedDifficulty;
let timerInterval;
let minutes;
let seconds;
let elapsedTime = 0;


class Tile {
    constructor(name, src, alignment = 1) {
        this.name = name;
        this.src = src;
        this.alignment = alignment;
    }
}

const tiles = {
    bridge_rail_1: new Tile("bridge_rail", "assets/tiles/bridge_rail.png", 1),
    bridge_rail_2: new Tile("bridge_rail", "assets/tiles/bridge_rail.png", 2),
    bridge_1: new Tile("bridge", "assets/tiles/bridge.png", 1),
    bridge_2: new Tile("bridge", "assets/tiles/bridge.png", 2),
    curve_rail_1: new Tile("curve_rail", "assets/tiles/curve_rail.png", 1),
    curve_rail_2: new Tile("curve_rail", "assets/tiles/curve_rail.png", 2),
    curve_rail_3: new Tile("curve_rail", "assets/tiles/curve_rail.png", 3),
    curve_rail_4: new Tile("curve_rail", "assets/tiles/curve_rail.png", 4),
    empty: new Tile("empty", "assets/tiles/empty.png", 0),
    mountain_rail_1: new Tile("mountain_rail", "assets/tiles/mountain_rail.png", 1),
    mountain_rail_2: new Tile("mountain_rail", "assets/tiles/mountain_rail.png", 2),
    mountain_rail_3: new Tile("mountain_rail", "assets/tiles/mountain_rail.png", 3),
    mountain_rail_4: new Tile("mountain_rail", "assets/tiles/mountain_rail.png", 4),
    mountain_1: new Tile("mountain", "assets/tiles/mountain.png", 1),
    mountain_2: new Tile("mountain", "assets/tiles/mountain.png", 2),
    mountain_3: new Tile("mountain", "assets/tiles/mountain.png", 3),
    mountain_4: new Tile("mountain", "assets/tiles/mountain.png", 4),
    oasis: new Tile("oasis", "assets/tiles/oasis.png", 0),
    straight_rail1: new Tile("straight_rail", "assets/tiles/straight_rail.png", 1),
    straight_rail2: new Tile("straight_rail", "assets/tiles/straight_rail.png", 2)
}

const level_e1 = [
    [tiles.empty, tiles.mountain_3, tiles.empty, tiles.empty, tiles.oasis],
    [tiles.empty, tiles.empty, tiles.empty, tiles.bridge_1, tiles.oasis],
    [tiles.bridge_1, tiles.empty, tiles.mountain_4, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.oasis, tiles.empty],
    [tiles.empty, tiles.empty, tiles.mountain_1, tiles.empty, tiles.empty]
]
const level_e2 = [
    [tiles.oasis, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty],
    [tiles.empty, tiles.mountain_4, tiles.empty, tiles.empty, tiles.mountain_4],
    [tiles.bridge_1, tiles.oasis, tiles.mountain_1, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.oasis, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty]
]
const level_e3 = [
    [tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.bridge_1],
    [tiles.empty, tiles.mountain_4, tiles.bridge_1, tiles.empty, tiles.empty],
    [tiles.empty, tiles.oasis, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty, tiles.mountain_4]
]
const level_e4 = [
    [tiles.empty, tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.mountain_3, tiles.empty, tiles.mountain_3],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.oasis, tiles.mountain_1, tiles.empty]
]
const level_e5 = [
    [tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty],
    [tiles.empty, tiles.mountain_2, tiles.empty, tiles.empty, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.empty, tiles.mountain_1, tiles.empty],
    [tiles.empty, tiles.empty, tiles.bridge_1, tiles.oasis, tiles.empty],
    [tiles.empty, tiles.mountain_4, tiles.empty, tiles.empty, tiles.empty]
]
const easy_levels = [level_e1, level_e2, level_e3, level_e4, level_e5]

const level_d1 = [
    [tiles.empty, tiles.mountain_3, tiles.oasis, tiles.oasis, tiles.empty, tiles.bridge_2, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.bridge_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.mountain_1, tiles.empty, tiles.empty, tiles.empty],
    [tiles.mountain_1, tiles.empty, tiles.mountain_3, tiles.empty, tiles.bridge_2, tiles.empty, tiles.oasis],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty, tiles.empty]
]
const level_d2 = [
    [tiles.empty, tiles.empty, tiles.oasis, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty, tiles.mountain_4, tiles.empty],
    [tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty, tiles.empty, tiles.bridge_1],
    [tiles.mountain_2, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.oasis, tiles.empty, tiles.mountain_3, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.mountain_2, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.oasis, tiles.empty, tiles.empty, tiles.empty, tiles.empty]
]
const level_d3 = [
    [tiles.empty, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.bridge_1],
    [tiles.oasis, tiles.empty, tiles.mountain_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.oasis, tiles.mountain_1, tiles.empty, tiles.bridge_2, tiles.empty, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.mountain_3, tiles.empty],
    [tiles.empty, tiles.empty, tiles.oasis, tiles.mountain_1, tiles.empty, tiles.empty, tiles.empty]
]
const level_d4 = [
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.bridge_1, tiles.empty, tiles.mountain_4, tiles.empty],
    [tiles.empty, tiles.empty, tiles.mountain_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.bridge_2, tiles.empty, tiles.oasis, tiles.empty, tiles.bridge_2, tiles.empty],
    [tiles.empty, tiles.empty, tiles.mountain_4, tiles.empty, tiles.mountain_3, tiles.empty, tiles.empty],
    [tiles.bridge_1, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.mountain_1, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty]
]
const level_d5 = [
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.mountain_2, tiles.empty],
    [tiles.empty, tiles.bridge_2, tiles.bridge_2, tiles.empty, tiles.mountain_3, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.oasis, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.mountain_2, tiles.empty, tiles.oasis, tiles.empty, tiles.empty],
    [tiles.empty, tiles.mountain_4, tiles.empty, tiles.bridge_1, tiles.empty, tiles.empty, tiles.empty],
    [tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty, tiles.empty]
]
const difficult_levels = [level_d1, level_d2, level_d3, level_d4, level_d5]

function playGame(levelDifficulty) {
    gameBoard.addEventListener("click", leftClickListener);
    gameBoard.addEventListener("contextmenu", rightClickListener);
    playerName.innerHTML = nameInput.value;
    winMessage.textContent = ''
    const levels = levelDifficulty === 5 ? easy_levels : difficult_levels;
    const num = Math.floor(Math.random() * levels.length);
    const randomLevel = levels[num];
    gameBoard.innerHTML = '';
    randomLevel.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach((tile) => {
            const cellElement = document.createElement('td');
            const imgElement = document.createElement('img');
            imgElement.src = tile.src;
            imgElement.alt = tile.alignment == 0 ? tile.name : tile.name + '_' + tile.alignment;
            if (tile.alignment != 0) imgElement.style.transform = `rotate(${(tile.alignment - 1) * 90}deg)`;
            cellElement.appendChild(imgElement);
            rowElement.appendChild(cellElement);
        });
        gameBoard.appendChild(rowElement);
    });
}

function getAngleNumber(imgElement) {
    let rotationAngle = parseInt(imgElement.style.transform.replace(/[^0-9]/g, '')) || 0;
    return (rotationAngle / 90) + 1;
}

function leftClickListener(e) {
    const imgElement = e.target.closest('img');
    if (!imgElement) return; // Ignore clicks outside images
    const tileAlt = imgElement.alt;

    if (e.button === 0) {
        if (tileAlt === 'empty') {
            imgElement.src = tiles.curve_rail_1.src;
            imgElement.alt = 'curve_rail_1';
        } else if (tileAlt.includes('straight_rail')) {
            imgElement.style.transform = '';
            imgElement.src = tiles.curve_rail_1.src;
            imgElement.alt = 'curve_rail_1';
        } else if (tileAlt.includes('curve_rail')) {
            imgElement.style.transform = '';
            imgElement.src = tiles.straight_rail1.src;
            imgElement.alt = 'straight_rail_1';
        }
        else if (tileAlt.includes('bridge') && !tileAlt.includes('rail')) {
            imgElement.src = tileAlt === 'bridge_1' ? tiles.bridge_rail_1.src : tiles.bridge_rail_2.src;
            imgElement.alt = tileAlt === 'bridge_1' ? 'bridge_rail_1' : 'bridge_rail_2';
        }
        else if (tileAlt.includes('mountain') && !tileAlt.includes('rail')) {
            num = getAngleNumber(imgElement);
            imgElement.src = tiles.mountain_rail_1.src;
            imgElement.alt = 'mountain_rail_' + num;
        }
    }
    checkEnd();
}
function rightClickListener(e) {
    e.preventDefault();
    const imgElement = e.target.closest('img');
    if (!imgElement) return;
    if (imgElement.alt.includes('straight_rail') || imgElement.alt.includes('curve_rail')) {
        const currentRotation = parseInt(imgElement.style.transform.replace(/[^0-9]/g, '')) || 0;
        const newRotation = (currentRotation + 90) % 360;
        imgElement.style.transform = `rotate(${newRotation}deg)`;
        imgElement.alt = imgElement.alt.includes('straight_rail')
            ? imgElement.alt.slice(0, -1) + ((newRotation / 90 + 1) % 2 === 0 ? 2 : 1)
            : imgElement.alt.slice(0, -1) + (newRotation / 90 + 1);

    }
    checkEnd();
}

function checkEnd() {
    let isGameEnd = true;

    const rows = gameBoard.querySelectorAll("tr");
    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, colIndex) => {
            const imgElement = cell.querySelector("img");
            if (!imgElement) return;
            if (imgElement.alt !== "oasis" && !imgElement.alt.includes("rail")) {
                isGameEnd = false;
                return;
            }
            const neighbors = {
                top: rows[rowIndex - 1]?.querySelectorAll("td")[colIndex]?.querySelector("img"),
                bottom: rows[rowIndex + 1]?.querySelectorAll("td")[colIndex]?.querySelector("img"),
                left: cells[colIndex - 1]?.querySelector("img"),
                right: cells[colIndex + 1]?.querySelector("img")
            };
            if (imgElement.alt.includes("straight_rail")) {
                if (imgElement.alt === "straight_rail_1") {
                    if (neighbors.top && ["straight_rail_2", "curve_rail_1", "curve_rail_4"].some(invalid => neighbors.top.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.bottom && ["straight_rail_2", "curve_rail_2", "curve_rail_3"].some(valid => neighbors.bottom.alt.includes(valid))) {
                        isGameEnd = false;
                    }
                } else if (imgElement.alt === "straight_rail_2") {
                    if (neighbors.left && ["straight_rail_1", "curve_rail_3", "curve_rail_4"].some(invalid => neighbors.left.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.right && ["straight_rail_1", "curve_rail_1", "curve_rail_2"].some(valid => neighbors.right.alt.includes(valid))) {
                        isGameEnd = false;
                    }
                }
            } else if (imgElement.alt.includes("curve_rail")) {
                if (imgElement.alt === "curve_rail_1") {
                    if (neighbors.top && ["straight_rail_2", "curve_rail_1", "curve_rail_4"].some(invalid => neighbors.top.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.right && ["straight_rail_1", "curve_rail_1", "curve_rail_2"].some(invalid => neighbors.right.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                } else if (imgElement.alt === "curve_rail_2") {
                    if (neighbors.right && ["straight_rail_1", "curve_rail_1", "curve_rail_2"].some(invalid => neighbors.right.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.bottom && ["straight_rail_2", "curve_rail_2", "curve_rail_3"].some(invalid => neighbors.bottom.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                } else if (imgElement.alt === "curve_rail_3") {
                    if (neighbors.bottom && ["straight_rail_2", "curve_rail_2", "curve_rail_3"].some(invalid => neighbors.bottom.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.left && ["straight_rail_1", "curve_rail_3", "curve_rail_4"].some(invalid => neighbors.left.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                } else if (imgElement.alt === "curve_rail_4") {
                    if (neighbors.left && ["straight_rail_1", "curve_rail_3", "curve_rail_4"].some(invalid => neighbors.left.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                    if (neighbors.top && ["straight_rail_2", "curve_rail_1", "curve_rail_4"].some(invalid => neighbors.top.alt.includes(invalid))) {
                        isGameEnd = false;
                    }
                }
            }
        });
    });

    if (isGameEnd) {
        stopTimer();
        winMessage.textContent = `Congratulations! Game Completed in ${minutes}min:${seconds}secs!`;
        saveGameResult(`${nameInput.value}`, `${minutes}min:${seconds}secs`, selectedDifficulty.id === "easy-button" ? "Easy" : "Difficult");
        gameBoard.removeEventListener("click", leftClickListener);
        gameBoard.removeEventListener("contextmenu", rightClickListener);
        leaderDiv2.style.display = "block";
    }
}

function saveGameResult(playerName, time, difficulty) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let gameResult = {
        playerName: playerName,
        time: time,
        difficulty: difficulty
    };
    leaderboard.push(gameResult);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function generateLeaderboardTable() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.sort((a, b) => {
        let [aMinutes, aSeconds] = a.time.split(":").map(Number);
        let [bMinutes, bSeconds] = b.time.split(":").map(Number);
        return aMinutes * 60 + aSeconds - (bMinutes * 60 + bSeconds);
    });

    let table = document.querySelector('#leader-board-table');
    table.innerHTML = `
        <tr>
            <th>Player</th>
            <th>Time</th>
            <th>Difficulty</th>
        </tr>
    `;

    leaderboard.forEach(entry => {
        let row = table.insertRow();
        let playerCell = row.insertCell(0);
        let timeCell = row.insertCell(1);
        let difficultyCell = row.insertCell(2);

        playerCell.textContent = entry.playerName;
        timeCell.textContent = entry.time;
        difficultyCell.textContent = entry.difficulty;
    });
}

function startTimer() {
    elapsedTime = 0;
    updateTimeDisplay();
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimeDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimeDisplay() {
    minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    seconds = (elapsedTime % 60).toString().padStart(2, '0');
    timeCounter.textContent = `${minutes}:${seconds}`;
}

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

rulesButton.addEventListener("click", () => {
    mainMenu.style.display = "none";
    rulesSection.style.display = "block";
});

backButton.addEventListener("click", () => {
    rulesSection.style.display = "none";
    mainMenu.style.display = "block";
});

backButton2.addEventListener("click", () => {
    gameSection.style.display = "none";
    mainMenu.style.display = "block";
    stopTimer();
});

backButton3.addEventListener("click", () => {
    leaderDiv.style.display = "none";
    mainMenu.style.display = "block";
});

leaderButton.addEventListener("click", () => {
    mainMenu.style.display = "none";
    leaderDiv.style.display = "block";
    generateLeaderboardTable();
});

leaderButton2.addEventListener("click", () => {
    gameSection.style.display = "none";
    leaderDiv.style.display = "block";
    generateLeaderboardTable();
});

leaderReset.addEventListener("click", () => {
    localStorage.clear();
    generateLeaderboardTable();
});

gameButton.addEventListener("click", () => {
    const playerName = nameInput.value.trim();
    selectedDifficulty = Array.from(difficultyButtons).find(button => button.classList.contains("selected"));
    messageDiv.textContent = "";
    if (!playerName) {
        messageDiv.textContent = "Please enter your name.";
        messageDiv.style.color = "red";
        return;
    }
    if (!selectedDifficulty) {
        messageDiv.textContent = "Please select a difficulty level.";
        messageDiv.style.color = "red";
        return;;
    }
    mainMenu.style.display = "none";
    gameSection.style.display = "flex";
    const style = document.createElement('style');
    if (selectedDifficulty.id === "easy-button") {
        style.innerHTML = `img { width: 100px; height: auto; display: block; }`;
        playGame(5);
    } else {
        style.innerHTML = `img { width: 60px; height: auto; display: block; }`;
        playGame(7);
    }
    document.head.appendChild(style);
    startTimer();
});
