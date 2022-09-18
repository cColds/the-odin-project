import SVG_SEARCH from '../../assets/svg/search.svg';

import Weather from '../weather/weather';

export default class AppView {
  constructor(module) {
    this.module = module;
    this.elements = {};
    this.components = {};

    // Events
    this.module
      .subscribe('setSearchInput', (inputValue) => this.setSearchInput(inputValue))
      .subscribe('clearSearchInput', () => this.clearSearchInput())
      .subscribe('setWeatherData', (weatherData) => this.showWeather(weatherData));
  }

  setSearchInput(inputValue) {
    const { searchInput } = this.elements;

    searchInput.value = inputValue;
  }

  clearSearchInput() {
    const { searchInput } = this.elements;

    searchInput.value = null;
  }

  showWeather(weatherData) {
    const { contentBody } = this.elements;
    const { weather } = this.components;

    if (!weather) {
      this.components.weather = new Weather(weatherData);
      this.components.weather.render({
        node: contentBody,
        appendType: 'prepend',
      });
    } else {
      weather.data = weatherData;
    }
  }

  render({ node, appendType = 'append' }) {
    const { app } = this.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      this.elements.app = document.createElement('div');
      this.elements.app.classList.add('app');

      node[appendType](this.elements.app);
    } else {
      this.elements.app.innerHTML = '';
    }

    this.elements.app.innerHTML = `
      <header class="app__header">
        <div class="wrapper">
          <h1 class="site-title">weather</h1>

          <form class="search">
            <input class="search__input" name="city-name" type="text" placeholder="City name" aria-label="Search weather for city" required>
            <button class="search__submit" type="submit" aria-label="Search">${SVG_SEARCH}</button>
          </form>
        </div>
      </header>

      <main class="app__main">
        <div class="wrapper">
          <span class="message">updated every hour</span>
        </div>
      </main>

      <footer class="app__footer">
        <div class="wrapper">
          <span class="copyright">&#169; <a class="copyright__link" href="http://github.com/vyachnd" target="_blank" rel="noopener">vyachnd</a>, 2022</span>
        </div>
      </footer>
    `;

    this.elements.search = this.elements.app.querySelector('.search');
    this.elements.searchInput = this.elements.app.querySelector('.search__input');
    this.elements.searchBtn = this.elements.app.querySelector('.search__submit');

    this.elements.contentBody = this.elements.app.querySelector('.app__main .wrapper');
  }
}
