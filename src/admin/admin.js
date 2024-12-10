import "./admin.css";
import "../profile/profileManager.js";
import { sidebar } from "./adminFunctions/adminSidebar.js";
import { isAdmin } from "./adminFunctions/checkIfAdmin.js";


(async () => {
  const userIsAdmin = await isAdmin();
})();

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container");
  if (container) {
    container.insertAdjacentHTML("afterbegin", sidebar);
  }

  
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
