import "./ditetEJaves.css";

const videos = {
  Hënë: require('../../videos/ditetEJaves/eHene.mp4'),
  Martë: require('../../videos/ditetEJaves/eMarte.mp4'),
  Mërkurë: require('../../videos/ditetEJaves/eMerkure.mp4'),
  Enjte: require('../../videos/ditetEJaves/eEnjte.mp4'),
  Premte: require('../../videos/ditetEJaves/ePremte.mp4'),
  Shtunë: require('../../videos/ditetEJaves/eShtune.mp4'),
  Dielë: require('../../videos/ditetEJaves/eDiel.mp4'),
};


document.querySelectorAll('.day-box').forEach((box) => {
  const day = box.dataset.day;
  if (videos[day]) {
    box.addEventListener('click', () => openModal(videos[day]));
  }
});

function openModal(videoSrc) {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  modal.style.display = 'flex';
  modalVideo.src = videoSrc;
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
