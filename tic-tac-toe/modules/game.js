import Board from './board.js';
import Player from './player.js';
import Computer from './computer.js';
import minimax from './minimax.js';

export default class Game {
  constructor() {
    const self = this;
    self.board = new Board();
    self.players = { x: null, o: null };
    self.currentTurn = null;
    self.gameInterval = null;
    self.isPaused = false;
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

  setTurn(player, cell) {
    const self = this;

    if (self.board.setCell(player, cell)) {
      self.currentTurn = self.getNextTurn();
      return true;
    }

    return false;
  }

  createPlayer({
    name,
    img,
    difficulty,
    isComputer = false,
    side = 'x',
  }) {
    const self = this;

    if (side !== 'x' && side !== 'o') {
      return false;
    }

    self.players[side] = isComputer
      ? new Computer({ name, img, difficulty })
      : new Player({ name, img });

    return true;
  }

  start() {
    const self = this;

    if (self.players.x === null || self.players.o === null) {
      return false;
    }

    self.currentTurn = 'x';
    self.gameInterval = setInterval(() => self.update(), 1);

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
        self.end();
      } else if (isDraw) {
        self.end();
      } else if (playerTurn instanceof Computer) {
        self.setTurn(playerTurn, self.getBestTurn());
      } else {
        self.setTurn(playerTurn, self.getRandomTurn());
      }
    }
  }
}
