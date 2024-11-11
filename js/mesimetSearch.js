function navigateTo(page) {
    window.location.href = page;
}

function searchTopics() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        let topic = box.getAttribute("data-topic").toLowerCase();
        if (topic.startsWith(input)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}
