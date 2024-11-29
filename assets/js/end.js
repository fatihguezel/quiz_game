import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

  // Firebase-Konfiguration (Datenbank-URL hinzugefügt)
  const firebaseConfig = {
    apiKey: "AIzaSyArfFZYGhLirGGq6OXZ6uYejR_oza5dGL8",
    authDomain: "quiz-game-d1d42.firebaseapp.com",
    databaseURL: "https://quiz-game-d1d42-default-rtdb.firebaseio.com",
    projectId: "quiz-game-d1d42",
    storageBucket: "quiz-game-d1d42.appspot.com",
    messagingSenderId: "73743155075",
    appId: "1:73743155075:web:90903d262f767fcee180b6",
    measurementId: "G-VDCC5TQ4DJ"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funktion: Punktzahl speichern
async function saveScore(username, score) {
  const userRef = ref(db, `scores/${username}`);
  try {
    await set(userRef, { score, timestamp: Date.now() });
    alert("Punktzahl erfolgreich gespeichert!");
    window.location.href = "../html/highscores.html";
  } catch (error) {
    console.error("Fehler beim Speichern der Punktzahl:", error);
    alert("Fehler beim Speichern. Versuche es erneut.");
  }
}

// DOM-Interaktionen
document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const saveScoreBtn = document.getElementById("saveScoreBtn");
  const finalScore = document.getElementById("finalScore");

  // Hole die Punktzahl aus dem LocalStorage
  const score = parseInt(localStorage.getItem("mostRecentScore"), 10) || 0;
  finalScore.innerText = score;

  // Aktiviere den Speichern-Button nur bei gültigem Benutzernamen
  usernameInput.addEventListener("input", () => {
    saveScoreBtn.disabled = usernameInput.value.trim() === "";
  });

  // Button-Klick: Punktzahl speichern
  saveScoreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      saveScore(username, score);
    }
  });
});
