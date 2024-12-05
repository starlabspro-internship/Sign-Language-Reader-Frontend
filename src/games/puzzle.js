import "./puzzle.css"

const puzzles = [
    "../photos/pz1.jpg",
    "../photos/pz2.jpg",
    "../photos/pz3.jpg",
    "../photos/pz4.jpg",
    "../photos/pz5.jpg",
];

const puzzleBtns = document.querySelectorAll(".puzzle-btn");
const gameArea = document.querySelector(".game-area");
const puzzleSelection = document.querySelector(".puzzle-selection");
const dropZone = document.getElementById("drop-zone");
const puzzlePiecesContainer = document.getElementById("puzzle-pieces");
const puzzleImage = document.getElementById("puzzle-image");
const nextPuzzleBtn = document.getElementById("next-puzzle");
const prevPuzzleBtn = document.getElementById("prev-puzzle");
const movesCounter = document.getElementById("moves-counter");
const puzzleTitle = document.getElementById("puzzle-title");
const fireworksContainer = document.getElementById("fireworks-container");
const progressInfo = document.getElementById("progress-info"); // Progress info element
const resetPuzzleBtn = document.getElementById("reset-puzzle"); // Reset puzzle button

let currentPuzzleIndex;
let moves;
let puzzlesCompleted = 0; // Track the number of completed puzzles

// Event listeners for puzzle selection
puzzleBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentPuzzleIndex = index;
        startPuzzle(index);
    });
});

// Start the puzzle
function startPuzzle(index) {
    moves = 0;
    updateMovesCounter();

    puzzleSelection.classList.add("hidden");
    gameArea.classList.remove("hidden");

    const puzzleImg = puzzles[index];
    puzzleImage.src = puzzleImg;
    puzzleTitle.textContent = `Puzzle ${index + 1}`;

    dropZone.innerHTML = "";
    puzzlePiecesContainer.innerHTML = "";

    const pieces = [];
    for (let i = 0; i < 16; i++) {
        // Create puzzle pieces
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${puzzleImg})`;
        piece.style.backgroundSize = "300px 300px";
        piece.style.backgroundPosition = `${-75 * (i % 4)}px ${-75 * Math.floor(i / 4)}px`;
        piece.draggable = true;
        piece.dataset.position = i;
        pieces.push(piece);

        // Create drop zones
        const dropZoneCell = document.createElement("div");
        dropZoneCell.classList.add("drop-zone-cell");
        dropZoneCell.dataset.position = i;
        dropZoneCell.ondrop = onDrop;
        dropZoneCell.ondragover = (e) => e.preventDefault();
        dropZone.appendChild(dropZoneCell);
    }

    // Shuffle and add pieces to the container
    shuffleArray(pieces);
    pieces.forEach(piece => {
        piece.ondragstart = onDragStart;
        puzzlePiecesContainer.appendChild(piece);
    });
}

// Shuffle pieces
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Handle drag start
function onDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.position);
}

// Handle drop
function onDrop(e) {
    const targetPosition = e.target.dataset.position;
    const draggedPosition = e.dataTransfer.getData("text/plain");

    if (targetPosition === draggedPosition) {
        const piece = document.querySelector(`.puzzle-piece[data-position="${draggedPosition}"]`);
        e.target.style.backgroundImage = piece.style.backgroundImage;
        e.target.style.backgroundSize = piece.style.backgroundSize;
        e.target.style.backgroundPosition = piece.style.backgroundPosition;
        piece.remove();
        e.target.dataset.filled = "true"; // Mark the cell as filled
        moves++;
        updateMovesCounter();
        checkCompletion();
    }
}

// Update moves counter
function updateMovesCounter() {
    movesCounter.textContent = `Moves: ${moves}`;
}

// Check if the puzzle is complete
function checkCompletion() {
    const dropZoneCells = [...dropZone.children];
    const isComplete = dropZoneCells.every(cell => cell.dataset.filled === "true");

    if (isComplete) {
        const congratsMessage = document.querySelector(".congrats-message");
        congratsMessage.classList.remove("hidden");
        nextPuzzleBtn.classList.remove("hidden");

        // Trigger Fireworks
        showFireworks();

        // Increment puzzles completed and update progress
        puzzlesCompleted++;
        updateProgressInfo();
    }
}

// Show Fireworks
function showFireworks() {
    fireworksContainer.classList.remove("hidden");

    // Create multiple fireworks
    for (let i = 0; i < 10; i++) {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${Math.random() * window.innerWidth}px`;
        firework.style.top = `${Math.random() * window.innerHeight}px`;
        fireworksContainer.appendChild(firework);

        // Remove fireworks after animation
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }
}

// Update progress info
function updateProgressInfo() {
    progressInfo.textContent = `Progress: ${puzzlesCompleted}/5 puzzles completed`;
}

// Next puzzle button
nextPuzzleBtn.addEventListener("click", () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
        currentPuzzleIndex++;
        startPuzzle(currentPuzzleIndex);
    }
});

// Previous puzzle button
prevPuzzleBtn.addEventListener("click", () => {
    if (currentPuzzleIndex > 0) {
        currentPuzzleIndex--;
        startPuzzle(currentPuzzleIndex);
    }
});

// Reset puzzle button
resetPuzzleBtn.addEventListener("click", () => {
    startPuzzle(currentPuzzleIndex);
});