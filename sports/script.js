const apiKey = '47eeeae820396c1450eab63b8184566626ce8ce647cc04d9d40a5d16e82ad3ff'; // Replace with your actual API key
const baseUrl = 'https://allsportsapi.com/api/'; // Assuming this is the base URL

const sportsDataElement = document.getElementById('sports-data');

function getSportsData() {
  const url = `${baseUrl}leagues`;

  fetchWithoutCORS(url)
    .then(response => response.json())
    .then(data => {
      let content = '';
      if (data.success) {
        content = `<h2>Leagues</h2><ul>`;
        data.data.forEach(league => {
          content += `<li>${league.name}</li>`;
        });
        content += '</ul>';
      } else {
        content = '<p>Error fetching data</p>';
      }
      sportsDataElement.innerHTML = content;
    })
    .catch(error => {
      console.error(error);
      sportsDataElement.innerHTML = '<p>Error fetching data</p>';
    });
}

function fetchWithoutCORS(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .catch(() => {
      // If CORS error occurs, try fetching with 'no-cors' mode
      return fetch(url, { mode: 'no-cors' });
    });
}

getSportsData();
