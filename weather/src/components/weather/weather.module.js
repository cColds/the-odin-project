import pubSub from '../../modules/pubSub';
import getWeatherData from '../../api/weather';

export default class WeatherModule extends pubSub {
  constructor(weatherData) {
    super();

    this.data = weatherData;
    this.isFahrenheit = false;
    this.time = new Date();
  }

  static tempString(temp) {
    return `${temp > 0 ? '+' : ''}${temp}°`;
  }

  static timeString(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  static dateString(date) {
    return date.toLocaleString('en', {
      weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  static celToFah(temp) {
    return (temp * 1.8000 + 32).toFixed(2);
  }

  set data(weatherData) {
    this.id = weatherData.id;
    this.date = new Date(weatherData.dt * 1000);
    this.name = weatherData.name;
    this.timezone = weatherData.timezone;
    this.visibility = weatherData.visibility;
    this.base = weatherData.base;
    this.sys = {
      type: weatherData.sys.type,
      id: weatherData.sys.id,
      country: weatherData.sys.country,
      sunrise: new Date(weatherData.sys.sunrise * 1000),
      sunset: new Date(weatherData.sys.sunset * 1000),
    };
    this.coord = {
      lon: weatherData.coord.lon,
      lat: weatherData.coord.lat,
    };
    this.main = {
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      temp_min: weatherData.main.temp_min,
      temp_max: weatherData.main.temp_max,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      sea_level: weatherData.main.sea_level,
      grnd_level: weatherData.main.grnd_level,
    };
    this.weather = {
      id: weatherData.weather[0].id,
      main: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
    };
    this.wind = {
      speed: weatherData.wind.speed,
      deg: weatherData.wind.deg,
      gust: weatherData.wind.gust,
    };

    this.publish('update');
  }

  updateWeatherData() {
    const { name } = this;

    getWeatherData(name).then((weatherData) => {
      this.data = weatherData;
    });
  }

  updateTime(time) {
    this.time = time;

    this.publish('updateTime');
  }

  setFahrenheit() {
    this.isFahrenheit = !this.isFahrenheit;

    this.publish('update');
  }
}
