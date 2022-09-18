import SVG_SCHEDULE from '../../assets/svg/schedule.svg';
import SVG_WIND from '../../assets/svg/wind.svg';
import SVG_HUMIDITY from '../../assets/svg/humidity.svg';
import SVG_SUNRISE from '../../assets/svg/sunrise.svg';
import SVG_SUNSET from '../../assets/svg/sunset.svg';

import WeatherModule from './weather.module';

export default class WeatherView {
  constructor(module) {
    this.module = module;
    this.elements = {};

    // Events
    this.module
      .subscribe('update', () => this.update())
      .subscribe('updateTime', () => this.updateTime());
  }

  updateTime() {
    const { time, date } = this.module;
    const { weatherDate } = this.elements;

    weatherDate.textContent = `${WeatherModule.timeString(time)} - ${WeatherModule.dateString(date)}`;
  }

  update() {
    const {
      name,
      sys: { country, sunrise, sunset },
      main: { temp, feelsLike, humidity },
      weather: { main },
      wind: { speed },
      isFahrenheit,
    } = this.module;

    const {
      weatherName,
      weatherCountry,
      weatherTemp,
      weatherIcon,
      weatherType,
      weatherFeels,
      weatherWind,
      weatherHumidity,
      weatherSunrise,
      weatherSunset,
      weatherCheckbox,
    } = this.elements;

    weatherName.textContent = name;
    weatherCountry.textContent = country.toUpperCase();
    weatherType.textContent = main;
    weatherWind.textContent = speed;
    weatherHumidity.textContent = `${humidity}%`;
    weatherSunrise.textContent = WeatherModule.timeString(sunrise);
    weatherSunset.textContent = WeatherModule.timeString(sunset);
    weatherCheckbox.checked = isFahrenheit;

    if (isFahrenheit) {
      weatherTemp.textContent = WeatherModule.tempString(WeatherModule.celToFah(temp));
      weatherFeels.textContent = `Feels Like: ${WeatherModule.tempString(WeatherModule.celToFah(feelsLike))}`;
    } else {
      weatherTemp.textContent = WeatherModule.tempString(temp);
      weatherFeels.textContent = `Feels Like: ${WeatherModule.tempString(feelsLike)}`;
    }

    this.updateTime();

    import('../../assets/svg/04d.svg').then(({ default: icon }) => {
      weatherIcon.innerHTML = icon;
    });
  }

  render({ node, appendType = 'append' }) {
    const { weather } = this.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!weather || !(weather instanceof HTMLElement)) {
      this.elements.weather = document.createElement('div');
      this.elements.weather.classList.add('weather');

      node[appendType](this.elements.weather);
    } else {
      this.elements.weather.innerHTML = '';
    }

    this.elements.weather.innerHTML = `
      <header class="weather__header">
        <div class="header-container">
          <h2 class="weather__name"></h2>
          <span class="weather__country"></span>
        </div>

        <span class="weather__date">
          ${SVG_SCHEDULE}
          <span class="date"></span>
        </span>
      </header>

      <div class="weather__data">
        <h3 class="weather__temp"></h3>
        <span class="weather__icon"></span>

        <div class="weather__description">
          <h4 class="weather__type"></h4>
          <span class="weather__feels"></span>
        </div>
      </div>

      <ul class="weather__additional">
        <li>
          ${SVG_WIND}
          <span class="additional__text additional__text-wind"></span>
        </li>

        <li>
          ${SVG_HUMIDITY}
          <span class="additional__text additional__text-humidity"></span>
        </li>

        <li>
          ${SVG_SUNRISE}
          <span class="additional__text additional__text-sunrise"></span>
        </li>

        <li>
          ${SVG_SUNSET}
          <span class="additional__text additional__text-sunset"></span>
        </li>
      </ul>

      <div class="checkbox">
        <input id="weather__temp-type" class="checkbox__input" type="checkbox" aria-label="Toggle weather temp type">
        <label for="weather__temp-type" class="checkbox__label">
          <span class="checkbox__type">C°</span>
          <span class="checkbox__type">F°</span>
          <span class="checkbox__pin"></span>
        </label>
      </div>
    `;

    this.elements.weatherName = this.elements.weather.querySelector('.weather__name');
    this.elements.weatherCountry = this.elements.weather.querySelector('.weather__country');
    this.elements.weatherDate = this.elements.weather.querySelector('.weather__date .date');
    this.elements.weatherTemp = this.elements.weather.querySelector('.weather__temp');
    this.elements.weatherIcon = this.elements.weather.querySelector('.weather__icon');
    this.elements.weatherType = this.elements.weather.querySelector('.weather__type');
    this.elements.weatherFeels = this.elements.weather.querySelector('.weather__feels');
    this.elements.weatherWind = this.elements.weather.querySelector('.additional__text-wind');
    this.elements.weatherHumidity = this.elements.weather.querySelector('.additional__text-humidity');
    this.elements.weatherSunrise = this.elements.weather.querySelector('.additional__text-sunrise');
    this.elements.weatherSunset = this.elements.weather.querySelector('.additional__text-sunset');
    this.elements.weatherCheckbox = this.elements.weather.querySelector('#weather__temp-type');

    this.update();
  }
}
