export function renderFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
<footer class="footer">
  <div class="footer-container">
   <div class="footer-row">
    <div class="footer-col">
    <a href="home.html">
      <img src="./photos/demo-logo.png" alt="Logo" class="footer-logo">
    </a>
    </div>
      <div class="footer-col">
        <h4>Sign Language</h4>
        <ul>
          <li><a href="home.html">home</a></li>
          <li><a href="about.html">about us</a></li>
          <li><a href="history.html">history</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>get help</h4>
        <ul>
          <li><a href="faq-page.html">FAQ</a></li>
          <li><a href="#">privacy policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>learn</h4>
        <ul>
          <li><a href="Quiz.html">Quizes</a></li>
          <li><a href="#">Learning hub</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
  <hr>
  <div class="footer-flex">
   <p>Copyright &copy; 2024 Duartë. All rights reserved.</p>
    <div class="footer-social-links">
      <a href="#"><i class="fab fa-facebook-f"></i></a>
      <a href="#"><i class="fab fa-x"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
   
  </div>
</div>
</footer>


    `;
  document.body.appendChild(footer);
}
