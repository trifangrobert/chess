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

export {getPieceColor, getPiece, getIndex, getPos, Inside};