import './quiz.css';
import questionsJson from './questions.json';
console.log('questions1', questionsJson)

// import questions from './questions.json';
// console.log('questions2',questions)

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};

let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// import video0 from '../videos/pemet/banane.mp4';

// import video0 from '../videos/numrat/0.mp4';
// const videoContext = require.context('../videos', true, /\.(mp4)$/);

// const videoContext = require.context('../videos', true, /\.(mp4)$/);

// //DUMMY ARRAY, reason testing
// // let questions =questionsJson;
// let questions = questionsJson.map(question => ({

//     ...question,
//     // fileLocation: video0
//     // fileLocation: videoContext(`/pemet/banane.mp4`)
//     // require.context('${question.fileLocation}', true, /\.(mp4)$/);


//     // fileLocation: video0
//     // fileLocation: require(`${question.fileLocation}`) // Webpack resolves the path
//   }));
// Create a Webpack context for the videos directory
const videoContext = require.context('../videos', true, /\.(mp4)$/);

// Map through the questions and dynamically resolve file locations
let questions = questionsJson.map(question => {
    // Assuming the fileLocation in questionsJson is like '/pemet/banane.mp4'
    const relativePath = question.fileLocation.replace('../videos', '').replace(/^\/+/, '');  // Remove leading slashes or incorrect path

    return {
        ...question,
        fileLocation: videoContext(`./${relativePath}`)
    };
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
    console.log('callign hereee')
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("thirdDiv").style.display = "none";


    document.getElementById("fourthDiv").style.display = "block";
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    if (highScores.length === 0) {
        highScoresList.innerHTML = '<p>No high scores available!</p>';
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

        const highScoresBody = document.getElementById('highScoresBody');


        highScoresBody.innerHTML = highScores.map(score => {
            return `
                        <tr>
                            <td>${score.name}</td>
                            <td>${score.score}</td>
                            <td>${score.choices}</td>
                        </tr>
                    `
        }).join("");
    }
}
// let choises_chosen = []

// let choises_chosen = localStorage.getItem('choises_chosen')|| [];

// document.getElementById('playfunctionid').addEventListener('click', () => {
//     // window.location.href = 'quiz.html';
//     playfunction()
//   });
//   document.getElementById('playfunctionid').addEventListener('click', () => {
//     // window.location.href = 'quiz.html';
//     playfunction()
//   });
// console.log('loadeeedscript')

function playfunction() {
    console.log('playyy')
    let choises_chosen = []
    choises_chosen['numrat'] = document.getElementById('numrat')?.checked ? choises_chosen.push('numrat') : null;
    choises_chosen['shkronjat'] = document.getElementById('shkronjat')?.checked ? choises_chosen.push('Alfabeti') : null;
    choises_chosen['stinet'] = document.getElementById('stinet')?.checked ? choises_chosen.push('stinet') : null;
    choises_chosen['perimet'] = document.getElementById('perimet')?.checked ? choises_chosen.push('perimet') : null;
    choises_chosen['sportet'] = document.getElementById('sportet')?.checked ? choises_chosen.push('sportet') : null;
    choises_chosen['ditet'] = document.getElementById('ditet')?.checked ? choises_chosen.push('ditetEJaves') : null;
    choises_chosen['pemet'] = document.getElementById('pemet')?.checked ? choises_chosen.push('pemet') : null;

    localStorage.setItem('choises_chosen', JSON.stringify(choises_chosen));
    // window.location.href = "/game.html"
    document.getElementById('firstDiv').style.display = 'none'
    document.getElementById('secondDiv').style.display = 'block'
    startGame()
}

// let chosenCategories = localStorage.getItem('choises_chosen', JSON.stringify(choises_chosen));

// CONSTANTS
const CORRECT_BONUS = 10
let MAX_QUESTIONS = 4;

const startGame = () => {

    let chosenCategories = localStorage.getItem('choises_chosen')||[];

    questionCounter = 0;
    score = 0;
    availableQuestions = questions.filter(question =>
        chosenCategories.includes(question.category)
    );
    MAX_QUESTIONS = availableQuestions.length
    localStorage.setItem('mostRecentScore', 0);
    scoreText.innerText = 0;
    getNewQuestion();
}

const getNewQuestion = () => {
    console.log(questionCounter, 'questionCounter')
    console.log(MAX_QUESTIONS, 'MAX_QUESTIONS')

    if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // return window.location.assign('/end.html');
        document.getElementById('secondDiv').style.display = 'none';
        document.getElementById('thirdDiv').style.display = 'block';
        var mostRecentScore = localStorage.getItem('mostRecentScore');

        finalScore.innerText = `Score: ${mostRecentScore}`;

        return
    }

    // Increment question counter
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS} `;

    // Update progressBar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    question.innerHTML = '';

    // Get new question and update UI
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    console.log('currentQuestion,', currentQuestion)

    const question_paragraph = document.createElement('p');
    question_paragraph.innerText = currentQuestion.question;

    // Create div for video or image
    const questionImgOrVideoDiv = document.createElement('div');
    questionImgOrVideoDiv.setAttribute('id', 'question_div_video');
    questionImgOrVideoDiv.innerHTML = '';

    if (currentQuestion.fileType === 'video') {
        const video = document.createElement('video');
        video.setAttribute('id', 'sign-video');
        video.setAttribute('autoplay', 'sign-video');
        video.setAttribute('controls', '');

        console.log(currentQuestion.fileLocation, 'currentQuestion.fileLocation')
        const source = document.createElement('source');
        source.setAttribute('src', currentQuestion.fileLocation);
        source.setAttribute('type', 'video/mp4');

        video.appendChild(source);
        video.innerHTML += 'Your browser does not support the video tag.';
        questionImgOrVideoDiv.appendChild(video);
    }


    if (currentQuestion.fileType === 'image') {
        const img = document.createElement('img');
        img.setAttribute('id', 'sign-image');
        img.setAttribute('src', currentQuestion.fileLocation);
        img.setAttribute('alt', 'Question image');
        questionImgOrVideoDiv.appendChild(img);
    }


    questionImgOrVideoDiv.appendChild(question_paragraph);
    question.appendChild(questionImgOrVideoDiv);


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });


    availableQuestions.splice(questionIndex, 1);

    acceptAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswers = selectedChoice.dataset["number"];

        const classToApply = selectedAnswers == currentQuestion.answer ? 'correct' : 'incorrect';
        // console.log(classToApply);
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

//================ END ===================
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');

var mostRecentScore = localStorage.getItem('mostRecentScore');
// const choices = Array.from(document.getElementsByClassName('choice-text'));

// const choices_chosen = JSON.parse(localStorage.getItem('choices_chosen'))
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// console.log('highScores');
const MAX_HIGH_SCORES = 5;

// const choices_chosen = choices.length

finalScore.innerText = `Score: ${mostRecentScore}`;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

// const choiceS = JSON.parse(localStorage.getItem('choises_chosen')) || [];
// console.log(choiceS, 'choiceS')


// const choicesString = choiceS.map((str) => {
//     return ' ' + str;

// });

// const choiceS = JSON.parse(localStorage.getItem('choises_chosen')) || [];
// console.log(choiceS, 'choiceS')



// const choicesString = choiceS.map((str) => {
//     return ' ' + str;
// });

const choicesStringS = () => {
    const choiceS = JSON.parse(localStorage.getItem('choises_chosen')) || [];
    console.log(choiceS, 'choiceS')



    return choiceS.map((str) => {
        return ' ' + str;
    });
}

// console.log(choicesString, 'choicesString')

// console.log(choicesString);

// const mostRecentScore = localStorage.getItem('mostRecentScore');

const saveHighScore = () => {
    const score = {
        score: scoreText.innerText,
        choices: choicesStringS(),
        name: username.value
    };
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(5);
    console.log(highScores)
    localStorage.setItem('highScores', JSON.stringify(highScores));
    localStorage.setItem('mostRecentScore', 0);

    // var mostRecentScore = localStorage.getItem('mostRecentScore');

    goHighestScore();
};




window.playfunction = playfunction;
window.saveHighScore = saveHighScore;
window.startgame = startGame;
window.goHighestScore = goHighestScore;
window.goHome = goHome;
window.goHome = goHome;





