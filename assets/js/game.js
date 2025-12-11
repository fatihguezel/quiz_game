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
  question: "Wer ist der Kreisansetzer für die Jugend in der Saison 2025/26?",
  choice1: "Selbstbedienung, so lange der Vorrat reicht",
  choice2: "Bernd Hartwig",
  choice3: "Claudio Menna",
  choice4: "Jung-Schiedsrichter des Jahres 2024/25",
  answer: 3
},
{
  question: "Wie viele Lehrabende muss ein Wolfsburger SR in einer Saison besuchen, um als SR für seinen Verein anerkannt zu werden?",
  choice1: "Keine",
  choice2: "15, aber mit Ausnahmen",
  choice3: "6 Lehrabende",
  choice4: "Man kann Sondertermine für Einzel-Lehrabende beantragen",
  answer: 3
},
{
  question: "Wie viele gelbe Karten gab es in der Kreisliga bis jetzt (aktueller Stand auf Fussball.de)?",
  choice1: "Alle 11 Minuten eine gelbe Karte – aber nur für nicht zahlende Premium-Mitglieder",
  choice2: "3",
  choice3: "279",
  choice4: "420",
  answer: 3
},
{
  question: "Was muss ein SR tun, wenn ein Spieler eine Brille trägt?",
  choice1: "Die Brille muss aus Kunststoff sein und fest sitzen",
  choice2: "Der Spieler muss eine schriftliche Erklärung des Optikers vorlegen",
  choice3: "Der Spieler muss („ich schwöre passiert nichts“) sagen",
  choice4: "Der SR muss die Brille vor Spielbeginn selbst testen („Sieht man da scharf?“)",
  answer: 1
},
{
  question: "Wann wird ein Sonderbericht geschrieben?",
  choice1: "Wenn man Beziehungsprobleme hat",
  choice2: "Wenn ein Vorfall für einen Sonderbericht vorliegt",
  choice3: "Wann man will, der Schiri ist der König",
  choice4: "Wenn man Mathe-Leistungskurs besucht und Tiefpunkte berechnen kann",
  answer: 2
},
{
  question: "Wo findet man die Sonderberichte?",
  choice1: "Flyeralarm unter Kategorie Sales",
  choice2: "Auf Anfrage per E-Mail vom KSA",
  choice3: "Bei der Polizei mit Lichtbildausweis",
  choice4: "Im Download-Bereich der Schiri-Homepage",
  answer: 4
},
{
  question: "Wie viele gekennzeichnete Platzordner muss der jeweilige Platzverein im Herren-, Altherren- und Altsenioren-Bereich stellen?",
  choice1: "3 Ordner",
  choice2: "So viele wie Food-Content-Hashtags von Söder",
  choice3: "Ist nicht nötig, wenn man Kickboxen kann",
  choice4: "3 für jedes Tor, das die Heimmannschaft kassiert",
  answer: 1
},
{
  question: "Wie hoch sind die Spesen eines Frauen-Kreisliga-Spiels?",
  choice1: "DFB-Modul 28 €",
  choice2: "28 € (SR) vor Ort",
  choice3: "Ohne Vergütung (ehrenamtlich)",
  choice4: "Der Trainer der Heimmannschaft bietet an, was er für fair hält",
  answer: 2
},
{
  question: "Wer ist der Torjäger der Kreisliga Wolfsburg (aktueller Stand auf Fussball.de)?",
  choice1: "Arben Mustafa",
  choice2: "Fatih Güzel",
  choice3: "Ronaldo, aber R9",
  choice4: "Razak Iddrisu",
  answer: 1
},
{
  question: "Wie viele Auswechslungen sind in der B-Kreisliga erlaubt?",
  choice1: "4, nur wenn der Couseng mitspielen will, dann 5",
  choice2: "4*",
  choice3: "5*",
  choice4: "Der Staffelleiter entscheidet 30 Min. vor dem Spiel",
  answer: 2
},
{
  question: "Was sagt die 8-Sekunden-Regel aus?",
  choice1: "3-Sekunden-Regel für Essen aufheben wurde erhöht ... miese Zeiten",
  choice2: "Instagram lässt auch längere Storys posten als 8 Sekunden",
  choice3: "Wenn der Torwart länger als 8 Sekunden den Ball in der Hand hält, bekommt die eigene Mannschaft einen Strafstoß zugesprochen",
  choice4: "Wenn der Torwart länger als 8 Sekunden den Ball in der Hand hält, bekommt der Gegner einen Eckstoß",
  answer: 4
},
{
  question: "Wer wurde DFB-Schiedsrichter des Jahres 2025?",
  choice1: "Deniz Aytekin, wer sonst",
  choice2: "Felix Brych",
  choice3: "Daniel Siebert",
  choice4: "Renán Castillo, weil er 17 Rote Karte in einem Bolivianischen Pokalspiel gezeigt hat",
  answer: 2
},
{
  question: "Welche Mannschaft führt die Fairness-Tabelle der Kreisliga Wolfsburg (aktueller Stand auf Fussball.de)?",
  choice1: "TSV Sülfeld",
  choice2: "TSV Heiligendorf",
  choice3: "Vatan Sport Wolfsburg",
  choice4: "TSV Ehmen II",
  answer: 2
},
{
  question: "Darf ein SR im Kreis Wolfsburg ein Jugendspiel leiten ohne offiziellen Spielauftrag?",
  choice1: "Ja, wenn in der Zeitung der Schiri gelobt wird",
  choice2: "Nein, nur mit offizieller Ansetzung oder vorheriger Zustimmung des Kreisansetzers",
  choice3: "Nein, aber kann auch ja sein, wenn der Onkel nachfragt",
  choice4: "Ja, nur wenn es ein Freundschafts- oder Benefizspiel ist",
  answer: 2
}
];



// CONSTANTS
const INCORRECT_TAX = 10;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 14;

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
