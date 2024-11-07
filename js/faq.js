// async function fetchFAQData() {
//     try {
//         const response = await fetch('https://example.com/api/faqs');

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const faq_data = await response.json();

//         // Display the FAQ on the page
//         displayFAQ(faq_data);

//     } catch (error) {
//         // Handle errors, such as network issues
//         console.error('Failed to fetch FAQ data:', error);
//     }
//}

import "./app.js";

const faq_response_backend = {
  questions: [
    {
      question: "What is Sign Language?",
      answer: "Sign Language is a visual means of communication.",
    },
    {
      question: "How can I learn Sign Language?",
      answer: "You can learn through online courses or local classes.",
    },
    {
      question: "Is Sign Language universal?",
      answer: "No, different regions have different sign languages.",
    },
    {
      question: "Can I use Sign Language in everyday situations?",
      answer: "Yes, it can be used in various everyday scenarios.",
    },
    {
      question: "Are there resources available for learning Sign Language?",
      answer:
        "Yes, there are numerous online resources and textbooks available.",
    },
    {
      question: "Is Sign Language difficult to learn?",
      answer: "Like any language, it takes practice to become proficient.",
    },
  ],
};

function displayFAQ(faq_response_backend) {
  const faq_ul = document.getElementById("questions");
  const questions = faq_response_backend["questions"];

  list_of_faq = "";

  questions.forEach((faq, index) => {
    const questionId = `question-${index}`;
    const answerId = `answer-${index}`;

    list_of_faq += `
            <li>
                <legend id="${questionId}" style="cursor:pointer;">
                    ${faq.question}
                </legend>
                <p id="${answerId}" style="display:none;">
                    ${faq.answer}
                </p>
            </li>`;
  });

  faq_ul.innerHTML = list_of_faq;
  showAnswer();
}

function showAnswer() {
  const questions = faq_response_backend["questions"];

  questions.forEach((faq, index) => {
    const questionElement = document.getElementById(`question-${index}`);
    const answerElement = document.getElementById(`answer-${index}`);

    questionElement.addEventListener("click", () => {
      if (
        answerElement.style.display === "none" ||
        answerElement.style.display === ""
      ) {
        answerElement.style.display = "block"; // Show answer
      } else {
        answerElement.style.display = "none"; // Hide answer
      }
    });
  });
}

displayFAQ(faq_response_backend);
