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

    // Dynamically generate buttons and set up pagination
    const totalButtons = 100; 
    const buttonsPerPage = 15; 
    const totalPages = Math.ceil(totalButtons / buttonsPerPage); 
    let currentPage = 1; 

    // Function to render buttons based on the current page
    function renderButtons(page) {
        const buttonContainer = document.getElementById("button-container");
        buttonContainer.innerHTML = ""; 
        const start = (page - 1) * buttonsPerPage + 1;
        const end = Math.min(page * buttonsPerPage, totalButtons);

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

        // Programmatically click the first button on initial load
        if (page === 1) {
            const firstButton = buttonContainer.querySelector(".button");
            if (firstButton) firstButton.click();
        }
    }

    // Pagination functions
    function updatePaginationLinks() {
        const paginationLinks = document.getElementById("pagination-links");
        paginationLinks.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("link");
            li.textContent = i;
            li.onclick = () => setPage(i);
            if (i === currentPage) li.classList.add("active");
            paginationLinks.appendChild(li);
        }
    }

    function setPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderButtons(currentPage);
        updatePaginationLinks();
    }

    function backBtn() {
        if (currentPage > 1) setPage(currentPage - 1);
    }

    function nextBtn() {
        if (currentPage < totalPages) setPage(currentPage + 1);
    }

    // Initial render
    renderButtons(currentPage);
    updatePaginationLinks();

    // Attach navigation functions to buttons
    window.backBtn = backBtn;
    window.nextBtn = nextBtn;
});

