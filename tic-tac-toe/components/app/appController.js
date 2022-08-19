export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('setNextTurn', (sign) => self.setNextTurn(sign));
  }

  renderScene(params) {
    const self = this;

    self.module.events.publish('renderScene', params);
  }

  setNextTurn(sign) {
    const self = this;

    self.module.events.publish('showPlayerTurn', sign);
  }

  setCell(data) {
    const self = this;

    self.module.events.publish('setCell', data);
  }

  winner(player) {
    const self = this;

    self.module.events.publish('modalWinner', player);
  }

  draw() {
    const self = this;

    self.module.events.publish('modalDraw');
  }
}
