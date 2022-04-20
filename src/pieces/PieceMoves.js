import doMove from "../chess rules/DoMove";
import AttackedPositions from "./Moves/AttackedPositions";
import {getPiece, getPieceColor, getIndex, getPos, Inside} from "../useful functions/PieceFunctions";

const emptyBoard = () => {
  return [new Array(64).fill(null), new Array(64).fill(null)];
};

const legalMove = (prevIndex, currIndex, board) => {
  // console.log("legal move check");
  let player = getPieceColor(board[prevIndex]);
  let nextBoard = emptyBoard();
  for (let i = 0; i < 64; ++i) {
    nextBoard[i] = board[i];
  }
  nextBoard = doMove(nextBoard, [prevIndex, currIndex], currIndex, lastMove);
  // console.log(1 - player);
  let attackedPos = AttackedPositions(
    nextBoard,
    1 - player
  );
  for (let i = 0; i < attackedPos.length; ++i) {
    let p = attackedPos[i];
    if (
      getPiece(nextBoard[p]) === 1 &&
      getPieceColor(nextBoard[p]) === player
    ) {
      return false;
    }
  }
  return true;
};

const checkKingCastling = (gameMoves, board, index) => {
  let player = getPieceColor(board[index]);
  if (player === 0) {
    // white king
    if (board[index + 1] !== null || board[index + 2] !== null) {
      return false;
    }
    for (let i = 0; i < gameMoves.length; ++i) {
      if (gameMoves[i][0] === 1) {
        return false;
      }
      if (gameMoves[i][0] === 5 && gameMoves[i][1] === 63) {
        return false;
      }
    }
    let positions = AttackedPositions(board, 1 - player);
    if (
      positions.includes(index) ||
      positions.includes(index + 1) ||
      positions.includes(index + 2)
    ) {
      return false;
    }
    return true;
  } else {
    if (board[index + 1] !== null || board[index + 2] !== null) {
      return false;
    }
    for (let i = 0; i < gameMoves.length; ++i) {
      if (gameMoves[i][0] === 7) {
        return false;
      }
      if (gameMoves[i][0] === 11 && gameMoves[i][1] === 7) {
        return false;
      }
    }
    let positions = AttackedPositions(board, 1 - player);
    if (
      positions.includes(index) ||
      positions.includes(index + 1) ||
      positions.includes(index + 2)
    ) {
      return false;
    }
    return true;
  }
};

const checkQueenCastling = (gameMoves, board, index) => {
  let player = getPieceColor(board[index]);
  if (player === 0) {
    // white king
    if (
      board[index - 1] !== null ||
      board[index - 2] !== null ||
      board[index - 3]
    ) {
      return false;
    }
    for (let i = 0; i < gameMoves.length; ++i) {
      if (gameMoves[i][0] === 1) {
        return false;
      }
      if (gameMoves[i][0] === 5 && gameMoves[i][1] === 56) {
        return false;
      }
    }
    let positions = AttackedPositions(board, 1 - player);
    if (
      positions.includes(index) ||
      positions.includes(index - 1) ||
      positions.includes(index - 2)
    ) {
      return false;
    }
    return true;
  } else {
    if (
      board[index - 1] !== null ||
      board[index - 2] !== null ||
      board[index - 3]
    ) {
      return false;
    }
    for (let i = 0; i < gameMoves.length; ++i) {
      if (gameMoves[i][0] === 7) {
        return false;
      }
      if (gameMoves[i][0] === 11 && gameMoves[i][1] === 0) {
        return false;
      }
    }
    let positions = AttackedPositions(board, 1 - player);
    if (
      positions.includes(index) ||
      positions.includes(index - 1) ||
      positions.includes(index - 2)
    ) {
      return false;
    }
    return true;
  }
};

let lastMove = undefined;

const PieceMoves = (index, board, gameMoves = []) => {
  if (gameMoves.length !== 0) {
    lastMove = [
      gameMoves[gameMoves.length - 1][1],
      gameMoves[gameMoves.length - 1][2],
    ];
  }
  let [x, y] = getPos(index);
  let piece = board[index];
  let player = 0;
  let positions = [];
  if (piece > 6) {
    piece -= 6;
    player = 1;
  }
  if (piece === 1) {
    // console.log("MORTII REGELUI MA_TII");
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
          board[newIndex] === null) &&
        legalMove(getIndex(x, y), getIndex(i, j), board)
      ) {
        positions.push(newIndex);
        // console.log(newIndex);
      }
    }
    if (checkKingCastling(gameMoves, board, index)) {
      positions.push(index + 2);
    }
    if (checkQueenCastling(gameMoves, board, index)) {
      positions.push(index - 2);
    }
  } else if (piece === 2) {
    // console.log("MORTII REGINEI MA_TII");
    // queen
    let i, j;
    let dx = [0, 0, -1, 1, -1, -1, 1, 1];
    let dy = [-1, 1, 0, 0, -1, 1, -1, 1];
    for (let d = 0; d < 8; ++d) {
      i = x + dx[d];
      j = y + dy[d];
      let newIndex = getIndex(i, j);
      while (Inside(i, j) && board[newIndex] === null) {
        if (legalMove(getIndex(x, y), getIndex(i, j), board)) {
          positions.push(newIndex);
        }
        i += dx[d];
        j += dy[d];
        newIndex = getIndex(i, j);
      }
      if (
        Inside(i, j) &&
        board[newIndex] !== null &&
        getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
        legalMove(getIndex(x, y), getIndex(i, j), board)
      ) {
        positions.push(newIndex);
      }
    }
  } else if (piece === 3) {
    // console.log("MORTII NEBUNULUI MA_TII");
    // bishop
    let i, j;
    let dx = [-1, -1, 1, 1];
    let dy = [-1, 1, -1, 1];
    for (let d = 0; d < 4; ++d) {
      i = x + dx[d];
      j = y + dy[d];
      let newIndex = getIndex(i, j);
      while (Inside(i, j) && board[newIndex] === null) {
        if (legalMove(getIndex(x, y), getIndex(i, j), board)) {
          positions.push(newIndex);
        }
        i += dx[d];
        j += dy[d];
        newIndex = getIndex(i, j);
      }
      if (
        Inside(i, j) &&
        board[newIndex] !== null &&
        getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
        legalMove(getIndex(x, y), getIndex(i, j), board)
      ) {
        positions.push(newIndex);
      }
    }
  } else if (piece === 4) {
    // console.log("MORTII CALULUI MA_TII");
    // knight
    let dx = [-2, -1, +1, +2, +2, +1, -1, -2];
    let dy = [+1, +2, +2, +1, -1, -2, -2, -1];
    for (let k = 0; k < 8; k++) {
      let i, j;
      i = x + dx[k];
      j = y + dy[k];
      let newIndex = getIndex(i, j);
      if (
        Inside(i, j) &&
        getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
        legalMove(getIndex(x, y), getIndex(i, j), board)
      ) {
        positions.push(newIndex);
      }
    }
  } else if (piece === 5) {
    // console.log("MORTII TURII MA_TII");
    // rook
    let i, j;
    let dx = [0, 0, -1, 1];
    let dy = [-1, 1, 0, 0];
    for (let d = 0; d < 4; ++d) {
      i = x + dx[d];
      j = y + dy[d];
      let newIndex = getIndex(i, j);
      while (Inside(i, j) && board[newIndex] === null) {
        if (legalMove(getIndex(x, y), getIndex(i, j), board)) {
          positions.push(newIndex);
        }
        i += dx[d];
        j += dy[d];
        newIndex = getIndex(i, j);
      }
      if (
        Inside(i, j) &&
        board[newIndex] !== null &&
        getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
        legalMove(getIndex(x, y), getIndex(i, j), board)
      ) {
        positions.push(newIndex);
      }
    }
  } else if (piece === 6) {
    // console.log("VERIFIC PIONU");
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
      getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
      legalMove(getIndex(x, y), getIndex(i, j), board)
    ) {
      positions.push(newIndex);
    }

    i = x + dx;
    j = y + 1;
    newIndex = getIndex(i, j);
    if (
      Inside(i, j) &&
      board[newIndex] !== null &&
      getPieceColor(board[index]) !== getPieceColor(board[newIndex]) &&
      legalMove(getIndex(x, y), getIndex(i, j), board)
    ) {
      positions.push(newIndex);
    }

    i = x + dx;
    j = y;
    newIndex = getIndex(i, j);
    if (
      Inside(i, j) &&
      board[newIndex] === null &&
      legalMove(getIndex(x, y), getIndex(i, j), board)
    ) {
      positions.push(newIndex);
    }

    i = x + dx;
    let ii = x + 2 * dx;
    j = y;
    newIndex = getIndex(ii, j);
    if (player === 0 && x === 6) {
      if (
        board[getIndex(i, j)] === null &&
        board[newIndex] === null &&
        legalMove(getIndex(x, y), getIndex(ii, j), board)
      ) {
        positions.push(newIndex);
      }
    }
    if (player === 1 && x === 1) {
      if (
        board[getIndex(i, j)] === null &&
        board[newIndex] === null &&
        legalMove(getIndex(x, y), getIndex(ii, j), board)
      ) {
        positions.push(newIndex);
      }
    }
    if (lastMove !== undefined) {
      // console.log("this was the last move");
      // console.log(lastMove);
      if (player === 1 && x === 4) {
        let oldPos = getPos(lastMove[0]);
        let newPos = getPos(lastMove[1]);
        if (
          board[lastMove[1]] === 6 &&
          Math.abs(newPos[0] - oldPos[0]) === 2 &&
          Math.abs(y - newPos[1]) === 1
        ) {
          newIndex = getIndex(x + dx, newPos[1]);
          positions.push(newIndex);
        }
      }
      if (player === 0 && x === 3) {
        let oldPos = getPos(lastMove[0]);
        let newPos = getPos(lastMove[1]);
        if (
          board[lastMove[1]] === 12 &&
          Math.abs(newPos[0] - oldPos[0]) === 2 &&
          Math.abs(y - newPos[1]) === 1
        ) {
          newIndex = getIndex(x + dx, newPos[1]);
          positions.push(newIndex);
        }
      }
    }
  }
  // console.log(positions);
  return positions;
};

export default PieceMoves;
