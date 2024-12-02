//import the css
import "./auth.css";

import { enforceReloadOnBackNavigation } from "../js/forceReload.js";
import API_URL from '../profile/profileFunctions/apiUrls.js';

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
    const userpassword = document.getElementById("signup-password").value.trim();
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
      // Sign-Up Request
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

        // Auto-login after sign-up
        const loginResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.LOGIN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail, userpassword }),
          credentials: "include", // Important for session cookies
        });

        const loginResult = await loginResponse.json();

        if (loginResponse.ok) {
          // Redirect based on user type
          const userDetailsResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
            method: "GET",
            credentials: "include",
          });

          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();

            if (userDetails.userIsAdmin) {
              window.location.href = "admin.html";
            } else {
              window.location.href = "profile.html";
            }
          } else {
            throw new Error("Failed to fetch user details after login.");
          }
        } else {
          console.error("Auto-login failed:", loginResult.message || "Unknown error");
          errorMessage.textContent = "Sign-up was successful, but login failed. Please log in manually.";
          errorMessage.style.display = "block";
        }
      } else {
        errorMessage.textContent =
          result.msg === "User already exists"
            ? "Email already exists. Please use a different email."
            : result.message || "Signup failed! Please check your input.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent =
        "An error occurred during signup. Please try again later.";
      errorMessage.style.display = "block";
      console.error("Signup error:", error);
    }
  });


/* Guest Login Logic */
  document.getElementById("guest-login-button").addEventListener("click", async () => {
    const errorMessage = document.getElementById("login-error-message");
  
    try {
      // Send login request as the guest account (without the password field)
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GUEST_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure credentials are sent for cookie storage
        body: JSON.stringify({
          useremail: "guest@example.com", // Only the email is sent, password is handled on the server
        }),
      });
  
      console.log("Guest login response:", response); // Debugging line
  
      if (response.ok) {
        const result = await response.json();
        console.log("Guest login successful:", result);
  
        // Redirect to the profile page or appropriate page for the guest
        window.location.href = "profile.html";
      } else {
        const result = await response.json();
        console.error("Guest login failed:", result); // Debugging line
        errorMessage.textContent = result.message || "Guest login failed!";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Guest login error:", error);
      errorMessage.textContent = "An error occurred. Please try again later.";
      errorMessage.style.display = "block";
    }
  });
  
  
  
  