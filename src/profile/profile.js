import "./profile.css";
import { enforceReloadOnBackNavigation } from '../js/forceReload.js';
import { fetchUserProfile } from './profileFunctions/fetchUserProfile.js';
import { initializeEventListeners } from './profileFunctions/eventListeners.js';

enforceReloadOnBackNavigation();

document.addEventListener("DOMContentLoaded", () => {
  try {
    fetchUserProfile();
    initializeEventListeners();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
});
