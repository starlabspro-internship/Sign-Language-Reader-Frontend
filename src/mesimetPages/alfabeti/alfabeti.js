import "./alfabeti.css";

// Use require.context to dynamically import images
const images = require.context('../../photos/shkronjat', false, /\.(jpg|jpeg|png|gif)$/);

// Array of letters, including single letters and letter combinations
const letters = ["A", "B", "C", "Ç", "D", "DH", "E", "Ë", "F", "G", "GJ", "H", "I", "J", "K", "L", "LL", "M", "N", "NJ", "O", "P", "Q", "R", "RR", "S", "SH", "T", "TH", "U", "V", "X", "XH", "Y", "Z", "ZH"];
const alphabetContainer = document.getElementById('alphabet');

// Map each letter to the corresponding image
const letterImages = {};
letters.forEach(letter => {
  const imageNameBase = letter.toLowerCase(); // Base name for the image
  const possibleExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  possibleExtensions.forEach(ext => {
    const imagePath = `./${imageNameBase}.${ext}`;
    if (images.keys().includes(imagePath)) {
      letterImages[letter] = images(imagePath); // Store the correct image path
    }
  });
});

// Create buttons for each letter
letters.forEach(letter => {
  const button = document.createElement('button');
  button.textContent = letter;
  button.onclick = () => {
    setActiveButton(button); // Darken the clicked button
    showLetter(letter);
  };
  alphabetContainer.appendChild(button);
});

// Function to set the active button style
function setActiveButton(activeButton) {
  // Remove 'active' class from all buttons
  document.querySelectorAll('#alphabet button').forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  activeButton.classList.add('active');
}

// Function to display the image for a given letter or combination
function showLetter(letter) {
  const imageElement = document.getElementById('letterImage');
  const descriptionElement = document.getElementById('letterDescription');

  // Check if the image exists for the given letter
  if (letterImages[letter]) {
    imageElement.src = letterImages[letter];
    descriptionElement.textContent = `Kjo është shenja për shkronjën ${letter}.`;
    imageElement.style.display = 'block';
    descriptionElement.style.display = 'block';
  } else {
    // Handle case when image is not found
    imageElement.style.display = 'none';
    descriptionElement.style.display = 'none';
  }
}
