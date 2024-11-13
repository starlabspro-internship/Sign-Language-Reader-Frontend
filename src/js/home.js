import "../assets/css/home.css";

document.addEventListener("DOMContentLoaded", () => {
  // Read more functionality
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

  // Slider functionality
  let list = document.querySelector('.slider .list');
  let items = document.querySelectorAll('.slider .list .item');
  let dots = document.querySelectorAll('.slider .dots li');
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');
  let active = 0;
  let lengthItems = items.length - 1;

  if (next && prev) {
    next.onclick = function() {
      active = (active + 1 > lengthItems) ? 0 : active + 1;
      reloadSlider();
    }

    prev.onclick = function() {
      active = (active - 1 < 0) ? lengthItems : active - 1;
      reloadSlider();
    }
  } else {
    console.error('Next or Prev button not found in the DOM.');
  }

  let refreshSlider = setInterval(() => { next.click() }, 5000);

  function reloadSlider() {
    if (items[active]) {
      let checkLeft = items[active].offsetLeft;
      list.style.left = -checkLeft + 'px';

      const activeDot = document.querySelector('.slider .dots li.active');
      if (activeDot) {
        activeDot.classList.remove('active');
      }
      dots[active].classList.add('active');

      clearInterval(refreshSlider);
      refreshSlider = setInterval(() => { next.click() }, 5000);
    } else {
      console.error('Active item not found.');
    }
  }

  dots.forEach((li, key) => {
    li.addEventListener('click', function() {
      active = key;
      reloadSlider();
    });
  });

  // Video modal functionality
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
