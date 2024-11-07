import { updateUI } from './updateUI.js';
import API_URL from './apiUrls.js';

export async function updateUserProfile(event) {
    event.preventDefault();
    const updateMessage = document.getElementById("update-message");

    let userId;
    try {
        const meResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
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
    const userEmail = document.getElementById("update-userEmail").value.trim(); // useremail
    const userPhone = document.getElementById("update-userPhone").value.trim(); // userphonenum
    const userPassword = document.getElementById("update-userPassword").value.trim();

    const updatedData = { 
        userName, 
        userSurname, 
        useremail: userEmail, // Corrected to match useremail casing
        userphonenum: userPhone // Corrected to match userphonenum casing
    };
    
    if (userPassword) updatedData.userPassword = userPassword;

    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
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
