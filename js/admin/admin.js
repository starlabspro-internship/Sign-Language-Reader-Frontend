import API_URL from '../profile/apiUrls.js';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
      method: "GET",
      credentials: "include",
    });

    if (!userResponse.ok) {
      console.warn("User is not logged in.");
      window.location.href = "login.html"; 
      return;
    }

    const userData = await userResponse.json();

    const userId = userData.userId;
    if (!userId) {
      console.warn("No user ID found in session data.");
      window.location.href = "profile.html"; 
      return;
    }

    // Fetch full user details to check if they are an admin
    const userDetailsResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "GET",
      credentials: "include",
    });

    if (!userDetailsResponse.ok) {
      console.error("Failed to fetch full user details.");
      window.location.href = "profile.html"; 
      return;
    }

    const userDetails = await userDetailsResponse.json();

    if (!userDetails.userIsAdmin) {
      console.warn("Access denied: User is not an admin.");
      window.location.href = "profile.html"; 
      return;
    }


  } catch (error) {
    console.error("Error checking admin access:", error);
    window.location.href = "profile.html"; 
  }
});
