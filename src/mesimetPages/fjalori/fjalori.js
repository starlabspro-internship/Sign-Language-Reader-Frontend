import "./fjalori.css";

const videos = {
  Pershendetje: require('../../videos/pershendetjet/pershendetje.mp4'),
  'Te Lutem': require('../../videos/pershendetjet/telutem.mp4'),
  Mirupafshim: require('../../videos/pershendetjet/mirupafshim.mp4'),
  Faleminderit: require('../../videos/pershendetjet/faleminderit.mp4'),
  'Me fal': require('../../videos/pershendetjet/mefal.mp4'),
  Bashkebisedim: require('../../videos/pershendetjet/bashkebisedim.mp4'),
  Shkolle: require('../../videos/pershendetjet/shkolle.mp4'),
  Enderr: require('../../videos/pershendetjet/enderr.mp4'),
  Shtepi: require('../../videos/pershendetjet/shtepi.mp4'),
  Fqinj: require('../../videos/pershendetjet/fqinj.mp4'),
  Perfundim: require('../../videos/pershendetjet/lamtumire-perfundim.mp4'),
  Shkoj: require('../../videos/pershendetjet/shkoj.mp4'),
  'i yti/ e jotja': require('../../videos/pershendetjet/i-yti.mp4'),
  Urdhero: require('../../videos/pershendetjet/urdhero.mp4'),
  Prit: require('../../videos/pershendetjet/prit.mp4'),
  Mengjes: require('../../videos/pershendetjet/mengjes.mp4'),
  Pasdite: require('../../videos/pershendetjet/pasdite.mp4'),
  Mbremje: require('../../videos/pershendetjet/mbremje.mp4'),
  Kulture: require('../../videos/pershendetjet/kulture.mp4'),
  Bravo: require('../../videos/pershendetjet/bravo.mp4'),
  Praktike: require('../../videos/pershendetjet/praktike.mp4'),
  'Rregull,Rregullisht': require('../../videos/pershendetjet/rregull-rregullisht.mp4'),
  Ndihme: require('../../videos/pershendetjet/ndihme.mp4'),
  Ose: require('../../videos/pershendetjet/ose.mp4'),
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
  modalVideo.src = videoPath; // Webpack-resolved path
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
