let slideIndex = 0;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function changeSlide(n) {
    const slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
}

function showMoreInfo(box) {
    const moreInfo = box.querySelector('.more-info');
    const allBoxes = document.querySelectorAll('.info-box');
    
    allBoxes.forEach(b => {
        if (b !== box) {
            b.classList.remove('active'); // Close other boxes
        }
    });

    box.classList.toggle('active'); // Toggle the clicked box
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(); // Initialize slides
});
