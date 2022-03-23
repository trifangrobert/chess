import { getPieceColor } from "../../useful functions/PieceFunctions";
import Moves from "./Moves";

const AttackedPositions = (board, player) => {
  let positions = [];
  for (let i = 0; i < 64; ++i) {
    if (getPieceColor(board[i]) === player) {
      let l = Moves(board, i);
      positions.push(...l);
    }
  }
  return positions;
}
 
export default AttackedPositions;