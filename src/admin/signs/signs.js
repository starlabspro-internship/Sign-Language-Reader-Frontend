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

// Edit Modal Elements
const editModal = document.getElementById("editModal");
const editNameInput = document.getElementById("editName");
const editFileInput = document.getElementById("editFileInput");
const editSignId = document.getElementById("editSignId");
const editForm = document.getElementById("editForm");

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
                <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i> Përditëso </button>
                <button class="delete-button"><i class="fa-solid fa-trash"></i> Fshi</button>
            </div>
        `;

        const deleteButton = signCard.querySelector(".delete-button");
        const editButton = signCard.querySelector(".edit-button");

        deleteButton.addEventListener("click", () => deleteSign(sign._id));
        editButton.addEventListener("click", () => openEditModal(sign));

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

// Open edit modal
function openEditModal(sign) {
    editNameInput.value = sign.name;
    editSignId.value = sign._id;
    editModal.style.display = "block";
}

// Update sign
async function updateSign(event) {
    event.preventDefault();
    const formData = new FormData(editForm);
    const signId = formData.get("signId");

    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.GET_BY_ID(signId)}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            showSuccess("Sign updated successfully!");  // Show success alert
            editModal.style.display = "none";
            await fetchAndDisplaySigns();  // Refresh the signs list
        } else {
            const errorText = await response.text();
            showError(errorText);
        }
    } catch (error) {
        console.error("Network error:", error);
        showError("Network error occurred.");
    }
}

// Close modal
function closeEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "none";  
  }

  window.closeEditModal = closeEditModal;

  window.addEventListener("click", function(event) {
    const editModal = document.getElementById("editModal");
    if (event.target === editModal) {
      closeEditModal();
    }
  });

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

// Display selected image preview
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
    formData.set("name", formData.get("name").toLowerCase());

    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.SIGNS.BASE_URL}`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            showSuccess("Sign uploaded successfully!");
            signForm.reset();
            await fetchAndDisplaySigns(); 
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

// Show messages
function showError(message) {
    errorMessage.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => errorDiv.style.display = "none", 3000);
}

function showSuccess(message) {
     const notification = document.createElement("div");
    notification.classList.add("notification", "success");

    const p = document.createElement("p");
    p.textContent = message;
    
    notification.appendChild(p);
    document.body.appendChild(notification);

    // Show notification and hide after 3 seconds
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}

// Event listeners
editForm.addEventListener("submit", updateSign);
window.addEventListener("click", (event) => {
    if (event.target === editModal) closeEditModal();
});
searchInput.addEventListener("input", (event) => fetchAndDisplaySigns(1, event.target.value.trim()));

// Initialize
fetchAndDisplaySigns(1);
