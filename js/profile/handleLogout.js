const logoutModal = document.getElementById("logoutModal");
const closeButton = document.querySelector(".close-button");
const confirmLogoutButton = document.getElementById("confirmLogoutButton");
const cancelLogoutButton = document.getElementById("cancelLogoutButton");


document.getElementById("logoutButton").addEventListener("click", (event) => {
    event.preventDefault(); 
    logoutModal.style.display = "flex"; 
});


closeButton.addEventListener("click", () => {
    logoutModal.style.display = "none";
});


confirmLogoutButton.addEventListener("click", async () => {
    logoutModal.style.display = "none"; 
    await handleLogout(); 
});


cancelLogoutButton.addEventListener("click", () => {
    logoutModal.style.display = "none"; 
});

// Logout function
export async function handleLogout() {
    try {
        const response = await fetch("https://localhost:5000/api/users/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            window.location.href = "home.html"; 
        } else {
            throw new Error("Logout failed");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        alert("Logout failed, please try again.");
    }
}
