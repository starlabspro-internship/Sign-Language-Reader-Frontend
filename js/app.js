import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

//Keto dy rreshta i paraqesin headerin dhe footerin ne secilen faqe qe perdoret app.js
renderHeader();
renderFooter();

// app.js

// app.js

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const infoBox = button.closest('.info-box');
        const fullText = infoBox.querySelector('.full-text');
        const shortText = infoBox.querySelector('.short-text');

        if (fullText.classList.contains('hidden')) {
            fullText.classList.remove('hidden');
            shortText.classList.add('hidden'); // Hide short text if needed
            button.textContent = 'Kthehu prapa';
        } else {
            fullText.classList.add('hidden');
            shortText.classList.remove('hidden');
            button.textContent = 'Lexo më shumë';
        }
    });
});




