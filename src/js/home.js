import "../assets/css/home.css";
import { makeVisible } from "./handlers/visibilityHandler.js";

document.addEventListener("DOMContentLoaded", () => {

  async function fetchMostActivePosts() {
    try {
      const response = await fetch("https://localhost:5000/api/post/most-active");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const posts = await response.json();
      
      // Limit to the first 3 posts
      const limitedPosts = posts.slice(0, 3);
  
      // Render the posts
      renderPosts(limitedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  function renderPosts(posts) {
    const container = document.querySelector(".c-post-cards");
    container.innerHTML = ""; // Clear any existing content
  
    posts.forEach(post => {
      // Create a c-card element
      const card = document.createElement("div");
      card.className = "c-card";
      card.innerHTML = `
              <div class="c-post-person">
                <img src=${post.postedBy.userpicture} />
                <h3>${post.postedBy.userName} ${post.postedBy.userSurname}</h3>
              </div>
              <h1 class="c-post-title">"${post.postingTitle}"</h1>
              <div class="c-post-activity">
                <div class="c-post-views">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                  <p>${post.views}</p>
                </div>
                <div class="c-post-likes">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                    />
                  </svg>
                  <p>${post.likes}</p>
                </div>
                <div class="c-post-comments">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-left-dots"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                    />
                    <path
                      d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                    />
                  </svg>
                  <p>${post.comments.length}</p>
                </div>
              </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = "community.html";
      });
  
      // Append the card to the container
      container.appendChild(card);
    });
  }
  
  fetchMostActivePosts();

  // makeVisible('.wwd-left', 'wwd-left-visible');

  makeVisible('.wwd-h2', 'wwd-h2-visible');
  makeVisible('.wwd-p', 'wwd-p-visible');
  makeVisible('.details-btn', 'details-btn-visible');
  
  makeVisible('.ts-p', 'ts-p-visible');
  makeVisible('.trans-image', 'trans-image-visible');
  makeVisible('.trans-hyper', 'trans-hyper-visible');

  makeVisible('.c-h1', 'c-h1-visible');
  makeVisible('.c-h2', 'c-h2-visible');

  makeVisible('.quote-div', 'quote-div-visible')
  makeVisible('.qd2', 'qd2-visible')
  makeVisible('.qd3', 'qd3-visible')

  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
      const infoBox = button.closest('.info-box');
      const fullText = infoBox ? infoBox.querySelector('.full-text') : null;
      const shortText = infoBox ? infoBox.querySelector('.short-text') : null;

      if (fullText && shortText) {
        if (fullText.classList.contains('hidden')) {
          fullText.classList.remove('hidden');
          shortText.classList.add('hidden'); // Hide short text if needed
          button.textContent = 'Kthehu prapa';
        } else {
          fullText.classList.add('hidden');
          shortText.classList.remove('hidden');
          button.textContent = 'Lexo më shumë';
        }
      } else {
        console.error('fullText or shortText not found.');
      }
    });
  });
});