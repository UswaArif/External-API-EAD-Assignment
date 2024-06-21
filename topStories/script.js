document.addEventListener('DOMContentLoaded', function() {
    fetchTopStories();
});

function fetchTopStories() {
    const apiKey = 'XZgEITArbG7tAEXJWFce5sFz83NYbGaX';
    const apiUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json';
    const queryString = new URLSearchParams({
        'api-key': apiKey
    });

    fetch(`${apiUrl}?${queryString}`)
        .then(response => response.json())
        .then(data => {
            displayTopStories(data.results);
        })
        .catch(error => {
            console.error('Error fetching top stories:', error);
            displayError(error);
        });
}

function displayTopStories(articles) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    if (articles.length === 0) {
        articlesContainer.innerHTML = '<p>No top stories found</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const title = document.createElement('h2');
        title.textContent = article.title;

        const abstract = document.createElement('p');
        abstract.textContent = article.abstract;

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';

        articleElement.appendChild(title);
        articleElement.appendChild(abstract);
        articleElement.appendChild(link);

        articlesContainer.appendChild(articleElement);
    });
}

function displayError(error) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = `<p>Error fetching top stories: ${error.message}</p>`;
}
