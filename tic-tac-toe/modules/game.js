import Board from './board.js';
import Player from './player.js';
import Computer from './computer.js';
import minimax from './minimax.js';
import App from '../components/app/app.js';

export default class Game {
  constructor() {
    const self = this;
    self.app = null;
    self.board = new Board();
    self.players = { x: null, o: null };
    self.currentTurn = null;
    self.gameInterval = null;
    self.isPaused = false;

    self.renderApp();
  }

  renderApp() {
    const self = this;
    self.app = new App({
      node: document.body,
      appendMode: 'prepend',
    });

    self.app.controller.renderScene({ name: 'menu' });

    self.app.module.events
      .subscribe('createPlayers', (playersData) => {
        self.createPlayer({ ...playersData.first, img: './assets/player-1.png', side: 'x' });
        self.createPlayer({ ...playersData.second, img: './assets/player-2.png', side: 'o' });

        self.app.controller.renderScene({ name: 'game', players: self.players });

        self.start();
      })
      .subscribe('setTurn', (cell) => {
        const { currentTurn } = self;
        const playerTurn = self.players[currentTurn];

        if (self.setTurn(playerTurn, cell)) {
          self.app.controller.setCell({ sign: currentTurn, player: playerTurn, cell });
        }
      });
  }

  getRandomTurn() {
    const self = this;
    const emptyCells = self.board.getEmptyCells();

    return emptyCells[Math.floor(Math.random() * (emptyCells.length - 1))];
  }

  getBestTurn(player = this.players[this.currentTurn]) {
    const self = this;
    const board = new Board();
    const next = self.players[self.getNextTurn()];

    board.board = [...self.board.board];

    return minimax(board, { current: player, next }, player).cell;
  }

  getNextTurn() {
    const self = this;

    return self.currentTurn === 'x' ? 'o' : 'x';
  }

  setNextTurn() {
    const self = this;

    self.currentTurn = self.getNextTurn();

    self.app.module.events.publish('setNextTurn', {
      sign: self.currentTurn,
      isComputer: self.players[self.currentTurn] instanceof Computer,
    });
  }

  setTurn(player, cell) {
    const self = this;

    if (self.board.setCell(player, cell)) {
      self.setNextTurn();
      return true;
    }

    return false;
  }

  createPlayer({
    img,
    name,
    isComputer = false,
    difficulty,
    side = 'x',
  }) {
    const self = this;

    if (side !== 'x' && side !== 'o') {
      return false;
    }

    self.players[side] = isComputer
      ? new Computer({ img, name: name || `Player ${side.toUpperCase()}`, difficulty })
      : new Player({ img, name: name || `Player ${side.toUpperCase()}` });

    return true;
  }

  start() {
    const self = this;

    if (self.players.x === null || self.players.o === null) {
      return false;
    }

    self.setNextTurn();
    self.gameInterval = setInterval(() => self.update(), 500);

    return true;
  }

  end() {
    const self = this;

    clearInterval(self.gameInterval);
    self.board.clear();

    self.players = { x: null, o: null };
    self.currentTurn = null;
    self.gameInterval = null;
    self.isPaused = false;
  }

  pause(state = !this.isPaused) {
    const self = this;

    self.isPaused = state;
  }

  update() {
    const self = this;
    const playerTurn = self.players[self.currentTurn];
    const boardWinner = self.board.getWinner();
    const isDraw = self.board.isDraw();

    if (!self.isPaused) {
      if (boardWinner) {
        console.log(`Winner: ${boardWinner.name}`);
        self.end();
      } else if (isDraw) {
        console.log('DRAW');
        self.end();
      } else if (playerTurn instanceof Computer) {
        const computerTurn = self.getBestTurn();
        self.app.module.events.publish('setTurn', computerTurn);
      }
    }
  }
}
