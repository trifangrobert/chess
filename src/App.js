import { useState } from "react";
import Board from "./components/Board.js";

const emptyBoard = () => {
  return [new Array(64).fill(null), new Array(64).fill(null)];
};

let whoMoves = 0;

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

  board[0][41] = 2;
  board[0][17] = 12;

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

const Inside = (x, y) => {
  return 0 <= x && x < 8 && 0 <= y && y < 8;
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
  if (piece === 1) {
    // king
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
  } else if (piece === 2) {
    // queen
    let i, j;
    let dx = [0, 0, -1, 1, -1, -1, 1, 1];
    let dy = [-1, 1, 0, 0, -1, 1, -1, 1];
    for (let d = 0; d < 8; ++d) {
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
  } else if (piece === 3) {
    // bishop
    let i, j;
    let dx = [-1, -1, 1, 1];
    let dy = [-1, 1, -1, 1];
    for (let d = 0; d < 4; ++d) {
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
  } else if (piece === 4) {
    // knight
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
  } else if (piece === 5) {
    // rook
    let i, j;
    let dx = [0, 0, -1, 1];
    let dy = [-1, 1, 0, 0];
    for (let d = 0; d < 4; ++d) {
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
  } else if (piece === 6) {
    // pawn
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

    i = x + dx;
    j = y;
    newIndex = getIndex(i, j);
    if (Inside(i, j) && board[newIndex] === null) {
      positions.push(newIndex);
    }

    i = x + dx;
    let ii = x + 2 * dx;
    j = y;
    newIndex = getIndex(ii, j);
    // console.log(x);
    if (player === 0 && x === 6) {
      // console.log(i, j);
      // console.log(ii, j);
      if (board[getIndex(i, j)] === null && board[newIndex] === null) {
        positions.push(newIndex);
      }
    }
    if (player === 1 && x === 1) {
      if (board[getIndex(i, j)] === null && board[newIndex] === null) {
        positions.push(newIndex);
      }
    }
  }
  // console.log(positions);
  return positions;
};

const App = () => {
  const [chessBoard, setChessBoard] = useState(initBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [positions, setPositions] = useState([]);
  // console.log(chessBoard);
  const handleClick = (index) => {
    let move = [null, null];
    let currPositions = [];
    console.log(selectedPiece);
    if (selectedPiece !== null && positions.includes(index)) {
      move = [selectedPiece, index];
      setPositions([]);
      currPositions = [];
      setSelectedPiece(index);
      whoMoves ^= 1;
    }
    else {
      if (chessBoard[0][index] === null) {
        setPositions([]);
        setSelectedPiece(null);
        currPositions = []
        move = [null, null]
      }
      else {
        if (getPieceColor(chessBoard[0][index]) === whoMoves) {
          currPositions = getAccessiblePositions(index, chessBoard[0]);
          setPositions(currPositions);
          setSelectedPiece(index);
          console.log(positions);
          console.log(selectedPiece);
        } else {
          setPositions([]);
          setSelectedPiece(null);
        }
      }
    }

    // if (chessBoard[0][index] === null) {
    //   if (selectedPiece !== null && positions.includes(index)) {
    //     move = [selectedPiece, index];
    //     whoMoves ^= 1;
    //   } else {
    //     setPositions([]);
    //     setSelectedPiece(null);
    //   }
    // } else {
    //   if (getPieceColor(chessBoard[0][index]) === whoMoves) {
    //     currPositions = getAccessiblePositions(index, chessBoard[0]);
    //     setPositions(currPositions);
    //     setSelectedPiece(index);
    //     console.log(positions);
    //     console.log(selectedPiece);
    //   } else {
    //     setPositions([]);
    //     setSelectedPiece(null);
    //   }
    // }
    // console.log(positions);
    setChessBoard((prevState) => {
      let board = emptyBoard();
      console.log(whoMoves);
      if (prevState[0][index] !== null && getPieceColor(prevState[0][index]) === whoMoves) {
        board[1][index] = 3;
      }
      for (let i = 0; i < 64; ++i) {
        board[0][i] = prevState[0][i];
      }
      console.log(move);
      if (move !== [null, null]) {
        board[0][move[1]] = board[0][move[0]];
        board[0][move[0]] = null;
        board[1][move[1]] = 0;
      }
      for (let i = 0; i < currPositions.length; ++i) {
        if (prevState[0][currPositions[i]] !== null) {
          board[1][currPositions[i]] = 2;
        } else {
          board[1][currPositions[i]] = 1;
        }
      }
      return board;
    });
    // console.log(selectedPiece);
  };
  return (
    <div>
      <Board handleClick={handleClick} board={chessBoard} />
    </div>
  );
};

export default App;
