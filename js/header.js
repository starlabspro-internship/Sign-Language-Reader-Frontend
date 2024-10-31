export async function renderHeader() {
  const header = document.createElement('header');

  header.innerHTML = `
      <nav>
          <div class="logo">
              <a href="home.html">
                  <img src="photos/demo-logo.png" alt="logo" />
              </a>
          </div>
          <ul>
              <li><a href="home.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="history.html">History</a></li>
              <li><a href="learninghub.html">Learning Hub</a></li>
              <li><a href="faq-page.html">FAQ</a></li>
              <li id="authLink">
                  <a href="auth.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">Login/Signup</a>
              </li>
          </ul>
          <div class="hamburger">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
          </div>
      </nav>
      <div class="menubar">
          <ul>
              <li><a href="home.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="history.html">History</a></li>
              <li><a href="learninghub.html">Learning Hub</a></li>
              <li><a href="faq-page.html">FAQ</a></li>
              <li id="authLinkMobile">
                  <a href="auth.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">Login/Signup</a>
              </li>
          </ul>
      </div>
  `;

  document.body.prepend(header);

  const mobileNav = header.querySelector(".hamburger");
  const navbar = header.querySelector(".menubar");

  const toggleNav = () => {
      navbar.classList.toggle("active");
      mobileNav.classList.toggle("hamburger-active");
  };

  mobileNav.addEventListener("click", () => toggleNav());

  const links = header.querySelectorAll('nav a');
  links.forEach(link => {
      if (link.href === window.location.href) {
          link.classList.add('active-page');
      }
  });

  // me marr id e userit per me ja marr emrin
  try {
    const response = await fetch("https://localhost:5000/api/users/me", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        const userId = data.userId;

        const userInfoResponse = await fetch(`https://localhost:5000/api/users/${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            const userName = userInfo.userName;

            document.getElementById("authLink").innerHTML = `
                <a href="profile.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">${userName} (Profile)</a>
                <button id="logoutButton" 
                  style="
                  background-color: transparent;
                  color: #fff; 
                  text-decoration: underline;
                  padding:10px 20px; 
                  border:none; cursor:pointer;
                  border-radius: 12px;
                  ">Logout</button>
            `;
            document.getElementById("authLinkMobile").innerHTML = `
                <a href="profile.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">${userName} (Profile)</a>
                <button id="logoutButtonMobile" style="background-color:#fff; padding:10px; color:var(--dark-blue); border:none; cursor:pointer;">Logout</button>
            `;

            document.getElementById("logoutButton").addEventListener("click", async () => {
                await handleLogout();
            });
            document.getElementById("logoutButtonMobile").addEventListener("click", async () => {
                await handleLogout();
            });
        }
    } else {
        console.log("User is not logged in.");
    }
} catch (error) {
    console.error("Error checking login status:", error);
}
}

async function handleLogout() {
try {
    const response = await fetch("https://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include"
    });

    if (response.ok) {
        alert("Logged out successfully!");
        window.location.href = "auth.html"; 
    } else {
        const errorText = await response.text();
        console.error("Logout error:", errorText);
        alert("Logout failed: " + errorText);
    }
} catch (error) {
    console.error("Network error:", error);
    alert("Network error occurred.");
}
}