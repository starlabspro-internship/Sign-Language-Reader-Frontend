import "./userHistory.css";
import "../profile.css";
import "../profileManager.js";
import API_URL from "../../profile/profileFunctions/apiUrls.js";

document.addEventListener("DOMContentLoaded", async () => {
  const historyHolder = document.querySelector(".translation-history-holder");
  const paginationHolder = document.querySelector(".pagination-holder");
  const itemsPerPage = 5;

  async function checkAuth() {
    try {
      const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Unauthorized");
      const { userId } = await response.json();
      return userId;
    } catch {
      window.location.href = "auth.html";
    }
  }

  async function fetchUserActions(userId) {
    try {
      const response = await fetch(
        `${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      const user = await response.json();
      return [...user.userCompleted, ...user.userTranslations].sort(
        (a, b) =>
          new Date(b.date || b.date_of_completion) -
          new Date(a.date || a.date_of_completion)
      );
    } catch (error) {
      console.error("Error fetching user actions:", error);
    }
  }

  function renderHistory(actions, page = 1) {
    historyHolder.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedActions = actions.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    paginatedActions.forEach((action) => {
      const card = document.createElement("div");
      card.classList.add("history-card");

      const title = document.createElement("h3");
      const details = document.createElement("div");
      const phraseDate = document.createElement("div");
      const phrase = document.createElement("p");
      const date = document.createElement("p");

      details.classList.add("phrase-date");

      if (action.phrase) {
        title.textContent = "Translation";
        phrase.textContent = `Phrase: ${action.phrase}`;
      } else {
        title.textContent = "Quiz Question";
        phrase.textContent = `Completed Question ID: ${action.question_id}`;
      }

      date.textContent = new Date(
        action.date || action.date_of_completion
      ).toLocaleDateString();

      details.appendChild(phrase);
      details.appendChild(date);
      card.appendChild(title);
      card.appendChild(document.createElement("hr"));
      card.appendChild(details);
      historyHolder.appendChild(card);
    });
  }

  function renderPagination(totalItems, currentPage = 1) {
    paginationHolder.innerHTML = ""; // Clear existing buttons
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxButtons = 5; // Number of buttons to display
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Previous Button
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerHTML = '<i class="fa-regular fa-hand-point-left"></i>';
      prevButton.classList.add("pagination-button");
      prevButton.addEventListener("click", () => {
        renderHistory(actions, currentPage - 1);
        renderPagination(totalItems, currentPage - 1);
      });
      paginationHolder.appendChild(prevButton);
    }

    // Page Buttons
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("pagination-button");
      if (i === currentPage) pageButton.classList.add("active");

      pageButton.addEventListener("click", () => {
        renderHistory(actions, i);
        renderPagination(totalItems, i);
      });

      paginationHolder.appendChild(pageButton);
    }

    // Next Button
    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerHTML = '<i class="fa-regular fa-hand-point-right"></i>';
      nextButton.classList.add("pagination-button");
      nextButton.addEventListener("click", () => {
        renderHistory(actions, currentPage + 1);
        renderPagination(totalItems, currentPage + 1);
      });
      paginationHolder.appendChild(nextButton);
    }
  }

  const userId = await checkAuth();
  const actions = await fetchUserActions(userId);
  if (actions) {
    renderHistory(actions, 1);
    renderPagination(actions.length, 1);
  }
});
