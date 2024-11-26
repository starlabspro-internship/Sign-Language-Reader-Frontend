import "./stinet.css";

document.getElementById('startQuiz').addEventListener('click', () => {
    window.location.href = 'quiz.html';
});

document.getElementById('goBack').addEventListener('click', () => {
    window.location.href = 'mesimet.html';
});

const seasons = document.querySelectorAll(".season");
const videoModal = document.getElementById("video-modal");
const seasonVideo = document.getElementById("season-video");
const closeBtn = document.getElementById("close-btn");
const body = document.body;

// Video sources for seasons
const videoSources = {
    spring: require('../../videos/stinet/spring.mp4'),
    summer: require('../../videos/stinet/summer.mp4'),
    fall: require('../../videos/stinet/fall.mp4'),
    winter: require('../../videos/stinet/winter.mp4'),
};

// Open modal for the selected season
seasons.forEach((season) => {
    season.querySelector(".season-btn").addEventListener("click", () => {
        // Set video source dynamically based on season
        seasonVideo.src = videoSources[season.id];
        videoModal.style.display = "flex";
        seasonVideo.play();

        // Change background based on selected season
        // body.style.backgroundImage = `url('../../photos/${season.id}.jpg')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
    });
});

// Close modal functionality
closeBtn.addEventListener("click", () => {
    videoModal.style.display = "none";
    document.body.style.overflow = "auto";
    seasonVideo.pause();
    seasonVideo.currentTime = 0;
});
