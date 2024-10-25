export function renderFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <footer id="footer">
      <p>&copy; 2024 Sign Language Reader. All rights reserved.</p>
      <p>Contact us: <a href="mailto:info@signlanguage.com">info@signlanguage.com</a></p>
      <p>Follow us on 
          <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
          <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
        </p>
    </footer>
    `;
    document.body.appendChild(footer);
}
