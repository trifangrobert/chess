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
    <div className={`${classes.square} ${classes[squareColor]}`}>
      {props.piece !== null && <Piece piece={props.piece}/>}
      {props.row !== -1 && <div className={`${classes[indexColor]} ${classes[rowIndex]}`}>{props.row}</div>}
      {props.col !== -1 && <div className={`${classes[indexColor]} ${classes[colIndex]}`}>{props.col}</div>}
    </div>
  );
};

export default Square;
