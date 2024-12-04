import "./profile.css";
import { fetchUserProfile } from './profileFunctions/fetchUserProfile.js';
import { initializeEventListeners } from './profileFunctions/eventListeners.js';
// import { enforceReloadOnBackNavigation } from '../js/forceReload.js';

// enforceReloadOnBackNavigation();

document.addEventListener("DOMContentLoaded", () => {
  try {
    fetchUserProfile();
    initializeEventListeners();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
});
