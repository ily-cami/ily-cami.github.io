let score = 0;
const scoreboard = document.getElementById("scoreboard");

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score}`;
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const size = Math.random() * 100 + 50;
  const x = Math.random() * (window.innerWidth - size);
  const y = Math.random() * (window.innerHeight - size);
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.top = y + "px";
  bubble.style.left = x + "px";

  let popped = false;

  bubble.addEventListener("click", () => {
    bubble.remove();
    popped = true;
    score++;
    updateScoreboard();
  });

  document.getElementById("game-container").appendChild(bubble);

  setTimeout(() => {
    bubble.style.transform = "scale(1.2)";
    setTimeout(() => {
      bubble.style.opacity = 0;
      setTimeout(() => {
        if (!popped) {
          score--;
          updateScoreboard();
        }
        bubble.remove();
      }, 150);
    }, 150);
  }, 350);
}

function createBubbles() {
  setInterval(createBubble, 800);
}

createBubbles();
