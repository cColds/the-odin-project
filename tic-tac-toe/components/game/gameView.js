export default class GameView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('showPlayerTurn', ({ sign, isComputer }) => self.showPlayerTurn(sign, isComputer))
      .subscribe('setCell', (data) => self.setCell(data));
  }

  static getDifficulty(difficulty) {
    switch (difficulty) {
      case 2:
        return 'Impossible';
      case 1:
        return 'Medium';
      case 0:
      default:
        return 'Normal';
    }
  }

  showPlayerTurn(sign, isComputer) {
    const self = this;
    const { board, playerX, playerO } = self.elements;

    board.classList.remove('user_turn_x');
    board.classList.remove('user_turn_o');

    if (!isComputer) {
      board.classList.add(`user_turn_${sign}`);
    }

    if (sign === 'x') {
      playerO.classList.remove('player_turn');
      playerX.classList.add('player_turn');
    } else if (sign === 'o') {
      playerX.classList.remove('player_turn');
      playerO.classList.add('player_turn');
    }
  }

  setCell({ sign, player, cell }) {
    const self = this;
    const { cells } = self.elements;

    cells[cell].classList.add(`cell_${sign}`);
    cells[cell].innerHTML = `
      <img src="${player.img}">
    `;
  }

  render() {
    const self = this;
    const { game } = self.elements;
    const { node, appendMode = 'append', players } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!game || !(game instanceof HTMLElement)) {
      self.elements.game = document.createElement('div');
      self.elements.game.className = 'game';

      node[appendMode](self.elements.game);
    } else {
      self.elements.game.innerHTML = '';
    }

    /* eslint-disable indent */
    self.elements.game.innerHTML = `
      <div class="cards-player">
        <div class="player player_first">
          <img class="player__image" src="./assets/player-1.png" width="512" height="512" aria-label="Player Avatar">

          <div class="player-data">
            <h2 class="player__name">${players.x.name}</h2>
            <span class="player__type">
              ${
                players.x.difficulty !== undefined
                ? `Computer - ${GameView.getDifficulty(players.x.difficulty)}`
                : 'Player'
              }
            </span>
          </div>
        </div>

        <div class="player player_second">
          <img class="player__image" src="./assets/player-2.png" width="366" height="366" aria-label="Player Avatar">

          <div class="player-data">
            <h2 class="player__name">${players.o.name}</h2>
            <span class="player__type">
            ${
              players.o.difficulty !== undefined
              ? `Computer - ${GameView.getDifficulty(players.o.difficulty)}`
              : 'Player'
            }
            </span>
          </div>
        </div>
      </div>

      <div class="board">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
      </div>
    `;
    /* eslint-enable indent */

    self.elements.playerX = self.elements.game.querySelector('.player_first');
    self.elements.playerO = self.elements.game.querySelector('.player_second');
    self.elements.board = self.elements.game.querySelector('.board');
    self.elements.cells = [...self.elements.game.querySelectorAll('.cell')];

    self.module.events.publish('render');
  }
}
