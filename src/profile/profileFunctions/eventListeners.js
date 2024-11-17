import { updateUserProfile } from "./updateUserProfile.js";
import { deleteAccount } from "../../profile/profileFunctions/deleteAccount.js";
import { handleLogout } from "./handleLogout.js";

export function initializeEventListeners() {
  // Check if the updateProfileForm exists before adding an event listener
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", updateUserProfile);
  } else {
    console.error("updateProfileForm element not found");
  }

  // Check if the deleteAccountButton exists before adding an event listener
  const deleteAccountButton = document.getElementById("deleteAccountButton");
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", deleteAccount);
  } else {
    console.error("deleteAccountButton element not found");
  }

  // Check if the logoutButton exists before adding an event listener
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
}
