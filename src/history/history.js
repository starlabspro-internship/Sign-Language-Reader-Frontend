import "./history.css";

document.addEventListener("DOMContentLoaded", function () {
  // Get all date elements and issue elements
  const dates = document.querySelectorAll('#dates a');
  const issues = document.querySelectorAll('#issues li');

  let currentIndex = 0; // Start from the first item

  // Function to update the selected class for the timeline
  function updateSelection(index) {
    // Remove the 'selected' class from the previous selected date and issue
    dates.forEach((date) => date.classList.remove('selected'));
    issues.forEach((issue) => issue.classList.remove('selected'));
  
    // Add 'selected' class to the new date and issue
    dates[index].classList.add('selected');
    issues[index].classList.add('selected');
  
    // Update the content visibility
    issues.forEach((issue, idx) => {
      if (idx === index) {
        issue.style.display = 'block';  // Show the selected issue
      } else {
        issue.style.display = 'none';   // Hide all other issues
      }
    });
  
    // Scroll to the selected issue smoothly with extra top space
    issues[index].scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Adjusted for better centering
      inline: 'nearest'
    });
  
    // Add space at the top for visibility
    window.scrollBy(0, -50); // Scroll up slightly to provide space for the arrow
  }

  // Event listener for date clicks
  dates.forEach((date, index) => {
    date.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      currentIndex = index; // Update the current index
      updateSelection(currentIndex); // Update the timeline
    });
  });

  // Event listener for next button
  document.getElementById('next').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex < dates.length - 1) {
      currentIndex++; // Move to the next date
      updateSelection(currentIndex);
    }
  });

  // Event listener for previous button
  document.getElementById('prev').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--; // Move to the previous date
      updateSelection(currentIndex);
    }
  });

  // Initialize the first selection
  updateSelection(currentIndex);
});
