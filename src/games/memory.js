import "./memory.css"

const gameBoard = document.querySelector('.game-board');
const startButton = document.getElementById('startButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const moveCountDisplay = document.getElementById('moveCount');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');
const quizIntro = document.querySelector('.quiz-intro');

let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let timerInterval;
let seconds = 0;
let minutes = 0;
let currentLevel = 1;
let totalPairs = 4;

const images = [
    '../photos/a.png',
    '../photos/about.jpg',
    '../photos/alfabet.jpg',
    '../photos/shkronjat/a.jpg',
    '../photos/shkronjat/z.jpg',
    '../photos/shkronjat/g.jpg',
    '../photos/right.jpg',
    '../photos/photo.jpg',
    '../photos/photo5.jpg',
    '../photos/photo6.jpg',
];

// Event listener for Start button
startButton.addEventListener('click', () => {
    if (quizIntro) {
        quizIntro.style.display = 'none';
    }

    levelDisplay.style.display = 'block';
    document.getElementById('moveCountText').style.display = 'block';
    document.getElementById('timerText').style.display = 'block';

    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    resetGame();
});

// Event listener for Reset button
resetButton.addEventListener('click', () => {
    resetGame();
    message.textContent = "Game has been reset!";
    setTimeout(() => {
        message.textContent = "";
    }, 2000);
});

// Event listener for Next Level button
nextLevelButton.addEventListener('click', () => {
    if (currentLevel < 3) {
        currentLevel++;
        totalPairs += 2; // Increase pairs for the next level
        levelDisplay.textContent = `Level: ${currentLevel}`;
        nextLevelButton.style.display = 'none';
        resetGame();
    }
});

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Reset the game state
function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    moveCount = 0;
    seconds = 0;
    minutes = 0;

    moveCountDisplay.textContent = moveCount;
    timerDisplay.textContent = "00:00";

    document.getElementById('moveCountText').style.display = 'block';
    document.getElementById('timerText').style.display = 'block';

    message.textContent = "";
    stopTimer();
    createGameGrid();
    startTimer();
}

// Create a dynamic game grid with images
function createGameGrid() {
    gameBoard.innerHTML = "";
    const cardValues = [];
    const selectedImages = images.slice(0, totalPairs);

    selectedImages.forEach(image => {
        cardValues.push(image, image);
    });

    const shuffledValues = cardValues.sort(() => Math.random() - 0.5);
    const gridSize = Math.ceil(Math.sqrt(totalPairs * 2));
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.card = value;

        const cardFront = document.createElement('img');
        cardFront.src = value;
        cardFront.alt = "Card Image";
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Handle card clicks
function handleCardClick() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    moveCount++;
    moveCountDisplay.textContent = moveCount;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedPairs++;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        flippedCards = [];

        if (matchedPairs === totalPairs) {
            stopTimer();

            if (currentLevel === 3) {
                const gameContainer = document.querySelector('.game-container');
                if (gameContainer) {
                    gameContainer.remove();
                }

                const congratsDiv = document.createElement('div');
                congratsDiv.classList.add('congrats-message');
                congratsDiv.innerHTML = `
                    <h1>Urime! Ju keni fituar!</h1>
                   
                    <button onclick="window.location.href='games.html'">Kthehu tek Lojërat</button>
                `;
                document.body.appendChild(congratsDiv);
            } else {
                message.textContent = "Level Complete!";
                nextLevelButton.style.display = "inline-block";
            }
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}
