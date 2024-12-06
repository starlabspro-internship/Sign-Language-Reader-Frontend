import "./signs.css";
import "../admin.js";
import API_URL from "../../profile/profileFunctions/apiUrls.js";


// Get references to elements
const signHolder = document.querySelector(".sign-holder"); 
const signImageLabel = document.querySelector(".sign-image");
const fileInput = document.getElementById("fileInput");
const spinnerContainer = document.getElementById("spinnerContainer");
const submitButton = document.querySelector(".create-sign-button");
const signForm = document.getElementById("signForm");
const errorDiv = document.querySelector(".error-div");
const errorMessage = document.getElementById("errorMessage");
const paginationHolder = document.querySelector(".pagination-holder");
const searchInput = document.getElementById("searchInput");

const itemsPerPage = 9;  

// Fetch and display signs with optional search query
async function fetchAndDisplaySigns(page = 1, searchQuery = "") {
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.BASE_URL}`);
        if (response.ok) {
            const signs = await response.json();
            const filteredSigns = searchQuery
                ? signs.filter(sign => sign.name.toLowerCase().includes(searchQuery.toLowerCase()))
                : signs;
            renderSigns(filteredSigns, page);
        } else {
            console.error("Failed to fetch signs");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

// Render signs in the sign-holder div
function renderSigns(signs, page = 1) {
    signHolder.innerHTML = ""; 
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedSigns = signs.slice(startIndex, startIndex + itemsPerPage);

    paginatedSigns.forEach(sign => {
        const signCard = document.createElement("div");
        signCard.classList.add("sign-card");

        signCard.innerHTML = `
            <img src="${sign.signImage}" alt="${sign.name}">
            <p>${sign.name}</p> 
            <div class="s-buttons">
                <button>Delete Sign</button>
            </div>
        `;

        const deleteButton = signCard.querySelector("button");
        deleteButton.addEventListener("click", () => deleteSign(sign._id));

        signHolder.appendChild(signCard);
    });

    renderPagination(signs.length, page); 
}

// Render pagination buttons
function renderPagination(totalItems, currentPage = 1) {
    paginationHolder.innerHTML = ""; 
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxButtons = 5; 
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
    // Previous Button
    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.innerHTML = '<i class="fa-regular fa-hand-point-left"></i>';
        prevButton.classList.add("pagination-button");
        prevButton.addEventListener("click", () => {
            fetchAndDisplaySigns(currentPage - 1);
        });
        paginationHolder.appendChild(prevButton);
    }
  
    // Page Buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("pagination-button");
        if (i === currentPage) pageButton.classList.add("active");
  
        pageButton.addEventListener("click", () => {
            fetchAndDisplaySigns(i);
        });
  
        paginationHolder.appendChild(pageButton);
    }
  
    // Next Button
    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.innerHTML = '<i class="fa-regular fa-hand-point-right"></i>';
        nextButton.classList.add("pagination-button");
        nextButton.addEventListener("click", () => {
            fetchAndDisplaySigns(currentPage + 1);
        });
        paginationHolder.appendChild(nextButton);
    }
}

// Delete a sign
async function deleteSign(signId) {
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.GET_BY_ID(signId)}`, {
            method: "DELETE",
        });

        if (response.ok) {
            showSuccess("Sign deleted successfully!");
            await fetchAndDisplaySigns(); 
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
        signImageLabel.style.backgroundImage = 'url("../assets/placeholder-images/upload.png")';
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
        const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.BASE_URL}`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            showSuccess("Sign uploaded successfully!");
            signForm.reset();
            signImageLabel.style.backgroundImage = 'url("../assets/placeholder-images/upload.png")';
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

// Event listener for search input
searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value.trim();
    fetchAndDisplaySigns(1, searchQuery);
});

// Initialize by fetching and displaying signs
fetchAndDisplaySigns(1);
