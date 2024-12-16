import "./dailyQuestion.css";
import questionsJson from "./questions.json";
console.log(questionsJson, questionsJson.length, 'questionsJson')

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
// let currentQuestion = {};

let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const videoContext = require.context("../../videos", true, /\.(mp4)$/);
const imageContext = require.context(
  "../../photos",
  true,
  /\.(jpg|jpeg|png|gif)$/
);


// Modify the questions array to ensure the file paths are resolved
let questions = questionsJson.map((question) => {
  if (typeof question.fileLocation === "string") {
    if (question.fileType === "video") {
      const relativePath = question.fileLocation
        .replace("../../videos", "")
        .replace(/^\/+/, "");
      return {
        ...question,
        fileLocation: videoContext(`./${relativePath}`),
      };
    }

    if (question.fileType === "image") {
      const relativePath = question.fileLocation
        .replace("../../photos", "")
        .replace(/^\/+/, "");
      return {
        ...question,
        fileLocation: imageContext(`./${relativePath}`),
      };
    }
  }
  return question;
});


// currentQuestion = questions[Math.floor(Math.random() * 8)];

// Function to get a random question and save it for 24 hours
// function getCurrentQuestion() {
//   const savedQuestion = JSON.parse(localStorage.getItem("currentQuestion")); // Get the saved question
//   const lastUpdate = localStorage.getItem("lastUpdate"); // Get the last update timestamp
//   const currentTime = Date.now();

//   // If a question is already saved and it's been less than 24 hours, return the saved question
//   if (savedQuestion && lastUpdate && currentTime - lastUpdate < 24 * 60 * 60 * 1000) {
//     return savedQuestion;
//   }

//   // Otherwise, pick a new random question
//   const newQuestion = questions[Math.floor(Math.random() * questions.length)];

//   // Save the new question and the timestamp to localStorage
//   localStorage.setItem("currentQuestion", JSON.stringify(newQuestion));
//   localStorage.setItem("lastUpdate", currentTime);
//   localStorage.setItem("isAnswered", false); // Reset the answered status


//   return newQuestion;
// }


// Function to get or initialize the current question
function getCurrentQuestion() {
  const savedQuestion = JSON.parse(localStorage.getItem("currentQuestion")); // Retrieve the saved question
  const lastUpdate = localStorage.getItem("lastUpdate"); // Retrieve the last update timestamp
  const isAnswered = JSON.parse(localStorage.getItem("isAnswered")); // Retrieve the answered status
  const currentTime = Date.now();

  // Check if 24 hours have passed
  if (savedQuestion && lastUpdate && currentTime - lastUpdate < 24 * 60 * 60 * 1000) {
    if (isAnswered) {
      // If the question is already answered, always show the second div
      // showFinalDiv(savedQuestion, true);
      return  null; // No need to start with the question
    } else {
      return savedQuestion; // Return the question to start
    }
  }

  // Otherwise, reset and start with a new question
  const newQuestion = questions[Math.floor(Math.random() * questions.length)];
  localStorage.setItem("currentQuestion", JSON.stringify(newQuestion));
  localStorage.setItem("lastUpdate", currentTime);
  localStorage.setItem("isAnswered", false); // Reset the answered status
  return newQuestion;
}


// // Modify the questions array to ensure the file paths are resolved
// let questions = questionsJson.map((question) => {
//   if (typeof question.fileLocation === "string") {
//     if (question.fileType === "video") {
//       const relativePath = question.fileLocation
//         .replace("../../videos", "")
//         .replace(/^\/+/, "");
//       return {
//         ...question,
//         fileLocation: videoContext(`./${relativePath}`),
//       };
//     }

//     if (question.fileType === "image") {
//       const relativePath = question.fileLocation
//         .replace("../../photos", "")
//         .replace(/^\/+/, "");
//       return {
//         ...question,
//         fileLocation: imageContext(`./${relativePath}`),
//       };
//     }
//   }
//   return question;
// });

// Retrieve the current question, ensuring it remains the same for 24 hours
const currentQuestion = getCurrentQuestion();

console.log("Current Question:????", currentQuestion);



const startGame = () => {

  var isAnswered = JSON.parse(localStorage.getItem("isAnswered")); // Retrieve the answered status

  if(isAnswered){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
   document.getElementById("finalSay").innerText = "Keni perfunduar pyetjen e dites ";
   return
  }
  

  question.innerHTML = "";

  // Get new question and update UI
  // const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  const questionIndex = 0

  
   
  console.log("currentQuestion,::::", currentQuestion);

  const question_paragraph = document.createElement("p");
  question_paragraph.innerText = currentQuestion.question;

  // Create div for image, video, or text content
  const questionContentDiv = document.createElement("div");
  questionContentDiv.setAttribute("id", "question_content");

  // Handle video files
  if (currentQuestion.fileType === "video") {
    const video = document.createElement("video");
    video.setAttribute("id", "sign-video");
    video.setAttribute("autoplay", "sign-video");
    video.setAttribute("controls", "");

    const source = document.createElement("source");
    source.setAttribute("src", currentQuestion.fileLocation);
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
    video.innerHTML += "Your browser does not support the video tag.";
    questionContentDiv.appendChild(video);
  }

  // Handle image files
  if (currentQuestion.fileType === "image") {
    const img = document.createElement("img");
    img.setAttribute("id", "sign-image");
    img.setAttribute("src", currentQuestion.fileLocation);
    img.setAttribute("alt", "Question image");
    questionContentDiv.appendChild(img);
  }

  // Handle text files
  if (currentQuestion.fileType === "text") {
    const text = document.createElement("p");
    text.innerText = currentQuestion.question;
    questionContentDiv.appendChild(text);
  }

  questionContentDiv.appendChild(question_paragraph);
  question.appendChild(questionContentDiv);

  // Populate choices with image or text depending on the choice content
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    let choiceContent = currentQuestion["choice" + number];

    if (typeof choiceContent === "object" && choiceContent !== null) {
      choiceContent = choiceContent.fileLocation;
    }

    if (choiceContent.match(/\.(jpg|jpeg|png|gif)$/)) {
      const img = document.createElement("img");
      img.setAttribute("src", choiceContent);
      img.setAttribute("alt", `Choice ${number} image`);

      choice.innerHTML = "";
      choice.appendChild(img);
    } else {
      choice.innerText = choiceContent;
    }
  });

  availableQuestions.splice(questionIndex, 1);

  acceptAnswers = true;
  
};
startGame()


choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;

    acceptAnswers = false;

    const selectedChoice = e.currentTarget;
    const selectedAnswers = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswers == currentQuestion.answer ? "correct" : "incorrect";
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
    console.log('classToApply',classToApply)
    if (classToApply === "correct") {
      document.getElementById("finalSay").innerText = "Urime pergjigja juaj eshte e sakte!";
      localStorage.setItem("isAnswered", true);

      // incrementScore(CORRECT_BONUS);
    }else{
      localStorage.setItem("isAnswered", true);
      document.getElementById("finalSay").innerText ="Nuk eshte pergjige e sakte, shikoni mesimet";
    }


    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      // getNewQuestion();
    }, 1000);
  });
});


window.startgame = startGame;