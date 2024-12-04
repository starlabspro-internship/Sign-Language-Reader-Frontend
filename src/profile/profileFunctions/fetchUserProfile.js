  import { updateUI } from "./updateUI.js";
  import API_URL from "../../profile/profileFunctions/apiUrls.js";

  export async function fetchUserProfile() {
    try {
      const meResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
      });

      if (!meResponse.ok) {
        window.location.href = "home.html";
        return;
      }

      const meData = await meResponse.json();
      const userId = meData.userId;

      if (!userId) throw new Error("User ID is undefined");

      const userResponse = await fetch(
        `${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-cache",
        }
      );

      if (!userResponse.ok) throw new Error("Failed to fetch user details");

      const user = await userResponse.json();
      if (user.userIsGuest) {
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("deleteAccountButton").style.display = "none";
        document.getElementById("userHistory").style.display = "none";  
        document.getElementById("guestHidden").style.display = "none"; 
        document.getElementById("profile").style.display = "none"; 
        document.getElementById("guest-message").style.display = "block";       
      } 
      
      updateUI(user);

    } catch (error) {
      return;
    }
  }
