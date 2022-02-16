import classes from "./Square.module.css";
import Piece from "../pieces/Piece.js";

const Square = (props) => {
  // console.log(props.piece);
  const squareColor =
    props.squareColor === "light" ? "light-square" : "dark-square";
  const indexColor =
    props.squareColor === "light" ? "dark-index" : "light-index";
  const rowIndex = "row-index";
  const colIndex = "col-index";
  return (
    <div onClick={() => props.handleClick(props.index)} className={`${classes.square} ${classes[squareColor]}`}>
      {<Piece piece={props.piece} cellState={props.cellState}/>}
      {props.row !== -1 && <div className={`${classes[indexColor]} ${classes[rowIndex]}`}>{props.row}</div>}
      {props.col !== -1 && <div className={`${classes[indexColor]} ${classes[colIndex]}`}>{props.col}</div>}
    </div>
  );
};

export default Square;
