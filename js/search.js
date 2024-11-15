function searchTopics() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        const topic = box.getAttribute('data-topic').toLowerCase(); // Get the data-topic attribute value
        if (topic.startsWith(searchInput)) {
            box.style.display = 'block'; // Show matching box
        } else {
            box.style.display = 'none'; // Hide non-matching box
        }
    });
}


function navigateTo(page) {
    window.location.href = page;
}
