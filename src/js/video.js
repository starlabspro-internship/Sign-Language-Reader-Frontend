// Play video on hover, pause and reset on mouse leave
document.querySelectorAll('.box video').forEach(video => {
    video.addEventListener('mouseover', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // Reset video on mouse leave
    });
  });
  
  function openModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Set the source of the modal video to the selected video's source
    modalVideo.src = videoSrc;
    modalVideo.load(); // Load the video with the new source
    modalVideo.autoplay = true; // Set autoplay to true
    modalVideo.loop = true;
    modal.style.display = 'flex'; // Show modal
  }
  
  // Function to close the modal and reset the video
  function closeModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.style.display = 'none'; // Hide modal
    modalVideo.pause(); // Pause the video
    modalVideo.currentTime = 0; // Reset the video to the beginning
    modalVideo.src = ""; 
  }






  