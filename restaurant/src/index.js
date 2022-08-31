import './scss/style.scss';
import App from './components/app/app.js';

(() => {
  const app = new App({ node: document.body });
  app.controller.render();
  app.controller.changePage('home');
})();
