import './styles/style.scss';
import App from './components/app/app';

(() => {
  new App().controller.render({
    node: document.body,
    appendType: 'prepend',
  });
})();
