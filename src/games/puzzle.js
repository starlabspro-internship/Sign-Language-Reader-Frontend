import './puzzle.css'
const puzzles = [
    "../photos/pz1.jpg",
    "../photos/pz2.jpg",
    "../photos/pz3.jpg",
    "../photos/pz4.jpg",
    "../photos/pz55.jpg",
    
  ];
  
  const puzzleBtns = document.querySelectorAll(".puzzle-btn");
  const gameArea = document.querySelector(".game-area");
  const puzzleSelection = document.querySelector(".puzzle-selection");
  const dropZone = document.getElementById("drop-zone");
  const puzzlePiecesContainer = document.getElementById("puzzle-pieces");
  const puzzleImage = document.getElementById("puzzle-image");
  const nextPuzzleBtn = document.getElementById("next-puzzle");
  const puzzleTitle = document.getElementById("puzzle-title");
  
  let currentPuzzleIndex;
  
  // Event listeners for puzzle selection
  puzzleBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentPuzzleIndex = index;
      startPuzzle(index);
    });
  });
  
  // Start the puzzle
  function startPuzzle(index) {
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
      checkCompletion();
    }
  }
  
  // Check if the puzzle is complete
  function checkCompletion() {
    const dropZoneCells = [...dropZone.children];
    const isComplete = dropZoneCells.every(cell => cell.dataset.filled === "true");
  
    if (isComplete) {
      const congratsMessage = document.createElement("div");
      congratsMessage.classList.add("congrats-message");
      congratsMessage.textContent = "Congrats! You have completed the puzzle!";
      gameArea.appendChild(congratsMessage);
      nextPuzzleBtn.classList.remove("hidden");
    }
  }
  
  // Event listener for next puzzle
  nextPuzzleBtn.addEventListener("click", () => {
    nextPuzzleBtn.classList.add("hidden");
    puzzleSelection.classList.remove("hidden");
    gameArea.classList.add("hidden");
    const congratsMessage = document.querySelector(".congrats-message");
    if (congratsMessage) congratsMessage.remove();
  });
  