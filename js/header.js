import { enforceReloadOnBackNavigation } from './forceReload.js';
import API_URL from './profile/apiUrls.js';

export async function renderHeader() {
    enforceReloadOnBackNavigation();
    const header = document.createElement('header');
  
    header.innerHTML = `
    <nav>
        <div class="logo">
            <a href="home.html">
                <img src="photos/demo-logo.png" alt="logo" />
            </a>
        </div>
        <ul>
            <li><a href="home.html"><i class="fa-solid fa-house"></i> Kryefaqja</a></li>
            <li><a href="translate.html">Translate</a></li>
            <li><a href="about.html"><i class="fa-solid fa-circle-info"></i> Rreth nesh</a></li>
            <li><a href="history.html"><i class="fa-solid fa-book"></i> Historia</a></li>
            <li><a href="mesimet.html"><i class="fa-solid  fa-book-open"></i> Mesimet</a></li>
            <li><a href="faq-page.html"><i class="fa-solid fa-circle-question"></i> Pyetje të Shpeshta</a></li>
            <li id="authLinks">
                <!-- Authentication links will be injected here -->
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
            <li><a href="home.html"><i class="fa-solid fa-house"></i> Kryefaqja</a></li>
            <li><a href="translate.html">Translate</a></li>
            <li><a href="about.html"><i class="fa-solid fa-circle-info"></i> Rreth nesh</a></li>
            <li><a href="history.html"><i class="fa-solid fa-book"></i> Historia</a></li>
            <li><a href="mesimet.html"><i class="fa-solid  fa-book-open"></i> Mesimet</a></li>
            <li><a href="faq-page.html"><i class="fa-solid fa-circle-question"></i> Pyetje të Shpeshta</a></li>
            <li id="authLinksMobile">
                <!-- Authentication links for mobile view will be injected here -->
            </li>
        </ul>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-toggle">🌙</button>
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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for dark mode preference in localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Toggle dark mode when the button is clicked
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Save the dark mode preference in localStorage
        if (isDarkMode) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
        
        // Change the icon based on the mode
        darkModeToggle.textContent = isDarkMode ? '🌞' : '🌙';
    });

    // Authentication logic
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
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
            // If the user is not logged in, show login and signup links
            document.getElementById("authLinks").innerHTML = `
                <a href="auth.html" class="auth-link"><i class="fa-solid fa-right-to-bracket"></i> Kyçu</a>
                <a href="auth.html?signup=true" class="auth-link sign-up"><i class="fa-solid fa-user-plus"></i> Regjistrohu</a>
            `;
            document.getElementById("authLinksMobile").innerHTML = `
                <a href="auth.html" class="auth-link"><i class="fa-solid fa-right-to-bracket"></i> Kyçu</a>
                <a href="auth.html?signup=true" class="auth-link sign-up"><i class="fa-solid fa-user-plus"></i> Regjistrohu</a>
            `;
        }
    } catch (error) {
        console.error("Error checking login status:", error);
    }
}

async function updateAuthLink(userId) {
    const userInfoResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
  
    if (userInfoResponse.ok) {
        const { userName } = await userInfoResponse.json();
  
        const authHTML = `<a href="profile.html" class="auth-link profile-link">${userName}</a>`;
  
        document.getElementById("authLinks").innerHTML = authHTML;
        document.getElementById("authLinksMobile").innerHTML = authHTML;
    }
}


  
//   async function handleLogout() {
//     try {
//         const response = await fetch(`${API_URL.BASE}${API_URL.USERS.LOGOUT}`, {
//             method: "POST",
//             credentials: "include"
//         });
  
//         if (response.ok) {
//             alert("Logged out successfully!");
//             window.location.href = "home.html";
//         } else {
//             const errorText = await response.text();
//             console.error("Logout error:", errorText);
//             alert("Logout failed: " + errorText);
//         }
//     } catch (error) {
//         console.error("Network error:", error);
//         alert("Network error occurred.");
//     }
//   }
  