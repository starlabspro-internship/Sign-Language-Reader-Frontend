import { updateUserProfile } from "./updateUserProfile.js";
import { deleteAccount } from "../../profile/profileFunctions/deleteAccount.js";
import { handleLogout } from "./handleLogout.js";

export function initializeEventListeners() {
  document
    .getElementById("updateProfileForm")
    .addEventListener("submit", updateUserProfile);
  document
    .getElementById("deleteAccountButton")
    .addEventListener("click", deleteAccount);
  document.getElementById("logoutButton").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("logoutModal").style.display = "flex";
  });
}
