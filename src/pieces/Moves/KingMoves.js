import { getIndex, getPieceColor, getPos, Inside } from "../../useful functions/PieceFunctions";

const KingMoves = (board, index) => {
  // king
  let positions = [];
  let [x, y] = getPos(index);
  let i, j;
  let dx = [0, 0, -1, 1, -1, -1, 1, 1];
  let dy = [-1, 1, 0, 0, -1, 1, -1, 1];
  for (let d = 0; d < 8; ++d) {
    i = x + dx[d];
    j = y + dy[d];
    let newIndex = getIndex(i, j);
    if (
      Inside(i, j) &&
      (getPieceColor(board[index]) !== getPieceColor(board[newIndex]) ||
        board[newIndex] === null)
    ) {
      positions.push(newIndex);
    }
  }
  return positions;
};

export default KingMoves;
