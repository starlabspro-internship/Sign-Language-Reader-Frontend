import "./ditetEJaves.css";

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
    modalVideo.src = ""; 
}

function navigateTo(page) {
    window.location.href = page;
}
