import "./profileManager.js";
import { initializeEventListeners } from "./profileFunctions/eventListeners.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeEventListeners();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
    // Retrieve the answered status from localStorage
    const isAnswered = JSON.parse(localStorage.getItem("isAnswered"));
  
    // Reference the notification badge element
    const notificationBadge = document.getElementById("notificationBadge");
  
    // Check if the badge element exists
    if (!notificationBadge) {
      console.error("Notification badge element not found");
      return;
    }
  
    // Display or hide the badge based on `isAnswered`
    if (isAnswered==null){
      // If the question is not answered, show the badge
      notificationBadge.style.display = "inline-block";
    } else {
      // If the question is answered, hide the badge
      notificationBadge.style.display = "none";
    }
  

    // const savedQuestion = JSON.parse(localStorage.getItem("currentQuestion")); // Retrieve the saved question
    // const lastUpdate = localStorage.getItem("lastUpdate"); // Retrieve the last update timestamp
    // const currentTime = Date.now();
    // console.log('coming hwew')
    // // Check if 24 hours have passed
    // if (savedQuestion && lastUpdate && currentTime - lastUpdate > 24 * 60 * 60 * 1000) {
    //   console.log('coming hwew22  ')

    //   // Retrieve the answered status from localStorage
    //   const isAnswered = JSON.parse(localStorage.getItem("isAnswered"));

    //   // Reference the notification badge element
    //   const notificationBadge = document.getElementById("notificationBadge");

    //   if (!isAnswered) {
    //     // If the question is not answered, show the badge
    //     notificationBadge.style.display = "inline-block";
    //   } else {
    //     // If the question is answered, hide the badge
    //     notificationBadge.style.display = "none";
    //   }
    // }
  });


