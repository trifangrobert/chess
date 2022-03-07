let allowCheckForCastling = true;

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

const checkMate = (index, board, player) => {
  allowCheckForCastling = false;
  let oppPieces = [];
  let oppMoves = [];
  for (let i = 0; i < 64; ++i) {
    if (getPieceColor(board[i]) === 1 - player) {
      oppPieces.push(i);
    }
  }
  // console.log(whitePieces, blackPieces);
  for (let i = 0; i < oppPieces.length; ++i) {
    let l = PieceMoves(oppPieces[i], board);
    oppMoves.push(...l);
  }
  allowCheckForCastling = true;

  if (oppMoves.includes(index)) {
    return true;
  }
  return false;
};

const checkKingCastling = (gameMoves, board, index) => {
  let player = getPieceColor(board[index]);
  if (player === 0) {
    // white king
    // console.log("testam ceva");
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
    if (
      checkMate(index, board, player) ||
      checkMate(index + 1, board, player) ||
      checkMate(index + 2, board, player) 
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
    if (
      checkMate(index, board, player) ||
      checkMate(index + 1, board, player) ||
      checkMate(index + 2, board, player)
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
    if (
      checkMate(index, board, player) ||
      checkMate(index - 1, board, player) ||
      checkMate(index - 2, board, player)
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
    if (
      checkMate(index, board, player) ||
      checkMate(index - 1, board, player) ||
      checkMate(index - 2, board, player)
    ) {
      return false;
    }
    return true;
  }
};

const PieceMoves = (index, board, gameMoves = []) => {
  // console.log(gameMoves, gameMoves.length);
  let lastMove = undefined;
  if (gameMoves.length !== 0) {
    lastMove = [
      gameMoves[gameMoves.length - 1][1],
      gameMoves[gameMoves.length - 1][2],
    ];
  }
  // console.log("inceput de piecemoves");
  // console.log(lastMove);
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
    if (allowCheckForCastling) {
      if (checkKingCastling(gameMoves, board, index)) {
        positions.push(index + 2);
      }
      if (checkQueenCastling(gameMoves, board, index)) {
        positions.push(index - 2);
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
