let score = 0;
const scoreboard = document.getElementById("scoreboard");

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score}`;
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const size = Math.random() * 100 + 50; // Random size between 50 and 150 pixels
  const x = Math.random() * (window.innerWidth - size);
  const y = Math.random() * (window.innerHeight - size);
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.top = y + "px";
  bubble.style.left = x + "px";

  let popped = false; // Flag to check if the bubble was popped

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
          // If the bubble wasn't popped, decrease the score
          score--;
          updateScoreboard();
        }
        bubble.remove();
      }, 300);
    }, 300);
  }, 1000);
}

function createBubbles() {
  setInterval(createBubble, 1000);
}

createBubbles();
