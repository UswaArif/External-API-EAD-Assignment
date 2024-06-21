function fetchStockQuote() {
    var symbol = document.getElementById("symbolInput").value.toUpperCase();
    var apiKey = 'VJRVMe4B0OpJoHFrhacQyAjwznsvGnZD'; // Replace 'YOUR_API_KEY' with your actual Polygon.io API key

    fetch(`https://api.polygon.io/v1/last/stocks/${symbol}?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayQuote(data, symbol);
        })
        .catch(error => {
            console.error('Error fetching stock quote:', error);
            displayError(error);
        });
}

function displayQuote(quoteData, symbol) {
    var quoteResultDiv = document.getElementById("quoteResult");
    quoteResultDiv.innerHTML = '';

    var quote = quoteData.last;
    var quoteTime = new Date(quoteData.timestamp);

    var quoteHTML = `
        <h2>Stock Symbol: ${symbol}</h2>
        <p>Quote: $${quote.toFixed(2)}</p>
        <p>Time: ${quoteTime.toLocaleString()}</p>
    `;

    quoteResultDiv.innerHTML = quoteHTML;
}

function displayError(error) {
    var quoteResultDiv = document.getElementById("quoteResult");
    quoteResultDiv.innerHTML = '';

    var errorHTML = `<p>Error fetching stock quote: ${error.message}</p>`;
    quoteResultDiv.innerHTML = errorHTML;
}
