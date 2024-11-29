import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
  const scores = await getScores();

  if (scores.length === 0) {
    highScoresList.innerHTML = "<li>Keine Highscores vorhanden. Spiele das Quiz, um Punkte zu sammeln!</li>";
  } else {
    highScoresList.innerHTML = scores
      .map(([username, data]) => `<li>${username}: ${data.score}</li>`)
      .join("");
  }
});
