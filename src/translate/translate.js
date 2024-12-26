import "./translate.css";
import placeholderImage from '../assets/placeholder-images/notFound.png';
import API_URL from "../profile/profileFunctions/apiUrls";

document.addEventListener("DOMContentLoaded", () => {
    const translateForm = document.querySelector(".translate-form");
    const translateInput = document.getElementById("translateInput");
    const translateButton = document.getElementById("translateButton");
    const clearButton = document.getElementById("clearButton");
    const signsHolder = document.getElementById("translationResults");

    // Dictionary for single-word corrections
    const corrections = {
        "pershendetje": "përshëndetje",
        "miredita": "mirëdita",
        "faleminderit": "faleminderit",
        "une": "unë",
        "te": "të", // Correct "te" to "të"
        "per": "për",
        "nje": "një",
        "kater": "katër",
        "pese": "pesë",
        "gjashte": "gjashtë",
        "shtate": "shtatë",
        "tete": "tete",
        "nente": "nënte",
        "dhjete": "dhjetë"
    };

    // Multi-word expressions mapping and corrections
    const multiWordCorrections = {
        "te lutem": "të lutem",
        "per pak" : "për pak",
        "vjen nje dite" : "vjen_një_dite",
        "te befte mire" : "te_beftë_mirë",
        "nuk ia var" : "nuk_ia_var",
        "nuk ia ve veshin" : "nuk_ia_ve_veshin",
        "gjysme i shurdher" : "gjysme_i_shurdher",
        "gjysme e shurdher" : "gjysme_e_shurdher",
        "me shume" : "me_shumë",
        "i ri" : "i_ri"
    };

    const multiWordExpressions = {
        "të lutem": "te_lutem", // Backend key for "të lutem"
        "faleminderit shumë": "faleminderit_shume",
        "për pak" : "për_pak",
        "i pari" : "i_pari",
        "e para" : "e_para",
        "i pamundur" : "i_pamundur",
        "e pamundur" : "e_pamundur",
        "e shtrenjte" : "e_shtrenjte",
        "i shtrenjte" : "i_shtrenjte",
        "e merzitur"  : "e_merzitur",
        "i merzitur" : "i_merzitur",
        "i bezdisshm" : "i_bezdisshm",
        "e bezdisshme" : "e_bezdisshme", 
        "i preferuar" : "i_preferuar",
        "e preferuar" : "e_preferuar",
        "i trash" : "i_trash",
        "e trash" : "e_trash",
        "me shume" : "me_shume",
        "kurban bajrami" : "kurban_bajrami"
    };

    // Normalize the input text by replacing multi-word expressions and correcting misspellings
    function normalizeInput(input) {
        let normalizedInput = input.toLowerCase().trim();

        // Correct multi-word phrases first
        for (const [expression, corrected] of Object.entries(multiWordCorrections)) {
            const regex = new RegExp(`\\b${expression}\\b`, "gi");
            normalizedInput = normalizedInput.replace(regex, corrected);
        }

        // Correct single words after multi-word corrections
        const words = normalizedInput.split(/\s+/);
        const correctedWords = words.map(word => findClosestWord(word, corrections));
        normalizedInput = correctedWords.join(" ");

        // Replace corrected multi-word expressions with backend keys
        for (const [expression, backendKey] of Object.entries(multiWordExpressions)) {
            const regex = new RegExp(`\\b${expression}\\b`, "gi");
            normalizedInput = normalizedInput.replace(regex, backendKey);
        }

        return normalizedInput;
    }

    // Levenshtein distance function for spell-checking
    function levenshteinDistance(a, b) {
        const matrix = Array.from({ length: a.length + 1 }, () =>
            Array(b.length + 1).fill(0)
        );

        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // Deletion
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        return matrix[a.length][b.length];
    }

    function findClosestWord(input, dictionary) {
        const exactMatches = ["e", "i", "para", "dhe", "unë", "është"]; // Words that shouldn't be corrected
        if (exactMatches.includes(input.toLowerCase())) {
            return input; // Return the word unchanged
        }
    
        let closestMatch = null;
        let minDistance = Infinity;
    
        for (const word of Object.keys(dictionary)) {
            const distance = levenshteinDistance(input.toLowerCase(), word.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                closestMatch = word;
            }
        }
    
        // Only correct if the distance is 1 or 2 and the word is not an exact match
        if (minDistance > 1) {
            return input; // Ignore correction if the match is too distant
        }
    
        return dictionary[closestMatch] || input;
    }
    

    translateForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let inputText = translateInput.value.trim();
        if (!inputText) return;

        // Normalize the input text
        const originalInput = inputText; // Save the original input for display
        inputText = normalizeInput(inputText);

        signsHolder.innerHTML = ''; // Clear previous results

        try {
            // Fetch translation from the API
            const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.TRANSLATE(inputText)}`, {
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

                    // Replace underscores with spaces for display
                    const formattedWord = item.word.replace(/_/g, " ").replace("te", "të"); // Ensure "te" is corrected to "të"
                    signCard.innerHTML += `<p>${formattedWord}</p>`;
                } else {
                    const img = document.createElement("img");
                    img.src = `${placeholderImage}`;
                    img.alt = "Unsupported word";
                    signCard.appendChild(img);

                    // Replace underscores with spaces for error display
                    const formattedWord = item.word.replace(/_/g, " ").replace("te", "të"); // Ensure "te" is corrected to "të"
                    signCard.innerHTML += `<p>"${formattedWord}" <br> nuk u gjet</p>`;
                }

                signsHolder.appendChild(signCard);
            });

            checkOverflow();

            // Capitalize the first letter of the first image's caption
            const firstImageCaption = signsHolder.querySelector('.sign-card p');
            if (firstImageCaption) {
                firstImageCaption.style.textTransform = 'capitalize';
            }

            clearButton.style.display = "inline-block"; // Show the Clear button

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
            scrollLeftButton.style.display = "flex";
            scrollRightButton.style.display = "flex";
        } else {
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

    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY, initialMouseX, initialMouseY, initialSize;
    let webcamStream = null;

  
    // Start Webcam Stream
    function startWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                webcamStream = stream;
                video.srcObject = stream;
                video.onloadedmetadata = () => video.play();
            })
            .catch((err) => {
                console.error("Error accessing webcam:", err);
                alert("Could not access your webcam. Please check permissions.");
            });
    }

    // Stop Webcam Stream
    function stopWebcam() {
        if (webcamStream) {
            const tracks = webcamStream.getTracks();
            tracks.forEach((track) => track.stop());
            webcamStream = null;
        }
        video.srcObject = null;
    }

    // Toggle Floating Camera Visibility
    toggleCamButton.addEventListener("click", function () {
        floatingCam.style.display = "block";
        toggleCamButton.style.display = "none"; // Hide toggle button
        startWebcam();
    });

    // Minimize Floating Camera
    minimizeCamButton.addEventListener("click", function () {
        floatingCam.style.display = "none";
        toggleCamButton.style.display = "block"; // Show toggle button
        stopWebcam();
    });

    // Dragging Functionality
    function startDrag(e) {
        if (e.target === resizeHandle) return; // Ignore drag if resizing
        isDragging = true;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        offsetX = clientX - floatingCam.getBoundingClientRect().left;
        offsetY = clientY - floatingCam.getBoundingClientRect().top;

        document.body.style.cursor = "grabbing";
    }

    function drag(e) {
        if (isDragging) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const newX = clientX - offsetX;
            const newY = clientY - offsetY;

            // Ensure the webcam stays within the viewport
            const rect = floatingCam.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;

            floatingCam.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
            floatingCam.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
        }
    }

    function stopDrag() {
        isDragging = false;
        document.body.style.cursor = "default";
    }

    // Resizing Functionality
    function startResize(e) {
        isResizing = true;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        initialMouseX = clientX;
        initialMouseY = clientY;
        initialSize = floatingCam.offsetWidth;

        document.body.style.cursor = "nwse-resize";
        e.preventDefault();
    }

    function resize(e) {
        if (isResizing) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const delta = Math.max(clientX - initialMouseX, clientY - initialMouseY);
            const newSize = initialSize + delta;

            const maxSize = Math.min(window.innerWidth, window.innerHeight);

            if (newSize >= 150 && newSize <= maxSize) {
                floatingCam.style.width = `${newSize}px`;
                floatingCam.style.height = `${newSize}px`;
            }
        }
    }

    function stopResize() {
        isResizing = false;
        document.body.style.cursor = "default";
    }

    // Ensure the webcam stays within the viewport on resize
    function adjustFloatingCam() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const rect = floatingCam.getBoundingClientRect();
        if (rect.right > screenWidth) {
            floatingCam.style.left = `${screenWidth - rect.width - 10}px`;
        }
        if (rect.bottom > screenHeight) {
            floatingCam.style.top = `${screenHeight - rect.height - 10}px`;
        }
    }

    window.addEventListener("resize", adjustFloatingCam);

    // Attach event listeners for dragging
    floatingCam.addEventListener("mousedown", startDrag);
    floatingCam.addEventListener("touchstart", startDrag);

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    // Attach event listeners for resizing
    resizeHandle.addEventListener("mousedown", startResize);
    resizeHandle.addEventListener("touchstart", startResize);

    window.addEventListener("mousemove", resize);
    window.addEventListener("touchmove", resize);

    window.addEventListener("mouseup", stopResize);
    window.addEventListener("touchend", stopResize);

    

    // Ensure Webcam Starts Hidden
    floatingCam.style.display = "none";
});

document.addEventListener("DOMContentLoaded", async () => {
    const toggleCamButton = document.getElementById("toggleFloatingCam");

    async function checkLoginStatus() {
        try {
            const response = await fetch('https://localhost:5000/api/users/me', { credentials: 'include' });
            if (response.status === 401) {
                console.log("User is not logged in");
                toggleCamButton.style.display = "none"; // Hide the button
            } else {
                console.log("User is logged in");
                toggleCamButton.style.display = "block"; // Show the button
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            toggleCamButton.style.display = "none"; // Hide the button on error
        }
    }
    
    // Call this function on page load
    checkLoginStatus();
});

