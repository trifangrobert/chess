import { getIndex, getPieceColor, getPos, Inside } from "../../useful functions/PieceFunctions";

const PawnMoves = (board, index) => {
  // pawn
  let player = getPieceColor(board[index]);
  let positions = [];
  let [x, y] = getPos(index);
  let dx;
  if (player === 0) {
    dx = -1;
  } else {
    dx = 1;
  }
  let i, j, newIndex;
  i = x + dx;
  j = y - 1;
  newIndex = getIndex(i, j);
  if (
    Inside(i, j) &&
    board[newIndex] !== null &&
    getPieceColor(board[index]) !== getPieceColor(board[newIndex])
  ) {
    positions.push(newIndex);
  }

  i = x + dx;
  j = y + 1;
  newIndex = getIndex(i, j);
  if (
    Inside(i, j) &&
    board[newIndex] !== null &&
    getPieceColor(board[index]) !== getPieceColor(board[newIndex])
  ) {
    positions.push(newIndex);
  }
  return positions;
};

export default PawnMoves;
