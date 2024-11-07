import API_URL from '../profile/apiUrls.js'; // Assuming API_URL is set up to use your backend URL

let allUsers = []; // Store all users data here

// Function to fetch all users from the backend
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_ALL}`, {
      method: 'GET',
      credentials: 'include', // If you need cookies or authorization
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    allUsers = users; // Store all fetched users in the global variable
    populateUsersTable(users); // Populate table with the fetched users

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Function to populate the users table
function populateUsersTable(users) {
  const usersTableBody = document.getElementById('usersTableBody');
  usersTableBody.innerHTML = ''; // Clear existing rows

  users.forEach(user => {
    const row = document.createElement('tr');

    // User details (populate each column)
    row.innerHTML = `
      <td>${user.userName}</td>
      <td>${user.userSurname}</td>
      <td>${user.useremail}</td>
      <td>${user.userphonenum}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-button" data-id="${user._id}">Edit</button>
          <button class="delete-button" data-id="${user._id}">Delete</button>
        </div>
      </td>
    `;

    usersTableBody.appendChild(row);
  });

  // Add event listeners for dynamically created buttons
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const userId = event.target.getAttribute('data-id');
      editUser(userId);
    });
  });

  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const userId = event.target.getAttribute('data-id');
      deleteUser(userId);
    });
  });
}

// Function to handle search input
function handleSearch() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase(); // Get the search query and convert it to lowercase

  // Filter users based on the search query
  const filteredUsers = allUsers.filter(user =>
    user.userName.toLowerCase().includes(searchQuery) ||  // Match username
    user.useremail.toLowerCase().includes(searchQuery)    // Match email
  );

  populateUsersTable(filteredUsers); // Populate the table with the filtered users
}

// Function to delete user account by userId
window.deleteUser = async function(userId) {
  const deleteMessage = document.getElementById("delete-message");

  if (!confirm("Are you sure you want to delete this user account? This action cannot be undone.")) return;

  try {
    // Make a DELETE request to delete the user account by userId
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "DELETE",
      credentials: "include",  // Include credentials for authorization (if needed)
    });

    if (!response.ok) throw new Error((await response.json()).message || "Failed to delete user account");

    // Display success message
    deleteMessage.textContent = "User account deleted successfully!";
    deleteMessage.style.color = "green";
    
    // Reload user data after a short delay
    setTimeout(() => {
      deleteMessage.textContent = ""; // Clear the message after a few seconds
      refreshUserList();  // Refresh the user list
    }, 3000); // 3 seconds delay for the message to appear

  } catch (error) {
    deleteMessage.textContent = `Error deleting account: ${error.message}`;
    deleteMessage.style.color = "red";
    console.error("Error deleting account:", error);
  }
}

// Function to refresh the user list (reloads the table or refetches users)
function refreshUserList() {
  populateUsersTable(allUsers); // Refresh the table with the complete users data
}

// Function to edit user details
window.editUser = async function(userId) {
  try {
    const user = allUsers.find(user => user._id === userId); // Find the user by ID
    if (!user) throw new Error("User not found");

    // Populate form fields with current user data (assuming you have a form for editing)
    document.getElementById("update-userName").value = user.userName;
    document.getElementById("update-userSurname").value = user.userSurname;
    document.getElementById("update-userEmail").value = user.useremail;
    document.getElementById("update-userPhone").value = user.userphonenum;

    // Show the edit form or section
    document.getElementById("updateProfileSection").style.display = "block";

    // Add event listener to save changes button
    document.getElementById("saveChanges").addEventListener("click", () => {
      saveChanges(userId);
    });

  } catch (error) {
    console.error("Error editing user:", error);
  }
}


// Function to save updated user details
async function saveChanges(userId) {
  const updatedUser = {
    userName: document.getElementById("update-userName").value,
    userSurname: document.getElementById("update-userSurname").value,
    useremail: document.getElementById("update-userEmail").value,
    userphonenum: document.getElementById("update-userPhone").value,
  };

  try {
    // Make a PUT request to update user details
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include", // If needed for authorization
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error("Failed to save changes");

    // Refresh the user list and hide the update form
    allUsers = allUsers.map(user =>
      user._id === userId ? { ...user, ...updatedUser } : user
    ); // Update the specific user in the allUsers array

    // Now populate the table with the updated users
    populateUsersTable(allUsers);

    // Hide the update form
    document.getElementById("updateProfileSection").style.display = "none"; 

    // Create and display the success message
    const successMessage = document.createElement('p');
    successMessage.textContent = "User details updated successfully!";
    successMessage.style.color = "green";
    successMessage.style.fontWeight = "bold";
    successMessage.style.marginTop = "10px";

    // Append the success message to the page (for example, just below the table)
    document.querySelector('.users-main-content').appendChild(successMessage);

    // Remove the success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  } catch (error) {
    console.error("Error saving user details:", error);
  }
}


// Call fetchUsers when the page loads
fetchUsers();

// Attach the search handler
document.getElementById('searchInput').addEventListener('input', handleSearch);
