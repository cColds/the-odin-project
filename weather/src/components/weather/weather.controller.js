export default class WeatherController {
  constructor(module, view) {
    this.module = module;
    this.view = view;

    this.intervals = {};
  }

  set data(weatherData) {
    this.module.data = weatherData;
  }

  setFahrenheit() {
    this.module.setFahrenheit();
  }

  updateTime() {
    const { time } = this.module;
    const date = new Date();

    if (date.getMinutes() !== time.getMinutes()) {
      this.module.updateTime(date);
    } else if (date.getHours() !== time.getHours()) {
      this.module.updateWeatherData();
    }
  }

  render({ node, appendType }) {
    this.view.render({ node, appendType });

    const { weatherCheckbox } = this.view.elements;

    weatherCheckbox.addEventListener('change', () => this.setFahrenheit());

    this.intervals.updateTime = setInterval(() => this.updateTime(), 100);
  }
}
