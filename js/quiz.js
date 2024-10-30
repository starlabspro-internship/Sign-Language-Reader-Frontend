const questionElement = document.getElementById('question');
const imageRows = document.querySelectorAll('.image-row');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-btn');
const feedbackElement = document.getElementById('feedback');

let currentQuestionIndex = 0;

const quizData = [
  {
    question: "What is the sign for letter 'A'?",
    options: [
      { text: 'Image 1', src: 'image1.jpg' },
      { text: 'Image 2', src: 'image2.jpg' },
      { text: 'Image 3', src: 'image3.jpg' },
      { text: 'Image 4', src: 'image4.jpg' },
    ],
    correctAnswer: 'image2.jpg'
  },
  // ... more questions
];

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  imageRows.forEach(row => row.innerHTML = '');

  currentQuestion.options.forEach((option, index) => {
    const imageRow = imageRows[Math.floor(index / 2)];
    const img = document.createElement('img');
    img.src = option.src;
    img.alt = option.text;
    img.addEventListener('click', () => {
      checkAnswer(option.src);
    });
    imageRow.appendChild(img);
  });
}

function checkAnswer(selectedAnswer) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = 'Incorrect. The correct answer is ' + currentQuestion.correctAnswer;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    
    feedbackElement.textContent = 'Quiz completed!';
  }
}

// Initial display
displayQuestion();