import { useState } from "react";
import Board from "./components/Board.js";

const emptyBoard = () => {
  return [new Array(64).fill(null), new Array(64).fill(null)];
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
  for (let i = 0; i < 8; i++) {
    board[0][48 + i] = 6; // white pawn
    board[0][8 + i] = 12; //black pawn
  }
  board[0][60] = 1; // white king
  board[0][4] = 7; // black king

  board[0][59] = 2; // white queen
  board[0][3] = 8; // black queen

  board[0][58] = board[0][61] = 3; // white bishop
  board[0][2] = board[0][5] = 9; // black queen

  board[0][57] = board[0][62] = 4; // white knight
  board[0][1] = board[0][6] = 10; // black knight

  board[0][56] = board[0][63] = 5; // white rook
  board[0][0] = board[0][7] = 11; // black rook

  board[0][25] = 4;

  return board;
};

const checkMate = () => {
  return 1;
};

const getPieceColor = (piece) => {
  if (piece > 6) {
    return 1;
  }
  if (piece > 0) {
    return 0;
  }
  return -1;
};

const getIndex = (x, y) => {
  return 8 * x + y;
};

const getPos = (index) => {
  return [Math.floor(index / 8), index % 8];
};

const getAccessiblePositions = (index, board) => {
  // console.log(index);
  let [x, y] = getPos(index);
  let piece = board[index];
  let player = 0;
  let positions = [];
  if (piece > 6) {
    piece -= 6;
    player = 1;
  }
  if (piece === 4) {
    //knight
    let diff = [
      [-2, +1],
      [-1, +2],
      [+1, +2],
      [+2, +1],
      [+2, -1],
      [+1, -2],
      [-1, -2],
      [-2, -1],
    ];
    for (let i = 0; i < diff.length; i++) {
      let newx = x + diff[i][0];
      let newy = y + diff[i][1];
      let newIndex = getIndex(newx, newy);
      // console.log(x, y);
      // console.log(newx, newy);
      // console.log(getPieceColor(board[index]), getPieceColor(board[newIndex]));
      if (
        0 <= newx &&
        newx < 8 &&
        0 <= newy &&
        newy < 8 &&
        getPieceColor(board[index]) !== getPieceColor(board[newIndex])
      ) {
        positions.push(newIndex);
      }
    }
  }
  // if (piece === 3) {
  //   let i = x, j = y;
  //   let dx = [0, 0, -1, 1];
  //   let dy = [-1, 1, 0, 0];
  //   while ()
  // }
  return positions;
};

const App = () => {
  const [chessBoard, setChessBoard] = useState(initBoard());
  // console.log(chessBoard);
  const handleClick = (index) => {
    const positions = getAccessiblePositions(index, chessBoard[0]);
    // console.log(positions);
    setChessBoard((prevState) => {
      let board = emptyBoard();
      board[1][index] = 3;
      for (let i = 0;i < 64;++i) {
        board[0][i] = prevState[0][i];
      }
      for (let i = 0;i < positions.length;++i) {
        if (prevState[0][positions[i]] !== null) {
          board[1][positions[i]] = 2;
        }
        else {
          board[1][positions[i]] = 1;
        }
      }
      return board;
    });
    console.log(chessBoard);
  };
  return (
    <div>
      <Board handleClick={handleClick} board={chessBoard} />
    </div>
  );
};

export default App;
