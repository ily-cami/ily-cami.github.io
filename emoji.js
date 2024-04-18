document.addEventListener('DOMContentLoaded', function() {
    const nameSelect = document.getElementById('name-select');
    const emojiContainer = document.querySelector('.emoji-container');
    const emojiBoard = document.getElementById('emoji-board');

    // GitHub API endpoint for emojis
    const GITHUB_API_URL = 'https://api.github.com/repos/your-username/emoji-wall/contents/emojis.json';
    const ACCESS_TOKEN = 'your-personal-access-token'; // Replace with your own token

    // Function to fetch emojis from GitHub repository
    async function fetchEmojis() {
        try {
            const response = await fetch(GITHUB_API_URL, {
                headers: {
                    Authorization: `token ${ACCESS_TOKEN}`
                }
            });
            const data = await response.json();
            const emojis = JSON.parse(atob(data.content)); // Decode base64 content
            return emojis;
        } catch (error) {
            console.error('Error fetching emojis:', error);
            return [];
        }
    }

    // Function to save emojis to GitHub repository
    async function saveEmojis(emojis) {
        try {
            const content = btoa(JSON.stringify(emojis)); // Encode emojis as base64
            const response = await fetch(GITHUB_API_URL, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update emojis',
                    content: content,
                    sha: emojis.sha // SHA of the existing file (for updating)
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving emojis:', error);
            return null;
        }
    }

    // Function to load emojis and render them on the board
    async function loadAndRenderEmojis() {
        const emojis = await fetchEmojis();
        emojiBoard.innerHTML = ''; // Clear existing content
        emojis.forEach(emoji => {
            emojiBoard.appendChild(createEmojiElement(emoji));
        });
    }

    // Event listener for emoji clicks
    emojiContainer.addEventListener('click', async function(event) {
        if (event.target.classList.contains('emoji')) {
            const emoji = event.target.textContent;
            const name = nameSelect.value;
            const timestamp = new Date().toLocaleString();
            const emojis = await fetchEmojis();
            emojis.push({ emoji, name, timestamp });
            await saveEmojis(emojis);
            await loadAndRenderEmojis();
        }
    });

    // Function to create an emoji element
    function createEmojiElement(emoji) {
        const emojiElement = document.createElement('div');
        emojiElement.classList.add('emoji');
        emojiElement.innerHTML = `
            <p>${emoji.emoji}</p>
            <p class="name">${emoji.name}</p>
            <p class="timestamp">${emoji.timestamp}</p>
        `;
        return emojiElement;
    }

    // Load and render emojis when the page loads
    loadAndRenderEmojis();
});
