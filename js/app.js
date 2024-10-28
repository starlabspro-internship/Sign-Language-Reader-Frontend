import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

//Keto dy rreshta i paraqesin headerin dhe footerin ne secilen faqe qe perdoret app.js
renderHeader();
renderFooter();


// JavaScript for controlling the slider
let currentSlide = 0;

function goToSlide(index) {
  const slider = document.querySelector('.slides');
  currentSlide = index;

  // Move the slide container to show the selected slide
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dot
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    // Toggle 'active' class for the clicked dot
    dot.classList.toggle('active', idx === currentSlide);
  });
}

// Attach click event listeners to dots
document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

// Initialize the first dot as active
updateDots();
