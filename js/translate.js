document.addEventListener("DOMContentLoaded", () => {
    const translateForm = document.querySelector(".translate-form");
    const translateInput = document.getElementById("translateInput");
    const translateButton = document.getElementById("translateButton");
    const clearButton = document.getElementById("clearButton");
    const signsHolder = document.getElementById("translationResults");

    // Event listener for translation form submission
    translateForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        const inputText = translateInput.value.trim();
        if (!inputText) return; // Stop if input is empty

        // Clear previous results
        signsHolder.innerHTML = '';

        try {
            // Fetch translation from the API
            const response = await fetch(`https://localhost:5000/api/signs/translate?phrase=${encodeURIComponent(inputText)}`, {
                credentials: "include" // Include cookies for authentication
            });

            if (response.status === 401) {
                // Show message if user is not authorized
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "You must be logged in in order to make a translation.";
                errorMessage.style.color = "red";
                errorMessage.style.margin = "2em auto";
                signsHolder.appendChild(errorMessage);
                clearButton.style.display = "none";
                return;
            }

            const data = await response.json();

            // Display each translated word or error
            data.translation.forEach((item) => {
                const signCard = document.createElement("div");
                signCard.className = "sign-card";

                if (item.image) {
                    // Create an image element for the sign
                    const img = document.createElement("img");
                    img.src = item.image;
                    img.alt = item.word;
                    signCard.appendChild(img);
                    signCard.innerHTML += `<p>${item.word}</p>`;
                } else {
                    // Display unsupported word placeholder
                    const img = document.createElement("img");
                    img.src = "assets/placeholder-images/question_mark.png";
                    img.alt = "Unsupported word";
                    signCard.appendChild(img);
                    signCard.innerHTML += `<p>Unsupported word - "${item.word}"</p>`;
                }

                signsHolder.appendChild(signCard);
            });

            // Show the Clear button after displaying results
            clearButton.style.display = "inline-block";

        } catch (error) {
            console.error("Error fetching translation:", error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error fetching translation. Please try again.";
            errorMessage.style.color = "red";
            signsHolder.appendChild(errorMessage);
        }
    });

    // Event listener for Clear button
    clearButton.addEventListener("click", () => {
        signsHolder.innerHTML = ''; // Clear previous translations
        translateInput.value = '';  // Clear the input text
        clearButton.style.display = "none"; // Hide the Clear button
    });
});
