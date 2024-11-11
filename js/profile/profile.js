import { enforceReloadOnBackNavigation } from '../forceReload.js';
import { fetchUserProfile } from './fetchUserProfile.js';
import { initializeEventListeners } from './eventListeners.js';

enforceReloadOnBackNavigation();
document.addEventListener("DOMContentLoaded", () => {
    fetchUserProfile();
    initializeEventListeners();
});
