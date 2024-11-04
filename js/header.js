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
            <li><a href="home.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="history.html">History</a></li>
            <li class="dropdown">
                <a href="learninghub.html">Learning Hub</a>
                <ul class="dropdown-content">
                    <li><a href="alfabeti.html">Alfabeti</a></li>
                    <li><a href="numrat.html">Numrat</a></li>
                    <li><a href="pershendetjet.html">Përshëndetjet</a></li>
                    <li><a href="stinet.html">Stinët</a></li>
                    <li><a href="ditetEJaves.html">Ditët e Javës</a></li>
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
            <a href="learninghub.html" class="dropdown-toggle">Learning Hub</a>
            <ul class="dropdown-content">
                <li><a href="alfabeti.html">Alfabeti</a></li>
                <li><a href="numrat.html">Numrat</a></li>
                <li><a href="pershendetjet.html">Përshëndetjet</a></li>
                <li><a href="stinet.html">Stinët</a></li>
                <li><a href="ditetEJaves.html">Ditët e Javës</a></li>
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

    document.addEventListener("DOMContentLoaded", function() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(event) {
                event.preventDefault(); 
                const dropdown = this.parentElement; 
                dropdown.classList.toggle('active'); 
            });
        });
    });

    //The auth content
  
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
            // console.log("User is not logged in.");
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
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.LOGOUT}`, {
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
  