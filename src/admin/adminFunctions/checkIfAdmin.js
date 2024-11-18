// checkAdmin.js
import API_URL from "../../profile/profileFunctions/apiUrls.js";

export async function isAdmin() {
  try {
    const userResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
      method: "GET",
      credentials: "include",
    });

    if (!userResponse.ok) {
      console.warn("User is not logged in.");
      window.location.href = "auth.html";
      return false;
    }

    const userData = await userResponse.json();
    const userId = userData.userId;

    if (!userId) {
      console.warn("No user ID found in session data.");
      window.location.href = "profile.html";
      return false;
    }

    const userDetailsResponse = await fetch(
      `${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!userDetailsResponse.ok) {
      console.error("Failed to fetch full user details.");
      window.location.href = "profile.html";
      return false;
    }

    const userDetails = await userDetailsResponse.json();
    const isAdminUser = userDetails.userIsAdmin;

    if (!isAdminUser) {
      console.warn("Access denied: User is not an admin.");
      window.location.href = "profile.html";
      return false;
    }

    return true; // User is an admin
  } catch (error) {
    console.error("Error checking admin access:", error);
    window.location.href = "profile.html";
    return false;
  }
}
