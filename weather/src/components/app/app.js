import './scss/app.scss';

import AppModule from './app.module';
import AppView from './app.view';
import AppController from './app.controller';

function App() {
  const module = new AppModule();
  const view = new AppView(module);
  const controller = new AppController(module, view);

  return controller;
}

export default App;
