document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (query === '') {
        alert('Please enter a book title or author');
        return;
    }
    searchBooks(query);
});

function searchBooks(query) {
    const apiKey = 'XZgEITArbG7tAEXJWFce5sFz83NYbGaX';
    const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
    const queryString = new URLSearchParams({
        'api-key': apiKey,
        'title': query
    });

    fetch(`${apiUrl}?${queryString}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.results);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            displayError(error);
        });
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books found</p>';
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = 'Author: ' + book.author;

        const description = document.createElement('p');
        description.textContent = book.description;

        bookElement.appendChild(title);
        bookElement.appendChild(author);
        bookElement.appendChild(description);

        booksContainer.appendChild(bookElement);
    });
}

function displayError(error) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
}
