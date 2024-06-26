document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const winMessage = document.getElementById('win-message');
    let tiles = [];
    let emptyTileIndex = 15;

    function init() {
        tiles = [...Array(15).keys()].map(n => n + 1);
        tiles.push(null); // Represents the empty space
        renderPuzzle();
        addEventListeners();
    }

    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            if (tile !== null) {
                tileElement.textContent = tile;
                tileElement.dataset.index = index;
            } else {
                tileElement.classList.add('empty');
                emptyTileIndex = index;
            }
            puzzleContainer.appendChild(tileElement);
        });
    }

    function addEventListeners() {
        puzzleContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('tile') && !event.target.classList.contains('empty')) {
                moveTile(parseInt(event.target.dataset.index));
            }
        });
        shuffleButton.addEventListener('click', shufflePuzzle);
    }

    function moveTile(index) {
        const validMoves = [
            emptyTileIndex - 1, // Left
            emptyTileIndex + 1, // Right
            emptyTileIndex - 4, // Up
            emptyTileIndex + 4  // Down
        ];
        if (validMoves.includes(index)) {
            [tiles[emptyTileIndex], tiles[index]] = [tiles[index], tiles[emptyTileIndex]];
            renderPuzzle();
            checkWin();
        }
    }

    function shufflePuzzle() {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        renderPuzzle();
        winMessage.textContent = '';
    }

    function checkWin() {
        const isWin = tiles.slice(0, 15).every((tile, index) => tile === index + 1);
        if (isWin) {
            winMessage.textContent = 'You Win!';
        } else {
            winMessage.textContent = '';
        }
    }

    init();
});

