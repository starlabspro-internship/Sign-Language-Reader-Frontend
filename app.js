let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlide += direction;

    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    const slider = document.querySelector('.slides');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function showMoreInfo(box) {
    box.classList.toggle('active');
}

/* Function to scroll to specific sections */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}
