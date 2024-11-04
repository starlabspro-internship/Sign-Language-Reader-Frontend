import { updateUI } from './updateUI.js';

export async function updateUserProfile(event) {
    event.preventDefault();
    const updateMessage = document.getElementById("update-message");

    let userId;
    try {
        const meResponse = await fetch("https://localhost:5000/api/users/me", {
            method: "GET",
            credentials: "include",
        });

        if (!meResponse.ok) throw new Error("Failed to fetch user ID");
        const meData = await meResponse.json();
        userId = meData.userId;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        updateMessage.textContent = "Error fetching user ID.";
        updateMessage.style.color = "red";
        return;
    }

    const userName = document.getElementById("update-userName").value.trim();
    const userSurname = document.getElementById("update-userSurname").value.trim();
    const userEmail = document.getElementById("update-userEmail").value.trim();
    const userPhone = document.getElementById("update-userPhone").value.trim();
    const userPassword = document.getElementById("update-userPassword").value.trim();

    const updatedData = { 
        userName, 
        userSurname, 
        userEmail, 
        userPhone 
    };
    
    if (userPassword) updatedData.userPassword = userPassword;

    try {
        const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
            credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to update user profile");

        updateMessage.textContent = "Profile updated successfully!";
        updateMessage.style.color = "green";
        updateUI(result);
        
        document.getElementById("update-userName").value = "";
        document.getElementById("update-userSurname").value = "";
        document.getElementById("update-userEmail").value = "";
        document.getElementById("update-userPhone").value = "";
        document.getElementById("update-userPassword").value = "";
        
    } catch (error) {
        updateMessage.textContent = `Error updating profile: ${error.message}`;
        updateMessage.style.color = "red";
        console.error("Error updating profile:", error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("updateButton");
    const updateProfileSection = document.getElementById("updateProfileSection");


    updateButton.addEventListener("click", () => {
        
        if (updateProfileSection.style.display === "none" || updateProfileSection.style.display === "") {
            updateProfileSection.style.display = "block"; 
        } else {
            updateProfileSection.style.display = "none"; 
        }
    });

    // Form submission handling
    const updateProfileForm = document.getElementById("updateProfileForm");
    if (updateProfileForm) {
        updateProfileForm.addEventListener("submit", updateUserProfile);
    }
});
