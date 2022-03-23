import checkEnPassant from "./EnPassant";
import checkCastling from "./Castling";
import checkPawnPromotion from "./PawnPromotion";

const doMove = (board, move, index, lastMove) => {
  if (checkEnPassant(index, board, move, lastMove)) {
    console.log("en passant");
    console.log(lastMove);
    board[move[1]] = board[move[0]];
    board[move[0]] = null;
    board[lastMove[1]] = null;
  } else if (checkCastling(move[0], board, move)) {
    console.log("castling");
    if (move[1] > move[0]) {
      board[move[1]] = board[move[0]];
      board[move[0]] = null;
      board[move[1] - 1] = board[move[1] + 1];
      board[move[1] + 1] = null;
    } else {
      console.log("queen side");
      board[move[1]] = board[move[0]];
      board[move[0]] = null;
      board[move[1] + 1] = board[move[1] - 2];
      board[move[1] - 2] = null;
    }
  } 
  else if (checkPawnPromotion(board, move)) {
    board[move[1]] = board[move[0]] - 4;
    board[move[0]] = null;
  }
  else {
    board[move[1]] = board[move[0]];
    board[move[0]] = null;
  }
  return board;
};

export default doMove;
