export function renderHeader() {
  const header = document.createElement('header');
  
  header.innerHTML = `
    <nav>
      <div class="logo">
        <a href="home.html">
          <img src="photos/demo-logo.png" alt="logo" />
        </a>
      </div>
      <ul>
        <li>
          <a href="home.html">Home</a>
        </li>
        <li>
          <a href="about.html">About</a>
        </li>
        <li>
          <a href="history.html">History</a>
        </li>
        <li class="dropdown">
          <a href="literature.html">Literatura</a>
          <ul class="dropdown-content">
            <li><a href="learninghubPage1.html">Alfabeti</a></li>
            <li><a href="learninghubPage2.html">Numrat</a></li>
            <li><a href="learninghebPage3.html">Përshëndetjet</a></li>
            <li><a href="seasons.html">Stinët</a></li>
            <li><a href="weekdays.html">Ditët e Javës</a></li>
          </ul>
        </li>
        <li>
          <a href="faq-page.html">FAQ </a>
        </li>
        <li>
          <a href="profile.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">Profile</a>
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
        <li>
          <a href="home.html">Kryefaqja</a>
        </li>
        <li>
          <a href="about.html">Rreth Nesh</a>
        </li>
        <li>
          <a href="history.html">Historia</a>
        </li>
        <li>
          <a href="learning.html">Qendra e Mësimit</a>
        </li>
        <li>
          <a href="faq-page.html">Pyetje të Shpeshta</a>
        </li>
        <li>
          <a href="profile.html" style="background-color:#fff; padding:10px; color:var(--dark-blue);">Profili</a>
        </li>
      </ul>
    </div>
  `;
  
  document.body.prepend(header);

  // JavaScript to handle mobile menu toggle
  const mobileNav = header.querySelector(".hamburger");
  const navbar = header.querySelector(".menubar");

  const toggleNav = () => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
  };

  mobileNav.addEventListener("click", () => toggleNav());

  // Add active class to the current page's nav link
  const links = header.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active-page');
    }
  });
}
