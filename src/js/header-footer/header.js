// import { enforceReloadOnBackNavigation } from "../forceReload.js";
import { handleAuthLinks } from "./headerAuth.js";
import logo from '../../photos/logo/duarte-logo.png'; 

export async function renderHeader() {
  // enforceReloadOnBackNavigation();
  const header = document.createElement("header");
  const imageElement = document.createElement('img');
    imageElement.src = logo; 
  header.innerHTML = `
    <nav>
        <div class="logo">
            <a href="home.html">
                <img src="${logo}" alt="logo" />
            </a>
        </div>
        <ul>
            <li><a href="home.html"><i class="fa-solid fa-house"></i> Kryefaqja</a></li>
            <li><a href="translate.html"><i class="fa-solid fa-language"></i> Përkthe</a></li>
            <li><a href="about.html"><i class="fa-solid fa-circle-info"></i> Rreth nesh</a></li>
            <li><a href="mesimet.html"><i class="fa-solid  fa-book-open"></i> Mësimet</a></li>
            <li><a href="games.html"><i class="fa-solid fa-gamepad"></i> Lojërat</a></li>
            <li><a href="community.html"><i class="fa-solid fa-users"></i> Diskutime</a></li>
            <li><a href="faq.html"><i class="fa-solid fa-circle-question"></i> FAQ </a></li>
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
        <li><a href="translate.html"><i class="fa-solid fa-language"></i> Përkthe</a></li>
        <li><a href="about.html"><i class="fa-solid fa-circle-info"></i> Rreth nesh</a></li>
        <li><a href="mesimet.html"><i class="fa-solid  fa-book-open"></i> Mësimet</a></li>
        <li><a href="games.html"><i class="fa-solid fa-gamepad"></i> Lojërat</a></li>
        <li><a href="community.html"><i class="fa-solid fa-users"></i> Diskutime</a></li>
        <li><a href="faq.html"><i class="fa-solid fa-circle-question"></i> FAQ </a></li>
        <li id="authLinksMobile">
            <!-- Authentication links for mobile view will be injected here -->
        </li>
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

  const links = header.querySelectorAll("nav a, .menubar a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active-page");
    }
  });

  await handleAuthLinks();
}
