const API_KEY = '72afdd7c6649efe9686465ce89d6b6c1';
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

async function fetchWeather(city) {
    try {
        const apiUrl = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

function updateWeatherInfo(data) {
    const weatherResultDiv = document.getElementById('weatherResult');
    if (!data) {
        weatherResultDiv.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        return;
    }

    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const iconHtml = `<img src="${iconUrl}" alt="Weather Icon">`;

    weatherResultDiv.innerHTML = `
        <h2>${data.name}</h2>
        ${iconHtml}
        <h3>${data.weather[0].description}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p> 
    `;
}

document.getElementById("getWeatherButton").addEventListener("click", async () => {
    const selectedCity = document.getElementById("city").value;
    const weatherData = await fetchWeather(selectedCity);
    updateWeatherInfo(weatherData);
});