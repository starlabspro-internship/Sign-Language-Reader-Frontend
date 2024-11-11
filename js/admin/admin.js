import '../app.js'
import { isAdmin } from './checkIfAdmin.js';
import { fetchUserProfile } from '../profile/fetchUserProfile.js';
import { sidebar } from './adminSidebar.js';

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
});
