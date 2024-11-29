import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
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
