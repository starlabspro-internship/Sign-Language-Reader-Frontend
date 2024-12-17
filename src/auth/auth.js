import "./auth.css";
// import { enforceReloadOnBackNavigation } from "../js/forceReload.js";
import API_URL from "../profile/profileFunctions/apiUrls.js";

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", async () => {
  // enforceReloadOnBackNavigation();
  const errorMessage = document.getElementById("login-error-message");

  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const userDetails = await response.json();
      if (userDetails.userIsAdmin) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "profile.html";
      }
    } else {
      document.getElementById("login-form").style.display = "block";
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    errorMessage.textContent = "An error occurred. Please try again later.";
    errorMessage.style.display = "block";
  }

  // Forgot Password Functionality
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");
  const closeButton = document.querySelector(".close-button");
  const sendResetEmailButton = document.getElementById("sendResetEmailButton");
  const cancelResetButton = document.getElementById("cancelResetButton");
  const resetMessage = document.getElementById("reset-message");

  let cooldownActive = false;

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    forgotPasswordModal.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none";
    resetMessage.textContent = "";
  });

  cancelResetButton.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none";
    resetMessage.textContent = "";
  });

  // Send Reset Email Button Logic
  sendResetEmailButton.addEventListener("click", async () => {
    if (cooldownActive) {
      resetMessage.textContent = "Please wait before trying again.";
      resetMessage.style.color = "red";
      return;
    }
  
    const resetEmail = document.getElementById("resetEmail").value.trim();
  
    if (!resetEmail) {
      resetMessage.textContent = "Please enter a valid email address.";
      return;
    }
  
    // Disable the button and show loading state
    sendResetEmailButton.disabled = true;
    sendResetEmailButton.classList.add("disabled");
    sendResetEmailButton.textContent = "Sending...";
  
    try {
      const response = await fetch(
        `${API_URL.BASE}${API_URL.USERS.RESET_PASSWORD_REQUEST}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail: resetEmail }),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        resetMessage.style.color = "green";
        resetMessage.textContent =
          "Password reset instructions have been sent.";
  
        const cooldownEnd = new Date(result.cooldownEnd); 
        const currentTime = new Date();
  
        if (cooldownEnd > currentTime) {
          cooldownActive = true;
          const remainingTime = cooldownEnd - currentTime;
          setTimeout(() => {
            cooldownActive = false;
            sendResetEmailButton.disabled = false; 
            sendResetEmailButton.classList.remove("disabled"); 
            sendResetEmailButton.textContent = "Send Reset Email"; 
          }, remainingTime); 
        }
      } else {
        resetMessage.style.color = "red";
        resetMessage.textContent = result.message || "Reset request failed.";
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      resetMessage.textContent = "An error occurred. Please try again later.";
    } finally {
      if (!cooldownActive) {
        sendResetEmailButton.disabled = false;
        sendResetEmailButton.textContent = "Send Reset Email";
        sendResetEmailButton.classList.remove("disabled");
      }
    }
  });
  
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
        const userDetailsResponse = await fetch(
          `${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

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
          errorMessage.textContent =
            "Failed to fetch user details. Please try again.";
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
        const loginResponse = await fetch(
          `${API_URL.BASE}${API_URL.USERS.LOGIN}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ useremail, userpassword }),
            credentials: "include",
          }
        );

        const loginResult = await loginResponse.json();

        if (loginResponse.ok) {
          const userDetailsResponse = await fetch(
            `${API_URL.BASE}${API_URL.USERS.ME}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

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
          console.error(
            "Auto-login failed:",
            loginResult.message || "Unknown error"
          );
          errorMessage.textContent =
            "Sign-up was successful, but login failed. Please log in manually.";
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

// Guest Login Logic
document
  .getElementById("guest-login-button")
  .addEventListener("click", async () => {
    const errorMessage = document.getElementById("login-error-message");

    try {
      const response = await fetch(
        `${API_URL.BASE}${API_URL.USERS.GUEST_LOGIN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            useremail: "guest@example.com",
          }),
        }
      );

      if (response.ok) {
        window.location.href = "profile.html";
      } else {
        const result = await response.json();
        errorMessage.textContent = result.message || "Guest login failed!";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Guest login error:", error);
      errorMessage.textContent = "An error occurred. Please try again later.";
      errorMessage.style.display = "block";
    }
  });
