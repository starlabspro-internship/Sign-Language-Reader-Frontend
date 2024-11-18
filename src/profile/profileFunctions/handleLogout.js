import API_URL from "../../profile/profileFunctions/apiUrls.js";

document.addEventListener("DOMContentLoaded", () => {
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

// Logout function
export async function handleLogout() {
  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.LOGOUT}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "home.html";
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed, please try again.");
  }
}
