import "./userHistory.css";

document.addEventListener("DOMContentLoaded", async () => {
    const historyHolder = document.querySelector(".translation-history-holder");
  
    async function checkAuth() {
      try {
        const response = await fetch("https://localhost:5000/api/users/me", {
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
        const response = await fetch(`https://localhost:5000/api/users/${userId}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const user = await response.json();
        return [...user.userCompleted, ...user.userTranslations].sort(
          (a, b) => new Date(b.date || b.date_of_completion) - new Date(a.date || a.date_of_completion)
        );
      } catch (error) {
        console.error("Error fetching user actions:", error);
      }
    }
  
    function renderHistory(actions) {
      historyHolder.innerHTML = "";
      actions.forEach((action) => {
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
  
        date.textContent = new Date(action.date || action.date_of_completion).toLocaleDateString();
  
        details.appendChild(phrase);
        details.appendChild(date);
        card.appendChild(title);
        card.appendChild(document.createElement("hr"));
        card.appendChild(details);
        historyHolder.appendChild(card);
      });
    }
  
    const userId = await checkAuth();
    const actions = await fetchUserActions(userId);
    if (actions) renderHistory(actions);
  });