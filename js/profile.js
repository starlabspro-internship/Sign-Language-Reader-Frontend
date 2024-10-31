function updateUI(user) {
  document
    .querySelectorAll(".userName")
    .forEach((el) => (el.textContent = user.userName || "N/A"));
  document
    .querySelectorAll(".userSurname")
    .forEach((el) => (el.textContent = user.userSurname || "N/A"));
  document
    .querySelectorAll(".userEmail")
    .forEach((el) => (el.textContent = user.useremail || "N/A"));
  document
    .querySelectorAll(".userPhone")
    .forEach((el) => (el.textContent = user.userphonenum || "Not given"));

  document.getElementById("update-userName").value = user.userName || "";
  document.getElementById("update-userSurname").value = user.userSurname || "";
  document.getElementById("update-userEmail").value = user.useremail || "";
  document.getElementById("update-userPhone").value = user.userphonenum || "";
}

// Update profile section visibility
document.getElementById("updateButton").addEventListener("click", function () {
  const updateProfileSection = document.getElementById("updateProfileSection");
  updateProfileSection.style.display =
    updateProfileSection.style.display === "none" ? "block" : "none";
});

// Fetch user data
async function fetchUserProfile() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("User ID is not set. Please log in first.");
    return;
  }

  try {
    const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const user = await response.json();
    updateUI(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

//Update Profile Function
async function updateUserProfile(event) {
  event.preventDefault();

  const userId = localStorage.getItem("userId");
  const updateMessage = document.getElementById("update-message");

  const userName = document.getElementById("update-userName").value.trim();
  const userSurname = document
    .getElementById("update-userSurname")
    .value.trim();
  const userEmail = document.getElementById("update-userEmail").value.trim();
  const userPhone = document.getElementById("update-userPhone").value.trim();
  const userPassword = document
    .getElementById("update-userPassword")
    .value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (userEmail && !emailRegex.test(userEmail)) {
    updateMessage.textContent = "Invalid email format.";
    updateMessage.style.color = "red";
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (userPassword && !passwordRegex.test(userPassword)) {
    updateMessage.textContent =
      "Password must be at least 8 characters long and include at least 1 letter and 1 number.";
    updateMessage.style.color = "red";
    return;
  }

  const updatedData = {
    userName,
    userSurname,
    useremail: userEmail,
    userphonenum: userPhone,
  };

  if (userPassword) {
    updatedData.userpassword = userPassword;
  }

  try {
    const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }

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
      localStorage.removeItem("userId");
      window.location.href = "home.html";
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed, please try again.");
  }
}

async function deleteAccount() {
  const userId = localStorage.getItem("userId");
  const deleteMessage = document.getElementById("delete-message");

  if (!userId) {
    console.error("User ID is not set. Please log in first.");
    return;
  }

  const confirmation = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (!confirmation) return;

  try {
    const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user account");
    }

    localStorage.removeItem("userId");
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

document
  .getElementById("deleteAccountButton")
  .addEventListener("click", deleteAccount);
document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  document
    .getElementById("logoutButton")
    .addEventListener("click", handleLogout);
  document
    .getElementById("updateProfileForm")
    .addEventListener("submit", updateUserProfile);
});
