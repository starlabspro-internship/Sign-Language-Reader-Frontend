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

    // Update the UI with the user's information
    document.querySelectorAll(".userName").forEach(el => el.textContent = user.userName || "N/A");
    document.querySelectorAll(".userSurname").forEach(el => el.textContent = user.userSurname || "N/A");
    document.querySelectorAll(".userEmail").forEach(el => el.textContent = user.useremail || "N/A");
    document.querySelectorAll(".userPhone").forEach(el => el.textContent = user.userphonenum || "N/A");

    // Pre-fill the update form fields
    document.getElementById('update-userName').value = user.userName || "";
    document.getElementById('update-userSurname').value = user.userSurname || "";
    document.getElementById('update-userEmail').value = user.useremail || "";
    document.getElementById('update-userPhone').value = user.userphonenum || "";

  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

async function updateUserProfile(event) {
  event.preventDefault(); // Prevent form submission

  const userId = localStorage.getItem('userId'); 
  const userName = document.getElementById('update-userName').value.trim();
  const userSurname = document.getElementById('update-userSurname').value.trim();
  const userEmail = document.getElementById('update-userEmail').value.trim();
  const userPhone = document.getElementById('update-userPhone').value.trim();
  const userPassword = document.getElementById('update-userPassword').value.trim();
  const updateMessage = document.getElementById('update-message');

  // Prepare the data to send
  const updatedData = {
      userName,
      userSurname,
      userEmail,
      userPhone,
      ...(userPassword && { userpassword: userPassword }) // Only include password if provided
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

      // Update the UI with the new information
      document.querySelectorAll(".userName").forEach(el => el.textContent = result.userName || "N/A");
      document.querySelectorAll(".userSurname").forEach(el => el.textContent = result.userSurname || "N/A");
      document.querySelectorAll(".userEmail").forEach(el => el.textContent = result.useremail || "N/A");
      document.querySelectorAll(".userPhone").forEach(el => el.textContent = result.userphonenum || "N/A");

  } catch (error) {
      updateMessage.textContent = `Error updating profile: ${error.message}`;
      updateMessage.style.color = 'red';
      console.error('Error updating profile:', error);
  }
}



async function handleLogout() {
  try {
    const response = await fetch("https://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      // Clear local storage
      localStorage.removeItem('userId'); // Remove userId or any other relevant data
      localStorage.removeItem('otherKey'); // Remove any additional keys if needed

      // Redirect to the authentication page
      window.location.href = "home.html";
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed, please try again.");
  }
}


// Event Listeners
document.addEventListener("DOMContentLoaded", fetchUserProfile);
document.getElementById("logoutButton").addEventListener("click", handleLogout);
document.getElementById("updateProfileForm").addEventListener("submit", updateUserProfile); // Assuming your update form has this ID
