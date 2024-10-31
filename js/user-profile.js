function updateUI(user) {
  document.querySelectorAll(".userName").forEach(el => el.textContent = user.userName || "N/A");
  document.querySelectorAll(".userSurname").forEach(el => el.textContent = user.userSurname || "N/A");
  document.querySelectorAll(".userEmail").forEach(el => el.textContent = user.useremail || "N/A");
  document.querySelectorAll(".userPhone").forEach(el => el.textContent = user.userphonenum || "Not given");

  document.getElementById('update-userName').value = user.userName || "";
  document.getElementById('update-userSurname').value = user.userSurname || "";
  document.getElementById('update-userEmail').value = user.useremail || "";
  document.getElementById('update-userPhone').value = user.userphonenum || "";
}

// Update profile section visibility
document.getElementById('updateButton').addEventListener('click', function() {
  const updateProfileSection = document.getElementById('updateProfileSection');
  updateProfileSection.style.display = updateProfileSection.style.display === 'none' ? 'block' : 'none';
});

// Fetch user data
async function fetchUserProfile() {
  const userId = localStorage.getItem('userId');
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

// Update user function
async function updateUserProfile(event) {
  event.preventDefault();

  const userId = localStorage.getItem('userId');
  const updateMessage = document.getElementById('update-message');
  const updatedData = {
    userName: document.getElementById('update-userName').value.trim(),
    userSurname: document.getElementById('update-userSurname').value.trim(),
    userEmail: document.getElementById('update-userEmail').value.trim(),
    userPhone: document.getElementById('update-userPhone').value.trim(),
    ...(document.getElementById('update-userPassword').value.trim() && {
      userpassword: document.getElementById('update-userPassword').value.trim()
    })
  };

  try {
    const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to update user profile');
    }

    const result = await response.json();
    updateMessage.textContent = 'Profile updated successfully!';
    updateMessage.style.color = 'green';
    updateUI(result);

  } catch (error) {
    updateMessage.textContent = `Error updating profile: ${error.message}`;
    updateMessage.style.color = 'red';
    console.error('Error updating profile:', error);
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
      localStorage.removeItem('userId');
      window.location.href = "home.html";
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed, please try again.");
  }
}


document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  document.getElementById("logoutButton").addEventListener("click", handleLogout);
  document.getElementById("updateProfileForm").addEventListener("submit", updateUserProfile);
});
