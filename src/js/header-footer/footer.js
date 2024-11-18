import logo from '../../photos/demo-logo.png'; // Import the logo image

export function renderFooter() {
  const footer = document.createElement("footer");
  const imageElement = document.createElement('img');
imageElement.src = logo; // Use the imported image path
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
      <img src="${logo}" alt="Logo" class="footer-logo">
    </a>
    </div>
      <div class="footer-col">
        <h4>Gjuha e shenjave</h4>
        <ul>
          <li><a href="home.html">Kryefaqja</a></li>
          <li><a href="about.html">Rreth nesh</a></li>
          <li><a href="history.html">Historia</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>merrni ndihmë</h4>
        <ul>
          <li><a href="faq-page.html">PTSH</a></li>
          <li><a href="#">politika e privatësisë</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>learn</h4>
        <ul>
          <li><a href="Quiz.html">Kuizët</a></li>
          <li><a href="mesimet.html">Mësimet</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
  <hr>
  <div class="footer-flex">
   <p>Copyright &copy; 2024 Duartë. Të gjitha të drejtat e rezervuara.</p>
    
  </div>
</div>
</footer>
    `;
  document.body.appendChild(footer);
}
