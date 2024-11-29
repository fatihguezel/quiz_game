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
    question: "Wie hoch sind die Spesen eines Frauen Kreisligaspiels?",
    choice1: "DFBModul 28 €",
    choice2: "28 € (SR) vor Ort",
    choice3: "Ohne Vergütung (ehrenamtlich)",
    choice4: "Der Trainer der Heimmannschaft bietet an, was er für fair hält",
    answer: 2 // 28 € (SR) vor Ort
  },
  {
    question:" Wie viele Lehrabende muss ein Wolfsburger SR in einer Saison besuchen, um als SR für seinen Verein anerkannt zu werden?",
    choice1: "Keine",
    choice2: "15, aber mit Ausnahmen",
    choice3: "6 Lehrabende",
    choice4: "Man kann Sondertermine für Einzel-Lehrabende beantragen",
    answer: 3 // 6 Lehrabende
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
    question: "Wer leitete als erster und einziger deutscher Schiedsrichter ein FIFA-WM Finale?",
    choice1: "Markus Merk",
    choice2: "Rudi Glöckner",
    choice3: "Walter Eschweiler",
    choice4: "Deniz Aytekin",
    answer: 2 // Rudi Glöckner
  },
  {
    question: "Wie werden die A-Jugend Kreisspiele in Wolfsburg abgerechnet?",
    choice1: "Online über DFBKostenmodul",
    choice2: "Schriftlich mit Zeugen",
    choice3: "Telefonisch bei KSA",
    choice4: "In der Whatsapp Gruppe der Schiri-Wolfsburg",
    answer: 1 // Online über DFBKostenmodul
  },
  {
    question: "Wo findet man die Sonderberichte?",
    
    choice1: "Per Post zugeschickt",
    choice2: "Auf Anfrage per E-Mail vom KSA",
    choice3: "Bei der Stadt, Abteilung Sport",
    choice4: "Im Download-Bereich der Schiri-Homepage",
    answer: 4 // Im Download-Bereich der Schiri-Homepage
  },
  {
    question: "Wie viele gekennzeichnete Platzordner muss der jeweilige Platzverein im Herren, Altherren- und Altsenioren-Bereich stellen??",
    choice1: "3 Ordner",
    choice2: "So viele wie Zuschauerzahl",
    choice3: "ist nicht nötig",
    choice4: "2 an jeder Eckfahne",
    answer: 1 // 3 Ordner
  },
 {
    question: "Welche Mannschaft hat die Meiste Rote Karte (aktueller Stand auf Fussball.de)?",
    choice1: "Sport Union Wolfsburg",
    choice2: "TSG Mörse",
    choice3: "TSV Hehlingen II",
    choice4: "SV Sandkamp",
    answer: 3 // TSV Hehlingen II
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
    question: "Was sagt die neue Sonderregel für Kapitäne aus?",
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
  },
{
    question: "Welcher Mannschaft führt die Fairness Tabelle der Kreisliga Wob (aktueller Stand auf Fussball.de)?",
    choice1: "TSV Sülfeld",
    choice2: "Sport Union Wolfsburg",
    choice3: "VFB Fallersleben II",
    choice4: "Jahn Wolfsburg",
    answer: 1 // TSV Sülfeld
  },
 {
    question: "Darf ein SR im Kreis Wolfsburg ein Spiel leiten ohne offiziellen Spielauftrag?",
    choice1: "Ja, wenn der Verein ihn darum bittet (ohne Zustimmung Kreisansetzer)",
    choice2: "Nein, nur mit offizieller Ansetzung oder vorheriger Zustimmung des Kreisansetzer",
    choice3: "Ja, wenn er doppelten Spesensatz bekommt",
    choice4: "Ja wenn es ein Freundschafts,- oder Benefizspiel ist",
    answer: 2 // Nein, nur mit offizieller Ansetzung oder vorheriger Zustimmung des Kreisansetzer
  },
];


// CONSTANTS
const INCORRECT_TAX = 10;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 13;

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
