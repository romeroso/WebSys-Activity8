document.addEventListener('DOMContentLoaded', () => {
  // API key for OpenWeatherMap
  const apiKey = '4d8fb5b93d4af21d66a2948710284366'; // Free API key for demo purposes
  
  // DOM Elements
  const cityInput = document.getElementById('city-input');
  const searchBtn = document.getElementById('search-btn');
  const weatherInfo = document.getElementById('weather-info');
  const errorMessage = document.getElementById('error-message');
  const cityName = document.getElementById('city-name');
  const weatherIcon = document.getElementById('weather-icon');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const feelsLike = document.getElementById('feels-like');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  
  // Event Listeners
  searchBtn.addEventListener('click', getWeather);
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  });
  
  // Check if there's a saved city in localStorage
  const savedCity = localStorage.getItem('lastCity');
  if (savedCity) {
    cityInput.value = savedCity;
    getWeather();
  }
  
  // Function to fetch weather data
  function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
      showError('Please enter a city name');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('lastCity', city);
    
    // Show loading state
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Fetch data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        showError('City not found. Please try again.');
      });
  }
  
  // Function to display weather data
  function displayWeather(data) {
    // Update DOM elements with weather data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    
    // Show weather info
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }
  
  // Function to show error message
  function showError(message) {
    errorMessage.querySelector('p').textContent = message;
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});