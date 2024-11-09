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

//slider functionality
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let active = 0;
let lengthItems = items.length - 1;

next.onclick = function() {
  active = (active + 1 > lengthItems) ? 0 : active + 1;
  reloadSlider();
}

prev.onclick = function() {
  active = (active - 1 < 0) ? lengthItems : active - 1;
  reloadSlider();
}

let refreshSlider = setInterval(() => { next.click() }, 5000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + 'px';

  document.querySelector('.slider .dots li.active').classList.remove('active');
  dots[active].classList.add('active');

  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => { next.click() }, 5000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', function() {
      active = key;
      reloadSlider();
  });
});

///
const seasons = document.querySelectorAll(".season");
  const videoModal = document.getElementById("video-modal");
  const seasonVideo = document.getElementById("season-video");
  const closeBtn = document.getElementById("close-btn");

  const videoSources = {
    spring: "photos/spring.mp4",
    summer: "photos/vera.mp4",
    fall: "photos/vjeshta.mp4",
    winter: "photos/dimri.mp4"
  };

  seasons.forEach((season) => {
    season.addEventListener("click", () => {
      // Set video source based on the season clicked
      seasonVideo.src = videoSources[season.id];
      videoModal.style.display = "block"; // Show modal
      seasonVideo.play(); // Play video

      // Add the animate class to trigger the animation
      season.classList.add("animate");

      // Remove the animate class after the animation duration to reset it
      setTimeout(() => {
        season.classList.remove("animate");
      }, 500);
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    videoModal.style.display = "none";
    seasonVideo.pause();
    seasonVideo.currentTime = 0; // Reset the video time
  });
