const API_WEATHER = process.env.API_WEATHER; // eslint-disable-line prefer-destructuring

async function getWeatherData(cityName, units = 'metric') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_WEATHER}`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (weatherData.cod !== 200) {
    throw new Error(weatherData.message);
  }

  return weatherData;
}

export default getWeatherData;
