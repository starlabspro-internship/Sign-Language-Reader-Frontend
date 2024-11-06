// Array of letters, including single letters and letter combinations
const letters = ["A", "B", "C", "Ç", "D", "DH", "E", "Ë", "F", "G", "GJ","H", "I", "J", "K", "L", "LL", "M", "N", "NJ", "O", "P", "Q", "R", "RR", "S", "SH", "T", "TH", "U", "V", "X", "XH", "Y", "Z", "ZH"];
const extensions = ['jpg', 'png', 'gif', 'jpeg'];
const alphabetContainer = document.getElementById('alphabet');

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
    let imageFound = false;

    // Loop through each extension to find the correct image
    for (let ext of extensions) {
        const imgPath = `photos/shkronjat/${letter}.${ext}`;        const img = new Image();
        img.src = imgPath;

        img.onload = function() {
            imageElement.src = imgPath;
            descriptionElement.textContent = `Kjo është shenja për shkronjën ${letter}.`;
            imageElement.style.display = 'block';
            descriptionElement.style.display = 'block';
            imageFound = true;
        };

        if (imageFound) break;
    }
}

function navigateTo(page) {
    window.location.href = page;
}




