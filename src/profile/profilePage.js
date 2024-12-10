import "./profileManager.js";
import { initializeEventListeners } from "./profileFunctions/eventListeners.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeEventListeners();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
});
