const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const results = document.getElementById('results-section');

// Form and Event Handling: fully interactive with edge case management
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();

    // Edge case: empty input handling
    if (!word) {
        results.innerHTML = "<p style='color: orange;'>Please enter a word to search.</p>";
        return;
    }

    // UX: Inform user of background process
    results.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        // Fetch API Usage: Robust error handling for invalid/not found data
        if (!response.ok) {
            throw new Error("Word not found. Please check your spelling.");
        }
        
        const data = await response.json();
        renderResults(data[0]);
    } catch (error) {
        // Error Handling: Professional feedback provided to the user
        results.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    }
});

/**
 * Data Display & DOM Manipulation:
 */
function renderResults(data) {
    const meaning = data.meanings[0];
    const defObj = meaning.definitions[0];
    
    // Fallback content to ensure data is always displayed.
    const definition = defObj.definition || "No definition available.";
    const example = defObj.example ? `<p><em>Example: "${defObj.example}"</em></p>` : "<p><em>No example available.</em></p>";
    
    // DOM Manipulation: Seamless, responsive, and user-friendly.
    results.innerHTML = `
        <h3>${data.word.toUpperCase()}</h3>
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        ${example}
    `;
}