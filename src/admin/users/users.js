import "./users.css";
import API_URL from "../../profile/profileFunctions/apiUrls.js";

let allUsers = [];

// Fetch Users
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_ALL}`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    allUsers = users;
    populateUsersTable(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Populate Users Table
function populateUsersTable(users) {
  const usersTableBody = document.getElementById("usersTableBody");
  const adminsTableBody = document.getElementById("adminsTableBody");

  usersTableBody.innerHTML = "";
  adminsTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

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

    if (user.userIsAdmin) {
      adminsTableBody.appendChild(row);
    } else {
      usersTableBody.appendChild(row);
    }
  });

  // Attach event listeners
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.target.getAttribute("data-id");
      editUser(userId);
    });
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.target.getAttribute("data-id");
      showDeletePopup(userId);
    });
  });

  document.getElementById("cancelChanges").addEventListener("click", function () {
    document.getElementById("admin-updateProfileSection").style.display = "none";
  });
}

// Show Delete Confirmation Popup
function showDeletePopup(userId) {
  const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
  deleteConfirmationModal.style.display = "flex";

  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const cancelDeleteButton = document.getElementById("cancelDeleteButton");

  confirmDeleteButton.onclick = () => {
    deleteUser(userId);
    deleteConfirmationModal.style.display = "none";
  };

  cancelDeleteButton.onclick = () => {
    deleteConfirmationModal.style.display = "none";
  };

  // Close modal if clicking outside
  window.onclick = (event) => {
    if (event.target === deleteConfirmationModal) {
      deleteConfirmationModal.style.display = "none";
    }
  };
}

// Delete User
async function deleteUser(userId) {
  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to delete user account");

    allUsers = allUsers.filter((user) => user._id !== userId);
    populateUsersTable(allUsers);

    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

// Edit User
window.editUser = async function (userId) {
  try {
    const user = allUsers.find((user) => user._id === userId);
    if (!user) throw new Error("User not found");

    document.getElementById("update-userName").value = user.userName;
    document.getElementById("update-userSurname").value = user.userSurname;
    document.getElementById("update-userEmail").value = user.useremail;
    document.getElementById("update-userPhone").value = user.userphonenum;

    document.getElementById("admin-updateProfileSection").style.display = "block";

    document.getElementById("saveChanges").addEventListener("click", () => {
      saveChanges(userId);
    });
  } catch (error) {
    console.error("Error editing user:", error);
  }
};

// Save Changes
async function saveChanges(userId) {
  const updatedUser = {
    userName: document.getElementById("update-userName").value,
    userSurname: document.getElementById("update-userSurname").value,
    useremail: document.getElementById("update-userEmail").value,
    userphonenum: document.getElementById("update-userPhone").value,
  };

  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error("Failed to save changes");

    allUsers = allUsers.map((user) =>
      user._id === userId ? { ...user, ...updatedUser } : user
    );

    populateUsersTable(allUsers);
    document.getElementById("admin-updateProfileSection").style.display = "none";

    console.log("User details updated successfully.");
  } catch (error) {
    console.error("Error saving user details:", error);
  }
}

// Handle Search
function handleSearch() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  const filteredUsers = allUsers.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery) ||
      user.useremail.toLowerCase().includes(searchQuery)
  );

  populateUsersTable(filteredUsers);
}

fetchUsers();

document.getElementById("searchInput").addEventListener("input", handleSearch);
