import "./pemet.css";

const videos = {
  Molle: require('../../videos/pemet/molle.mp4'),
  Dardhe: require('../../videos/pemet/dardhe.mp4'),
  Kumbull: require('../../videos/pemet/kumbull.mp4'),
  Qershi: require('../../videos/pemet/qershi.mp4'),
  Luleshtrydhe: require('../../videos/pemet/luleshtrydhe.mp4'),
  Portokall: require('../../videos/pemet/portokall.mp4'),
  Shalqi: require('../../videos/pemet/shalqi.mp4'),
  Pjeshka: require('../../videos/pemet/pjeshke.mp4'),
  Banane: require('../../videos/pemet/banane.mp4'),
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
  modalVideo.src = videoPath;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modal.style.display = 'none';
  modalVideo.src = '';
}


document.getElementById('videoModal').addEventListener('click', closeModal);


document.getElementById('startQuiz').addEventListener('click', () => {
  window.location.href = 'quiz.html';
});

document.getElementById('goBack').addEventListener('click', () => {
  window.location.href = 'mesimet.html';
});
