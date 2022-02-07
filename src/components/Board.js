import Square from "./Square.js";
import classes from "./Board.module.css";

const getIndex = (index) => {
    return [Math.floor(index / 8), index % 8];
}

const squareColor = (index) => {
    let position = getIndex(index);
    // console.log(position);
    if ((position[0] + position[1]) % 2 === 0) {
        return 'light';
    }
    return 'dark';
}

const getRow = (index) => {
  if (index % 8 === 7) { 
    return 8 - Math.floor(index / 8);
  }
  return -1;
}

const getCol = (index) => {
  if (index >= 56) {
    return String.fromCharCode(97 + index - 56);
  }
  return -1;
}

const Board = (props) => {
  return (
    <div className={classes.board}>
      {props.board.map((square, index) => (
        <Square
          key={index}
          squareColor={squareColor(index)}
          row={getRow(index)}
          col={getCol(index)}
          piece={square}
        //   onClick={() => props.handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
