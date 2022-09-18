import pubSub from '../../modules/pubSub';

export default class AppModule extends pubSub {
  constructor() {
    super();
    this.inputValue = null;
    this.weatherData = null;
  }

  setSearchInput(inputValue) {
    if (inputValue === '') {
      this.clearSearchInput();
    } else {
      this.inputValue = inputValue
        .replace(/\s+/g, ' ')
        .replace(/^\s/, '')
        .slice(0, 24);
    }

    this.publish('setSearchInput', this.inputValue);
  }

  clearSearchInput() {
    this.inputValue = null;

    this.publish('clearSearchInput');
  }

  setWeatherData(weatherData) {
    this.weatherData = weatherData;

    this.publish('setWeatherData', weatherData);
  }
}
