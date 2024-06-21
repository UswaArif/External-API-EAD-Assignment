function searchVideos() {
    var searchQuery = document.getElementById("searchInput").value;
    var apiKey = 'AIzaSyAwWhHufAUW4xP2uY1Y_fcNL39rUhDRBPQ'; // Replace 'YOUR_API_KEY' with your actual API key
    var maxResults = 5; // Number of results to display

    var url = `https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=${apiKey}&maxResults=${maxResults}&part=snippet&type=video`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
}

function displayVideos(videos) {
    var videoResultsDiv = document.getElementById("videoResults");
    videoResultsDiv.innerHTML = '';

    videos.forEach(video => {
        var videoId = video.id.videoId;
        var videoTitle = video.snippet.title;
        var videoThumbnail = video.snippet.thumbnails.medium.url;

        var videoItem = `
            <div class="videoItem">
                <h2>${videoTitle}</h2>
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${videoThumbnail}" alt="${videoTitle}">
                </a>
            </div>
        `;

        videoResultsDiv.innerHTML += videoItem;
    });
}
