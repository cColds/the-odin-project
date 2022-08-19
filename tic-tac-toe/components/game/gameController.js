export default class GameController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  showPlayerTurn(data) {
    const self = this;

    self.module.events.publish('showPlayerTurn', data);
  }

  setTurn(cell) {
    const self = this;

    self.module.events.publish('setTurn', cell);
  }

  setCell(data) {
    const self = this;

    self.module.events.publish('setCell', data);
  }

  onRender() {
    const self = this;
    const { board, cells } = self.view.elements;

    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', () => {
        if (board.classList.contains('user_turn_x')
          || board.classList.contains('user_turn_o')
        ) {
          self.setTurn(i);
        }
      });
    }
  }
}
