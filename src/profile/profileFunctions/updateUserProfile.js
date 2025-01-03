import { updateUI } from "./updateUI.js";
import API_URL from "./apiUrls.js";

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
  const userEmail = document.getElementById("update-userEmail").value.trim();
  const userPhone = document.getElementById("update-userPhone").value.trim();
  const userpassword = document.getElementById("update-userPassword").value.trim();
  const userpicture = document.querySelector('input[type="file"]').files[0];

  // Create FormData to include both file and JSON data
  const formData = new FormData();
  formData.append("userName", userName);
  formData.append("userSurname", userSurname);
  formData.append("useremail", userEmail);
  formData.append("userphonenum", userPhone);
  if (userpassword) formData.append("userpassword", userpassword);
  if (userpicture) formData.append("userpicture", userpicture);

  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "PUT",
      body: formData, // Use FormData as the body
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to update user profile");

    updateMessage.textContent = "Profile updated successfully!";
    updateMessage.style.color = "green";
    updateUI(result);
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
    if (
      updateProfileSection.style.display === "none" ||
      updateProfileSection.style.display === ""
    ) {
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