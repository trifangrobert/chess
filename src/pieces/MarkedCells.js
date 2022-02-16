import classes from "./MarkedCells.module.css";

const MarkedCells = (props) => {
  let name = -1;
  if (props.stateType === 1) {
    name = 'dot';
  }
  else if (props.stateType === 2) {
    name = 'corner';
  }
  else if (props.stateType === 3) {
    name = 'selected';
  }
  return <div className={classes[name]}></div>;
};

export default MarkedCells;
