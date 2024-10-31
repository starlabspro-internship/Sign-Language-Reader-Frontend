document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();

    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const loginStatusDiv = document.getElementById("loginStatus");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const useremail = event.target.useremail.value.trim();
        const userpassword = event.target.userpassword.value.trim();

        try {
            const response = await fetch("https://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ useremail, userpassword }),
                credentials: "include"
            });

            if (response.ok) {
                alert("Logged in successfully!");
                loginForm.reset();
                errorMessage.style.display = "none";
                window.location.href = "profile.html";
            } else {
                const errorText = await response.text();
                errorMessage.textContent = "Login failed: " + errorText;
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Network error:", error);
            errorMessage.textContent = "Network error occurred.";
            errorMessage.style.display = "block";
        }
    });

    const signupForm = document.querySelector(".register .auth-form");
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userName = event.target[0].value.trim();
        const userSurname = event.target[1].value.trim();
        const useremail = event.target[3].value.trim();
        const userpassword = event.target[4].value.trim();

        try {
            const response = await fetch("https://localhost:5000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, userSurname, useremail, userpassword }),
                credentials: "include"
            });

            if (response.ok) {
                alert("Signup successful!");
                signupForm.reset();
                window.location.href = "profile.html";
            } else {
                const errorData = await response.json();
                const errorText = errorData.errors ? errorData.errors[0].msg : "Signup failed";
                alert(errorText);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error occurred.");
        }
    });

    async function checkLoginStatus() {
        try {
            const response = await fetch("https://localhost:5000/api/users/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                window.location.href = "profile.html";
            } else {
                loginStatusDiv.textContent = "Not logged in.";
                logoutButton.style.display = "none";
                loginForm.style.display = "block";
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            loginStatusDiv.textContent = "Error checking login status.";
        }
    }

    logoutButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                alert("Logged out successfully!");
                checkLoginStatus();
            } else {
                const errorText = await response.text();
                console.error("Logout error:", errorText);
                alert("Logout failed: " + errorText);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error occurred.");
        }
    });
    
    document.querySelector(".register-btn").addEventListener("click", () => {
        document.querySelector(".auth-container").classList.add("active");
    });
    document.querySelector(".login-btn").addEventListener("click", () => {
        document.querySelector(".auth-container").classList.remove("active");
    });
});
