import classes from "./Square.module.css";

const Square = (props) => {
  const squareColor =
    props.squareColor === "light" ? "light-square" : "dark-square";
  return (
    <button className={`${classes.square} ${classes[squareColor]}`}>
    </button>
  );
};

export default Square;
