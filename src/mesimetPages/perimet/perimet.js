import "./perimet.css";

const videos = {
  spec: require('../../videos/perimet/spec.mp4'),
  domate: require('../../videos/perimet/domate.mp4'),
  tranguj: require('../../videos/perimet/tranguj.mp4'),
  patate: require('../../videos/perimet/patate.mp4'),
  qepe: require('../../videos/perimet/qep.mp4'),
  hudher: require('../../videos/perimet/hudher.mp4'),
  karrot: require('../../videos/perimet/karrote.mp4'),
  Kungull: require('../../videos/perimet/kungull.mp4'),
  spinaq: require('../../videos/perimet/spinaq.mp4'),
  avokado: require('../../videos/perimet/avokado.mp4'),
  ullinj: require('../../videos/perimet/ullinj.mp4'),
  laker: require('../../videos/perimet/laker.mp4'),
  lulelaker: require('../../videos/perimet/lulelaker.mp4'),
  brokoli: require('../../videos/perimet/brokoli.mp4'),
};

document.querySelectorAll('.box').forEach((box) => {
  const topic = box.dataset.topic; // Match `data-topic` attribute
  if (videos[topic]) {
      box.addEventListener('click', () => openModal(videos[topic]));
  }
});

function openModal(videoPath) {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modalVideo.src = videoPath; // Set the correct path resolved by Webpack
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
    window.location.href = '../mesimet.html';
  });