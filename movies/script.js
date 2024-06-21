document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (query === '') {
        alert('Please enter a movie title');
        return;
    }
    searchArticles(query);
});

function searchArticles(query) {
    const apiKey = 'XZgEITArbG7tAEXJWFce5sFz83NYbGaX';
    const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const queryString = new URLSearchParams({
        'api-key': apiKey,
        'q': `${query} movie review`
    });

    fetch(`${apiUrl}?${queryString}`)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.response.docs);
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            displayError(error);
        });
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    if (articles.length === 0) {
        articlesContainer.innerHTML = '<p>No articles found</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const headline = document.createElement('h2');
        headline.textContent = article.headline.main;

        const snippet = document.createElement('p');
        snippet.textContent = article.snippet;

        const link = document.createElement('a');
        link.href = article.web_url;
        link.textContent = 'Read more';

        articleElement.appendChild(headline);
        articleElement.appendChild(snippet);
        articleElement.appendChild(link);

        articlesContainer.appendChild(articleElement);
    });
}

function displayError(error) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = `<p>Error fetching articles: ${error.message}</p>`;
}
