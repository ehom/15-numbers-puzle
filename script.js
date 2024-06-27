document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const emojiSetSelector = document.getElementById('emoji-set-selector');
    const winMessage = document.getElementById('win-message');
    let tiles = [];
    let emptyTileIndex = 15;
    let currentEmojiSet = 'set1';
    let shuffled = false; // Flag to track if the shuffle button was clicked

    const emojiSets = {
        set1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        set2: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏', '🀆', '🀙', '🀚', '🀛', '🀜', '🀝'],
        set3: ["ä", "ḇ", "ḉ", "ḍ", "ȅ", "ƒ", "ǥ", "ⱨ", "ĩ", "Ɉ", "ḵ", "l", "Ṁ", "ṋ", "ö"],
        set4: ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ"],
        set5: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五"],
        set6: ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉", "열", "열하나", "열둘", "열셋", "열넷", "열다섯"],
        set7: ["诶", "比", "西", "迪", "伊", "艾弗", "吉", "艾尺", "艾", "杰", "开", "艾勒", "艾马", "艾娜", "哦"]
    };

    function init() {
        tiles = [...emojiSets[currentEmojiSet]];
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
                if (tile.length === 3) {
                    tileElement.classList.add('small');
                }
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
        shuffleButton.addEventListener('click', () => {
            shufflePuzzle();
            shuffled = true; // Set the flag to true when shuffle button is clicked
        });
        emojiSetSelector.addEventListener('change', (event) => {
            currentEmojiSet = event.target.value;
            shuffled = false; // Reset the flag when the emoji set is changed
            init();
        });
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
        const isWin = tiles.slice(0, 15).every((tile, index) => tile === emojiSets[currentEmojiSet][index]);
        if (isWin && shuffled) {
            winMessage.textContent = 'You Win!';
        } else {
            winMessage.textContent = '';
        }
    }

    init();
});

