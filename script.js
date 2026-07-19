const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const results = document.getElementById('results-section');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    results.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found. Please try another.");
        
        const data = await response.json();
        renderResults(data[0]);
    } catch (error) {
        results.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

function renderResults(data) {
    const meaning = data.meanings[0];
    const defObj = meaning.definitions[0];
    
    // Fallback for missing data
    const definition = defObj.definition || "No definition available.";
    const example = defObj.example ? `<p><em>Example: ${defObj.example}</em></p>` : "";
    
    results.innerHTML = `
        <h3>${data.word.toUpperCase()}</h3>
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        ${example}
    `;
}