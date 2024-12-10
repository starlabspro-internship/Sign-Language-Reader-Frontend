import { updateUserProfile } from "./updateUserProfile.js";
import { deleteAccount } from "../../profile/profileFunctions/deleteAccount.js";

export function initializeEventListeners() {
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", updateUserProfile);
  } else {
    console.error("updateProfileForm element not found");
  }

  const deleteAccountButton = document.getElementById("deleteAccountButton");
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", deleteAccount);
  } else {
    console.error("deleteAccountButton element not found");
  }

}
