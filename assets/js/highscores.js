document.addEventListener("DOMContentLoaded", () => {
  const highScoresList = document.getElementById("highScoresList");

  getScores((scores) => {
    if (scores.length === 0) {
      highScoresList.innerHTML = "<li>Keine Highscores vorhanden. Spiele das Quiz, um Punkte zu sammeln!</li>";
    } else {
      highScoresList.innerHTML = scores
        .map(([username, data]) => `<li>${username}: ${data.score}</li>`)
        .join("");
    }
  });
});
