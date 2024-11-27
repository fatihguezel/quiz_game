const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  // Alte Fragen hier...
  {
    question: "Welches Team gewann die Fußball-Weltmeisterschaft 2022?",
    choice1: "Frankreich",
    choice2: "Argentinien",
    choice3: "Brasilien",
    choice4: "Deutschland",
    answer: 2
  },
  {
    question: "Wer war der Torschützenkönig der Fußball-Weltmeisterschaft 2022?",
    choice1: "Lionel Messi",
    choice2: "Cristiano Ronaldo",
    choice3: "Kylian Mbappé",
    choice4: "Olivier Giroud",
    answer: 3
  },
  {
    question: "Welcher Verein gewann die Champions League 2023?",
    choice1: "Real Madrid",
    choice2: "Manchester City",
    choice3: "FC Bayern München",
    choice4: "Paris Saint-Germain",
    answer: 2
  },
  {
    question: "Wer erzielte das entscheidende Tor im Champions-League-Finale 2023?",
    choice1: "Erling Haaland",
    choice2: "Kevin De Bruyne",
    choice3: "Rodri",
    choice4: "Phil Foden",
    answer: 3
  },
  {
    question: "In welchem Land fand die Weltmeisterschaft 2022 statt?",
    choice1: "Russland",
    choice2: "Katar",
    choice3: "USA",
    choice4: "England",
    answer: 2
  }
];


//CONSTANTS
const INCORRECT_TAX = 10;
const CORRECT_BONUS = 10; // Punkte für richtige Antwort
const MAX_QUESTIONS = 5;

// Start Game
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS); // Punkte erhöhen
    } else if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX); // Optional: Punkte abziehen
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Score erhöhen
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Score reduzieren (bei falscher Antwort oder Zeitablauf)
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};

startGame();
