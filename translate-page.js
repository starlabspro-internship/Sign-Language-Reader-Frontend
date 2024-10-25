const sentenceForm = document.getElementById('sentenceForm');
const sentenceInput = document.getElementById('sentenceInput');
const outputDiv = document.getElementById('output');

sentenceForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const sentence = sentenceInput.value;
    const imageURL = getImageURL(sentence);

    if (imageURL) {
        const image = document.createElement('img');
        image.src = imageURL;
        outputDiv.appendChild(image);
    } else {
        outputDiv.textContent = "No image found for that word.";
    }
});