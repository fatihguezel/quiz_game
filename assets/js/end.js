document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const saveScoreBtn = document.getElementById("saveScoreBtn");
  const finalScore = document.getElementById("finalScore");

  const score = localStorage.getItem("mostRecentScore") || 0;
  finalScore.innerText = score;

  usernameInput.addEventListener("input", () => {
    saveScoreBtn.disabled = usernameInput.value.trim() === "";
  });

  saveScoreBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    if (username) {
      saveScore(username, parseInt(score, 10));
      alert("Punktzahl erfolgreich gespeichert!");
      window.location.assign("../html/highscores.html");
    }
  });
});
