import "./translate.css";
import placeholderImage from '../assets/placeholder-images/notFound.png';

document.addEventListener("DOMContentLoaded", () => {
    const translateForm = document.querySelector(".translate-form");
    const translateInput = document.getElementById("translateInput");
    const translateButton = document.getElementById("translateButton");
    const clearButton = document.getElementById("clearButton");
    const signsHolder = document.getElementById("translationResults");

    // Handle form submission
    translateForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputText = translateInput.value.trim();
        if (!inputText) return;

        signsHolder.innerHTML = ''; // Clear previous results

        try {
            // Fetch translation from the API
            const response = await fetch(`https://localhost:5000/api/signs/translate?phrase=${encodeURIComponent(inputText)}`, {
                credentials: "include"
            });

            if (response.status === 401) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "You must be logged in in order to make a translation.";
                errorMessage.style.color = "red";
                errorMessage.style.margin = "2em auto";
                signsHolder.appendChild(errorMessage);
                clearButton.style.display = "none";
                return;
            }

            const data = await response.json();

            // Display each translated word or an error
            data.translation.forEach((item) => {
                const signCard = document.createElement("div");
                signCard.className = "sign-card";

                if (item.image) {
                    const img = document.createElement("img");
                    img.src = item.image;
                    img.alt = item.word;
                    signCard.appendChild(img);
                    signCard.innerHTML += `<p>${item.word}</p>`;
                } else {
                    const img = document.createElement("img");
                    img.src = `${placeholderImage}`;
                    img.alt = "Unsupported word";
                    signCard.appendChild(img);
                    signCard.innerHTML += `<p>"${item.word}" <br> nuk u gjet</p>`;
                }

                signsHolder.appendChild(signCard);
            });

            // Capitalize the first letter of the first image's caption
            const firstImageCaption = signsHolder.querySelector('.sign-card p');
            if (firstImageCaption) {
                firstImageCaption.style.textTransform = 'capitalize';
            }

            clearButton.style.display = "inline-block"; // Show the Clear button

            // After the content is loaded, check if scroll buttons should be visible
            checkOverflow();
        } catch (error) {
            console.error("Error fetching translation:", error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error fetching translation. Please try again.";
            errorMessage.style.color = "red";
            signsHolder.appendChild(errorMessage);
        }
    });

    // Handle Clear button click
    clearButton.addEventListener("click", () => {
        signsHolder.innerHTML = '';
        translateInput.value = '';
        clearButton.style.display = "none";
    });

    // Function to check overflow and toggle the visibility of scroll buttons
    function checkOverflow() {
        const scrollLeftButton = document.querySelector(".scroll-btn-left");
        const scrollRightButton = document.querySelector(".scroll-btn-right");

        if (signsHolder.scrollWidth > signsHolder.clientWidth) {
            // Show scroll buttons if the content overflows
            scrollLeftButton.style.display = "flex";
            scrollRightButton.style.display = "flex";
        } else {
            // Hide scroll buttons if the content doesn't overflow
            scrollLeftButton.style.display = "none";
            scrollRightButton.style.display = "none";
        }
    }

    // Check overflow after page load
    checkOverflow();

    // Also check for overflow when the window is resized
    window.addEventListener("resize", checkOverflow);

    // Scroll left and right buttons functionality
    const scrollLeftButton = document.querySelector(".scroll-btn-left");
    const scrollRightButton = document.querySelector(".scroll-btn-right");

    if (scrollLeftButton && scrollRightButton) {
        scrollLeftButton.addEventListener('click', () => {
            signsHolder.scrollBy({ left: -200, behavior: 'smooth' });
        });

        scrollRightButton.addEventListener('click', () => {
            signsHolder.scrollBy({ left: 200, behavior: 'smooth' });
        });
    } else {
        console.error("Scroll buttons not found in the DOM. Ensure the HTML structure includes the buttons.");
    }
});
