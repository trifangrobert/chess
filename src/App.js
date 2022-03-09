import { useState } from "react";
import Board from "./components/Board.js";
import PieceMoves from "./pieces/PieceMoves.js";

const emptyBoard = () => {
  return [new Array(64).fill(null), new Array(64).fill(null)];
};

let whoMoves = 0;
let lastMove = [null, null];

let gameMoves = [];

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

  // board[0][28] = 8;

  // board[0][26] = 1;
  // board[0][29] = 7;

  // board[0][41] = 2;
  // board[0][17] = 12;

  return board;
};

const initGame = () => {
  return true;
};

const check = (board) => {
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
    let l = PieceMoves(whitePieces[i], board, gameMoves);
    whiteMoves.push(...l);
  }
  for (let i = 0; i < blackPieces.length; ++i) {
    let l = PieceMoves(blackPieces[i], board, gameMoves);
    blackMoves.push(...l);
  }
  let checkWhite = 0,
    checkBlack = 0;
  // console.log(whiteMoves, blackMoves);
  for (let i = 0; i < whiteMoves.length; ++i) {
    if (board[whiteMoves[i]] === 7) {
      checkBlack = 1;
    }
  }
  for (let i = 0; i < blackMoves.length; ++i) {
    if (board[blackMoves[i]] === 1) {
      checkWhite = 1;
    }
  }
  // console.log(checkMateWhite, checkMateBlack);
  return [checkWhite, checkBlack];
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

  let [currCheckWhite, currCheckBlack] = check(currBoard);
  if (whoMoves === 0) {
    return !currCheckWhite;
  } else {
    return !currCheckBlack;
  }
};

const checkEnPassant = (index, board, move) => {
  if (gameMoves.length === 0) {
    return false;
  }
  let lastMove = [gameMoves[gameMoves.length - 1][1], gameMoves[gameMoves.length - 1][2]];
  console.log(lastMove);
  if (lastMove === [undefined, undefined]) {
    return false;
  }
  console.log(lastMove);
  // console.log("verific en passant");
  // console.log("lastMove and move");
  // console.log(lastMove, move, index);
  let [x, y] = getPos(index);
  let piece = board[move[0]];
  let player = 0;
  let dx;
  let [x1, y1] = getPos(move[0]);
  let [x2, y2] = getPos(move[1]);
  // console.log(y1, y2);
  if (piece > 6) {
    piece -= 6;
    player = 1;
  }
  if (player === 0) {
    dx = -1;
  } else {
    dx = 1;
  }
  // console.log(piece);
  if (piece !== 6) {
    return false;
  }
  // console.log("ce se intampla doctore?");
  if (player === 1 && x === 5) {
    let oldPos = getPos(lastMove[0]);
    let newPos = getPos(lastMove[1]);
    // console.log("se intampla ceva?");
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
    // console.log("se intampla ceva?");
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

const checkCastling = (index, board, move) => {
  // console.log("checking for castling");
  // console.log(board);
  // console.log(index);
  if (getPiece(board[index]) === 1 && Math.abs(move[1] - move[0]) === 2) {
    return true;
  }
  return false;
};

const checkMate = (board, player) => {
  if (player === 0) {
    let whitePieces = [];
    for (let i = 0; i < 64; ++i) {
      if (getPieceColor(board[i]) === 0) {
        whitePieces.push(i);
      }
    }
    for (let i = 0; i < whitePieces.length; ++i) {
      let l = PieceMoves(whitePieces[i], board, gameMoves);
      let newBoard = emptyBoard();
      //TODO
    }
  }
  else {
    let blackPieces = [];
    for (let i = 0; i < 64; ++i) {
      if (getPieceColor(board[i]) === 1) {
        blackPieces.push(i);
      }
    }
    let blackMoves = [];
    for (let i = 0; i < blackPieces.length; ++i) {
      let l = PieceMoves(blackPieces[i], board, gameMoves);
      blackMoves.push(...l);
    }
  }
}

const staleMate = (board, player) => {
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
    let l = PieceMoves(whitePieces[i], board, gameMoves);
    whiteMoves.push(...l);
  }
  for (let i = 0; i < blackPieces.length; ++i) {
    let l = PieceMoves(blackPieces[i], board, gameMoves);
    blackMoves.push(...l);
  }
  let [checkWhite, checkBlack] = check(board);
  if (player === 0) {
    if (checkWhite === false && whiteMoves.length === 0) {
      return true;
    }
    return false;
  }
  else {
    if (checkBlack === true && blackMoves.length === 0) {
      return true;
    }
    return false;
  }
}

const endGame = (board, player) => {
  if (staleMate(board, player)) {
    return 2;
  }
  let [checkWhite, checkBlack] = check(board);
  if (player === 0 && checkWhite === false) {
    return 0;
  }
  if (player === 1 && checkBlack === false) {
    return 0;
  }
  if (checkMate(board, player)) {
    return 1;
  }
  return 0;
}

const App = () => {
  initGame();
  const [showModal, setShowModal] = useState(false);
  const [chessBoard, setChessBoard] = useState(initBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [positions, setPositions] = useState([]);
  let endgame = false;
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
          currPositions = getAccessiblePositions(
            index,
            chessBoard[0],
            gameMoves
          );
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
      if (
        prevState[0][index] !== null &&
        getPieceColor(prevState[0][index]) === whoMoves
      ) {
        board[1][index] = 3;
      }
      for (let i = 0; i < 64; ++i) {
        board[0][i] = prevState[0][i];
      }
      // console.log(move);
      if (move !== null) {
        let currPiece = board[0][move[0]];
        // board[0] = doMove(chessBoard[0], index, );
        if (checkEnPassant(index, chessBoard[0], move)) {
          // console.log("en passant");
          // console.log(lastMove);
          board[0][move[1]] = board[0][move[0]];
          board[0][move[0]] = null;
          board[0][lastMove[1]] = null;
          board[1][move[1]] = null;
        } else if (checkCastling(move[0], chessBoard[0], move)) {
          console.log("castling");
          if (move[1] > move[0]) {
            board[0][move[1]] = board[0][move[0]];
            board[0][move[0]] = null;
            board[0][move[1] - 1] = board[0][move[1] + 1];
            board[0][move[1] + 1] = null;
          } else {
            console.log("queen side");
            board[0][move[1]] = board[0][move[0]];
            board[0][move[0]] = null;
            board[0][move[1] + 1] = board[0][move[1] - 2];
            board[0][move[1] - 2] = null;
          }
        } else {
          board[0][move[1]] = board[0][move[0]];
          board[0][move[0]] = null;
          board[1][move[1]] = null;
        }
        gameMoves.push([currPiece, move[0], move[1], board[0]]);
        endGame(board[0], 1 - getPieceColor(currPiece));
        // console.log(gameMoves);

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
      let [checkWhite, checkBlack] = check(board[0]);
      if (checkBlack === 1) {
        for (let i = 0; i < 64; ++i) {
          if (board[0][i] === 7) {
            board[1][i] = 4;
          }
        }
      }
      if (checkWhite === 1) {
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
