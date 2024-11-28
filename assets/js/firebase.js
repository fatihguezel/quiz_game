// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyAyZxrPAOerP-_CaAXcvNhrWs9Hq22xaHo",
    authDomain: "quizgame-dedbb.firebaseapp.com",
    databaseURL: "https://quizgame-dedbb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizgame-dedbb",
    storageBucket: "quizgame-dedbb.firebaseapp.com",
    messagingSenderId: "34195195951",
    appId: "1:34195195951:web:fd08fffbe86611cbd09eda",
    measurementId: "G-NCHNZR7SZE"
  };
  
  // Firebase initialisieren
  firebase.initializeApp(firebaseConfig);
  
  // Datenbankreferenz erstellen
  const db = firebase.database();
  
  // Funktion zum Speichern der Punktzahlen
  function saveScore(username, score) {
    db.ref("scores/" + username).set({
      score: score,
      timestamp: Date.now()
    }).then(() => {
      console.log("Punktzahl erfolgreich gespeichert.");
    }).catch((error) => {
      console.error("Fehler beim Speichern der Punktzahl:", error);
    });
  }
  
  // Funktion zum Abrufen aller Punktzahlen
  function getScores(callback) {
    db.ref("scores").once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const scores = snapshot.val();
          const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b.score - a.score);
          callback(sortedScores);
        } else {
          console.log("Keine Daten gefunden.");
          callback([]);
        }
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Punktzahlen:", error);
        callback([]);
      });
  }
  
