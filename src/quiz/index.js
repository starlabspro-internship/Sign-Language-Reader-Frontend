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



//DUMMY ARRAY, reason testing
let questions = [];

fetch("questions.json").then(res=>{
    // console.log( res);
    return res.json();
}).then(loadedQuestions=>{
    // console.log(loadedQuestions)
    questions = loadedQuestions
    startGame();
})
.catch(e=>{
    console.error(e);
})

function goHome(){
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("thirdDiv").style.display = "none";
    document.getElementById("fourthDiv").style.display = "none";

    
    document.getElementById("firstDiv").style.display = "block";
}

function goHighestScore(){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("thirdDiv").style.display = "none";

    
    document.getElementById("fourthDiv").style.display = "block";
}
let choises_chosen = []


function play() {
    choises_chosen = []
    choises_chosen['numrat'] = document.getElementById('numrat')?.checked ? choises_chosen.push('numrat'): null;
    choises_chosen['shkronjat'] = document.getElementById('shkronjat')?.checked ? choises_chosen.push('shkronjat'): null;
    choises_chosen['stinet'] = document.getElementById('stinet')?.checked ? choises_chosen.push('seasons'): null;
    choises_chosen['perimet'] = document.getElementById('perimet')?.checked ? choises_chosen.push('perimet'): null;
    choises_chosen['sportet'] = document.getElementById('sportet')?.checked ? choises_chosen.push('sportet'): null;

    localStorage.setItem('choises_chosen', JSON.stringify(choises_chosen));
    // window.location.href = "/game.html"
    document.getElementById('firstDiv').style.display='none'
    document.getElementById('secondDiv').style.display='block'
}

let chosenCategories = localStorage.getItem('choises_chosen', JSON.stringify(choises_chosen));

// CONSTANTS
const CORRECT_BONUS = 10
let MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0; 
    availableQuestions = questions.filter(question =>
        chosenCategories.includes(question.category)
    );
    MAX_QUESTIONS = availableQuestions.length

    getNewQuestion();
}

getNewQuestion = () => {
    console.log(questionCounter, 'questionCounter')
    console.log(MAX_QUESTIONS, 'MAX_QUESTIONS')

    if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // return window.location.assign('/end.html');
        document.getElementById('secondDiv').style.display='none';
        document.getElementById('thirdDiv').style.display='block';
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

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

//================ END ===================
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn'); 
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
// const choices = Array.from(document.getElementsByClassName('choice-text'));

// const choices_chosen = JSON.parse(localStorage.getItem('choices_chosen'))
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// console.log('highScores');
const MAX_HIGH_SCORES = 5;

// const choices_chosen = choices.length

finalScore.innerText =`Score: ${mostRecentScore}` ;

username.addEventListener('keyup', ()=>{
    saveScoreBtn.disabled = !username.value;
})

const choiceS = JSON.parse(localStorage.getItem('choises_chosen'));
console.log(choiceS, 'choiceS')


const choicesString = choiceS.map((str) => {
  return ' ' + str; 
});
console.log(choicesString, 'choicesString')

console.log(choicesString);


const saveHighScore = () =>{
    // e.preventDefault();
    const score = {
        score: mostRecentScore,
        choices: choicesString,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b)=> b.score - a.score)
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    goHighestScore();
};


//================ HIGHSCORES ===================
const highScoresList = document.getElementById('highScoresList');
console.log(highScoresList, 'highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores'));
console.log(highScores, 'highScores')
// const choiceS = JSON.parse(localStorage.getItem('choises_chosen'));
console.log(choiceS, 'choiceS')


// const choicesString = choiceS.map((str) => {
//   return ' ' + str; 
// });

// console.log(choicesString);
// highScores = localStorage.getItem(choicesString, 'choicesString');

if (highScores.length === 0) {
    highScoresList.innerHTML = '<p>No high scores available!</p>';
} else {
    highScoresList.innerHTML = highScores.map(score =>{
        return `<li class="high-score">
                    <table style="border:solid 1px #001f3f">
                        <tr>
                            <th>Username</th> 
                            <th>Points</th>
                            <th>Quized for</th>
                        </tr>
                        <tr>
                            <td>${score.name}</td>
                            <td>${score.score}</td>
                            <td>${score.choices}</td>
                        </tr>
                    </table>
                </li>`
    }).join("");
}