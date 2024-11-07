import API_URL from '../profile/apiUrls.js'; // Assuming API_URL is set up to use your backend URL

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
          <button class="edit-button" onclick="editUser('${user.useremail}')">Edit</button>
          <button class="delete-button" onclick="deleteUser('${user._id}')">Delete</button>
        </div>
      </td>
    `;

    usersTableBody.appendChild(row);
  });
}

// Placeholder function for edit
function editUser(email) {
  alert(`Editing user with email: ${email}`);
  // Add actual edit functionality here
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

    deleteMessage.textContent = "Account deleted successfully.";
    deleteMessage.style.color = "green";

    // Refresh the user list to update the table
    refreshUserList();  // Custom function to refresh user list (if needed)
  } catch (error) {
    deleteMessage.textContent = `Error deleting account: ${error.message}`;
    deleteMessage.style.color = "red";
    console.error("Error deleting account:", error);
  }
}

// Function to refresh the user list (reloads the table or refetches users)
function refreshUserList() {
  fetchUsers(); // Simply refetch the users to update the table
}

// Call fetchUsers when the page loads
fetchUsers();
