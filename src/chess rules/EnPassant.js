import { getPos } from "../useful functions/PieceFunctions.js";


const checkEnPassant = (index, board, move, lastMove) => {
  let [x, y] = getPos(index);
  let piece = board[move[0]];
  let player = 0;
  let dx;
  let [x1, y1] = getPos(move[0]);
  let [x2, y2] = getPos(move[1]);
  if (piece > 6) {
    piece -= 6;
    player = 1;
  }
  if (player === 0) {
    dx = -1;
  } else {
    dx = 1;
  }
  if (piece !== 6) {
    return false;
  }
  // console.log("ce se intampla doctore?");
  if (player === 1 && x === 5) {
    let oldPos = getPos(lastMove[0]);
    let newPos = getPos(lastMove[1]);
    // console.log("se intampla ceva?");
    if (
      board[lastMove[1]] === 6 &&
      Math.abs(newPos[0] - oldPos[0]) === 2 &&
      Math.abs(y - newPos[1]) === 0 &&
      Math.abs(y1 - y2) === 1
    ) {
      return true;
    }
  }
  if (player === 0 && x === 2) {
    let oldPos = getPos(lastMove[0]);
    let newPos = getPos(lastMove[1]);
    // console.log("se intampla ceva?");
    if (
      board[lastMove[1]] === 12 &&
      Math.abs(newPos[0] - oldPos[0]) === 2 &&
      Math.abs(y - newPos[1]) === 0 &&
      Math.abs(y1 - y2) === 1
    ) {
      return true;
    }
  }
  return false;
};

export default checkEnPassant;
