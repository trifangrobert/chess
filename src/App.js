import { useState } from "react";
import Board from "./components/Board.js";
import PieceMoves from "./pieces/PieceMoves.js";

const emptyBoard = () => {
  return [new Array(64).fill(null), new Array(64).fill(null)];
};

let whoMoves = 0;
let lastMove = [null, null];

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

  // board[0][41] = 2;
  // board[0][17] = 12;

  return board;
};

const checkMate = (board) => {
  // console.log(board);
  let whitePieces = [],
    blackPieces = [];
  for (let i = 0; i < 64; ++i) {
    if (getPieceColor(board[i]) === 0) {
      whitePieces.push(i);
    }
    if (getPieceColor(board[i]) === 1) {
      blackPieces.push(i);
    }
  }
  // console.log(whitePieces, blackPieces);
  let whiteMoves = [],
    blackMoves = [];
  for (let i = 0; i < whitePieces.length; ++i) {
    let l = PieceMoves(whitePieces[i], board, undefined);
    whiteMoves.push(...l);
  }
  for (let i = 0; i < blackPieces.length; ++i) {
    let l = PieceMoves(blackPieces[i], board, undefined);
    blackMoves.push(...l);
  }
  let checkMateWhite = 0,
    checkMateBlack = 0;
  // console.log(whiteMoves, blackMoves);
  for (let i = 0; i < whiteMoves.length; ++i) {
    if (board[whiteMoves[i]] === 7) {
      checkMateBlack = 1;
    }
  }
  for (let i = 0; i < blackMoves.length; ++i) {
    if (board[blackMoves[i]] === 1) {
      checkMateWhite = 1;
    }
  }
  // console.log(checkMateWhite, checkMateBlack);
  return [checkMateWhite, checkMateBlack];
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

const getPiece = (piece) => {
  if (piece > 6) {
    return piece - 6;
  }
  return piece;
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

const getAccessiblePositions = (index, board, lastMove) => {
  // console.log("apelez functia");
  // console.log(index);
  // console.log(lastMove);
  return PieceMoves(index, board, lastMove);
};

const legalMove = (prevIndex, currIndex, board) => {
  // console.log("checking whether it's a legal move or not");
  let currBoard = emptyBoard();
  for (let i = 0; i < 64; ++i) {
    currBoard[i] = board[i];
  }
  currBoard[currIndex] = currBoard[prevIndex];
  currBoard[prevIndex] = null;

  let [currCheckMateWhite, currCheckMateBlack] = checkMate(currBoard);
  // console.log(currCheckMateWhite, currCheckMateBlack);
  if (whoMoves === 0) {
    return !currCheckMateWhite;
  } else {
    return !currCheckMateBlack;
  }
};

const checkEnPassant = (index, board, lastMove, move) => {
  console.log("verific en passant");
  console.log("lastMove and move");
  console.log(lastMove, move, index);
  let [x, y] = getPos(index);
  let piece = board[move[0]];
  let player = 0;
  let dx;
  let [x1, y1] = getPos(move[0]);
  let [x2, y2] = getPos(move[1]);
  console.log(y1, y2);
  if (piece > 6) {
    piece -= 6;
    player = 1;
  }
  if (player === 0) {
    dx = -1;
  } else {
    dx = 1;
  }
  console.log(piece);
  if (piece !== 6) {
    return false;
  }
  console.log("ce se intampla doctore?");
  if (player === 1 && x === 5) {
    let oldPos = getPos(lastMove[0]);
    let newPos = getPos(lastMove[1]);
    console.log("se intampla ceva?");
    if (
      board[lastMove[1]] === 6 &&
      Math.abs(newPos[0] - oldPos[0]) === 2 &&
      Math.abs(y - newPos[1]) === 0 &&
      Math.abs(y1 - y2) === 1
    ) {
      return true;
    }
  }
  if (player === 0 && x === 2) {
    let oldPos = getPos(lastMove[0]);
    let newPos = getPos(lastMove[1]);
    console.log("se intampla ceva?");
    if (
      board[lastMove[1]] === 12 &&
      Math.abs(newPos[0] - oldPos[0]) === 2 &&
      Math.abs(y - newPos[1]) === 0 &&
      Math.abs(y1 - y2) === 1
    ) {
      return true;
    }
  }
  return false;
};

const App = () => {
  const [chessBoard, setChessBoard] = useState(initBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [positions, setPositions] = useState([]);
  // console.log(chessBoard);
  const handleClick = (index) => {
    let move = null;
    let currPositions = [];
    if (selectedPiece !== null && positions.includes(index)) {
      if (legalMove(selectedPiece, index, chessBoard[0])) {
        // console.log(chessBoard[0]);
        move = [selectedPiece, index];
        setPositions([]);
        currPositions = [];
        setSelectedPiece(index);
        whoMoves ^= 1;
      } else {
        setPositions([]);
        setSelectedPiece(null);
        currPositions = [];
        move = null;
      }
    } else {
      if (chessBoard[0][index] === null) {
        setPositions([]);
        setSelectedPiece(null);
        currPositions = [];
        move = null;
      } else {
        if (getPieceColor(chessBoard[0][index]) === whoMoves) {
          // console.log(lastMove);
          currPositions = getAccessiblePositions(index, chessBoard[0], lastMove);
          setPositions(currPositions);
          setSelectedPiece(index);
        } else {
          setPositions([]);
          setSelectedPiece(null);
          currPositions = [];
          move = null;
        }
      }
    }

    setChessBoard((prevState) => {
      let board = emptyBoard();
      // console.log(whoMoves);
      if (prevState[0][index] !== null && getPieceColor(prevState[0][index]) === whoMoves) {
        board[1][index] = 3;
      }
      for (let i = 0; i < 64; ++i) {
        board[0][i] = prevState[0][i];
      }
      // console.log(move);
      if (move !== null) {
        if (checkEnPassant(index, chessBoard[0], lastMove, move)) {
          console.log("en passant");
          // console.log(lastMove);
          let dx;
          if (getPieceColor(board[index]) === 0) {
            dx = -1;
          }
          else {
            dx = 1;
          }

          board[0][move[1]] = board[0][move[0]];
          board[0][move[0]] = null;
          board[0][lastMove[1]] = null;
          board[1][move[1]] = null;

        } else {
          board[0][move[1]] = board[0][move[0]];
          board[0][move[0]] = null;
          board[1][move[1]] = null;
        }

        // board[0][move[1]] = board[0][move[0]];
        // board[0][move[0]] = null;
        // board[1][move[1]] = null;
        lastMove = move;
      }
      for (let i = 0; i < currPositions.length; ++i) {
        if (prevState[0][currPositions[i]] !== null) {
          board[1][currPositions[i]] = 2;
        } else {
          board[1][currPositions[i]] = 1;
        }
      }
      let [checkMateWhite, checkMateBlack] = checkMate(board[0]);
      if (checkMateBlack === 1) {
        for (let i = 0; i < 64; ++i) {
          if (board[0][i] === 7) {
            board[1][i] = 4;
          }
        }
      }
      if (checkMateWhite === 1) {
        for (let i = 0; i < 64; ++i) {
          if (board[0][i] === 1) {
            board[1][i] = 4;
          }
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
