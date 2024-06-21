function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiKey = '005e12512273a1f5e1c7a860cdd7795d'; // Replace 'YOUR_API_KEY' with your actual API key
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                var temperature = data.main.temp;
                var weatherDesc = data.weather[0].description;
                document.getElementById("weatherData").innerHTML = `Temperature in ${city}: ${temperature}°C<br>Weather: ${weatherDesc}`;
            } else {
                document.getElementById("weatherData").innerHTML = `Failed to retrieve weather data. Error: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
