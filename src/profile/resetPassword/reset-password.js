import "./reset-password.css";
import API_URL from "../profileFunctions/apiUrls";

document.addEventListener('DOMContentLoaded', () => {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const messageElement = document.getElementById('message');

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    messageElement.textContent = "Invalid token.";
    messageElement.style.color = "red";
    return;
  }

  resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (newPassword !== confirmPassword) {
      messageElement.textContent = "Passwords do not match.";
      messageElement.style.color = "red";
      return;
    }

    try {
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.RESET_PASSWORD(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userpassword: newPassword }),  // Sends the new password
      });

      const result = await response.json();

      if (response.ok) {
        messageElement.textContent = "Password successfully reset.";
        messageElement.style.color = "green";
        
        setTimeout(() => {
          window.location.href = 'auth.html';
        }, 2000); 

      } else {
        messageElement.textContent = result.message || "Password reset failed.";
        messageElement.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      messageElement.textContent = "An error occurred. Please try again later.";
      messageElement.style.color = "red";
    }
  });
});
