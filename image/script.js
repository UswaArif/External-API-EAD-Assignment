function analyzeImage() {
    const apiKey = ' d7902d4c5b6bb78fa7367f4a481d03aa'; // Replace with your actual API key
    const imageUrl = document.getElementById('imageUrl').value.trim();

    fetch('https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs', {
        method: 'POST',
        headers: {
            'Authorization': `Key ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: [
                {
                    data: {
                        image: {
                            url: imageUrl
                        }
                    }
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log response data to inspect its structure
        displayResults(data);
    })
    .catch(error => {
        console.error('Error analyzing image:', error);
        displayError(error);
    });
}

function displayResults(data) {
    // Implement logic to display analysis results
    console.log('Analysis Results:', data);
}

function displayError(error) {
    // Implement logic to display error message
    console.error('Error:', error);
}
