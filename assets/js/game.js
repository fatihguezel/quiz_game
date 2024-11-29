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
  {
    question: "Wer ist Staffelleiter der Alten Herren?",
    choice1: "Mehmet Akyol",
    choice2: "Bernd Hartwig",
    choice3: "Claudio Menna",
    choice4: "Jacob Oliver",
    answer: 1 // Mehmet Akyol ist die richtige Antwort
  },
  {
    question: "Wie hoch sind die SR-Spesen für die Kreisliga WOB und wie wird abgerechnet?",
    choice1: "Vor Ort 35 €",
    choice2: "DFB-Modul 35 €",
    choice3: "Ohne Vergütung (ehrenamtlich)",
    choice4: "Der Trainer der Heimmannschaft bietet an, was er für fair hält",
    answer: 2 // DFB-Modul 35 €
  },
  {
    question: "Wie viele Schiedsrichter wurden im letzten Lehrgang ausgebildet?",
    choice1: "Keine",
    choice2: "17, aber mit Ausnahmen",
    choice3: "12 neue Schiris",
    choice4: "Der Lehrgang wurde verschoben",
    answer: 3 // 12 neue Schiris
  },
  {
    question: "Wie lange dauert ein C-Jugend-Kreisliga-Spiel?",
    choice1: "3x25 Minuten",
    choice2: "2x40 Minuten",
    choice3: "2x35 Minuten",
    choice4: "Der Schiri und der Trainer der Gäste entscheiden spontan",
    answer: 3 // 2x35 Minuten
  },
  {
    question: "Wie wird man Schiedsrichter?",
    choice1: "Man wird als Schiri geboren",
    choice2: "Mindestalter + Lehrgang + Prüfung",
    choice3: "Das wird meistens Eltern vererbt",
    choice4: "Bewernung und Lebenslauf an den KSA schicken",
    answer: 2 // Mindestalter, Lehrgang und Prüfung
  },
  {
    question: "Wofür werden Sonderberichte erstellt?",
    choice1: "Für Vorkommnisse und Feldverweise",
    choice2: "Um Wünsche zu äußern",
    choice3: "Wenn die Heimmannschaft mehr als 3 Tore kassiert hat",
    choice4: "Als Erinnerung an besonders schöne Spiele",
    answer: 1 // Für Vorkommnisse und Feldverweise
  },
  {
    question: "Wo findet man die Sonderberichte?",
    choice1: "Im Download-Bereich der Schiri-Homepage",
    choice2: "Per Post zugeschickt",
    choice3: "Auf Anfrage per E-Mail vom KSA",
    choice4: "Bei der Stadt, Abteilung Sport",
    answer: 1 // Im Download-Bereich der Schiri-Homepage
  },
  {
    question: "Wie viele aktive Schiedsrichter hat Wolfsburg?",
    choice1: "3",
    choice2: "97",
    choice3: "96",
    choice4: "95",
    answer: 4 // 95
  },
  {
    question: "Wie viele Auswechslungen sind in der Alt-Senioren erlaubt?",
    choice1: "5 mit Torwarthandschuhen",
    choice2: "4*",
    choice3: "5*",
    choice4: "Der Staffelleiter entscheidet 30 Min. vor dem Spiel",
    answer: 2 // 4*
  },
  {
    question: "Was sagt die Sonderregel für Kapitäne aus?",
    choice1: "Nur er darf Straf- und Freistöße ausführen",
    choice2: "Er ist Freund und Helfer des Schiris",
    choice3: "Er bekommt nach dem Spiel doppelte Pommes Rot/Weiß",
    choice4: "Nur der Kapitän darf mit dem Schiri diskutieren",
    answer: 4 // Nur der Kapitän darf mit dem Schiri diskutieren
  },
  {
    question: "Wer wurde DFB-Schiedsrichter des Jahres?",
    choice1: "Deniz Aytekin",
    choice2: "Keiner, weil der DFB-Vorstand Magenprobleme hatte",
    choice3: "Daniel Siebert",
    choice4: "Sascha Stegemann, weil er 5 Spiele in Japan gepfiffen hat",
    answer: 1 // Deniz Aytekin
  }
];


// CONSTANTS
const INCORRECT_TAX = 10;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 11;

// Start Game
startGame = () => {
  questionCounter = 0;
  score = 200;
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
