import GameModule from './gameModule.js';
import GameView from './gameView.js';
import GameController from './gameController.js';

export default class Game {
  constructor(params) {
    const self = this;
    self.module = new GameModule(params);
    self.view = new GameView(self.module);
    self.controller = new GameController(self.module, self.view);

    self.view.render();
  }
}
