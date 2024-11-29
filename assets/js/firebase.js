<script type="module">
  // Importiere die Firebase-Funktionen, die du benötigst
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

  // Deine Firebase-Konfiguration
  const firebaseConfig = {
    apiKey: "AIzaSyArfFZYGhLirGGq6OXZ6uYejR_oza5dGL8",
    authDomain: "quiz-game-d1d42.firebaseapp.com",
    projectId: "quiz-game-d1d42",
    storageBucket: "quiz-game-d1d42.firebasestorage.app",
    messagingSenderId: "73743155075",
    appId: "1:73743155075:web:90903d262f767fcee180b6",
    measurementId: "G-VDCC5TQ4DJ"
  };

  // Firebase initialisieren
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  // Funktion zum Speichern der Punktzahlen
  function saveScore(username, score) {
    const userRef = ref(db, `scores/${username}`);
    set(userRef, {
      score: score,
      timestamp: Date.now()
    })
    .then(() => {
      console.log(`Punktzahl für ${username} erfolgreich gespeichert.`);
    })
    .catch((error) => {
      console.error("Fehler beim Speichern der Punktzahl:", error);
    });
  }

  // Funktion zum Abrufen aller Punktzahlen
  function getScores(callback) {
    const scoresRef = ref(db, "scores");
    get(scoresRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const scores = snapshot.val();
          // Sortiere die Ergebnisse nach Punktzahl absteigend
          callback(Object.entries(scores).sort(([, a], [, b]) => b.score - a.score));
        } else {
          callback([]);
        }
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Punktzahlen:", error);
        callback([]);
      });
  }

  // Beispielaufrufe
  // saveScore("TestUser", 100);
  // getScores((scores) => console.log(scores));
</script>
