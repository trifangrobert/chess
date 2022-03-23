import { getPiece } from "../useful functions/PieceFunctions.js";

const checkCastling = (index, board, move) => {
    return (getPiece(board[index]) === 1 && Math.abs(move[1] - move[0]) === 2);
  };

export default checkCastling;