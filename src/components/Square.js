import classes from "./Square.module.css";

const Square = (props) => {
  const squareColor =
    props.squareColor === "light" ? "light-square" : "dark-square";
  const indexColor =
    props.squareColor === "light" ? "dark-index" : "light-index";
  const rowIndex = "row-index";
  const colIndex = "col-index";
  return (
    <div className={`${classes.square} ${classes[squareColor]}`}>
      {props.row !== -1 && <div className={`${classes[indexColor]} ${classes[rowIndex]}`}>{props.row}</div>}
      {props.col !== -1 && <div className={`${classes[indexColor]} ${classes[colIndex]}`}>{props.col}</div>}
    </div>
  );
};

export default Square;
