import { getIndex, getPieceColor, getPos, Inside } from "../../useful functions/PieceFunctions";

const KnightMoves = (board, index) => {
  // knight
  let positions = [];
  let [x, y] = getPos(index);
  let dx = [-2, -1, +1, +2, +2, +1, -1, -2];
  let dy = [+1, +2, +2, +1, -1, -2, -2, -1];
  for (let k = 0; k < 8; k++) {
    let i, j;
    i = x + dx[k];
    j = y + dy[k];
    let newIndex = getIndex(i, j);
    if (
      Inside(i, j) &&
      getPieceColor(board[index]) !== getPieceColor(board[newIndex])
    ) {
      positions.push(newIndex);
    }
  }
  return positions;
};

export default KnightMoves;
