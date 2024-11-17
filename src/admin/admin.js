import "./admin.css";
import { sidebar } from './adminFunctions/adminSidebar.js';
import { isAdmin } from './adminFunctions/checkIfAdmin.js';
import { fetchUserProfile } from '../profile/profileFunctions/fetchUserProfile.js';
import { handleLogout } from "../profile/profileFunctions/handleLogout.js";
// import { initializeEventListeners } from "../profile/profileFunctions/eventListeners.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Insert the sidebar after the container element when the DOM is fully loaded
  const container = document.querySelector('.container');
  if (container) {
    container.insertAdjacentHTML('afterbegin', sidebar);
  }

  // Check if the user is an admin before fetching their profile
  const userIsAdmin = await isAdmin();

  if (userIsAdmin) {
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  // Initialize logout modal functionality
  const logoutModal = document.getElementById("logoutModal");
  const closeButton = document.querySelector(".close-button");
  const confirmLogoutButton = document.getElementById("confirmLogoutButton");
  const cancelLogoutButton = document.getElementById("cancelLogoutButton");
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logoutModal.style.display = "flex";
    });
  } else {
    console.error("Logout button not found in the DOM.");
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      logoutModal.style.display = "none";
    });
  } else {
    console.error("Close button not found in the DOM.");
  }

  if (confirmLogoutButton) {
    confirmLogoutButton.addEventListener("click", async () => {
      logoutModal.style.display = "none";
      await handleLogout();
    });
  } else {
    console.error("Confirm logout button not found in the DOM.");
  }

  if (cancelLogoutButton) {
    cancelLogoutButton.addEventListener("click", () => {
      logoutModal.style.display = "none";
    });
  } else {
    console.error("Cancel logout button not found in the DOM.");
  }
});
