document.addEventListener("DOMContentLoaded", function () {
    const signVideo = document.getElementById("sign-video");

    // Function to show video based on button clicked
    function showVideo(number) {
        const videoPath = `photos/numrat/${number}.mp4`;
        const sourceElement = signVideo.querySelector("source");
        sourceElement.src = videoPath;
        signVideo.load();
        signVideo.play();
    }

    const totalButtons = 100; 
    const buttonsPerPage = 15; 
    const totalPages = Math.ceil(totalButtons / buttonsPerPage); 
    let currentPage = 1; 

    // Function to render buttons based on the current page
    function renderButtons() {
        const buttonContainer = document.getElementById("button-container");
        buttonContainer.innerHTML = ""; 

        // Calculate start and end based on current page
        const start = (currentPage - 1) * buttonsPerPage + 1;
        const end = Math.min(currentPage * buttonsPerPage, totalButtons);

        for (let i = start; i <= end; i++) {
            const button = document.createElement("button");
            button.classList.add("button");
            button.setAttribute("data-button", i);
            button.textContent = i;
            button.addEventListener("click", function () {
                showVideo(i);
            });
            buttonContainer.appendChild(button);
        }

        // Automatically click the first button on the current page load
        const firstButton = buttonContainer.querySelector(".button");
        if (firstButton) firstButton.click();
    }

    // Define back and next functions
    function backBtn() {
        if (currentPage > 1) {
            currentPage--;  // Go to the previous page
            renderButtons();
        }
    }

    function nextBtn() {
        if (currentPage < totalPages) {
            currentPage++;  // Go to the next page
            renderButtons();
        }
    }

    // Initial render
    renderButtons();

    // Attach navigation functions to buttons
    window.backBtn = backBtn;
    window.nextBtn = nextBtn;
});



