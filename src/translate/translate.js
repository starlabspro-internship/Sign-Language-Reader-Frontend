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

document.addEventListener("DOMContentLoaded", function () {
    const floatingCam = document.getElementById("floatingCam");
    const resizeHandle = document.getElementById("resizeHandle");
    const toggleCamButton = document.getElementById("toggleFloatingCam");
    const minimizeCamButton = document.getElementById("minimizeCam");
    const video = document.getElementById("mirror-cam");

    let isDragging = false; // Enable dragging
    let isResizing = false; // Enable resizing
    let offsetX, offsetY;
    let initialMouseX, initialMouseY, initialSize;
    let webcamStream = null;

    // Start Webcam Stream
    function startWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                webcamStream = stream;
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch((err) => {
                console.error("Error accessing webcam:", err);
            });
    }

    // Stop Webcam Stream
    function stopWebcam() {
        if (webcamStream) {
            const tracks = webcamStream.getTracks(); // Get all tracks (audio/video)
            tracks.forEach((track) => track.stop()); // Stop each track
            webcamStream = null; // Clear the webcamStream reference
        }
        video.srcObject = null; // Clear the video element's source
    }

    // Toggle Floating Camera Visibility
    toggleCamButton.addEventListener("click", function () {
        if (floatingCam.style.display === "none") {
            floatingCam.style.display = "block";
            toggleCamButton.style.display = "none"; // Hide toggle button
            startWebcam();
        }
    });

    // Minimize Floating Camera (Stop Webcam)
    minimizeCamButton.addEventListener("click", function () {
        floatingCam.style.display = "none"; // Hide the floating camera
        toggleCamButton.style.display = "block"; // Show the toggle button
        stopWebcam(); // Stop the webcam
    });

    // Dragging Functionality
    floatingCam.addEventListener("mousedown", function (e) {
        if (e.target === resizeHandle) return; // Ignore drag if resizing
        isDragging = true;
        offsetX = e.clientX - floatingCam.getBoundingClientRect().left;
        offsetY = e.clientY - floatingCam.getBoundingClientRect().top;

        document.body.style.cursor = "grabbing"; // Change cursor to indicate dragging
    });

    window.addEventListener("mousemove", function (e) {
        if (isDragging) {
            floatingCam.style.left = `${e.clientX - offsetX}px`;
            floatingCam.style.top = `${e.clientY - offsetY}px`;
        }
    });

    window.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = "default"; // Reset cursor
        }
    });

    // Resizing Functionality (Maintain Square Aspect Ratio)
    resizeHandle.addEventListener("mousedown", function (e) {
        isResizing = true;
        initialMouseX = e.clientX;
        initialMouseY = e.clientY;
        initialSize = floatingCam.offsetWidth; // Square, so width = height

        document.body.style.cursor = "nwse-resize";
        e.preventDefault();
    });

    window.addEventListener("mousemove", function (e) {
        if (isResizing) {
            const delta = Math.max(e.clientX - initialMouseX, e.clientY - initialMouseY); // Diagonal resize
            const newSize = initialSize + delta;

            // Enforce minimum size
            if (newSize >= 150) {
                floatingCam.style.width = `${newSize}px`;
                floatingCam.style.height = `${newSize}px`; // Maintain square
            }
        }
    });

    window.addEventListener("mouseup", function () {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = "default"; // Reset cursor
        }
    });

    // Responsive Adjustments for Window Resize
    function adjustFloatingCam() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Ensure the webcam stays within the viewport
        const rect = floatingCam.getBoundingClientRect();
        if (rect.right > screenWidth) {
            floatingCam.style.left = `${screenWidth - rect.width - 10}px`;
        }
        if (rect.bottom > screenHeight) {
            floatingCam.style.top = `${screenHeight - rect.height - 10}px`;
        }
    }

    window.addEventListener("resize", adjustFloatingCam);

    // Ensure Webcam Starts Hidden
    floatingCam.style.display = "none";
});
