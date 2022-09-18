import './scss/weather.scss';

import WeatherModule from './weather.module';
import WeatherView from './weather.view';
import WeatherController from './weather.controller';

function Weather(weatherData) {
  const module = new WeatherModule(weatherData);
  const view = new WeatherView(module);
  const controller = new WeatherController(module, view);

  return controller;
}

export default Weather;
