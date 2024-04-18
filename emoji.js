document.addEventListener("DOMContentLoaded", function () {
  const nameSelect = document.getElementById("name-select");
  const emojiContainer = document.querySelector(".emoji-container");
  const emojiBoard = document.getElementById("emoji-board");

  // Load emojis when the page loads
  loadEmojis();

  // Event listener for emoji clicks
  emojiContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("emoji")) {
      const emoji = event.target.textContent;
      const name = nameSelect.value;
      const timestamp = new Date().toLocaleString();
      const emojiObj = { emoji, name, timestamp };
      addEmoji(emojiObj);
    }
  });

  // Function to load emojis from the server
  function loadEmojis() {
    fetch("emojis.json")
      .then((response) => response.json())
      .then((emojis) => {
        emojis.reverse(); // Reverse the order to show newest emojis first
        emojis.forEach((emoji) => addEmoji(emoji));
      })
      .catch((error) => console.error("Error loading emojis:", error));
  }

  // Function to add an emoji to the board and save it to the server
  function addEmoji(emoji) {
    const emojis = Array.from(emojiBoard.children);
    emojiBoard.innerHTML = ""; // Clear existing content
    emojiBoard.appendChild(createEmojiElement(emoji));
    emojis.forEach((emoji) => emojiBoard.appendChild(emoji)); // Re-append existing emojis
    saveEmoji(emoji);
  }

  // Function to create an emoji element
  function createEmojiElement(emoji) {
    const emojiElement = document.createElement("div");
    emojiElement.classList.add("emoji");
    emojiElement.innerHTML = `
            <p>${emoji.emoji}</p>
            <p class="name">${emoji.name}</p>
            <p class="timestamp">${emoji.timestamp}</p>
        `;
    return emojiElement;
  }

  // Function to save an emoji to the server
  function saveEmoji(emoji) {
    fetch("emojis.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emoji),
    })
      .then((response) => response.json())
      .then((data) => console.log("Emoji saved:", data))
      .catch((error) => console.error("Error saving emoji:", error));
  }
});
