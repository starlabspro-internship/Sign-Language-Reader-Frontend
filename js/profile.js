// Function to update the UI with user data
function updateUI(user) {
  const defaultMessages = {
      userName: "N/A",
      userSurname: "N/A",
      userEmail: "N/A",
      userPhone: "Not given",
  };

  document.querySelectorAll(".userName").forEach(el => el.textContent = user.userName || defaultMessages.userName);
  document.querySelectorAll(".userSurname").forEach(el => el.textContent = user.userSurname || defaultMessages.userSurname);
  document.querySelectorAll(".userEmail").forEach(el => el.textContent = user.useremail || defaultMessages.userEmail);
  document.querySelectorAll(".userPhone").forEach(el => el.textContent = user.userphonenum || defaultMessages.userPhone);

  document.getElementById("update-userName").value = user.userName || "";
  document.getElementById("update-userSurname").value = user.userSurname || "";
  document.getElementById("update-userEmail").value = user.useremail || "";
  document.getElementById("update-userPhone").value = user.userphonenum || "";
}

// Update profile section visibility
document.getElementById("updateButton").addEventListener("click", () => {
    const updateProfileSection = document.getElementById("updateProfileSection");
  
    if (updateProfileSection.style.display === "none" || updateProfileSection.style.display === "") {
      updateProfileSection.style.display = "block";
      updateProfileSection.classList.add("fade-in");
      updateProfileSection.classList.remove("fade-out");
    } else {
      updateProfileSection.classList.remove("fade-in");
      updateProfileSection.classList.add("fade-out");
  
      // Wait for fade-out animation to complete before hiding
      updateProfileSection.addEventListener("animationend", () => {
        if (updateProfileSection.classList.contains("fade-out")) {
          updateProfileSection.style.display = "none";
        }
      }, { once: true });
    }
  });

// Fetch user profile data
async function fetchUserProfile() {
  try {
      const meResponse = await fetch("https://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
          cache: "no-cache", // Ensure fresh data
      });

      // Check if the response indicates the user is logged out
      if (!meResponse.ok) {
          // User is not logged in, redirect to home page
          window.location.href = "home.html";
          return;
      }

      const meData = await meResponse.json();
      const userId = meData.userId;

      if (!userId) throw new Error("User ID is undefined");

      const userResponse = await fetch(`https://localhost:5000/api/users/${userId}`, {
          method: "GET",
          credentials: "include",
          cache: "no-cache", // Ensure fresh data
      });

      if (!userResponse.ok) throw new Error("Failed to fetch user details");

      const user = await userResponse.json();
      updateUI(user);
  } catch (error) {
      console.error("Error fetching profile:", error);
  }
}

// Update profile function
async function updateUserProfile(event) {
  event.preventDefault();

  const updateMessage = document.getElementById("update-message");

  let userId;
  try {
      const meResponse = await fetch("https://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
      });

      if (!meResponse.ok) throw new Error("Failed to fetch user ID");

      const meData = await meResponse.json();
      userId = meData.userId;
  } catch (error) {
      console.error("Error fetching user ID:", error);
      return;
  }

  const userName = document.getElementById("update-userName").value.trim();
  const userSurname = document.getElementById("update-userSurname").value.trim();
  const userEmail = document.getElementById("update-userEmail").value.trim();
  const userPhone = document.getElementById("update-userPhone").value.trim();
  const userPassword = document.getElementById("update-userPassword").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (userEmail && !emailRegex.test(userEmail)) {
      updateMessage.textContent = "Invalid email format.";
      updateMessage.style.color = "red";
      return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (userPassword && !passwordRegex.test(userPassword)) {
      updateMessage.textContent = "Password must be at least 8 characters long and include at least 1 letter and 1 number.";
      updateMessage.style.color = "red";
      return;
  }

  const updatedData = {
      userName,
      userSurname,
      useremail: userEmail,
      userphonenum: userPhone,
  };

  if (userPassword) updatedData.userpassword = userPassword;

  try {
      const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
          credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to update user profile");

      updateMessage.textContent = "Profile updated successfully!";
      updateMessage.style.color = "green";
      updateUI(result);
  } catch (error) {
      updateMessage.textContent = `Error updating profile: ${error.message}`;
      updateMessage.style.color = "red";
      console.error("Error updating profile:", error);
  }
}

// Logout function
async function handleLogout() {
    try {
        const response = await fetch("https://localhost:5000/api/users/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            window.location.href = "home.html"; // Redirect after logout
        } else {
            throw new Error("Logout failed");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        alert("Logout failed, please try again.");
    }
}

// Modal elements
const logoutModal = document.getElementById("logoutModal");
const closeButton = document.querySelector(".close-button");
const confirmLogoutButton = document.getElementById("confirmLogoutButton");
const cancelLogoutButton = document.getElementById("cancelLogoutButton");

// Show modal on logout button click
document.getElementById("logoutButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action
    logoutModal.style.display = "flex"; // Show the modal
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
    logoutModal.style.display = "none";
});

// Handle logout confirmation
confirmLogoutButton.addEventListener("click", async () => {
    logoutModal.style.display = "none"; // Hide the modal
    await handleLogout(); // Proceed with logout
});

// Cancel logout
cancelLogoutButton.addEventListener("click", () => {
    logoutModal.style.display = "none"; // Hide the modal
});

// Delete account function
async function deleteAccount() {
  let userId;
  try {
      const meResponse = await fetch("https://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
      });

      if (!meResponse.ok) throw new Error("Failed to fetch user ID");

      const meData = await meResponse.json();
      userId = meData.userId;
  } catch (error) {
      console.error("Error fetching user ID:", error);
      return;
  }

  const deleteMessage = document.getElementById("delete-message");

  if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

  try {
      const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
          method: "DELETE",
          credentials: "include",
      });

      if (!response.ok) throw new Error((await response.json()).message || "Failed to delete user account");

      deleteMessage.textContent = "Account deleted successfully.";
      deleteMessage.style.color = "green";

      setTimeout(() => {
          window.location.href = "home.html";
      }, 1000);
  } catch (error) {
      deleteMessage.textContent = `Error deleting account: ${error.message}`;
      deleteMessage.style.color = "red";
      console.error("Error deleting account:", error);
  }
}

// Event listeners for DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  document.getElementById("logoutButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default action
    logoutModal.style.display = "flex"; // Show the modal
});
  document.getElementById("updateProfileForm").addEventListener("submit", updateUserProfile);
  document.getElementById("deleteAccountButton").addEventListener("click", deleteAccount);
});
