import "./faq.css";

document.addEventListener("DOMContentLoaded", () => {
    const questionsList = document.getElementById("questions");
    const questionInput = document.querySelector(".make-q textarea");
    const sendButton = document.querySelector(".make-q button");
  
    async function loadShowcasedFaqs() {
      try {
        const response = await fetch("https://localhost:5000/api/faq", {
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error("Failed to load FAQs");
        }
        const faqs = await response.json();
        displayFaqs(faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }
  
    function displayFaqs(faqs) {
        questionsList.innerHTML = ""; 
        faqs.forEach((faq) => {
          const li = document.createElement("li");
          const questionText = document.createElement("strong");
          const answerText = document.createElement("p");
      
          questionText.innerText = `Q: ${faq.question}`;
          answerText.innerText = `A: ${faq.answer || "No answer yet."}`;
          answerText.style.display = "none"; 
      
          li.addEventListener("click", () => {
            if (answerText.style.display === "none") {
              answerText.style.display = "block";
            } else {
              answerText.style.display = "none";
            }
          });
      
          li.appendChild(questionText);
          li.appendChild(answerText);
          questionsList.appendChild(li);
        });
    }
      
    sendButton.addEventListener("click", async () => {
      const question = questionInput.value.trim();
      if (!question) {
        showNotification("Please enter a question.", "error");
        return;
      }
    
      try {
        const response = await fetch("https://localhost:5000/api/faq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
          credentials: "include",
        });
    
        if (!response.ok) {
          const responseText = await response.text();  
          let responseData;
          try {
            responseData = JSON.parse(responseText);  
          } catch (error) {
            responseData = { message: responseText };  
          }
          // showNotification(`Error: ${responseData.message || responseText}`, "error");
          showNotification(`Error: Please log-in`);
          return;
        }
    
        const newFaq = await response.json();
        showNotification("Your question has been submitted!", "success");
        questionInput.value = "";
        loadShowcasedFaqs();
      } catch (error) {
        console.error("Error submitting question:", error);
        showNotification("Failed to submit your question. Please try again later.", "error");
      }
    });
    
    function showNotification(message, type) {
      const notification = document.getElementById("notification");
      const notificationMessage = document.getElementById("notification-message");
    
      notificationMessage.textContent = message;
      notification.className = `notification ${type}`;
    
      notification.style.display = "block"; 
    
      setTimeout(() => {
        notification.style.display = "none"; 
      }, 4000);
    }
    
    
    loadShowcasedFaqs();
  });