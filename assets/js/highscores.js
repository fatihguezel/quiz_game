import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Funktion: Highscores abrufen
async function getScores() {
  const scoresRef = ref(db, "scores");
  try {
    const snapshot = await get(scoresRef);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).sort(([, a], [, b]) => b.score - a.score);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Punktzahlen:", error);
    return [];
  }
}

// Highscores anzeigen
document.addEventListener("DOMContentLoaded", async () => {
 const highScoresList = document.getElementById("highScoresList");
// Schriftgröße ändern
if (highScoresList) {
  highScoresList.style.fontSize = "3rem"; // Schriftgröße
  highScoresList.style.lineHeight = "2rem"; // Zeilenhöhe
}

  const scores = await getScores();

  if (scores.length === 0) {
    highScoresList.innerHTML = "<li>Keine Highscores vorhanden. Spiele das Quiz, um Punkte zu sammeln!</li>";
  } else {
    highScoresList.innerHTML = scores
      .map(([username, data]) => `<li>${username}: ${data.score}</li>`)
      .join("");
  }
});
