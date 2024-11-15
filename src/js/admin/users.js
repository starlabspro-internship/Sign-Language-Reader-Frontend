import "./admin.js"

import "../../assets/css/admin/users.css";
import API_URL from '../profile/apiUrls.js'; 

let allUsers = [];

export async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_ALL}`, {
      method: 'GET',
      credentials: 'include', 
      cache: 'no-cache',
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

// Function to populate the users and admin tables
function populateUsersTable(users) {
  const usersTableBody = document.getElementById('usersTableBody');
  const adminsTableBody = document.getElementById('adminsTableBody');
  
  usersTableBody.innerHTML = ''; 
  adminsTableBody.innerHTML = ''; 

  users.forEach(user => {
    const row = document.createElement('tr');

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

  document.getElementById('cancelChanges').addEventListener('click', function() {
    document.getElementById('admin-updateProfileSection').style.display = 'none';
  });
}

// Show the popup
function showPopup() {
  document.getElementById('admin-updateProfileSection').style.display = 'flex'; 
}




// Function to handle search input
function handleSearch() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase(); 

  // Filter users based on the search query
  const filteredUsers = allUsers.filter(user =>
    user.userName.toLowerCase().includes(searchQuery) ||  
    user.useremail.toLowerCase().includes(searchQuery)    
  );

  populateUsersTable(filteredUsers);
}


window.deleteUser = async function(userId) {
  const deleteMessage = document.getElementById("delete-message");

  if (!confirm("Are you sure you want to delete this user account? This action cannot be undone.")) return;

  try {
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "DELETE",
      credentials: "include",  
    });

    if (!response.ok) throw new Error((await response.json()).message || "Failed to delete user account");

    deleteMessage.textContent = "User account deleted successfully!";
    deleteMessage.style.color = "green";
    
    setTimeout(() => {
      deleteMessage.textContent = ""; 
      refreshUserList();  
    }, 3000);

  } catch (error) {
    deleteMessage.textContent = `Error deleting account: ${error.message}`;
    deleteMessage.style.color = "red";
    console.error("Error deleting account:", error);
  }
}


function refreshUserList() {
  populateUsersTable(allUsers); 
}

// Function to edit user details
window.editUser = async function(userId) {
  try {
    const user = allUsers.find(user => user._id === userId); 
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
    const response = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include", 
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error("Failed to save changes");

   
    allUsers = allUsers.map(user =>
      user._id === userId ? { ...user, ...updatedUser } : user
    ); 

    populateUsersTable(allUsers);

    document.getElementById("admin-updateProfileSection").style.display = "none"; 

    const successMessage = document.createElement('p');
    successMessage.textContent = "User details updated successfully!";
    successMessage.style.color = "green";
    successMessage.style.fontWeight = "bold";
    successMessage.style.marginTop = "10px";

    document.querySelector('.users-main-content').appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  } catch (error) {
    console.error("Error saving user details:", error);
  }
}

fetchUsers();


document.getElementById('searchInput').addEventListener('input', handleSearch);
