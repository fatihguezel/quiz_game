const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;

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

// CONSTANTS
const INCORRECT_TAX = 10;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// Start Game
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuestions = [...questions];
  getNewQuestion();

  timer = setInterval(() => {
    score = Math.max(0, score - 1); // Verhindert negativen Score
    scoreText.innerText = score;

    if (score <= 0) {
      endGame();
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    endGame();
    return;
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// Get User's Choice
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Increment Score
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// Decrement Score
decrementScore = (num) => {
  score = Math.max(0, score - num); // Verhindert negativen Score
  scoreText.innerText = score;
};

// End Game
endGame = () => {
  clearInterval(timer);
  localStorage.setItem("mostRecentScore", score);
  window.location.assign("../html/end.html");
};

startGame();
