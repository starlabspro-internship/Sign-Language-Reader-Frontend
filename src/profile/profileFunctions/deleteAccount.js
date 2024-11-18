import { handleLogout } from "./handleLogout.js";
import API_URL from "./apiUrls.js";

const logoutModal = document.getElementById("logoutModal");
const closeButton = document.querySelector(".close-button");
const confirmLogoutButton = document.getElementById("confirmLogoutButton");
const cancelLogoutButton = document.getElementById("cancelLogoutButton");

document.getElementById("logoutButton").addEventListener("click", (event) => {
  event.preventDefault();
  logoutModal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  logoutModal.style.display = "none";
});

cancelLogoutButton.addEventListener("click", () => {
  logoutModal.style.display = "none";
});

export async function deleteAccount() {
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
    return;
  }

  const deleteMessage = document.getElementById("delete-message");

  if (
    !confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  )
    return;

  logoutModal.style.display = "flex";

  confirmLogoutButton.onclick = null;

  confirmLogoutButton.onclick = async () => {
    logoutModal.style.display = "none";

    try {
      const response = await fetch(
        `${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Failed to delete user account"
        );

      deleteMessage.textContent = "Account deleted successfully.";
      deleteMessage.style.color = "green";

      await handleLogout();
    } catch (error) {
      deleteMessage.textContent = `Error deleting account: ${error.message}`;
      deleteMessage.style.color = "red";
      console.error("Error deleting account:", error);
    }
  };
}
