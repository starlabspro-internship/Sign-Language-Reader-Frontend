// Get references to elements
const signHolder = document.querySelector(".sign-holder"); // Container for sign cards
const signImageLabel = document.querySelector(".sign-image");
const fileInput = document.getElementById("fileInput");
const spinnerContainer = document.getElementById("spinnerContainer");
const submitButton = document.querySelector(".create-sign-button");
const signForm = document.getElementById("signForm");
const errorDiv = document.querySelector(".error-div");
const errorMessage = document.getElementById("errorMessage");

// Fetch and display signs
async function fetchAndDisplaySigns() {
    try {
        const response = await fetch("https://localhost:5000/api/signs");
        if (response.ok) {
            const signs = await response.json();
            renderSigns(signs);
        } else {
            console.error("Failed to fetch signs");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

// Render signs in the sign-holder div
function renderSigns(signs) {
    signHolder.innerHTML = ""; // Clear existing content

    signs.forEach(sign => {
        const signCard = document.createElement("div");
        signCard.classList.add("sign-card");

        signCard.innerHTML = `
            <img src="${sign.signImage}" alt="${sign.name}">
            <p>${sign.name}</p> 
            <div class="s-buttons">
                <button>Delete Sign</button>
            </div>
        `;

        // Add the delete event listener to the button
        const deleteButton = signCard.querySelector("button");
        deleteButton.addEventListener("click", () => deleteSign(sign._id));

        signHolder.appendChild(signCard);
    });
}


// Delete a sign
async function deleteSign(signId) {
    try {
        const response = await fetch(`https://localhost:5000/api/signs/${signId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            showSuccess("Sign deleted successfully!");
            await fetchAndDisplaySigns(); // Refetch signs to update list
        } else {
            const errorText = await response.text();
            showError(errorText);
        }
    } catch (error) {
        console.error("Network error:", error);
        showError("Network error occurred.");
    }
}

// Toggle loading state
function toggleLoadingState(isLoading) {
    if (isLoading) {
        spinnerContainer?.classList.remove("hidden");
        submitButton.disabled = true;
    } else {
        spinnerContainer?.classList.add("hidden");
        submitButton.disabled = false;
    }
}

// Display selected image
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        signImageLabel.style.backgroundImage = `url(${imageUrl})`;
        signImageLabel.style.backgroundSize = "cover";
        signImageLabel.style.backgroundPosition = "center";
    } else {
        signImageLabel.style.backgroundImage = 'url("../assets/placeholder-images/insert.png")';
        signImageLabel.style.backgroundSize = "50%";
    }
});

// Handle form submission
signForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    toggleLoadingState(true);

    const formData = new FormData(signForm);
    
    // Convert the name field to lowercase
    const name = formData.get("name");
    if (name) {
        formData.set("name", name.toLowerCase());
    }

    errorDiv.style.display = "none";
    errorMessage.textContent = "";

    try {
        const response = await fetch("https://localhost:5000/api/signs", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            showSuccess("Sign uploaded successfully!");
            signForm.reset();
            signImageLabel.style.backgroundImage = 'url("../assets/placeholder-images/insert.png")';
            await fetchAndDisplaySigns(); // Refetch signs to update list
        } else {
            const errorText = await response.text();
            showError(errorText);
        }
    } catch (error) {
        console.error("Network error:", error);
        showError("Network error occurred.");
    } finally {
        toggleLoadingState(false);
    }
});

// Show error
function showError(message) {
    errorMessage.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 3000);
}

// Show success message
function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.padding = "10px";
    errorMessage.style.borderRadius = "12px";
    errorMessage.style.color = "green";
    errorMessage.style.backgroundColor = "lightGreen";
    errorDiv.style.display = "block";
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 3000);
}

// Initialize by fetching and displaying signs
fetchAndDisplaySigns();
