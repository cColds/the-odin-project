import getWeatherData from '../../api/weather';

export default class AppController {
  constructor(module, view) {
    this.module = module;
    this.view = view;
  }

  searchInput(inputValue) {
    this.module.setSearchInput(inputValue);
  }

  clearSearchInput() {
    const { searchInput } = this.view.elements;

    searchInput.blur();

    this.module.clearSearchInput();
  }

  searchWeather() {
    const { inputValue } = this.module;

    if (inputValue) {
      getWeatherData(inputValue)
        .then((weatherData) => {
          this.module.setWeatherData(weatherData);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => this.clearSearchInput());
    }
  }

  render({ node, appendType }) {
    this.view.render({ node, appendType });

    const {
      search,
      searchInput,
      searchBtn,
    } = this.view.elements;

    search.addEventListener('submit', (e) => e.preventDefault());
    searchInput.addEventListener('keyup', ({ target: { value } }) => this.searchInput(value));
    searchInput.addEventListener('input', ({ target: { value } }) => this.searchInput(value));
    searchBtn.addEventListener('click', () => this.searchWeather());
  }
}
