import "./quiz.css";
import questionsJson from "./questions.json";

/* This snippet shortens the HTML CODE */
const checkboxData = [
  {
    id: "shkronjat",
    name: "Shkronjat",
    label: "Alfabeti",
    icon: "fas fa-font",
  },
  {
    id: "numrat",
    name: "Numrat",
    label: "Numrat",
    icon: "fas fa-hashtag",
    checked: true,
  },
  { id: "stinet", name: "Stinet", label: "Stinët", icon: "fas fa-tree" },
  { id: "ditet", name: "Ditet", label: "Ditët", icon: "fas fa-calendar-day" },
  { id: "pemet", name: "Pemet", label: "Pemët", icon: "fas fa-apple-alt" },
  {
    id: "perimet",
    name: "Perimet",
    label: "Perimet",
    icon: "fa-solid fa-carrot",
  },
  {
    id: "sportet",
    name: "Sportet",
    label: "Sportet",
    icon: "fas fa-basketball-ball",
  },
];

const container = document.getElementById("checkboxContainer");

checkboxData.forEach(({ id, name, label, icon, checked }) => {
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "checkbox";

  checkboxWrapper.innerHTML = `
      <label class="checkbox-wrapper">
        <input type="checkbox" id="${id}" name="${name}" class="checkbox-input" ${
    checked ? "checked" : ""
  } />
        <span class="checkbox-tile">
          <span class="checkbox-icon">
            <i class="${icon}"></i> 
          </span>
          <span class="checkbox-label">${label}</span>
        </span>
      </label>
    `;

  container.appendChild(checkboxWrapper);
});
/* This snippet shortens the HTML CODE */

/* Random Button */
document.getElementById("randomButton").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checkbox-input");

  // Clear all selections
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  const randomCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  const randomIndexes = [...checkboxes.keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, randomCount);

  randomIndexes.forEach((index) => {
    checkboxes[index].checked = true;
  });
  playfunction();
});
/* Random Button */

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};

let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const videoContext = require.context("../videos", true, /\.(mp4)$/);
const imageContext = require.context(
  "../photos",
  true,
  /\.(jpg|jpeg|png|gif)$/
);

// Modify the questions array to ensure the file paths are resolved
let questions = questionsJson.map((question) => {
  if (typeof question.fileLocation === "string") {
    if (question.fileType === "video") {
      const relativePath = question.fileLocation
        .replace("../videos", "")
        .replace(/^\/+/, "");
      return {
        ...question,
        fileLocation: videoContext(`./${relativePath}`),
      };
    }

   if (question.fileType === "image") {
  const relativePath = question.fileLocation
    .replace("../photos", "")
    .replace(/^\/+/, "");
  return {
    ...question,
    fileLocation: imageContext(`./${relativePath}`),
  };
}
  }
  return question;
});

// fetch("questions.json").then(res=>{
//     // console.log( res);
//     return res.json();
// }).then(loadedQuestions=>{
//     // console.log(loadedQuestions)
//     questions = loadedQuestions
//     // window.location
//     startGame();
// })
// .catch(e=>{
//     console.error(e);
// })

function goHome() {
  document.getElementById("secondDiv").style.display = "none";
  document.getElementById("thirdDiv").style.display = "none";
  document.getElementById("fourthDiv").style.display = "none";
  document.getElementById("firstDiv").style.display = "block";
}

function goHighestScore() {
  console.log("callign hereee");
  document.getElementById("firstDiv").style.display = "none";
  document.getElementById("secondDiv").style.display = "none";
  document.getElementById("thirdDiv").style.display = "none";

  document.getElementById("fourthDiv").style.display = "block";
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  if (highScores.length === 0) {
    highScoresList.innerHTML = "<p>No high scores available!</p>";
  } else {
    const tableHeader = `
                            <li class="high-score" style="list-style: none;"  >
                                <table style="border: solid 1px #001f3f; width: 100%;">
                                    <thead>
                                        <tr ">
                                            <th>Username</th> 
                                            <th>Points</th>
                                            <th>Quized for</th>
                                        </tr>
                                    </thead>
                                    <tbody id="highScoresBody"></tbody>
                                </table>
                            </li>`;

    highScoresList.innerHTML = tableHeader;

    const highScoresBody = document.getElementById("highScoresBody");

    highScoresBody.innerHTML = highScores
      .map((score) => {
        return `
                        <tr>
                            <td>${score.name}</td>
                            <td>${score.score}</td>
                            <td>${score.choices}</td>
                        </tr>
                    `;
      })
      .join("");
  }
}

function playfunction() {
  let choises_chosen = [];
  choises_chosen["numrat"] = document.getElementById("numrat")?.checked
    ? choises_chosen.push("numrat")
    : null;
  choises_chosen["shkronjat"] = document.getElementById("shkronjat")?.checked
    ? choises_chosen.push("Alfabeti")
    : null;
  choises_chosen["stinet"] = document.getElementById("stinet")?.checked
    ? choises_chosen.push("stinet")
    : null;
  choises_chosen["perimet"] = document.getElementById("perimet")?.checked
    ? choises_chosen.push("perimet")
    : null;
  choises_chosen["sportet"] = document.getElementById("sportet")?.checked
    ? choises_chosen.push("sportet")
    : null;
  choises_chosen["ditet"] = document.getElementById("ditet")?.checked
    ? choises_chosen.push("ditetEJaves")
    : null;
  choises_chosen["pemet"] = document.getElementById("pemet")?.checked
    ? choises_chosen.push("pemet")
    : null;

  localStorage.setItem("choises_chosen", JSON.stringify(choises_chosen));
  // window.location.href = "/game.html"
  document.getElementById("firstDiv").style.display = "none";
  document.getElementById("secondDiv").style.display = "block";
  startGame();
}

// CONSTANTS
const CORRECT_BONUS = 10;
let MAX_QUESTIONS = 4;

const startGame = () => {
  let chosenCategories = localStorage.getItem("choises_chosen") || [];

  questionCounter = 0;
  score = 0;
  availableQuestions = questions.filter((question) =>
    chosenCategories.includes(question.category)
  );
  MAX_QUESTIONS = availableQuestions.length;
  localStorage.setItem("mostRecentScore", 0);
  scoreText.innerText = 0;
  getNewQuestion();
};

const getNewQuestion = () => {
  console.log(questionCounter, "questionCounter");
  console.log(MAX_QUESTIONS, "MAX_QUESTIONS");

  if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("thirdDiv").style.display = "block";
    var mostRecentScore = localStorage.getItem("mostRecentScore");

    finalScore.innerText = `Score: ${mostRecentScore}`;
    return;
  }

  // Increment question counter
  questionCounter++;
  progressText.innerText = `Pyetja ${questionCounter}/${MAX_QUESTIONS}`;

  // Update progressBar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  question.innerHTML = "";

  // Get new question and update UI
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  console.log("currentQuestion,", currentQuestion);

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

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptAnswers) return;
  
      acceptAnswers = false;
  
      const selectedChoice = e.currentTarget; 
      const selectedAnswers = selectedChoice.dataset["number"]; 
  
      const classToApply =
        selectedAnswers == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
  
      selectedChoice.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

//================ END ===================
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

var mostRecentScore = localStorage.getItem("mostRecentScore");

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Score: ${mostRecentScore}`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

const choicesStringS = () => {
  const choiceS = JSON.parse(localStorage.getItem("choises_chosen")) || [];
  console.log(choiceS, "choiceS");

  return choiceS.map((str) => {
    return " " + str;
  });
};

const saveHighScore = () => {
  const score = {
    score: scoreText.innerText,
    choices: choicesStringS(),
    name: username.value,
  };
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  console.log(highScores);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.setItem("mostRecentScore", 0);

  goHighestScore();
};

window.playfunction = playfunction;
window.saveHighScore = saveHighScore;
window.startgame = startGame;
window.goHighestScore = goHighestScore;
window.goHome = goHome;
window.goHome = goHome;
