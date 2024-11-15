//import the css
import "../assets/css/auth.css";

import { enforceReloadOnBackNavigation } from "./forceReload.js";
import API_URL from "./profile/apiUrls.js";

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", async () => {
  enforceReloadOnBackNavigation();
  const errorMessage = document.getElementById("login-error-message");

  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "profile.html";
    } else {
      document.getElementById("login-form").style.display = "block";
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    errorMessage.textContent = "An error occurred. Please try again later.";
    errorMessage.style.display = "block";
  }
});

// Login Form
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const useremail = document.getElementById("login-email").value.trim();
    const userpassword = document.getElementById("login-password").value.trim();
    const errorMessage = document.getElementById("login-error-message");

    try {
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useremail, userpassword }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        const userId = result.userId;  

        // Fetch additional user details
        const userDetailsResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
          method: "GET",
          credentials: "include",
        });

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();

          // Check if the user is an admin
          if (userDetails.userIsAdmin) {
            window.location.href = "admin.html"; 
          } else {
            window.location.href = "profile.html"; 
          }
        } else {
          console.error("Failed to fetch user details.");
          errorMessage.textContent = "Failed to fetch user details. Please try again.";
          errorMessage.style.display = "block";
        }
      } else {
        errorMessage.textContent =
          result.message || "Login failed! Please check your credentials.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = "An error occurred. Please try again later.";
      errorMessage.style.display = "block";
      console.error("Login error:", error);
    }
  });

// Sign Up Form
document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const userName = document.getElementById("signup-name").value.trim();
    const userSurname = document.getElementById("signup-surname").value.trim();
    const useremail = document.getElementById("signup-email").value.trim();
    const userpassword = document
      .getElementById("signup-password")
      .value.trim();
    const errorMessage = document.getElementById("signup-error-message");
    const successMessage = document.getElementById("signup-success-message");

    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(userpassword)) {
      errorMessage.textContent =
        "Password must be at least 8 characters long and include at least 1 letter and 1 number.";
      errorMessage.style.display = "block";
      return;
    }

    try {
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.SIGNUP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          userSurname,
          useremail,
          userpassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        successMessage.textContent = "Sign up successful!";
        successMessage.style.display = "block";

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        if (result.msg === "User already exists") {
          errorMessage.textContent =
            "Email already exists. Please use a different email.";
        } else {
          errorMessage.textContent =
            result.message || "Signup failed! Please check your input.";
        }
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent =
        "An error occurred during signup. Please try again later.";
      errorMessage.style.display = "block";
      console.error("Signup error:", error);
    }
  });
