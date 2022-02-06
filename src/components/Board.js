import Square from "./Square.js";
import classes from "./Board.module.css";

const getIndex = (index) => {
    return [Math.floor(index / 8), index % 8];
}

const squareColor = (index) => {
    let position = getIndex(index);
    console.log(position);
    if ((position[0] + position[1]) % 2 === 0) {
        return 'light';
    }
    return 'dark';
}

const Board = (props) => {
  return (
    <div className={classes.board}>
      {props.squares.map((square, index) => (
        <Square
          key={index}
          square={square}
          squareColor={squareColor(index)}
        //   onClick={() => props.handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
