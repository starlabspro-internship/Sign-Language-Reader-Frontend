import "../../assets/css/admin/admin.css";
import { sidebar } from './adminSidebar.js';
import { isAdmin } from './checkIfAdmin.js';
import { fetchUserProfile } from '../profile/fetchUserProfile.js';
import { initializeEventListeners } from '../profile/eventListeners.js'; 

// Insert the sidebar after the container element
document.querySelector('.container').insertAdjacentHTML('afterbegin', sidebar);

document.addEventListener("DOMContentLoaded", async () => {
  const userIsAdmin = await isAdmin();

  if (userIsAdmin) {
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  // Call the function to initialize event listeners after DOM content is fully loaded
  initializeEventListeners();
});
