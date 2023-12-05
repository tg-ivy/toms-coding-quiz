const questions = [
    {
        question: "What is a div?",
        answers: [
            {text: "tag", correct: true},
            {text: "function", correct: false},
            {text: "language", correct: false},
            {text: "variable", correct: false}
        ]
    },
    {
        question: "How would you access the first item in an array?",
        answers: [
            {text: "array{0}", correct: false},
            {text: "array.first", correct: false},
            {text: "array[1]", correct: false},
            {text: "array[0]", correct: true}
        ]
    },
    {
        question: "What selector accesses a class in CSS?",
        answers: [
            {text: ".", correct: true},
            {text: "#", correct: false},
            {text: "p", correct: false},
            {text: ">", correct: false}
        ]
    },
    {
        question: "Which of the following statements is correct?",
        answers: [
            {text: "Const, let, and var can all be re-assigned", correct: false},
            {text: "Let variables and const variables have different scopes", correct: false},
            {text: "Var only declares variables, not objects", correct: false},
            {text: "Const cannot be re-assigned", correct: true}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hypertext Markdown Language", correct: false},
            {text: "Hypertext Markup Language", correct: true},
            {text: "Hardware To Motherboard Link", correct: false},
            {text: "Highest Test Mark of Linux", correct: false}
        ]
    },

];


// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------


// Declarations

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start');
const timer = document.getElementById('time');
const questionContainer = document.getElementById('questions');
const question = document.getElementById('question-title');
const questionChoices = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const initials = document.getElementById('initials');
const submitButton = document.getElementById('submit');

localStorage.setItem("Games", 0)

let currentQuestionIndex = 0;
let playerScore = 0;

startButton.addEventListener('click', function() {
    startQuiz();
    timer.innerHTML = startCountdown();
}
);

function startQuiz() {
    startScreen.setAttribute('class', 'hide')
    questionContainer.setAttribute('class', 'show');
    currentQuestionIndex = 0;
    playerScore = 0;
    showQuestion();
};

function showQuestion() {
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + '. ' + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add("btn");
        questionChoices.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
 }


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        //let correctAudio = new Audio('../sfx/correct.wav');
        //correctAudio.play();
        playerScore ++;
        console.log(playerScore)
        currentQuestionIndex ++;
        if (currentQuestionIndex < questions.length) {
           showQuestion(); 
        } else {
            showEndScreen();
        }
    } else {
        //let incorrectAudio = new Audio('../sfx/incorrect.wav');
        //incorrectAudio.play();
        currentQuestionIndex ++;
        if (currentQuestionIndex < questions.length) {
           showQuestion(); 
        } else {
            showEndScreen();
        }
    }
}


 function resetQuestion() {
    while (questionChoices.firstChild) {
        questionChoices.removeChild(questionChoices.firstChild)
    }
}

function showEndScreen() {
    questionContainer.setAttribute('class', 'hide');
    endScreen.setAttribute('class', 'show');
    finalScore.textContent = playerScore;
    submitButton.addEventListener('click', submitScore);
}


function submitScore() {
    localStorage.setItem("Name", initials.value);
    localStorage.setItem("Score", playerScore);
    console.log('HELLO')
}

function startCountdown(seconds) {
    let counter = seconds;
      
    const interval = setInterval(() => {
      console.log(counter);
      counter--;
        
      if (counter < 0 ) {
        clearInterval(interval);
        console.log('Ding!');
      }
    }, 1000);
  }

