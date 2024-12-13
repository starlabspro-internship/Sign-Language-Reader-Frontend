import "./reset-password.css";
import API_URL from "../profileFunctions/apiUrls";

document.addEventListener("DOMContentLoaded", () => {
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const messageElement = document.getElementById("message");
  const toggleNewPassword = document.getElementById("toggleNewPassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token) {
    messageElement.textContent = "Invalid token.";
    messageElement.style.color = "red";
    return;
  }

  // Toggle password visibility
  toggleNewPassword.addEventListener("click", () => {
    const type = newPasswordInput.type === "password" ? "text" : "password";
    newPasswordInput.type = type;
  });

  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordInput.type === "password" ? "text" : "password";
    confirmPasswordInput.type = type;
  });

  resetPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Password validation: at least 8 characters, and contains at least one number
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      messageElement.textContent =
        "Fjalëkalimi duhet të jetë së paku 8 karaktere i gjatë dhe të përmbajë të paktën një numër!";
      messageElement.style.color = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      messageElement.textContent = "Passwords do not match.";
      messageElement.style.color = "red";
      return;
    }

    try {
      // Send password reset request
      const response = await fetch(
        `${API_URL.BASE}${API_URL.USERS.RESET_PASSWORD(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userpassword: newPassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageElement.textContent = "Password successfully reset.";
        messageElement.style.color = "green";

        setTimeout(() => {
          messageElement.textContent = "Logged in successfully!";
          messageElement.style.color = "green";
          }, 2000);

        // Auto-login after reset
        const loginResponse = await fetch(
          `${API_URL.BASE}${API_URL.USERS.LOGIN}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              useremail: result.email, // Use returned email from reset
              userpassword: newPassword,
            }),
            credentials: "include",
          }
        );

        const loginResult = await loginResponse.json();

        if (loginResponse.ok) {
          setTimeout(() => {
          messageElement.textContent = "Logged in successfully!";
          messageElement.style.color = "green";
          }, 2000);
         

          setTimeout(() => {
            window.location.href = "profile.html"; 
          }, 2000);
        } else {
          messageElement.textContent =
            loginResult.message || "Login after reset failed.";
          messageElement.style.color = "red";
        }
      } else {
        messageElement.textContent =
          result.message || "Password reset failed.";
        messageElement.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      messageElement.textContent =
        "An error occurred. Please try again later.";
      messageElement.style.color = "red";
    }
  });
});
