import "./numrat.css";

document.getElementById('startQuiz').addEventListener('click', () => {
  window.location.href = 'quiz.html';
});

document.getElementById('goBack').addEventListener('click', () => {
  window.location.href = 'mesimet.html';
});

document.addEventListener("DOMContentLoaded", function () {
  const signVideo = document.getElementById("sign-video");

  // Use require.context to dynamically load video files
  const videos = require.context(
    "../../photos/numrat",
    false,
    /\.(mp4|webm|ogv)$/
  );

  // Function to show video based on button clicked
  function showVideo(number) {
    let videoFound = false;

    // Try to find a video for the number with different extensions
    const possibleExtensions = ["mp4", "webm", "ogv"];
    for (let ext of possibleExtensions) {
      const videoPath = `./${number}.${ext}`;
      if (videos.keys().includes(videoPath)) {
        const sourceElement = signVideo.querySelector("source");
        sourceElement.src = videos(videoPath); // Dynamically import video
        signVideo.load();
        signVideo.play();
        videoFound = true;
        break;
      }
    }

    if (!videoFound) {
      console.error(`Video for number ${number} not found.`);
    }
  }

  const totalButtons = 100;
  const buttonsPerPage = 15;
  const totalPages = Math.ceil(totalButtons / buttonsPerPage);
  let currentPage = 1;

  // Function to render buttons based on the current page
  function renderButtons() {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";

    // Calculate start and end based on current page
    const start = (currentPage - 1) * buttonsPerPage + 1;
    const end = Math.min(currentPage * buttonsPerPage, totalButtons);

    for (let i = start; i <= end; i++) {
      const button = document.createElement("button");
      button.classList.add("button");
      button.setAttribute("data-button", i);
      button.textContent = i;
      button.addEventListener("click", function () {
        showVideo(i);
      });
      buttonContainer.appendChild(button);
    }

    const firstButton = buttonContainer.querySelector(".button");
    if (firstButton) firstButton.click();
  }

  function backBtn() {
    if (currentPage > 1) {
      currentPage--;
      renderButtons();
    }
  }

  function nextBtn() {
    if (currentPage < totalPages) {
      currentPage++; 
      renderButtons();
    }
  }

  renderButtons();

  window.backBtn = backBtn;
  window.nextBtn = nextBtn;
});
