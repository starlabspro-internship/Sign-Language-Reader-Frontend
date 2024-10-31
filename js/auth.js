// Login Form
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const useremail = document.getElementById('login-email').value.trim();
  const userpassword = document.getElementById('login-password').value.trim();
  const errorMessage = document.getElementById('login-error-message');

  try {
    const response = await fetch('https://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ useremail, userpassword }),
      credentials: 'include' 
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Login successful!", result);

      // Store userId in localStorage for later use
      localStorage.setItem('userId', result.userId);

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    } else {
      errorMessage.textContent = result.message || 'Login failed! Please check your credentials.';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again later.';
    errorMessage.style.display = 'block';
    console.error("Login error:", error);
  }
});




// Sign Up Form
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const userName = document.getElementById('signup-name').value.trim();
  const userSurname = document.getElementById('signup-surname').value.trim();
  const useremail = document.getElementById('signup-email').value.trim();
  const userpassword = document.getElementById('signup-password').value.trim();
  const errorMessage = document.getElementById('signup-error-message');

  try {
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, userSurname, useremail, userpassword })
    });

    const result = await response.json();

    if (response.ok) {
      alert('Sign up successful! Please log in.');
    } else {
      errorMessage.textContent = result.message || 'Signup failed! Please check your input.';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred during signup. Please try again later.';
    errorMessage.style.display = 'block';
    console.error("Signup error:", error);
  }
});