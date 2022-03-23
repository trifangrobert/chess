import { getIndex, getPieceColor, getPos, Inside } from "../../useful functions/PieceFunctions";

const RookMoves = (board, index) => {
  // rook
  let positions = [];
  let [x, y] = getPos(index);
  let dx = [0, 0, -1, 1];
  let dy = [-1, 1, 0, 0];
  for (let d = 0; d < 4; ++d) {
    let i, j;
    i = x + dx[d];
    j = y + dy[d];
    let newIndex = getIndex(i, j);
    while (Inside(i, j) && board[newIndex] === null) {
      positions.push(newIndex);
      i += dx[d];
      j += dy[d];
      newIndex = getIndex(i, j);
    }
    if (
      Inside(i, j) &&
      board[newIndex] !== null &&
      getPieceColor(board[index]) !== getPieceColor(board[newIndex])
    ) {
      positions.push(newIndex);
    }
  }
  return positions;
};

export default RookMoves;
