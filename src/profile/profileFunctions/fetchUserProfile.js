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
    updateUI(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
