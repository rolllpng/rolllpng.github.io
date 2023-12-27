// Function to fetch a random quote from the Quotable API
async function fetchRandomQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error("Error fetching quote:", error);
        return "An error occurred while fetching the quote.";
    }
}

// Function to generate a random quote and read it aloud
async function generateQuote() {
    const quote = await fetchRandomQuote();
    document.getElementById("quote").textContent = quote;

    // Use the Web Speech API to read the quote aloud
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(quote);

    speechSynthesis.speak(utterance);
}
