import { enforceReloadOnBackNavigation } from './forceReload.js';
import { handleAuthLinks } from './headerAuth.js';

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
            <li><a href="translate.html"><i class="fa-solid fa-language"></i> Translate</a></li>
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
        <li><a href="translate.html"><i class="fa-solid fa-language"></i> Translate</a></li>
        <li><a href="about.html"><i class="fa-solid fa-circle-info"></i> Rreth nesh</a></li>
        <li><a href="history.html"><i class="fa-solid fa-book"></i> Historia</a></li>
        <li><a href="mesimet.html"><i class="fa-solid  fa-book-open"></i> Mesimet</a></li>
        <li><a href="faq-page.html"><i class="fa-solid fa-circle-question"></i> Pyetje të Shpeshta</a></li>
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
  
    const links = header.querySelectorAll('nav a, .menubar a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active-page');
        }
    });

    //Kryen funksionet e nevojshme per butonin e profilit
    await handleAuthLinks();
}
