import "../assets/css/home.css";
import { makeVisible } from "./handlers/visibilityHandler.js";

document.addEventListener("DOMContentLoaded", () => {

  // makeVisible('.wwd-left', 'wwd-left-visible');

  makeVisible('.wwd-h2', 'wwd-h2-visible');
  makeVisible('.wwd-p', 'wwd-p-visible');
  makeVisible('.details-btn', 'details-btn-visible');
  
  makeVisible('.ts-p', 'ts-p-visible');
  makeVisible('.trans-image', 'trans-image-visible');
  makeVisible('.trans-hyper', 'trans-hyper-visible');

  makeVisible('.c-h1', 'c-h1-visible');
  makeVisible('.c-h2', 'c-h2-visible');

  makeVisible('.c-card', 'c-card-visible');

  makeVisible('.quote-div', 'quote-div-visible')
  makeVisible('.qd2', 'qd2-visible')
  makeVisible('.qd3', 'qd3-visible')

  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
      const infoBox = button.closest('.info-box');
      const fullText = infoBox ? infoBox.querySelector('.full-text') : null;
      const shortText = infoBox ? infoBox.querySelector('.short-text') : null;

      if (fullText && shortText) {
        if (fullText.classList.contains('hidden')) {
          fullText.classList.remove('hidden');
          shortText.classList.add('hidden'); // Hide short text if needed
          button.textContent = 'Kthehu prapa';
        } else {
          fullText.classList.add('hidden');
          shortText.classList.remove('hidden');
          button.textContent = 'Lexo më shumë';
        }
      } else {
        console.error('fullText or shortText not found.');
      }
    });
  });

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
  // Check localStorage for saved dark mode preference
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Toggle Dark Mode
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.removeItem('dark-mode');
    }
  });
} else {
  console.error('Dark mode toggle button not found.');
}
});
