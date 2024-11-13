import API_URL from "../profile/apiUrls.js";
// Admin Signup Form
document
  .getElementById("admin-signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Capture form input values
    const userName = document.getElementById("admin-signup-name").value.trim();
    const userSurname = document.getElementById("admin-signup-surname").value.trim();
    const useremail = document.getElementById("admin-signup-email").value.trim();
    const userpassword = document.getElementById("admin-signup-password").value.trim();
    const userphonenum = document.getElementById("admin-signup-phone").value.trim();

    // Error and success message elements
    const errorMessage = document.getElementById("admin-signup-error-message");
    const successMessage = document.getElementById("admin-signup-success-message");

    // Hide any existing messages
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    // Validate the password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(userpassword)) {
      errorMessage.textContent = "Password must be at least 8 characters long and include at least 1 letter and 1 number.";
      errorMessage.style.display = "block";
      return;
    }

    try {
      // Make the request to the backend
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.CREATE_ADMIN}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`  // Use token for auth if needed
        },
        body: JSON.stringify({
          userName,
          userSurname,
          useremail,
          userpassword,
          userphonenum
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        successMessage.textContent = "Admin account created successfully!";
        successMessage.style.display = "block";

        // Optionally reload the page or redirect to another page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Display error message if admin creation fails
        errorMessage.textContent = result.msg || "Failed to create admin account. Please check your input.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = "An error occurred while creating the admin account. Please try again later.";
      errorMessage.style.display = "block";
      console.error("Admin signup error:", error);
    }
  });
