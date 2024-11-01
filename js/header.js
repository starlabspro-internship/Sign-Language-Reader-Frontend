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
            <li class="dropdown">
                <a href="learninghub.html">Learning Hub</a>
                <ul class="dropdown-content">
                    <li><a href="alfabeti.html">Alfabeti</a></li>
                    <li><a href="learninghubPage2.html">Numrat</a></li>
                    <li><a href="learninghubPage3.html">Përshëndetjet</a></li>
                    <li><a href="seasons.html">Stinët</a></li>
                    <li><a href="weekdays.html">Ditët e Javës</a></li>
                </ul>
            </li>
            <li><a href="faq-page.html">FAQ</a></li>
            <li id="authLink"><a href="auth.html" class="auth-link">Log in</a></li>
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
            <li class="dropdown">
                <a href="learninghub.html">Learning Hub</a>
                <ul class="dropdown-content">
                    <li><a href="alfabeti.html">Alfabeti</a></li>
                    <li><a href="learninghubPage2.html">Numrat</a></li>
                    <li><a href="learninghubPage3.html">Përshëndetjet</a></li>
                    <li><a href="seasons.html">Stinët</a></li>
                    <li><a href="weekdays.html">Ditët e Javës</a></li>
                </ul>
            </li>
            <li><a href="faq-page.html">FAQ</a></li>
            <li id="authLinkMobile"><a href="auth.html" class="auth-link">Log in</a></li>
        </ul>
    </div>
    `;
  
    document.body.prepend(header);
  
    const mobileNav = header.querySelector(".hamburger");
    const navbar = header.querySelector(".menubar");
  
    mobileNav.addEventListener("click", () => {
        navbar.classList.toggle("active");
        mobileNav.classList.toggle("hamburger-active");
    });
  
    const links = header.querySelectorAll('nav a, .menubar a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active-page');
        }
    });
  
    try {
        const response = await fetch("https://localhost:5000/api/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
  
        if (response.ok) {
            const { userId } = await response.json();
            await updateAuthLink(userId);
        } else {
            console.log("User is not logged in.");
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
  }
  
  async function updateAuthLink(userId) {
    const userInfoResponse = await fetch(`https://localhost:5000/api/users/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
  
    if (userInfoResponse.ok) {
        const { userName } = await userInfoResponse.json();
  
        const authHTML = `
            <a href="profile.html" class="auth-link profile-link">${userName}</a>
            <button class="auth-link logout-button"><i class="fa-solid fa-right-from-bracket"></i></button>
        `;
  
        document.getElementById("authLink").innerHTML = authHTML;
        document.getElementById("authLinkMobile").innerHTML = authHTML;
  
        document.querySelectorAll(".logout-button").forEach(button => {
            button.addEventListener("click", handleLogout);
        });
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
            window.location.href = "home.html";
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
  