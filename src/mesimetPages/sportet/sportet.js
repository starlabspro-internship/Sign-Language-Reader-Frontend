import "./sportet.css";

const videos = {
  Futboll: require('../../videos/sportet/futboll.mp4'),
  Basketboll: require('../../videos/sportet/basketboll.mp4'),
  Hendboll: require('../../videos/sportet/hendboll.mp4'),
  Volejboll: require('../../videos/sportet/volejboll.mp4'),
  Tenis: require('../../videos/sportet/tenis.mp4'),
  Not: require('../../videos/sportet/not.mp4'),
  Golf: require('../../videos/sportet/golf.mp4'),
  Shah: require('../../videos/sportet/shah.mp4'),
  Boks: require('../../videos/sportet/boks.mp4'),
};

document.querySelectorAll('.box').forEach((box) => {
  const topic = box.dataset.topic;
  if (videos[topic]) {
    box.addEventListener('click', () => openModal(videos[topic]));
  }
});

function openModal(videoPath) {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  modal.style.display = 'flex';
  modalVideo.src = videoPath;
  modalVideo.play();
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.src = '';
}

document.getElementById('videoModal').addEventListener('click', closeModal);

document.getElementById('startQuiz').addEventListener('click', () => {
  window.location.href = 'quiz.html';
});

document.getElementById('goBack').addEventListener('click', () => {
  window.location.href = 'mesimet.html';
});
