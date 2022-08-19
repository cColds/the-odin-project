import Player from './player.js';
import Computer from './computer.js';

export default class Board {
  constructor() {
    const self = this;
    self.board = [
      null, null, null,
      null, null, null,
      null, null, null,
    ];
    self.winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  isDraw() {
    const self = this;
    const boardWinner = self.getWinner();
    const emptyCells = self.getEmptyCells();

    return boardWinner === null && emptyCells.length === 0;
  }

  getEmptyCells() {
    const self = this;
    const emptyCells = [];

    for (let i = 0; i < self.board.length; i += 1) {
      const cell = self.board[i];

      if (cell === null) {
        emptyCells.push(i);
      }
    }

    return emptyCells;
  }

  getWinner() {
    const self = this;

    for (let i = 0; i < self.winPositions.length; i += 1) {
      const positions = self.winPositions[i];
      let firstCell = null;

      const isWinner = positions.every((cell) => {
        const player = self.board[cell];

        if (firstCell === null) {
          firstCell = player;
        }

        return player ? firstCell === player : null;
      });

      if (isWinner) {
        return firstCell;
      }
    }

    return null;
  }

  setCell(player, position) {
    const self = this;

    if (!(player instanceof Player) && !(player instanceof Computer)) {
      return false;
    }

    if ((self.board.length < position && self.board.length > position)
      || self.board[position] !== null
    ) {
      return false;
    }

    self.board[position] = player;

    return true;
  }

  clear() {
    const self = this;

    self.board = [
      null, null, null,
      null, null, null,
      null, null, null,
    ];
  }
}
