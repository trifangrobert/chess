import { useState } from "react";
import Board from "./components/Board.js";
import classes from "./App.module.css"

const emptyBoard = () => {
  return new Array(64).fill(null);
};

const initBoard = () => {
  /* 
  1 -> King
  2 -> Queen
  3 -> Bishop
  4 -> Knight
  5 -> Rook
  6 -> Pawn
  1-6 white, 7-12 black
  */
  let board = emptyBoard();
  for (let i = 0;i < 8;i++) {    
      board[48 + i] = 6; // white pawn
      board[8 + i] = 12; //black pawn
  }
  board[60] = 1; // white king
  board[4] = 7; // black king

  board[59] = 2; // white queen
  board[3] = 8; // black queen

  board[58] = board[61] = 3; // white bishop
  board[2] = board[5] = 9; // black queen

  board[57] = board[62] = 4; // white knight
  board[1] = board[6] = 10; // black knight

  board[56] = board[63] = 5; // white rook
  board[0] = board[7] = 11; // black rook
  return board;
}

const App = () => {
  const [chessBoard, setChessBoard] = useState(initBoard());
  // console.log(chessBoard);
  return (
    <div>
      <Board board={chessBoard}/>
    </div>
  );
};

export default App;
