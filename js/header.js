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
        <li>
          <a href="learning.html">Learning Hub</a>
        </li>
        <li>
          <a href="faq-page.html">Faq</a>
        </li>
        <li>
          <a href="profile.html">Profile</a>
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
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">History</a>
        </li>
        <li>
          <a href="#">Learning Hub</a>
        </li>
        <li>
          <a href="#">Faq</a>
        </li>
        <li>
          <a href="#">Profile</a>
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
}
