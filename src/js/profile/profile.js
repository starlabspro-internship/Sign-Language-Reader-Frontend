import "../../assets/css/profile.css";
import { enforceReloadOnBackNavigation } from '../forceReload.js';
import { fetchUserProfile } from './fetchUserProfile.js';
import { initializeEventListeners } from './eventListeners.js';

enforceReloadOnBackNavigation();

document.addEventListener("DOMContentLoaded", () => {
  try {
    fetchUserProfile();
    initializeEventListeners();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
});
