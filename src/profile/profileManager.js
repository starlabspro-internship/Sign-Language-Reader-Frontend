import "./profile.css";
import { fetchUserProfile } from "./profileFunctions/fetchUserProfile.js";
import { handleLogout } from "./profileFunctions/handleLogout.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    fetchUserProfile();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      const logoutModal = document.getElementById("logoutModal");
      if (logoutModal) {
        logoutModal.style.display = "flex";
      } else {
        console.error("logoutModal element not found");
      }
    });
  } else {
    console.error("logoutButton element not found");
  }
});
