/* eslint-disable no-param-reassign */

/*
  I took the sample code from: https://github.com/Pety99
*/

function getBest(moves, players, winner) {
  let best = null;
  let min = -10000;
  let max = 10000;

  if (players.current === winner) {
    moves.forEach((move, i) => {
      if (move.score > min) {
        min = move.score;
        best = i;
      }
    });
  } else {
    moves.forEach((move, i) => {
      if (move.score < max) {
        max = move.score;
        best = i;
      }
    });
  }

  return moves[best];
}

export default function minimax(board, players, winner) {
  const boardWinner = board.getWinner();
  const isDraw = board.isDraw();
  const emptyCells = board.getEmptyCells();
  const moves = [];

  if (boardWinner) {
    if (boardWinner === winner) {
      return { score: 10 };
    }

    return { score: -10 };
  }

  if (isDraw) {
    return { score: 0 };
  }

  for (let i = 0; i < emptyCells.length; i += 1) {
    const move = {
      cell: emptyCells[i],
      score: 0,
    };

    board.setCell(players.current, move.cell);

    const result = minimax(board, { current: players.next, next: players.current }, winner);
    move.score = result.score;

    board.board[move.cell] = null;

    moves.push(move);
  }

  return getBest(moves, players, winner);
}
